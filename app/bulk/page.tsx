"use client";

import { useMemo, useRef, useState } from "react";

import { Ico } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { useToast } from "@/hooks/useToast";
import { bulkScan } from "@/lib/api";
import { VERDICTS, type ScanResult, type Verdict } from "@/lib/types";

type Status =
  | { kind: "idle" }
  | { kind: "ready"; file: File }
  | { kind: "running"; processed: number; total: number }
  | { kind: "done" };

interface Row {
  url: string;
  result?: ScanResult;
  error?: string;
}

export default function BulkPage() {
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [rows, setRows] = useState<Row[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const stats = useMemo(() => {
    const done = rows.filter(r => r.result);
    return {
      total: rows.length,
      safe:       done.filter(r => r.result!.verdict === "safe").length,
      phishing:   done.filter(r => r.result!.verdict === "phishing").length,
      malware:    done.filter(r => r.result!.verdict === "malware").length,
      pending:    rows.length - done.length,
    };
  }, [rows]);

  const onFile = async (file: File) => {
    // Parse rows up front for the initial table render
    const text = await file.text();
    const urls = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).slice(0, 500);
    setRows(urls.map(url => ({ url })));
    setStatus({ kind: "running", processed: 0, total: urls.length });

    try {
      for await (const evt of bulkScan(file)) {
        setRows(prev => {
          const next = [...prev];
          next[evt.index] = { ...next[evt.index], result: evt.result };
          return next;
        });
        setStatus({ kind: "running", processed: evt.index + 1, total: urls.length });
      }
      setStatus({ kind: "done" });
      toast({ kind: "success", title: "Bulk scan complete", message: `${urls.length} URLs processed` });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ kind: "error", title: "Bulk scan failed", message: msg });
      setStatus({ kind: "idle" });
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 64px", animation: "fade-up 400ms ease-out" }}>
      <SectionHeader
        eyebrow="Bulk scan · CSV"
        title="Scan a list of URLs"
        sub="Drop a CSV with one URL per line. Up to 500 URLs per batch."
        right={
          <Button variant="ghost" icon="download" size="sm"
            onClick={() => toast({ kind: "success", title: "Export started", message: "CSV + PDF download in progress" })}>
            Download CSV + PDF
          </Button>
        }
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        style={{
          padding: "32px 24px",
          border: `1.5px dashed ${dragOver ? "var(--accent)" : "var(--border-strong)"}`,
          borderRadius: "var(--r-lg)",
          background: dragOver ? "var(--accent-glow)" : "var(--bg-raised)",
          textAlign: "center",
          marginBottom: 28,
          transition: "all 200ms ease",
          cursor: "pointer",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "var(--bg-inset)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--accent)",
          }}>
            <Ico name="upload" size={22} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Drop CSV here or click to browse</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>One URL per line · UTF-8 · max 500 rows · max 2 MB</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button variant="primary" size="sm" icon="files" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
              Choose file
            </Button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        <KpiCard label="Total"     value={stats.total}    icon="files"        sub="this batch" />
        <KpiCard label="Safe"      value={stats.safe}     color="var(--safe)"     icon="shield-check" sub={`${Math.round(stats.safe / Math.max(1, stats.total) * 100)}% of done`} />
        <KpiCard label="Phishing"  value={stats.phishing} color="var(--phishing)" icon="fish" />
        <KpiCard label="Malware"   value={stats.malware}  color="var(--malware)"  icon="bug" />
        <KpiCard label="In flight" value={stats.pending}  color="var(--accent)"   icon="activity" sub="processing" />
      </div>

      {rows.length > 0 && (
        <Card padding={0}>
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
                {status.kind === "ready" ? status.file.name : `Batch · ${rows.length} URLs`}
              </h3>
              {status.kind === "running" && <Tag color="var(--accent)" bg="var(--accent-glow)" border="var(--accent)">Live</Tag>}
              {status.kind === "done" && <Tag color="var(--safe)" bg="var(--safe-bg)" border="var(--safe-border)">Complete</Tag>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "32px minmax(0, 1fr) 140px 90px 80px 60px", padding: "10px 20px", borderBottom: "1px solid var(--border)", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
            <div>#</div>
            <div>URL</div>
            <div>Verdict</div>
            <div>Score</div>
            <div>Conf.</div>
            <div></div>
          </div>

          {rows.map((r, i) => {
            const v = r.result ? VERDICTS[r.result.verdict] : null;
            return (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "32px minmax(0, 1fr) 140px 90px 80px 60px",
                padding: "10px 20px",
                borderBottom: i < rows.length - 1 ? "1px solid var(--border-subtle)" : "none",
                alignItems: "center",
                fontSize: 13,
                transition: "background 100ms",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)", fontSize: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>{r.url}</div>
                <div>
                  {v && r.result ? (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "2px 8px",
                      background: v.bg, border: `1px solid ${v.border}`, borderRadius: 4,
                      fontSize: 11, fontWeight: 600,
                      color: v.color,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      fontFamily: "var(--font-mono)",
                    }}>
                      <Ico name={v.icon} size={10} />
                      {v.label}
                    </span>
                  ) : (
                    <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>queued</span>
                  )}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: r.result ? v?.color : "var(--text-dim)" }}>
                  {r.result ? `${r.result.riskScore}/100` : "—"}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>
                  {r.result ? `${r.result.confidence}%` : "—"}
                </div>
                <div>
                  {r.result && <button type="button" style={{ color: "var(--text-dim)", padding: 4, background: "none", border: "none", cursor: "pointer" }} title="Open details"><Ico name="arrow-right" size={14}/></button>}
                </div>
              </div>
            );
          })}

          <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "var(--text-dim)", borderTop: "1px solid var(--border)" }}>
            <span>Showing {rows.length} of {rows.length} URLs</span>
            <span style={{ fontFamily: "var(--font-mono)" }}>{stats.total - stats.pending}/{stats.total} processed</span>
          </div>
        </Card>
      )}
    </div>
  );
}
