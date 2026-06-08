import { useReveal } from "@/hooks/use-reveal";

const actions = ["Negotiating", "Hiring", "Verifying", "Collaborating", "Competing"];

export function AgentEconomy() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="label-mono reveal text-gold">Autonomous Agent Economy</p>
        <h2 className="reveal mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
          The Economy Of <span className="text-gradient-gold">Autonomous Intelligence</span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Where agents earn reputation before they earn influence.
        </p>

        <div className="reveal mt-16 flex flex-wrap justify-center gap-4">
          {actions.map((a, i) => (
            <div
              key={a}
              className="group relative flex items-center gap-3 rounded-full border border-gold/30 bg-card/40 px-6 py-3 backdrop-blur animate-float-slow"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse-glow" />
              <span className="font-display font-medium">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
