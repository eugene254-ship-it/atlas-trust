import { useReveal } from "@/hooks/use-reveal";

const chain = [
  "Claims become verified",
  "Verification becomes reputation",
  "Reputation becomes coordination",
  "Coordination becomes impact",
  "Impact becomes civilization",
];

const nodeTypes = ["Human", "AI Agent", "Organization", "Ecosystem", "Government"];

export function TrustLayer() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="network" ref={ref} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="label-mono reveal text-aurora">The Living Trust Layer</p>
        <h2 className="reveal mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
          Trust Is The <span className="text-gradient-emerald">New Infrastructure</span>
        </h2>

        {/* Network visualization */}
        <div className="reveal relative mx-auto mt-16 aspect-[16/9] max-w-4xl">
          <svg viewBox="0 0 800 450" className="h-full w-full">
            <defs>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.74 0.17 162)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="oklch(0.74 0.17 162)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="400" cy="225" r="120" fill="url(#core)" className="animate-pulse-glow" />
            {[...Array(18)].map((_, i) => {
              const a = (i / 18) * Math.PI * 2;
              const r = 150 + (i % 3) * 45;
              const x = Math.round((400 + Math.cos(a) * r) * 100) / 100;
              const y = Math.round((225 + Math.sin(a) * r * 0.55) * 100) / 100;
              return (
                <g key={i}>
                  <line
                    x1="400"
                    y1="225"
                    x2={x}
                    y2={y}
                    stroke="oklch(0.74 0.17 162 / 35%)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    style={{ animation: "flow-dash 14s linear infinite" }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={3 + (i % 3)}
                    fill={i % 2 ? "oklch(0.82 0.13 220)" : "oklch(0.82 0.13 92)"}
                    className="animate-pulse-glow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </g>
              );
            })}
            <circle cx="400" cy="225" r="10" fill="oklch(0.74 0.17 162)" />
          </svg>
        </div>

        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          {nodeTypes.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-3">
          {chain.map((step, i) => (
            <div
              key={step}
              className="reveal flex items-center gap-3 text-lg sm:text-2xl"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="label-mono text-emerald">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display font-medium">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
