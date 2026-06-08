const columns = [
  {
    title: "Protocol",
    links: ["Constitution", "TrustScore Protocol", "Impact Oracle Network", "Planetary Digital Twin"],
  },
  {
    title: "Network",
    links: ["Research", "Ecosystem", "Governance", "Developers"],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-obsidian">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-emerald/60 animate-pulse-glow" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              </span>
              <span className="font-display text-xl font-semibold">
                Atlas <span className="text-emerald">Sanctum</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Civilizations rise on trust. Atlas Sanctum exists to make trust programmable.
            </p>
            <div className="mt-6 flex items-center gap-2 label-mono text-emerald">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
              All systems operational
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-mono text-muted-foreground">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 transition-colors hover:text-emerald">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-8 text-center label-mono text-muted-foreground">
          © {new Date().getFullYear()} Atlas Sanctum — Trust Infrastructure for Civilization
        </div>
      </div>
    </footer>
  );
}
