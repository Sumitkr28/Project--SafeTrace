"use client";

import { Fragment } from "react";
import { Ico } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { EvidenceAccordion } from "@/components/ui/EvidenceAccordion";
import { RiskScoreBar } from "@/components/ui/RiskScoreBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SubScoreRow } from "@/components/ui/SubScoreRow";
import { VerdictChip } from "@/components/ui/VerdictChip";
import { useToast } from "@/hooks/useToast";
import { VERDICTS, type EvidenceItem, type ScanResult } from "@/lib/types";
import { generateScanPdf } from "@/lib/generatePdf";
import { ScreenshotMock } from "./ScreenshotMock";

export interface ScanResultProps {
  result: ScanResult;
  onAgain: () => void;
}

const HIGHLIGHT_REGEX = /(`[^`]+`|\bevil-collector\.tk|paypa1-verify-account\.tk|fp_setup\.exe|185\.243\.218\.94)/;

function EvidenceList({ items, fallback }: { items: EvidenceItem[]; fallback: string }) {
  if (!items?.length) {
    return <div style={{ color: "var(--text-dim)", fontStyle: "italic", padding: "8px 0" }}>{fallback}</div>;
  }
  const colors = { ok: "var(--safe)", warn: "var(--suspicious)", bad: "var(--phishing)" } as const;
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((it, i) => (
        <li key={i} style={{
          display: "grid", gridTemplateColumns: "16px 1fr", gap: 10,
          padding: "4px 0",
          animation: `fade-up 300ms ease-out ${i * 60}ms backwards`,
        }}>
          <span style={{ color: colors[it.type], marginTop: 4, fontSize: 9 }}>●</span>
          <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>
            {it.text.split(HIGHLIGHT_REGEX).map((p, j) => {
              if (p.startsWith("`")) {
                return <code key={j} style={{ fontFamily: "var(--font-mono)", background: "var(--bg-inset)", padding: "1px 5px", borderRadius: 3, fontSize: 12 }}>{p.slice(1, -1)}</code>;
              }
              if (/evil-collector|paypa1-verify|fp_setup|185\.243/.test(p)) {
                return <code key={j} style={{ fontFamily: "var(--font-mono)", color: "var(--phishing)", background: "var(--phishing-bg)", padding: "1px 5px", borderRadius: 3, fontSize: 12 }}>{p}</code>;
              }
              return <Fragment key={j}>{p}</Fragment>;
            })}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ScanResultView({ result: d, onAgain }: ScanResultProps) {
  const v = VERDICTS[d.verdict];
  const isBad = d.verdict !== "safe";
  const toast = useToast();

  return (
    <div style={{
      maxWidth: 1240,
      margin: "0 auto",
      padding: "32px 24px 64px",
      animation: "fade-up 400ms ease-out",
    }}>
      {isBad && (
        <div style={{
          position: "fixed",
          top: 64, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`,
          boxShadow: `0 0 16px ${v.color}`,
          zIndex: 5,
        }} />
      )}

      <Card padding={0} style={{ marginBottom: 20, overflow: "hidden", position: "relative" }}>
        <div style={{
          padding: "28px 32px",
          background: `linear-gradient(135deg, ${v.bg} 0%, transparent 60%)`,
          borderBottom: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 28,
          alignItems: "center",
        }}>
          <VerdictChip verdict={d.verdict} size="lg" />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "var(--font-mono)" }}>Target</span>
              {!isBad && <span style={{ color: "var(--safe)" }}><Ico name="lock" size={11} /></span>}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 17,
              color: "var(--text)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: 8,
            }}>
              {d.url}
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 12, color: "var(--text-dim)", flexWrap: "wrap" }}>
              <span>Final domain: <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{d.domain}</span></span>
              <span>Resolved: <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{d.ip}</span></span>
              <span>Scanned <span style={{ color: "var(--text-muted)" }}>just now</span></span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", marginBottom: 4 }}>Confidence</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, color: v.color, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {d.confidence}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>%</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 0 }}>
          <div style={{ padding: "24px 32px", borderRight: "1px solid var(--border)" }}>
            <div style={{ marginBottom: 24 }}>
              <RiskScoreBar
                score={d.riskScore}
                color={v.color}
                label="Aggregate risk score"
                sub={`${d.riskScore}/100 — ${isBad ? "above threshold" : "well below threshold"} (50)`}
              />
            </div>

            <div style={{
              background: "var(--bg-inset)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
              overflow: "hidden",
              marginBottom: 24,
            }}>
              <div style={{ padding: "10px 14px", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, borderBottom: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}>
                Sub-scores (deep analyzer)
              </div>
              {d.subscores.map((s, i) => (
                <SubScoreRow key={s.label} icon={s.icon} label={s.label} score={s.score} status={s.status} delay={i * 100} />
              ))}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Ico name="cpu" size={14} style={{ color: "var(--accent)" }} />
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>ML model verdict (XGBoost · 112 features)</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {d.shap.map((s, i) => {
                  const isRisk = s.dir === "risk";
                  const w = Math.abs(s.weight);
                  return (
                    <div key={s.feature} style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 60px 1fr",
                      alignItems: "center",
                      gap: 12,
                      padding: "6px 0",
                      animation: `fade-up 400ms ease-out ${i * 80}ms backwards`,
                    }}>
                      <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                        {isRisk && <div style={{ height: 16, width: `${w * 100}%`, background: "linear-gradient(90deg, transparent, var(--phishing))", borderRadius: "2px 0 0 2px", maxWidth: "100%" }} />}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textAlign: "center", color: isRisk ? "var(--phishing)" : "var(--safe)", fontWeight: 600 }}>
                        {isRisk ? "−" : "+"}{w.toFixed(2)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {!isRisk && <div style={{ height: 16, width: `${w * 100}%`, background: "linear-gradient(90deg, var(--safe), transparent)", borderRadius: "0 2px 2px 0", maxWidth: "100%" }} />}
                        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.feature}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)", marginBottom: 10 }}>Live screenshot</div>
              <ScreenshotMock src={d.screenshotUrl} bboxes={isBad} />
            </div>
            <div style={{
              padding: 14,
              background: d.brand.imposter ? "var(--phishing-bg)" : "var(--bg-inset)",
              border: `1px solid ${d.brand.imposter ? "var(--phishing-border)" : "var(--border)"}`,
              borderRadius: "var(--r-sm)",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}>
              <div style={{
                width: 36, height: 36,
                borderRadius: 6,
                background: d.brand.imposter ? "var(--phishing)" : "var(--steel-700)",
                color: d.brand.imposter ? "#fff" : "var(--text)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 12,
                flexShrink: 0,
              }}>{d.brand.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 4 }}>
                  Brand match: <span style={{ color: d.brand.imposter ? "var(--phishing)" : "var(--text)", fontFamily: "var(--font-mono)" }}>{d.brand.name} ({d.brand.match}%)</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
                  {d.brand.imposter
                    ? "Logo pHash matches a known brand but domain does not. This is the textbook impersonation pattern."
                    : "Logo pHash matches official assets. Domain WHOIS aligns with the brand owner. No impersonation detected."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card padding={24} style={{ marginBottom: 20 }}>
        <SectionHeader
          eyebrow="Forensic evidence"
          title="What we actually saw on the page"
          sub="Each section is independently sourced. Click to expand."
          right={<div style={{ display: "flex", gap: 8, fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, background: "var(--safe)", borderRadius: 2 }} /> clean</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, background: "var(--suspicious)", borderRadius: 2 }} /> warn</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 6, height: 6, background: "var(--phishing)", borderRadius: 2 }} /> bad</span>
          </div>}
        />

        <EvidenceAccordion
          icon="globe"
          title="Network & Identity"
          flags={d.evidence.network.flags === 0 ? "0 flags" : `${d.evidence.network.flags} flags`}
          status={d.evidence.network.flags === 0 ? "ok" : "bad"}
          defaultOpen={d.evidence.network.flags > 0}
        >
          <EvidenceList items={d.evidence.network.items} fallback="DNS, WHOIS and TLS look ordinary. No red flags." />
        </EvidenceAccordion>

        <EvidenceAccordion
          icon="file-code"
          title="HTML inspection"
          flags={d.evidence.html.flags === 0 ? "0 flags" : `${d.evidence.html.flags} flags`}
          status={d.evidence.html.flags === 0 ? "ok" : "bad"}
          defaultOpen={d.evidence.html.flags > 0}
        >
          <EvidenceList items={d.evidence.html.items} fallback="Page structure matches what we'd expect for this kind of site." />
          {d.evidence.html.flags > 0 && d.codeSnippets?.[0] && (
            <div style={{ marginTop: 12 }}>
              <CodeBlock {...d.codeSnippets[0]} />
            </div>
          )}
        </EvidenceAccordion>

        <EvidenceAccordion
          icon="braces"
          title="JavaScript inspection"
          flags={d.evidence.js.flags === 0 ? "0 flags" : `${d.evidence.js.flags} flags`}
          status={d.evidence.js.flags === 0 ? "ok" : "bad"}
          defaultOpen={d.evidence.js.flags > 0}
        >
          <EvidenceList items={d.evidence.js.items} fallback="All scripts load from the primary domain, no eval/unescape patterns detected." />
          {d.evidence.js.flags > 0 && d.codeSnippets?.[1] && (
            <div style={{ marginTop: 12 }}>
              <CodeBlock {...d.codeSnippets[1]} />
            </div>
          )}
        </EvidenceAccordion>

        <EvidenceAccordion
          icon="image"
          title="Visual analysis"
          flags={d.evidence.visual.flags === 0 ? "0 flags" : `${d.evidence.visual.flags} flags`}
          status={d.evidence.visual.flags === 0 ? "ok" : "bad"}
          defaultOpen={d.evidence.visual.flags > 0}
        >
          <EvidenceList items={d.evidence.visual.items} fallback="Layout, color usage, and detected logos are consistent with the claimed brand." />
        </EvidenceAccordion>

        <EvidenceAccordion
          icon="radar"
          title="Threat intel feeds"
          flags={d.threatIntel.filter(t => t.status === "flagged").length === 0
            ? `${d.threatIntel.length}/${d.threatIntel.length} clean`
            : `${d.threatIntel.filter(t => t.status === "flagged").length}/${d.threatIntel.length} flagged`}
          status={d.threatIntel.some(t => t.status === "flagged") ? "bad" : "ok"}
          defaultOpen={d.threatIntel.some(t => t.status === "flagged")}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {d.threatIntel.map(t => (
              <div key={t.name} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px",
                background: "var(--bg-inset)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: t.status === "flagged" ? "var(--phishing)" : "var(--safe)",
                  boxShadow: `0 0 6px ${t.status === "flagged" ? "var(--phishing)" : "var(--safe)"}`,
                }} />
                <span style={{ fontSize: 13, color: "var(--text)", fontFamily: "var(--font-mono)" }}>{t.name}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: t.status === "flagged" ? "var(--phishing)" : "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {t.detail || (t.status === "flagged" ? "flagged" : "clean")}
                </span>
              </div>
            ))}
          </div>
        </EvidenceAccordion>
      </Card>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
        <Button variant="ghost" icon="download"
          onClick={() => {
            try {
              generateScanPdf(d);
              toast({ kind: "success", title: "PDF downloaded", message: "Check your Downloads folder" });
            } catch (e) {
              toast({ kind: "warn", title: "PDF generation failed", message: e instanceof Error ? e.message : "Unknown error" });
            }
          }}>
          Download PDF report
        </Button>
        <Button variant="ghost" icon="share"
          onClick={() => {
            const link = `${window.location.origin}/#result/${d.domain}`;
            navigator.clipboard?.writeText(link);
            toast({ kind: "success", title: "Share link copied", message: link });
          }}>
          Share link
        </Button>
        <Button variant="accent" icon="radar" onClick={onAgain}>Scan another URL</Button>
      </div>
    </div>
  );
}
