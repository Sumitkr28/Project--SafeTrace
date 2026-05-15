"use client";

import { useMemo } from "react";

export interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 36 }: ParticlesProps) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 8 + Math.random() * 14,
    delay: -Math.random() * 14,
    opacity: 0.15 + Math.random() * 0.25,
    accent: i % 4 === 0,
  })), [count]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}>
      {particles.map((p, i) => (
        <span key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: p.accent ? "var(--accent)" : "var(--steel-300)",
          opacity: p.opacity,
          boxShadow: p.accent ? `0 0 ${p.size * 4}px var(--accent)` : "none",
          animation: `drift-particle ${p.duration}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}
