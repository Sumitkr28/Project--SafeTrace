"use client";

import { useState, type ReactNode } from "react";
import { Ico, type IconName } from "@/components/icons";
import type { SubScoreStatus } from "@/lib/types";

export interface EvidenceAccordionProps {
  icon: IconName;
  title: string;
  flags: string | number;
  status?: SubScoreStatus;
  defaultOpen?: boolean;
  children?: ReactNode;
}

const COLOR: Record<SubScoreStatus, string> = {
  ok: "var(--safe)",
  warn: "var(--suspicious)",
  bad: "var(--phishing)",
};

export function EvidenceAccordion({ icon, title, flags, status = "ok", defaultOpen = false, children }: EvidenceAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const c = COLOR[status];
  return (
    <div
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderLeft: `2px solid ${c}`,
        borderRadius: "var(--r-sm)",
        marginBottom: 8,
        overflow: "hidden",
        transition: "background 150ms ease",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 18px",
          textAlign: "left",
          color: "var(--text)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ color: c, display: "flex" }}>
          <Ico name={icon} size={18} />
        </div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div style={{
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          padding: "3px 9px",
          background: `${c}22`,
          color: c,
          border: `1px solid ${c}44`,
          borderRadius: 999,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontWeight: 600,
        }}>{flags}</div>
        <div style={{ color: "var(--text-dim)", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 200ms ease", display: "flex" }}>
          <Ico name="chevron-right" size={16} />
        </div>
      </button>
      <div style={{
        maxHeight: open ? 1000 : 0,
        overflow: "hidden",
        transition: "max-height 350ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div style={{ padding: "0 18px 18px 50px", color: "var(--text-muted)", fontSize: 13 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
