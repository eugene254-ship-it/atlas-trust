import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import constitution from "@/assets/constitution.jpg";

const articles = [
  { n: "I", title: "Rights", body: "Every participant is entitled to verifiable identity and recourse." },
  { n: "II", title: "Responsibilities", body: "Every action carries accountable, traceable evidence." },
  { n: "III", title: "Verification Rules", body: "Claims are meaningless until independently confirmed." },
  { n: "IV", title: "Governance Principles", body: "Power is bounded by transparent constitutional limits." },
];

export function Constitution() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="relative overflow-hidden bg-obsidian py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="reveal relative order-2 lg:order-1">
            <div className="absolute -inset-8 rounded-full bg-gold/10 blur-3xl" />
            <img
              src={constitution}
              alt="Sacred geometric vault forming the constitutional core in luminous gold"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative rounded-2xl border border-gold/20 animate-spin-slow"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="label-mono reveal text-gold">The Atlas Constitution</p>
            <h2 className="reveal mt-6 text-4xl font-bold sm:text-5xl">
              Code Is Powerful.
              <br />
              <span className="text-gradient-gold">Constitutions Are Stronger.</span>
            </h2>
            <div className="mt-10 space-y-5">
              {articles.map((a, i) => (
                <div
                  key={a.n}
                  className="reveal flex gap-5 border-l border-gold/30 pl-5"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="font-display text-2xl font-bold text-gold/70">{a.n}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/constitution"
              className="reveal mt-8 inline-flex items-center gap-2 rounded-lg border border-gold/50 bg-gold/10 px-6 py-3 font-medium text-gold transition-colors hover:bg-gold/20"
            >
              Read the full Constitution →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
