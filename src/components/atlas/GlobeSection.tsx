import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useLiveFeed, type CityId } from "@/lib/live-feed";
import { useSettings } from "@/lib/settings";
import { analytics } from "@/lib/analytics";

const cityOrder: CityId[] = ["nairobi", "singapore", "saopaulo", "newyork"];

function locationToAngles(lat: number, long: number): [number, number] {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

export function GlobeSection() {
  const { cities } = useLiveFeed();
  const { reducedMotion } = useSettings();
  const [selected, setSelected] = useState<CityId | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const focusRef = useRef<[number, number]>([0, 0]);
  const autoRotateRef = useRef(true);
  const targetScaleRef = useRef(1);
  const reducedRef = useRef(reducedMotion);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  // Update focus when selection changes.
  useEffect(() => {
    if (selected) {
      const [lat, lng] = cities[selected].location;
      focusRef.current = locationToAngles(lat, lng);
      autoRotateRef.current = false;
      targetScaleRef.current = 1.45;
    } else {
      autoRotateRef.current = true;
      targetScaleRef.current = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = canvas.offsetWidth || 480;
    let currentPhi = 0;
    let currentTheta = 0.2;
    let currentScale = 1;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      width = canvas.offsetWidth || width;
    };
    window.addEventListener("resize", onResize);

    const markers = cityOrder.map((id) => ({ location: cities[id].location, size: 0.07 }));

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.12, 0.16, 0.19],
      markerColor: [0, 0.76, 0.48],
      glowColor: [0.1, 0.3, 0.35],
      markers,
      onRender: (state) => {
        if (autoRotateRef.current) {
          currentPhi += reducedRef.current ? 0 : 0.0035;
          currentTheta = currentTheta * 0.95 + 0.2 * 0.05;
        } else {
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
          const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
          const ease = reducedRef.current ? 1 : 0.08;
          if (distPositive < distNegative) currentPhi += distPositive * ease;
          else currentPhi -= distNegative * ease;
          currentTheta = currentTheta * (1 - ease) + focusTheta * ease;
        }
        currentScale += (targetScaleRef.current - currentScale) * (reducedRef.current ? 1 : 0.08);
        state.phi = currentPhi;
        state.theta = currentTheta;
        state.scale = currentScale;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (id: CityId) => {
    const next = selected === id ? null : id;
    setSelected(next);
    if (next) analytics.track("globe_city_focus", { city: cities[id].name });
  };

  const active = selected ? cities[selected] : null;

  return (
    <section className="relative overflow-hidden bg-obsidian py-32" aria-labelledby="globe-heading">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="label-mono text-aurora">Planetary Digital Twin</p>
          <h2 id="globe-heading" className="mx-auto mt-6 max-w-3xl text-4xl font-bold sm:text-6xl">
            Simulate Civilization <span className="text-gradient-emerald">Before You Change It</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Select a city to focus the globe and reveal its live stewardship metrics.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_360px]">
          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -inset-6 rounded-full bg-emerald/10 blur-3xl" />
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Interactive globe of trust flows across the planet"
              className="relative aspect-square w-full"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Focus a city">
              {cityOrder.map((id) => (
                <button
                  key={id}
                  onClick={() => handleSelect(id)}
                  aria-pressed={selected === id}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    selected === id
                      ? "border-emerald bg-emerald/20 text-emerald"
                      : "border-border bg-card/40 text-muted-foreground hover:border-emerald/50"
                  }`}
                >
                  {cities[id].name}
                </button>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur"
            aria-live="polite"
          >
            {active ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{active.name}</h3>
                    <p className="text-sm text-muted-foreground">{active.country}</p>
                  </div>
                  <span className="flex items-center gap-2 label-mono text-emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" />
                    Live
                  </span>
                </div>
                <dl className="mt-6 space-y-4">
                  <Metric label="TrustScore index" value={active.trustScore.toFixed(1)} />
                  <Metric label="Trees verified" value={active.treesVerified.toLocaleString()} />
                  <Metric label="Carbon removed" value={`${active.carbonRemoved.toLocaleString()} t`} />
                  <Metric label="Active AI agents" value={active.activeAgents.toLocaleString()} />
                </dl>
              </>
            ) : (
              <div className="flex h-full min-h-48 flex-col items-center justify-center text-center text-muted-foreground">
                <p className="font-display text-lg text-foreground">Awaiting selection</p>
                <p className="mt-2 text-sm">
                  Choose Nairobi, Singapore, São Paulo, or New York to descend into real-time metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-mono text-lg text-aurora tabular-nums">{value}</dd>
    </div>
  );
}
