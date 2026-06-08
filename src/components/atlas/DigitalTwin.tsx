import { useReveal } from "@/hooks/use-reveal";
import digitalTwin from "@/assets/digital-twin.jpg";

const cities = [
  { name: "Nairobi", metric: "1.2M trees verified" },
  { name: "Singapore", metric: "98.4 TrustScore index" },
  { name: "São Paulo", metric: "420k tons carbon removed" },
  { name: "New York", metric: "3.1M agent transactions" },
];

export function DigitalTwin() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative overflow-hidden bg-obsidian py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="label-mono reveal text-aurora">Planetary Digital Twin</p>
          <h2 className="reveal mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
            Simulate Civilization <span className="text-gradient-emerald">Before You Change It</span>
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="reveal relative">
            <div className="absolute -inset-6 rounded-full bg-emerald/10 blur-3xl" />
            <img
              src={digitalTwin}
              alt="Interactive holographic globe showing ecosystems, economies, cities and trust flows"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative rounded-2xl border border-border"
            />
          </div>
          <div className="space-y-4">
            {cities.map((c, i) => (
              <div
                key={c.name}
                className="reveal flex items-center justify-between rounded-xl border border-border bg-card/40 px-6 py-5 backdrop-blur transition-colors hover:border-emerald/50"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald animate-pulse-glow" />
                  <span className="font-display text-lg font-medium">{c.name}</span>
                </div>
                <span className="font-mono text-sm text-aurora">{c.metric}</span>
              </div>
            ))}
            <p className="reveal pt-4 text-sm text-muted-foreground">
              Zoom into any location to reveal real-time stewardship metrics across
              ecosystems, economies, cities and AI agents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
