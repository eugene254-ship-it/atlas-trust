import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSettings } from "./settings";

export type CityId = "nairobi" | "singapore" | "saopaulo" | "newyork";

export interface CityData {
  id: CityId;
  name: string;
  country: string;
  location: [number, number]; // [lat, lng]
  trustScore: number;
  treesVerified: number;
  carbonRemoved: number; // tons
  activeAgents: number;
}

export interface FeedEvent {
  id: number;
  kind: "verification" | "transaction" | "evidence";
  label: string;
  city: string;
  value: string;
}

export interface GlobalMetrics {
  forestsRestored: number;
  carbonVerified: number;
  communitiesFunded: number;
  trustTransactions: number;
  activeAgents: number;
  sovereignPartners: number;
}

interface FeedState {
  metrics: GlobalMetrics;
  cities: Record<CityId, CityData>;
  events: FeedEvent[];
  trustScoreIndex: number;
  evidenceVerified: number;
}

const initialCities: Record<CityId, CityData> = {
  nairobi: {
    id: "nairobi",
    name: "Nairobi",
    country: "Kenya",
    location: [-1.2921, 36.8219],
    trustScore: 91.2,
    treesVerified: 1_204_338,
    carbonRemoved: 84_120,
    activeAgents: 4_812,
  },
  singapore: {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    location: [1.3521, 103.8198],
    trustScore: 98.4,
    treesVerified: 412_900,
    carbonRemoved: 156_240,
    activeAgents: 22_410,
  },
  saopaulo: {
    id: "saopaulo",
    name: "São Paulo",
    country: "Brazil",
    location: [-23.5505, -46.6333],
    trustScore: 88.7,
    treesVerified: 2_984_512,
    carbonRemoved: 420_870,
    activeAgents: 9_204,
  },
  newyork: {
    id: "newyork",
    name: "New York",
    country: "United States",
    location: [40.7128, -74.006],
    trustScore: 94.1,
    treesVerified: 318_220,
    carbonRemoved: 211_540,
    activeAgents: 31_827,
  },
};

const verificationLabels = ["Reforestation claim", "Water restoration", "Carbon credit", "Solar deployment", "Soil regeneration"];
const evidenceLabels = ["Satellite scan", "IoT sensor batch", "Community validator", "Drone survey", "Ground audit"];
const cityNames = ["Nairobi", "Singapore", "São Paulo", "New York", "Lagos", "Jakarta", "Bogotá", "Mumbai"];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FeedContext = createContext<FeedState | null>(null);

export function LiveFeedProvider({ children }: { children: ReactNode }) {
  const { reducedMotion } = useSettings();
  const eventId = useRef(0);
  const [state, setState] = useState<FeedState>({
    metrics: {
      forestsRestored: 48_213,
      carbonVerified: 1_284_910,
      communitiesFunded: 9_472,
      trustTransactions: 31_827_445,
      activeAgents: 204_918,
      sovereignPartners: 64,
    },
    cities: initialCities,
    events: [],
    trustScoreIndex: 93.6,
    evidenceVerified: 5_120_884,
  });

  useEffect(() => {
    // Slower cadence under reduced motion, but the feed never fully stops.
    const interval = reducedMotion ? 3200 : 1400;
    const id = setInterval(() => {
      setState((prev) => {
        const kind = rand(["verification", "transaction", "evidence"] as const);
        const city = rand(cityNames);
        const newEvent: FeedEvent = {
          id: eventId.current++,
          kind,
          city,
          label:
            kind === "evidence"
              ? rand(evidenceLabels)
              : kind === "transaction"
                ? "TrustScore settlement"
                : rand(verificationLabels),
          value:
            kind === "transaction"
              ? `+${(Math.random() * 9 + 1).toFixed(1)}k TSX`
              : kind === "evidence"
                ? `${Math.floor(Math.random() * 900 + 100)} points`
                : "verified",
        };

        const cityIds = Object.keys(prev.cities) as CityId[];
        const tickCity = rand(cityIds);
        const cities = {
          ...prev.cities,
          [tickCity]: {
            ...prev.cities[tickCity],
            treesVerified: prev.cities[tickCity].treesVerified + Math.floor(Math.random() * 40),
            carbonRemoved: prev.cities[tickCity].carbonRemoved + Math.floor(Math.random() * 12),
            activeAgents: prev.cities[tickCity].activeAgents + Math.floor(Math.random() * 4),
            trustScore: Math.min(
              99.9,
              Math.max(80, prev.cities[tickCity].trustScore + (Math.random() - 0.45) * 0.2),
            ),
          },
        };

        return {
          ...prev,
          cities,
          events: [newEvent, ...prev.events].slice(0, 30),
          trustScoreIndex: Math.min(99.9, Math.max(85, prev.trustScoreIndex + (Math.random() - 0.48) * 0.15)),
          evidenceVerified: prev.evidenceVerified + Math.floor(Math.random() * 60 + 5),
          metrics: {
            forestsRestored: prev.metrics.forestsRestored + Math.floor(Math.random() * 4),
            carbonVerified: prev.metrics.carbonVerified + Math.floor(Math.random() * 55 + 5),
            communitiesFunded: prev.metrics.communitiesFunded + (Math.random() > 0.7 ? 1 : 0),
            trustTransactions: prev.metrics.trustTransactions + Math.floor(Math.random() * 180 + 20),
            activeAgents: prev.metrics.activeAgents + Math.floor(Math.random() * 9),
            sovereignPartners: prev.metrics.sovereignPartners + (Math.random() > 0.985 ? 1 : 0),
          },
        };
      });
    }, interval);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return <FeedContext.Provider value={state}>{children}</FeedContext.Provider>;
}

export function useLiveFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useLiveFeed must be used within LiveFeedProvider");
  return ctx;
}
