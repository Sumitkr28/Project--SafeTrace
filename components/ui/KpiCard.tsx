"use client";

import { useEffect, useState } from "react";
import { Ico, type IconName } from "@/components/icons";
import { Card } from "./Card";

export interface KpiCardProps {
  label: string;
  value: number | string;
  sub?: string;
  trend?: number;
  color?: string;
  icon?: IconName;
  animate?: boolean;
}

export function KpiCard({ label, value, sub, trend, color = "var(--text)", icon, animate = true }: KpiCardProps) {
  const [display, setDisplay] = useState<number | string>(animate ? 0 : value);

  useEffect(() => {
    if (!animate || typeof value !== "number") { setDisplay(value); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round((value as number) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);

  return (
    <Card padding={20} style={{ display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</span>
        {icon && <div style={{ color, opacity: 0.7 }}><Ico name={icon} size={16} /></div>}
      </div>
      <div style={{
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color,
        fontFamily: "var(--font-mono)",
        fontFeatureSettings: "'tnum'",
        lineHeight: 1.1,
      }}>
        {typeof display === "number" ? display.toLocaleString() : display}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-dim)" }}>
        {trend !== undefined && (
          <span style={{ color: trend > 0 ? "var(--safe)" : "var(--phishing)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
            {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
        {sub && <span>{sub}</span>}
      </div>
    </Card>
  );
}
