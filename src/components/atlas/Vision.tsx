import { useReveal } from "@/hooks/use-reveal";
import networkBg from "@/assets/network-bg.jpg";

const beliefs = [
  "Trust Should Be Verifiable",
  "Impact Should Be Measurable",
  "Intelligence Should Be Accountable",
  "Civilization Should Be Coordinated",
];

export function Vision() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative overflow-hidden py-40">
      <div className="absolute inset-0">
        <img
          src={networkBg}
          alt="Earth transitioning into a glowing planetary trust network"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="label-mono reveal text-aurora">We Believe</p>
        <div className="mt-10 space-y-5">
          {beliefs.map((b, i) => (
            <h2
              key={b}
              className="reveal text-3xl font-bold sm:text-5xl"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {b}
            </h2>
          ))}
        </div>
        <div className="reveal mt-20">
          <p className="font-display text-2xl font-semibold text-gradient-emerald sm:text-4xl">
            Atlas Sanctum
          </p>
          <p className="mt-3 text-lg text-muted-foreground">
            The Constitutional Operating System For Planetary Stewardship
          </p>
        </div>
      </div>
    </section>
  );
}
