"use client";

import { useEffect, useRef } from "react";
import { Ico } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { AiMeshBackground } from "./AiMeshBackground";

export interface ScanEmptyProps {
  urlValue: string;
  setUrlValue: (s: string) => void;
  onScan: (url: string) => void;
}

const EXAMPLES = [
  { url: "paypal.com",         expected: "safe"     },
  { url: "sbi.co.in",          expected: "safe"     },
  { url: "paypa1-verify.tk",   expected: "phishing" },
];

export function ScanEmpty({ urlValue, setUrlValue, onScan }: ScanEmptyProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{
      position: "relative",
      minHeight: "calc(100vh - 220px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      animation: "fade-up 500ms ease-out",
      overflow: "hidden",
    }}>
      <AiMeshBackground />

      <div style={{ position: "relative", textAlign: "center", maxWidth: 760, width: "100%", zIndex: 2 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "6px 14px 6px 8px",
          background: "var(--bg-raised)",
          border: "1px solid var(--border-strong)",
          borderRadius: 999,
          fontSize: 11,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          fontFamily: "var(--font-mono)",
          marginBottom: 28,
          boxShadow: "0 0 24px rgba(103, 232, 249, 0.15)",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "3px 8px",
            background: "var(--accent-glow)",
            color: "var(--accent-bright)",
            borderRadius: 999,
            fontWeight: 600,
          }}>
            <Ico name="cpu" size={11} stroke={2.2} />
            AI
          </span>
          <span>ML model + deep site analysis online</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--safe)", boxShadow: "0 0 8px var(--safe)", animation: "pulse 1.6s infinite" }} />
        </div>

        <h1 style={{
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1.02,
          marginBottom: 18,
          margin: 0,
        }}>
          <span style={{
            background: "linear-gradient(180deg, var(--text), var(--steel-400))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>AI-Powered</span>
          <br/>
          <span style={{
            background: "linear-gradient(135deg, var(--accent-bright) 10%, var(--accent) 50%, var(--text) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>URL Threat Detection</span>
        </h1>
        <p style={{
          fontSize: 17,
          color: "var(--text-muted)",
          maxWidth: 560,
          margin: "18px auto 36px",
          lineHeight: 1.55,
        }}>
          Paste a URL. Our ML classifier and deep site forensic analyzer cross-check it in under five seconds — <em style={{ color: "var(--text)", fontStyle: "normal" }}>both</em> must clear it before we call it safe.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); if (urlValue.trim()) onScan(urlValue.trim()); }}
          style={{
            display: "flex", gap: 8, alignItems: "stretch",
            padding: 6,
            background: "var(--bg-raised)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--r-lg)",
            boxShadow: "var(--shadow-lg), 0 0 40px rgba(103, 232, 249, 0.12)",
            maxWidth: 640,
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            flex: 1,
            padding: "0 16px",
            background: "var(--bg-inset)",
            borderRadius: "var(--r-md)",
            border: "1px solid var(--border)",
          }}>
            <Ico name="globe" size={18} style={{ color: "var(--text-dim)" }} />
            <input
              ref={inputRef}
              type="text"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              placeholder="https://example.com or paypa1-verify.tk"
              style={{
                flex: 1,
                height: 52,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                letterSpacing: "-0.005em",
              }}
            />
            <span className="kbd" style={{ fontSize: 11 }}>/</span>
          </div>
          <Button variant="accent" size="lg" icon="radar" type="submit" style={{ height: "auto" }}>
            Scan
          </Button>
        </form>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "var(--text-dim)", display: "flex", alignItems: "center", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)" }}>Try →</span>
          {EXAMPLES.map(ex => (
            <button
              type="button"
              key={ex.url}
              onClick={() => { setUrlValue(ex.url); onScan(ex.url); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 12px",
                background: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: 999,
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: 12.5,
                transition: "all 150ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              {ex.url}
              <span style={{ color: ex.expected === "safe" ? "var(--safe)" : "var(--phishing)", fontSize: 8 }}>●</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[
            { val: "1.2M+", label: "URLs scanned" },
            { val: "97.4%", label: "Model accuracy" },
            { val: "~3.8s", label: "Avg. response" },
            { val: "0",     label: "False-negative phish today" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
