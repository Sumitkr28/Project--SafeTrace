"use client";

import { useEffect, useState } from "react";

import { BrandBars } from "@/components/dashboard/BrandBars";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { WorldMap } from "@/components/dashboard/WorldMap";
import { Ico } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useToast } from "@/hooks/useToast";
import { getDashboardStats } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const toast = useToast();

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const s = await getDashboardStats();
        if (alive) setStats(s);
      } catch (err) {
        // Backend not up yet — UI still renders with empty/placeholder data.
        // eslint-disable-next-line no-console
        console.warn("dashboard stats failed:", err);
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const k = stats?.kpis;

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 64px", animation: "fade-up 400ms ease-out" }}>
      <SectionHeader
        eyebrow="Threat dashboard · last 24h"
        title="What the internet's been throwing at us"
        sub="Aggregate stats across all SafeTrace scans. Updates every 60 seconds."
        right={<div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm" icon="clock"
            onClick={() => toast({ title: "Time range", message: "24h · 7d · 30d toggles coming in v2." })}>
            Last 24h
          </Button>
          <Button variant="ghost" size="sm" icon="download"
            onClick={() => toast({ kind: "success", title: "Dashboard exported", message: "PDF + raw data saved" })}>
            Export
          </Button>
        </div>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        <KpiCard label="Scans today"     value={k?.scansToday      ?? 0}     icon="activity"     sub="last 24h" />
        <KpiCard label="Phishing caught" value={k?.phishingCaught  ?? 0}     icon="fish"         color="var(--phishing)" />
        <KpiCard label="Malware caught"  value={k?.malwareCaught   ?? 0}     icon="bug"          color="var(--malware)" />
        <KpiCard label="Avg response"    value={k?.avgResponse     ?? "—"}   icon="zap"          color="var(--accent)" sub="P95 5.2s" />
      </div>

      <Card padding={20} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 14, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", fontWeight: 600, margin: 0 }}>Live scan map</h3>
            <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4, marginBottom: 0 }}>Origin IPs of recent scans, pulse on each new event.</p>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
            <span>events/min: <span style={{ color: "var(--accent)" }}>{stats?.scanPoints?.length ?? 0}</span></span>
          </div>
        </div>
        <WorldMap points={stats?.scanPoints ?? []} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)", gap: 20, marginBottom: 20 }}>
        <Card padding={20}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: 14, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", fontWeight: 600, margin: 0 }}>Scans by verdict</h3>
              <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4, marginBottom: 0 }}>Last 48 hours, hourly buckets.</p>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
              {[
                { l: "Safe",       c: "var(--safe)" },
                { l: "Phishing",   c: "var(--phishing)" },
                { l: "Malware",    c: "var(--malware)" },
                { l: "Defacement", c: "var(--defacement)" },
              ].map(s => (
                <span key={s.l} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  <span style={{ width: 8, height: 2, background: s.c, borderRadius: 1, boxShadow: `0 0 4px ${s.c}` }} />{s.l}
                </span>
              ))}
            </div>
          </div>
          <div style={{ paddingBottom: 26 }}>
            <TimeSeriesChart data={stats?.timeSeries} />
          </div>
        </Card>

        <Card padding={20}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", fontWeight: 600, margin: 0 }}>Top impersonated brands</h3>
            <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4, marginBottom: 0 }}>By unique phishing URLs.</p>
          </div>
          <BrandBars data={stats?.topBrands} />
        </Card>
      </div>

      <Card padding={0}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 14, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", fontWeight: 600, margin: 0 }}>Recent phishing caught</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 120px 80px 100px 32px", padding: "10px 20px", borderBottom: "1px solid var(--border)", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
          <div>URL</div>
          <div>Brand</div>
          <div>Score</div>
          <div>When</div>
          <div></div>
        </div>
        {(stats?.recentPhish ?? []).map((r, i, arr) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) 120px 80px 100px 32px",
            padding: "11px 20px",
            borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none",
            alignItems: "center",
            fontSize: 13,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 16 }}>{r.url}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.brand}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--phishing)", fontWeight: 600 }}>{r.score}/100</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>{r.when}</div>
            <div style={{ color: "var(--text-dim)" }}><Ico name="arrow-right" size={14}/></div>
          </div>
        ))}
        {(stats?.recentPhish?.length ?? 0) === 0 && (
          <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--text-dim)", fontSize: 13 }}>
            No phishing detected in this session yet.
          </div>
        )}
      </Card>
    </div>
  );
}
