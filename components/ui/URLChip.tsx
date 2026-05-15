"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Ico } from "@/components/icons";

export interface URLChipProps {
  url: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  style?: CSSProperties;
}

export function URLChip({ url, leading, trailing, style }: URLChipProps) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px 6px 12px",
        background: "var(--bg-inset)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-sm)",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--text)",
        maxWidth: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {leading}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{url}</span>
      {trailing ?? (
        <button
          type="button"
          onClick={() => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
          style={{ color: "var(--text-dim)", display: "flex", padding: 2, background: "none", border: "none", cursor: "pointer" }}
          title="Copy URL"
        >
          <Ico name={copied ? "check" : "copy"} size={13} />
        </button>
      )}
    </div>
  );
}
