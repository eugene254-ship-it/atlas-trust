import { useEffect, useRef } from "react";
import earthHero from "@/assets/earth-hero.jpg";
import { analytics } from "@/lib/analytics";
import { useSettings } from "@/lib/settings";

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.background = `radial-gradient(circle 380px at ${x}% ${y}%, oklch(0.74 0.17 162 / 22%), transparent 70%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={earthHero}
          alt="Planetary digital twin with glowing trust pathways connecting cities, forests and oceans"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-80 animate-float-slow"
        />
        <div className="absolute inset-0 bg-obsidian/40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>
      <div ref={glowRef} className="pointer-events-none absolute inset-0 z-10" />

      <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
        <p className="label-mono mb-6 text-emerald animate-rise">Trust Infrastructure for Civilization</p>
        <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-7xl md:text-8xl animate-rise">
          Atlas <span className="text-gradient-emerald">Sanctum</span>
        </h1>
        <p
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-rise"
          style={{ animationDelay: "0.15s" }}
        >
          Verifying what matters. Coordinating what scales. Restoring trust to the
          world's most important systems.
        </p>
        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-rise"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#"
            className="glow-emerald rounded-lg bg-emerald px-8 py-3.5 font-medium text-primary-foreground transition-transform hover:scale-105"
          >
            Begin Stewardship
          </a>
          <a
            href="#network"
            className="rounded-lg border border-border bg-card/40 px-8 py-3.5 font-medium text-foreground backdrop-blur transition-colors hover:border-aurora/60"
          >
            Explore the Network
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 label-mono text-muted-foreground">
        Scroll to descend
      </div>
    </section>
  );
}
