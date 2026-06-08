import { useReveal } from "@/hooks/use-reveal";

const fractures = [
  { stat: "Fake ESG", label: "Unverifiable sustainability claims" },
  { stat: "Fraud", label: "Trillions lost to deception yearly" },
  { stat: "Corruption", label: "Eroding institutional legitimacy" },
  { stat: "Misinformation", label: "Signals without provenance" },
  { stat: "Black-box AI", label: "Intelligence without accountability" },
  { stat: "Silos", label: "Disconnected, incompatible systems" },
];

export function Problem() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative overflow-hidden bg-obsidian py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.6_0.22_25/12%),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="label-mono reveal text-destructive">Broken Signals Everywhere</p>
          <h2 className="reveal mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
            Civilization Has A <span className="text-destructive">Trust Problem</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The world has systems for moving money. The world lacks systems for moving trust.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fractures.map((f, i) => (
            <div
              key={f.stat}
              className="reveal group relative overflow-hidden rounded-xl border border-destructive/20 bg-card/40 p-6 backdrop-blur"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,oklch(0.6_0.22_25/8%),transparent)]" />
              <p className="relative font-display text-2xl font-semibold text-foreground/90">{f.stat}</p>
              <p className="relative mt-2 text-sm text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
