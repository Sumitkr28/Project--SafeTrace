"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface RiskScoreBarProps {
  score: number;
  max?: number;
  color?: string;
  label?: string;
  sub?: ReactNode;
  delay?: number;
}

export function RiskScoreBar({ score, max = 100, color, label, sub, delay = 0 }: RiskScoreBarProps) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFilled(score), delay);
    return () => clearTimeout(t);
  }, [score, delay]);
  const pct = (filled / max) * 100;
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
          <span style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 11, fontWeight: 600 }}>{label}</span>
          <span style={{ fontFamily: "var(--font-mono)", color: color || "var(--text)", fontWeight: 600 }}>
            {Math.round(filled)}<span style={{ color: "var(--text-dim)" }}>/{max}</span>
          </span>
        </div>
      )}
      <div
        style={{
          height: 10,
          background: "var(--bg-inset)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          overflow: "hidden",
          position: "relative",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color
              ? `linear-gradient(90deg, ${color}88, ${color})`
              : "linear-gradient(90deg, var(--accent-solid), var(--accent-bright))",
            borderRadius: 999,
            transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: color ? `0 0 12px ${color}66` : "0 0 12px var(--accent-glow)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.4s linear infinite",
            }}
          />
        </div>
      </div>
      {sub && <div style={{ marginTop: 6, fontSize: 12, color: "var(--text-dim)" }}>{sub}</div>}
    </div>
  );
}
