"use client";

import { useEffect, useState } from "react";
import { Ico, type IconName } from "@/components/icons";
import type { SubScoreStatus } from "@/lib/types";

export interface SubScoreRowProps {
  icon: IconName;
  label: string;
  score: number;
  max?: number;
  status?: SubScoreStatus;
  delay?: number;
}

const COLOR: Record<SubScoreStatus, string> = {
  ok: "var(--safe)",
  warn: "var(--suspicious)",
  bad: "var(--phishing)",
};

export function SubScoreRow({ icon, label, score, max = 25, status = "ok", delay = 0 }: SubScoreRowProps) {
  const c = COLOR[status];
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW((score / max) * 100), delay);
    return () => clearTimeout(t);
  }, [score, max, delay]);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "32px 1fr 60px 1fr",
      alignItems: "center",
      gap: 12,
      padding: "10px 14px",
      borderBottom: "1px solid var(--border-subtle)",
    }}>
      <div style={{ color: c, display: "flex", alignItems: "center" }}>
        <Ico name={icon} size={16} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: c, textAlign: "right", fontWeight: 600 }}>
        {score}<span style={{ color: "var(--text-dim)" }}>/{max}</span>
      </div>
      <div style={{ height: 6, background: "var(--bg-inset)", border: "1px solid var(--border)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          width: `${w}%`,
          height: "100%",
          background: c,
          boxShadow: `0 0 8px ${c}66`,
          transition: "width 800ms cubic-bezier(0.22, 1, 0.36, 1)",
        }} />
      </div>
    </div>
  );
}
