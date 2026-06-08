import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/lib/settings";

interface ToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function Toggle({ id, label, description, checked, onChange }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary/60"
    >
      <span
        className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${
          checked ? "border-emerald bg-emerald/40" : "border-border bg-secondary"
        }`}
      >
        <span
          className={`h-3.5 w-3.5 rounded-full bg-foreground transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
    </button>
  );
}

export function AccessibilityControls() {
  const { reducedMotion, highContrast, largeText, toggle } = useSettings();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility settings"
          className="mb-3 w-72 rounded-xl border border-border bg-popover/95 p-3 shadow-2xl backdrop-blur-xl"
        >
          <p className="label-mono px-2 pb-2 text-emerald">Accessibility</p>
          <Toggle
            id="a11y-motion"
            label="Reduced motion"
            description="Calm the animations and cursor-lit pathways"
            checked={reducedMotion}
            onChange={() => toggle("reducedMotion")}
          />
          <Toggle
            id="a11y-contrast"
            label="High contrast"
            description="Boost readability of text and edges"
            checked={highContrast}
            onChange={() => toggle("highContrast")}
          />
          <Toggle
            id="a11y-text"
            label="Larger text"
            description="Increase the base font size"
            checked={largeText}
            onChange={() => toggle("largeText")}
          />
        </div>
      )}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Accessibility settings"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald/50 bg-card/90 text-emerald shadow-lg backdrop-blur transition-transform hover:scale-105"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="4" r="1.6" fill="currentColor" stroke="none" />
          <path d="M4 7h16M9 21l3-7 3 7M12 7v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
