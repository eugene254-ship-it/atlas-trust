import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Settings {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
}

interface SettingsContextValue extends Settings {
  toggle: (key: keyof Settings) => void;
  set: (key: keyof Settings, value: boolean) => void;
}

const STORAGE_KEY = "atlas:settings";
const SettingsContext = createContext<SettingsContextValue | null>(null);

function readInitial(): Settings {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const base: Settings = {
    reducedMotion: !!prefersReduced,
    highContrast: false,
    largeText: false,
  };
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...base, ...JSON.parse(raw) };
  } catch {
    /* noop */
  }
  return base;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => ({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
  }));

  // Hydrate from storage / media query on the client to avoid SSR mismatch.
  useEffect(() => {
    setSettings(readInitial());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    root.classList.toggle("high-contrast", settings.highContrast);
    root.classList.toggle("large-text", settings.largeText);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* noop */
    }
  }, [settings]);

  const value: SettingsContextValue = {
    ...settings,
    toggle: (key) => setSettings((s) => ({ ...s, [key]: !s[key] })),
    set: (key, val) => setSettings((s) => ({ ...s, [key]: val })),
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
