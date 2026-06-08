import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Nav } from "@/components/atlas/Nav";
import { SiteFooter } from "@/components/atlas/SiteFooter";
import {
  articles,
  categories,
  type ArticleCategory,
} from "@/lib/constitution-data";
import { analytics } from "@/lib/analytics";

export const Route = createFileRoute("/constitution")({
  head: () => ({
    meta: [
      { title: "The Atlas Constitution — Atlas Sanctum" },
      {
        name: "description",
        content:
          "Browse the Atlas Constitution: rights, responsibilities, verification rules, and governance checkpoints for a trust-native civilization. Searchable and scroll-synced.",
      },
      { property: "og:title", content: "The Atlas Constitution — Atlas Sanctum" },
      {
        property: "og:description",
        content: "Rights, responsibilities, verification, and governance for planetary stewardship.",
      },
    ],
  }),
  component: ConstitutionPage,
});

function ConstitutionPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ArticleCategory | "All">("All");
  const [activeId, setActiveId] = useState(articles[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = filter === "All" || a.category === filter;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.checkpoints.some((c) => c.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, filter]);

  // Scroll-sync: highlight the article currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    filtered.forEach((a) => {
      const el = sectionRefs.current[a.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [filtered]);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main id="main-content" className="mx-auto max-w-6xl px-6 pb-32 pt-32">
        <header className="text-center">
          <p className="label-mono text-gold">The Atlas Constitution</p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
            Code Is Powerful. <span className="text-gradient-gold">Constitutions Are Stronger.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Browse rights, responsibilities, verification rules, and governance checkpoints.
            Search to filter instantly; the index follows your reading.
          </p>
        </header>

        {/* Controls */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor="constitution-search" className="sr-only">
              Search the constitution
            </label>
            <input
              id="constitution-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) analytics.track("constitution_search", { query: e.target.value });
              }}
              placeholder="Search rights, duties, verification, governance…"
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-emerald/60 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === c
                    ? "border-emerald bg-emerald/20 text-emerald"
                    : "border-border bg-card/40 text-muted-foreground hover:border-emerald/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* Scroll-synced index */}
          <nav aria-label="Constitution index" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1">
              {filtered.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => scrollTo(a.id)}
                    aria-current={activeId === a.id ? "true" : undefined}
                    className={`block w-full border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                      activeId === a.id
                        ? "border-emerald text-emerald"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono">{a.number}.</span> {a.title}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="py-2 pl-4 text-sm text-muted-foreground">No matches</li>
              )}
            </ol>
          </nav>

          {/* Articles */}
          <div className="space-y-10">
            {filtered.map((a) => (
              <article
                key={a.id}
                id={a.id}
                ref={(el) => {
                  sectionRefs.current[a.id] = el;
                }}
                className="scroll-mt-28 rounded-2xl border border-border bg-card/40 p-8 backdrop-blur"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl font-bold text-gold/70">{a.number}</span>
                  <span className="label-mono rounded-full border border-border px-3 py-1 text-muted-foreground">
                    {a.category}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold">{a.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{a.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {a.checkpoints.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/5 px-3 py-1.5 text-sm text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card/40 p-8 text-center text-muted-foreground">
                No articles match “{query}”. Try a different term or clear the filter.
              </p>
            )}
            <Link to="/" className="inline-block text-sm text-emerald hover:underline">
              ← Back to Atlas Sanctum
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
