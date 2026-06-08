import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/atlas/Nav";
import { Hero } from "@/components/atlas/Hero";
import { TrustLayer } from "@/components/atlas/TrustLayer";
import { Problem } from "@/components/atlas/Problem";
import { Solution } from "@/components/atlas/Solution";
import { GlobeSection } from "@/components/atlas/GlobeSection";
import { AgentEconomy } from "@/components/atlas/AgentEconomy";
import { Constitution } from "@/components/atlas/Constitution";
import { Dashboard } from "@/components/atlas/Dashboard";
import { Vision } from "@/components/atlas/Vision";
import { SiteFooter } from "@/components/atlas/SiteFooter";
import { analytics } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Trust Infrastructure for Civilization" },
      {
        name: "description",
        content:
          "The Constitutional Operating System for planetary stewardship. Verifying what matters, coordinating what scales, and restoring trust to the world's most important systems.",
      },
      { property: "og:title", content: "Atlas Sanctum — Trust Infrastructure for Civilization" },
      {
        property: "og:description",
        content:
          "The Constitutional Operating System for planetary stewardship. Trust, verified. Impact, measurable. Intelligence, accountable.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const sections: { id: string; node: React.ReactNode }[] = [
  { id: "hero", node: <Hero /> },
  { id: "network", node: <TrustLayer /> },
  { id: "problem", node: <Problem /> },
  { id: "solution", node: <Solution /> },
  { id: "digital-twin", node: <GlobeSection /> },
  { id: "agents", node: <AgentEconomy /> },
  { id: "constitution", node: <Constitution /> },
  { id: "dashboard", node: <Dashboard /> },
  { id: "vision", node: <Vision /> },
];

function Index() {
  useEffect(() => {
    const stopScroll = analytics.registerScrollDepth();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const name = visible[0]?.target.getAttribute("data-section");
        if (name) analytics.setSection(name);
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => {
      stopScroll();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="main-content">
        {sections.map((s) => (
          <div key={s.id} data-section={s.id}>
            {s.node}
          </div>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
