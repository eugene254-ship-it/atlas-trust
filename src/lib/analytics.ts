// Lightweight client analytics: CTA clicks, scroll depth, and section-attributed conversions.
// Events are pushed to window.dataLayer (GA/GTM compatible), logged, and persisted to localStorage.

export type AnalyticsEvent = {
  name: string;
  ts: number;
  props?: Record<string, unknown>;
};

const STORAGE_KEY = "atlas:analytics";
const MAX_EVENTS = 500;

let currentSection = "hero";
const sectionTime: Record<string, number> = {};
let lastSectionEnter = Date.now();
let maxScrollDepth = 0;
const firedDepths = new Set<number>();

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    atlasAnalytics?: typeof analytics;
  }
}

function persist(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.push(event);
    if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    /* storage unavailable */
  }
}

export const analytics = {
  track(name: string, props: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    const event: AnalyticsEvent = {
      name,
      ts: Date.now(),
      props: { section: currentSection, ...props },
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...event.props, ts: event.ts });
    persist(event);
    if (import.meta.env.DEV) console.debug("[analytics]", name, event.props);
  },

  /** Track a CTA click and attribute the conversion to the currently-viewed section. */
  conversion(cta: string, props: Record<string, unknown> = {}) {
    this.track("cta_click", { cta, attributed_section: currentSection, ...props });
  },

  setSection(name: string) {
    if (name === currentSection) return;
    const now = Date.now();
    sectionTime[currentSection] = (sectionTime[currentSection] || 0) + (now - lastSectionEnter);
    currentSection = name;
    lastSectionEnter = now;
    this.track("section_view", { section: name });
  },

  registerScrollDepth() {
    if (typeof window === "undefined") return () => {};
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      maxScrollDepth = Math.max(maxScrollDepth, depth);
      [25, 50, 75, 100].forEach((mark) => {
        if (depth >= mark && !firedDepths.has(mark)) {
          firedDepths.add(mark);
          this.track("scroll_depth", { depth: mark });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  },

  /** Returns a summary report of section engagement and conversions. */
  getReport() {
    if (typeof window === "undefined") return null;
    let events: AnalyticsEvent[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      events = raw ? JSON.parse(raw) : [];
    } catch {
      /* noop */
    }
    const conversions = events.filter((e) => e.name === "cta_click");
    const bySection: Record<string, number> = {};
    conversions.forEach((c) => {
      const s = String(c.props?.attributed_section ?? "unknown");
      bySection[s] = (bySection[s] || 0) + 1;
    });
    return {
      totalEvents: events.length,
      conversions: conversions.length,
      conversionsBySection: bySection,
      maxScrollDepth,
      sectionTime: { ...sectionTime, [currentSection]: (sectionTime[currentSection] || 0) + (Date.now() - lastSectionEnter) },
    };
  },
};

if (typeof window !== "undefined") {
  window.atlasAnalytics = analytics;
}
