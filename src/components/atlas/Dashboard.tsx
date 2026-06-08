import { useEffect, useRef, useState } from "react";

const metrics = [
  { label: "Forests Restored", base: 48213, suffix: " ha", step: 3 },
  { label: "Carbon Verified", base: 1284910, suffix: " t", step: 41 },
  { label: "Communities Funded", base: 9472, suffix: "", step: 1 },
  { label: "TrustScore Transactions", base: 31827445, suffix: "", step: 137 },
  { label: "Active AI Agents", base: 204918, suffix: "", step: 7 },
  { label: "Sovereign Partners", base: 64, suffix: "", step: 0 },
];

function useLiveCount(base: number, step: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    if (step === 0) return;
    const id = setInterval(() => setV((p) => p + Math.floor(Math.random() * step) + 1), 1600);
    return () => clearInterval(id);
  }, [step]);
  return v;
}

function Metric({ label, base, suffix, step }: (typeof metrics)[number]) {
  const v = useLiveCount(base, step);
  return (
    <div className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
        <p className="label-mono text-muted-foreground">{label}</p>
      </div>
      <p className="mt-4 font-mono text-3xl font-medium text-foreground sm:text-4xl">
        {v.toLocaleString()}
        <span className="text-emerald">{suffix}</span>
      </p>
    </div>
  );
}

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section ref={ref} className="relative py-32">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="label-mono text-emerald">Global Stewardship Dashboard</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
            Civilization's <span className="text-gradient-emerald">Heartbeat</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Mission-control metrics, updating live across the planetary network.
          </p>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
