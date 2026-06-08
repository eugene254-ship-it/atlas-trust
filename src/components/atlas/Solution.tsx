import { useReveal } from "@/hooks/use-reveal";

const pillars = [
  {
    name: "TrustScore",
    tag: "Living Reputation Engine",
    lines: [
      "Every action leaves evidence.",
      "Every claim earns verification.",
      "Every participant builds trust.",
    ],
    accent: "emerald",
  },
  {
    name: "Constitutional AI",
    tag: "Governance Framework",
    lines: [
      "Intelligence without accountability becomes risk.",
      "Atlas ensures every autonomous system operates within transparent constitutional boundaries.",
    ],
    accent: "gold",
  },
  {
    name: "Impact Oracle Network",
    tag: "Reality Becomes Verifiable",
    lines: [
      "Satellites, IoT devices and community validators.",
      "Trees planted. Carbon removed. Water restored.",
      "Evidence verified. TrustScore updated.",
    ],
    accent: "aurora",
  },
];

const accentMap: Record<string, string> = {
  emerald: "border-emerald/40 text-emerald",
  gold: "border-gold/40 text-gold",
  aurora: "border-aurora/40 text-aurora",
};

export function Solution() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="label-mono reveal text-emerald">The Fractures Begin Healing</p>
          <h2 className="reveal mx-auto mt-6 max-w-4xl text-4xl font-bold sm:text-6xl">
            The Trust Clearing House <span className="text-gradient-emerald">Of Civilization</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <article
              key={p.name}
              className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-8 backdrop-blur transition-transform hover:-translate-y-2"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full border ${accentMap[p.accent]}`}
              >
                <span className="h-3 w-3 rounded-full bg-current animate-pulse-glow" />
              </div>
              <p className={`label-mono ${accentMap[p.accent].split(" ")[1]}`}>{p.tag}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">{p.name}</h3>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                {p.lines.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-relaxed">
                    <span className={accentMap[p.accent].split(" ")[1]}>—</span>
                    {l}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
