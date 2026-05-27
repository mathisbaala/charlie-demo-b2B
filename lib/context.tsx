"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

type Accent = "terra" | "brique" | "bronze";
type Density = "comfy" | "compact";

interface TweaksCtx {
  accent: Accent;
  density: Density;
  setAccent: (a: Accent) => void;
  setDensity: (d: Density) => void;
}

const Ctx = createContext<TweaksCtx>({
  accent: "terra",
  density: "comfy",
  setAccent: () => {},
  setDensity: () => {},
});

const ACCENT_VARS: Record<Accent, Record<string, string>> = {
  terra: {
    "--accent": "oklch(0.62 0.13 45)",
    "--accent-soft": "oklch(0.93 0.05 50)",
    "--accent-ink": "oklch(0.42 0.13 40)",
    "--accent-tint": "oklch(0.97 0.02 55)",
  },
  brique: {
    "--accent": "oklch(0.58 0.16 30)",
    "--accent-soft": "oklch(0.93 0.05 35)",
    "--accent-ink": "oklch(0.40 0.16 28)",
    "--accent-tint": "oklch(0.97 0.02 40)",
  },
  bronze: {
    "--accent": "oklch(0.64 0.10 65)",
    "--accent-soft": "oklch(0.93 0.04 70)",
    "--accent-ink": "oklch(0.44 0.10 60)",
    "--accent-tint": "oklch(0.97 0.02 70)",
  },
};

export function TweaksProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("terra");
  const [density, setDensityState] = useState<Density>("comfy");

  const setAccent = (a: Accent) => {
    setAccentState(a);
    const vars = ACCENT_VARS[a];
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
  };

  const setDensity = (d: Density) => {
    setDensityState(d);
    document.documentElement.setAttribute("data-density", d);
  };

  return <Ctx.Provider value={{ accent, density, setAccent, setDensity }}>{children}</Ctx.Provider>;
}

export const useTweaks = () => useContext(Ctx);
