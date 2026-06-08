import { Link } from "@tanstack/react-router";
import { analytics } from "@/lib/analytics";

const links: { label: string; to: string; hash?: string }[] = [
  { label: "Constitution", to: "/constitution" },
  { label: "TrustScore", to: "/", hash: "dashboard" },
  { label: "Digital Twin", to: "/", hash: "digital-twin" },
  { label: "Network", to: "/", hash: "network" },
  { label: "Governance", to: "/constitution" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-obsidian/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden="true">
            <span className="absolute inset-0 rounded-full border border-emerald/60 animate-pulse-glow" />
            <span className="absolute inset-1.5 rounded-full border border-gold/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Atlas <span className="text-emerald">Sanctum</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          to="/"
          hash="network"
          onClick={() => analytics.conversion("begin_stewardship", { location: "nav" })}
          className="rounded-md border border-emerald/50 bg-emerald/10 px-4 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald/20"
        >
          Begin Stewardship
        </Link>
      </nav>
    </header>
  );
}
