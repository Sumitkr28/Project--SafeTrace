"use client";

import { Card } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { URLChip } from "@/components/ui/URLChip";
import { AiMeshBackground } from "./AiMeshBackground";

export const SCAN_STEPS = ["URL parsed", "ML model", "Fetching page", "Screenshot", "Verdict"] as const;

interface LogEntry { s: number; t: string; d: string; }
const LOG: LogEntry[] = [
  { s: 0, t: "URL parsed",          d: "validating scheme + host" },
  { s: 0, t: "DNS resolve",         d: "resolving authoritative records" },
  { s: 1, t: "ML extract features", d: "lexical + structural features" },
  { s: 1, t: "ML inference",        d: "stacking ensemble running" },
  { s: 2, t: "HTTP fetch",          d: "fetching HTML + scripts" },
  { s: 2, t: "Parse DOM",           d: "scanning forms, iframes, redirects" },
  { s: 3, t: "Headless screenshot", d: "rendering in Chromium" },
  { s: 3, t: "Threat intel",        d: "checking GSB + URLhaus" },
  { s: 4, t: "Aggregate verdict",   d: "blending all signals" },
];

export interface ScanProgressProps {
  url: string;
  step: number;
}

export function ScanProgress({ url, step }: ScanProgressProps) {
  return (
    <div style={{
      position: "relative",
      minHeight: "calc(100vh - 220px)",
      animation: "fade-up 400ms ease-out",
      overflow: "hidden",
    }}>
      <AiMeshBackground scanning />

      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 920,
        margin: "0 auto",
        padding: "60px 24px 40px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>
            Scanning in progress
          </div>
          <URLChip url={url} style={{ maxWidth: 560 }} />
        </div>

        <Card padding={32}>
          <Stepper steps={[...SCAN_STEPS]} current={step} />

          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", fontWeight: 600, marginBottom: 12, fontFamily: "var(--font-mono)" }}>Pipeline log</div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                background: "var(--bg-inset)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
                padding: 14,
                minHeight: 200,
                color: "var(--text-muted)",
              }}>
                {LOG.map((l, i) => {
                  if (l.s > step) return null;
                  const isLatest = l.s === step;
                  return (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "16px 1fr",
                      gap: 8,
                      padding: "3px 0",
                      animation: "fade-up 300ms ease-out",
                      opacity: isLatest ? 1 : 0.65,
                    }}>
                      <span style={{ color: "var(--accent)" }}>{l.s < step ? "✓" : isLatest ? <span style={{ animation: "blink 0.8s infinite" }}>›</span> : "·"}</span>
                      <div>
                        <span style={{ color: "var(--text)" }}>{l.t}</span>
                        <span style={{ color: "var(--text-dim)" }}> — {l.d}</span>
                      </div>
                    </div>
                  );
                })}
                {step < SCAN_STEPS.length && (
                  <div style={{ marginTop: 6, color: "var(--accent)", animation: "blink 0.8s infinite" }}>▍</div>
                )}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", fontWeight: 600, marginBottom: 12, fontFamily: "var(--font-mono)" }}>Capturing</div>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  borderRadius: "var(--r-sm)",
                  overflow: "hidden",
                  border: "1px solid var(--border-strong)",
                  background: "#0a0a0a",
                  position: "relative",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}>
                  <div style={{
                    height: 16, background: "var(--bg-raised-2)", display: "flex", alignItems: "center", padding: "0 8px", gap: 4,
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fbbf24" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
                  </div>
                  <div style={{
                    position: "absolute", inset: "16px 0 0 0",
                    overflow: "hidden",
                  }}>
                    <svg viewBox="0 0 300 220" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                      <defs>
                        <radialGradient id="radarFade" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
                          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.04" />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="radarBeam" x1="50%" y1="50%" x2="100%" y2="50%">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <g stroke="var(--border)" strokeWidth="0.4" opacity="0.5">
                        {Array.from({ length: 11 }).map((_, i) => (
                          <line key={`vg${i}`} x1={i * 30} y1="0" x2={i * 30} y2="220" />
                        ))}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <line key={`hg${i}`} x1="0" y1={i * 30} x2="300" y2={i * 30} />
                        ))}
                      </g>
                      <circle cx="150" cy="110" r="100" fill="url(#radarFade)" />
                      <g fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="0.6">
                        <circle cx="150" cy="110" r="30" />
                        <circle cx="150" cy="110" r="60" />
                        <circle cx="150" cy="110" r="90" />
                      </g>
                      <g style={{ transformOrigin: "150px 110px", animation: "spin 4.5s linear infinite" }}>
                        <path d="M 150 110 L 250 110 A 100 100 0 0 0 220 40 Z" fill="url(#radarBeam)" />
                      </g>
                      {[
                        { cx: 92, cy: 70, delay: 0 },
                        { cx: 195, cy: 95, delay: 0.4 },
                        { cx: 135, cy: 160, delay: 0.8 },
                        { cx: 215, cy: 150, delay: 1.2 },
                        { cx: 65, cy: 135, delay: 1.6 },
                      ].map((p, i) => (
                        <g key={i}>
                          <circle cx={p.cx} cy={p.cy} r="2.4" fill="var(--accent)" style={{ animation: `pulse 2s ease-out ${p.delay}s infinite` }} />
                          <circle cx={p.cx} cy={p.cy} r="8" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" style={{ transformOrigin: `${p.cx}px ${p.cy}px`, animation: `ping 2s ease-out ${p.delay}s infinite` }} />
                        </g>
                      ))}
                      <circle cx="150" cy="110" r="3" fill="var(--accent)" />
                      <circle cx="150" cy="110" r="6" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
                    </svg>
                    <div style={{
                      position: "absolute",
                      bottom: 12, left: 0, right: 0,
                      textAlign: "center",
                      fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)",
                      textTransform: "uppercase", letterSpacing: "0.22em",
                      animation: "blink 1.4s ease-in-out infinite",
                    }}>
                      {step < 1 ? "INITIATING SCAN" : step < 2 ? "FEATURE EXTRACTION" : step < 3 ? "RENDERING PAGE" : step < 4 ? "ANALYZING CONTENT" : "FINALIZING VERDICT"}
                    </div>
                    <div style={{
                      position: "absolute",
                      top: 10, left: 10,
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      color: "var(--text-dim)", letterSpacing: "0.16em",
                    }}>
                      DEEP ANALYZER
                    </div>
                    <div style={{
                      position: "absolute",
                      top: 10, right: 10,
                      display: "flex", alignItems: "center", gap: 5,
                      fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)",
                      letterSpacing: "0.16em",
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)", animation: "pulse 1.2s infinite" }} />
                      LIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
