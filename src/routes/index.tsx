import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/atlas/Nav";
import { Hero } from "@/components/atlas/Hero";
import { TrustLayer } from "@/components/atlas/TrustLayer";
import { Problem } from "@/components/atlas/Problem";
import { Solution } from "@/components/atlas/Solution";
import { DigitalTwin } from "@/components/atlas/DigitalTwin";
import { AgentEconomy } from "@/components/atlas/AgentEconomy";
import { Constitution } from "@/components/atlas/Constitution";
import { Dashboard } from "@/components/atlas/Dashboard";
import { Vision } from "@/components/atlas/Vision";
import { SiteFooter } from "@/components/atlas/SiteFooter";

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

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <TrustLayer />
      <Problem />
      <Solution />
      <DigitalTwin />
      <AgentEconomy />
      <Constitution />
      <Dashboard />
      <Vision />
      <SiteFooter />
    </main>
  );
}
