"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface SplashProps {
  onDone: () => void;
}

const STEPS = [
  "Bootstrapping threat engine",
  "Connecting ML inference node",
  "Syncing PhishTank · URLhaus · OpenPhish",
  "Ready",
];

export function Splash({ onDone }: SplashProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "gone">("in");
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("hold"),   60));
    timers.push(setTimeout(() => setStepIdx(1),      550));
    timers.push(setTimeout(() => setStepIdx(2),     1100));
    timers.push(setTimeout(() => setStepIdx(3),     1750));
    timers.push(setTimeout(() => setPhase("out"),   2200));
    timers.push(setTimeout(() => { setPhase("gone"); onDone(); }, 2700));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => { setPhase("out"); setTimeout(onDone, 480); };

  if (phase === "gone") return null;
  const visible = phase !== "out";

  return (
    <div
      onClick={skip}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "var(--bg-deep)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: visible ? 1 : 0,
        transition: "opacity 480ms cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
      }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            `linear-gradient(rgba(255,240,210,0.04) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,240,210,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 90%)",
        }} />
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 900, height: 900,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(103, 232, 249, 0.10) 0%, transparent 55%)",
        }} />
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 720, height: 720,
          transform: "translate(-50%, -50%)",
        }}>
          {[1, 0.7, 0.46].map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${s})`,
              borderRadius: "50%",
              border: "1px solid var(--border-subtle)",
              opacity: phase === "in" ? 0 : 1,
              transition: `opacity 700ms ease ${i * 120}ms`,
            }} />
          ))}
        </div>
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 720, height: 720,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, transparent 0deg, var(--accent-glow) 40deg, transparent 90deg)",
          animation: "radar-sweep 2.4s linear infinite",
          opacity: 0.7,
        }} />
        <div style={{
          position: "absolute", top: 0, bottom: 0, width: 2,
          background: "linear-gradient(180deg, transparent, var(--accent), transparent)",
          boxShadow: "0 0 16px var(--accent)",
          animation: "map-sweep 3s linear infinite",
          opacity: 0.45,
        }} />
      </div>

      <div style={{
        transform: phase === "in" ? "scale(0.86)" : "scale(1)",
        opacity: phase === "in" ? 0 : 1,
        transition: "all 700ms cubic-bezier(0.34, 1.36, 0.64, 1)",
        position: "relative", zIndex: 2,
      }}>
        <Logo size={88} />
      </div>

      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.22em",
        display: "flex", alignItems: "center", gap: 10,
        opacity: phase === "in" ? 0 : 1,
        transform: phase === "in" ? "translateY(8px)" : "translateY(0)",
        transition: "all 700ms ease 200ms",
        position: "relative", zIndex: 2,
        height: 18,
      }}>
        <span style={{
          width: 8, height: 8,
          borderRadius: "50%",
          background: stepIdx === 3 ? "var(--safe)" : "var(--accent)",
          boxShadow: `0 0 12px ${stepIdx === 3 ? "var(--safe)" : "var(--accent)"}`,
          animation: stepIdx === 3 ? "none" : "pulse 1s ease-in-out infinite",
          transition: "all 300ms",
        }} />
        <span key={stepIdx} style={{ animation: "fade-up 350ms ease-out" }}>
          {STEPS[stepIdx]}{stepIdx < 3 && "…"}
        </span>
      </div>

      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: "var(--text-dim)",
        opacity: phase === "in" ? 0 : 0.7,
        transition: "opacity 600ms ease 300ms",
        textAlign: "center",
        lineHeight: 1.7,
        position: "relative", zIndex: 2,
        letterSpacing: "0.04em",
      }}>
        <div>xgb-v2.3 · 112 features · 5-fold CV 97.4%</div>
        <div>chromium headless · pHash ready · 4 intel feeds</div>
      </div>

      <div style={{
        width: 280, height: 2,
        background: "var(--bg-inset)",
        borderRadius: 999,
        overflow: "hidden",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          height: "100%",
          width: phase === "in" ? "0%" : `${((stepIdx + 1) / STEPS.length) * 100}%`,
          background: "linear-gradient(90deg, var(--accent-solid), var(--accent-bright))",
          boxShadow: "0 0 12px var(--accent)",
          transition: "width 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        }} />
      </div>

      <div style={{
        position: "absolute",
        bottom: 32,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: "var(--text-dim)",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity: phase === "in" ? 0 : 0.6,
        transition: "opacity 600ms ease 600ms",
        zIndex: 2,
        userSelect: "none",
      }}>
        Click anywhere to skip
      </div>

      {[
        { t: 28, l: 28 },
        { t: 28, r: 28 },
        { b: 28, l: 28 },
        { b: 28, r: 28 },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          top: p.t, left: p.l, bottom: p.b, right: p.r,
          width: 28, height: 28,
          borderTop:    p.t !== undefined ? "1px solid var(--accent)" : "none",
          borderBottom: p.b !== undefined ? "1px solid var(--accent)" : "none",
          borderLeft:   p.l !== undefined ? "1px solid var(--accent)" : "none",
          borderRight:  p.r !== undefined ? "1px solid var(--accent)" : "none",
          opacity: phase === "in" ? 0 : 0.65,
          transform: phase === "in" ? "scale(0.8)" : "scale(1)",
          transition: `all 500ms ease ${300 + i * 80}ms`,
          zIndex: 2,
          pointerEvents: "none",
        }} />
      ))}
    </div>
  );
}
