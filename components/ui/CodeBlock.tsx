"use client";

import { useState } from "react";
import { Ico } from "@/components/icons";

export interface CodeBlockProps {
  code: string;
  language?: "html" | "js" | "css";
  title?: string;
  highlights?: number[];
}

export function CodeBlock({ code, language = "js", title, highlights = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  return (
    <div style={{
      background: "var(--bg-inset)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-sm)",
      overflow: "hidden",
      fontFamily: "var(--font-mono)",
      fontSize: 12.5,
      lineHeight: 1.7,
    }}>
      {title && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-raised)",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}>
          <span>{title}</span>
          <button
            type="button"
            onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
            style={{ color: "var(--text-dim)", display: "flex", gap: 4, alignItems: "center", fontSize: 11, background: "none", border: "none", cursor: "pointer" }}
          >
            <Ico name={copied ? "check" : "copy"} size={12} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre style={{ margin: 0, padding: "12px 0", overflowX: "auto" }}>
        {lines.map((line, i) => {
          const isHi = highlights.includes(i + 1);
          return (
            <div key={i} style={{
              display: "flex",
              background: isHi ? "rgba(248, 113, 113, 0.08)" : "transparent",
              borderLeft: isHi ? "2px solid var(--phishing)" : "2px solid transparent",
              padding: "0 14px 0 12px",
            }}>
              <span style={{ width: 28, color: "var(--text-dim)", userSelect: "none", textAlign: "right", marginRight: 14, opacity: 0.7 }}>{i + 1}</span>
              <span style={{ color: isHi ? "var(--text)" : "var(--text-muted)", whiteSpace: "pre" }}>{line}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
