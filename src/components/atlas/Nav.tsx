import { Link } from "@tanstack/react-router";

const links = ["Constitution", "TrustScore", "Digital Twin", "Network", "Governance"];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-obsidian/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center">
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
            <a
              key={l}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="rounded-md border border-emerald/50 bg-emerald/10 px-4 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald/20"
        >
          Begin Stewardship
        </a>
      </nav>
    </header>
  );
}
