"use client";

import { useMemo } from "react";

export interface TimeSeriesData {
  safe: number[];
  phishing: number[];
  malware: number[];
  defacement: number[];
}

export interface TimeSeriesChartProps {
  data?: TimeSeriesData;
}

const N = 48;
const MAX = 180;

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const series = useMemo(() => {
    if (data) return data;
    return {
      safe:       Array.from({ length: N }, (_, i) => 100 + Math.sin(i * 0.4)       * 40 + Math.random() * 30),
      phishing:   Array.from({ length: N }, (_, i) =>  20 + Math.sin(i * 0.3 + 1)   * 15 + Math.random() * 12),
      malware:    Array.from({ length: N }, (_, i) =>   8 + Math.sin(i * 0.6 + 2)   *  6 + Math.random() *  6),
      defacement: Array.from({ length: N }, (_, i) =>   3 + Math.cos(i * 0.5)       *  2 + Math.random() *  3),
    };
  }, [data]);

  const toPath = (arr: number[]) => {
    const len = arr.length;
    const stepX = 100 / (len - 1);
    return arr.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * stepX).toFixed(2)} ${(100 - (v / MAX) * 95).toFixed(2)}`).join(" ");
  };
  const toArea = (arr: number[]) => {
    const len = arr.length;
    const stepX = 100 / (len - 1);
    return `M 0 100 ` + arr.map((v, i) => `L ${(i * stepX).toFixed(2)} ${(100 - (v / MAX) * 95).toFixed(2)}`).join(" ") + ` L 100 100 Z`;
  };

  return (
    <div style={{ position: "relative", aspectRatio: "16/6", width: "100%" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="safeFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--safe)" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="var(--safe)" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="phishFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--phishing)" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="var(--phishing)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1={0} y1={y} x2={100} y2={y} stroke="var(--border)" strokeWidth="0.15" strokeDasharray="0.6 0.6"/>
        ))}
        <path d={toArea(series.safe)} fill="url(#safeFill)" />
        <path d={toArea(series.phishing)} fill="url(#phishFill)" />
        <path d={toPath(series.safe)}       stroke="var(--safe)"       strokeWidth="0.6" fill="none" />
        <path d={toPath(series.phishing)}   stroke="var(--phishing)"   strokeWidth="0.6" fill="none" />
        <path d={toPath(series.malware)}    stroke="var(--malware)"    strokeWidth="0.6" fill="none" />
        <path d={toPath(series.defacement)} stroke="var(--defacement)" strokeWidth="0.6" fill="none" />
      </svg>
      <div style={{ position: "absolute", bottom: -22, left: 0, right: 0, display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
        {["48h ago","36h","24h","12h","now"].map(t => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}
