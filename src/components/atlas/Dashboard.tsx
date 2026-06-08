import { useLiveFeed, type FeedEvent } from "@/lib/live-feed";

const kindStyles: Record<FeedEvent["kind"], string> = {
  verification: "text-emerald border-emerald/40",
  transaction: "text-gold border-gold/40",
  evidence: "text-aurora border-aurora/40",
};

export function Dashboard() {
  const { metrics, events, trustScoreIndex, evidenceVerified } = useLiveFeed();

  const cards = [
    { label: "Forests Restored", value: metrics.forestsRestored, suffix: " ha" },
    { label: "Carbon Verified", value: metrics.carbonVerified, suffix: " t" },
    { label: "Communities Funded", value: metrics.communitiesFunded, suffix: "" },
    { label: "TrustScore Transactions", value: metrics.trustTransactions, suffix: "" },
    { label: "Active AI Agents", value: metrics.activeAgents, suffix: "" },
    { label: "Sovereign Partners", value: metrics.sovereignPartners, suffix: "" },
  ];

  return (
    <section className="relative py-32" aria-labelledby="dashboard-heading">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="label-mono text-emerald">Global Stewardship Dashboard</p>
          <h2 id="dashboard-heading" className="mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
            Civilization's <span className="text-gradient-emerald">Heartbeat</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            TrustScore and the Impact Oracle Network streaming live across the planetary mesh.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Live metrics */}
          <div>
            <div className="mb-4 flex items-center gap-2 label-mono text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
              Updating live
            </div>
            <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">
              {cards.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur">
                  <p className="label-mono text-muted-foreground">{m.label}</p>
                  <p className="mt-4 font-mono text-3xl font-medium tabular-nums sm:text-4xl">
                    {m.value.toLocaleString()}
                    <span className="text-emerald">{m.suffix}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-6">
                <p className="label-mono text-emerald">TrustScore Index</p>
                <p className="mt-3 font-mono text-3xl font-medium tabular-nums">{trustScoreIndex.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-aurora/30 bg-aurora/5 p-6">
                <p className="label-mono text-aurora">Evidence Verified</p>
                <p className="mt-3 font-mono text-3xl font-medium tabular-nums">{evidenceVerified.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Live event stream */}
          <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <p className="label-mono text-foreground">Impact Oracle Stream</p>
              <span className="label-mono text-emerald">live</span>
            </div>
            <ul className="space-y-2" aria-live="polite" aria-label="Live verification, transaction and evidence stream">
              {events.length === 0 && (
                <li className="text-sm text-muted-foreground">Awaiting first signal…</li>
              )}
              {events.map((e) => (
                <li
                  key={e.id}
                  className="animate-rise rounded-lg border border-border/60 bg-secondary/30 px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`label-mono rounded border px-1.5 py-0.5 ${kindStyles[e.kind]}`}>
                      {e.kind}
                    </span>
                    <span className="font-mono text-xs text-aurora">{e.value}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-foreground">{e.label}</p>
                  <p className="text-xs text-muted-foreground">{e.city}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
