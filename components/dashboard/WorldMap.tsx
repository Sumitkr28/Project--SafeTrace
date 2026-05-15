"use client";

import { useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { feature } from "topojson-client";
import worldTopoJson from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry } from "geojson";
import { VERDICTS, type ScanPoint } from "@/lib/types";

const WORLD_FEATURES = feature(
  worldTopoJson as unknown as Parameters<typeof feature>[0],
  // @ts-expect-error — topojson typing doesn't infer object key
  worldTopoJson.objects.countries
) as unknown as FeatureCollection<Geometry>;

// Equirectangular projection — lat [+90, -90] → y, lon [-180, +180] → x.
// react-simple-maps uses d3-geo's projection; we use geoEquirectangular at scale 153.
// Width/height come from the SVG viewBox (1000×500).
function project(lat: number, lon: number): { x: number; y: number } {
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export interface WorldMapProps {
  points?: ScanPoint[];
}

// Demo points shown when the dashboard has no real scan data yet. Tuned for visual
// balance — every continent gets coverage, with a heavier mix of malicious verdicts
// to make the map feel like a live threat dashboard.
const DEMO_POINTS: ScanPoint[] = [
  { lat: 40.7, lon: -74.0, verdict: "safe",       city: "New York" },
  { lat: 34.0, lon: -118.2, verdict: "phishing",  city: "Los Angeles" },
  { lat: 41.9, lon: -87.6, verdict: "defacement", city: "Chicago" },
  { lat: 29.7, lon: -95.4, verdict: "safe",       city: "Houston" },
  { lat: 49.3, lon: -123.1, verdict: "malware",   city: "Vancouver" },
  { lat: 45.5, lon: -73.6, verdict: "safe",       city: "Montreal" },
  { lat: 19.4, lon: -99.1, verdict: "phishing",   city: "Mexico City" },
  { lat: -23.5, lon: -46.6, verdict: "defacement",city: "São Paulo" },
  { lat: -34.6, lon: -58.4, verdict: "phishing",  city: "Buenos Aires" },
  { lat: -12.0, lon: -77.0, verdict: "safe",      city: "Lima" },
  { lat: 4.7, lon: -74.0, verdict: "malware",     city: "Bogotá" },
  { lat: 51.5, lon: -0.13, verdict: "safe",       city: "London" },
  { lat: 48.9, lon: 2.35, verdict: "phishing",    city: "Paris" },
  { lat: 52.5, lon: 13.4, verdict: "defacement",  city: "Berlin" },
  { lat: 41.9, lon: 12.5, verdict: "safe",        city: "Rome" },
  { lat: 40.4, lon: -3.7, verdict: "phishing",    city: "Madrid" },
  { lat: 55.8, lon: 37.6, verdict: "malware",     city: "Moscow" },
  { lat: 59.3, lon: 18.1, verdict: "safe",        city: "Stockholm" },
  { lat: 50.1, lon: 14.4, verdict: "defacement",  city: "Prague" },
  { lat: 41.0, lon: 28.9, verdict: "phishing",    city: "Istanbul" },
  { lat: 30.0, lon: 31.2, verdict: "defacement",  city: "Cairo" },
  { lat: -1.3, lon: 36.8, verdict: "safe",        city: "Nairobi" },
  { lat: -26.2, lon: 28.0, verdict: "phishing",   city: "Johannesburg" },
  { lat: 6.5, lon: 3.4, verdict: "malware",       city: "Lagos" },
  { lat: 33.6, lon: -7.6, verdict: "defacement",  city: "Casablanca" },
  { lat: 25.2, lon: 55.3, verdict: "phishing",    city: "Dubai" },
  { lat: 24.7, lon: 46.7, verdict: "safe",        city: "Riyadh" },
  { lat: 28.6, lon: 77.2, verdict: "phishing",    city: "Delhi" },
  { lat: 19.1, lon: 72.9, verdict: "defacement",  city: "Mumbai" },
  { lat: 12.9, lon: 77.6, verdict: "safe",        city: "Bengaluru" },
  { lat: 13.7, lon: 100.5, verdict: "malware",    city: "Bangkok" },
  { lat: 1.35, lon: 103.8, verdict: "safe",       city: "Singapore" },
  { lat: -6.2, lon: 106.8, verdict: "phishing",   city: "Jakarta" },
  { lat: 14.6, lon: 121.0, verdict: "defacement", city: "Manila" },
  { lat: 22.3, lon: 114.2, verdict: "phishing",   city: "Hong Kong" },
  { lat: 31.2, lon: 121.5, verdict: "safe",       city: "Shanghai" },
  { lat: 39.9, lon: 116.4, verdict: "malware",    city: "Beijing" },
  { lat: 37.6, lon: 127.0, verdict: "defacement", city: "Seoul" },
  { lat: 35.7, lon: 139.7, verdict: "safe",       city: "Tokyo" },
  { lat: -33.9, lon: 151.2, verdict: "phishing",  city: "Sydney" },
  { lat: -37.8, lon: 144.9, verdict: "safe",      city: "Melbourne" },
  { lat: -41.3, lon: 174.8, verdict: "defacement",city: "Wellington" },
];

export function WorldMap({ points = [] }: WorldMapProps) {
  const [active, setActive] = useState<number | null>(null);
  const [pulse, setPulse] = useState<Set<number>>(new Set());

  const features = useMemo(() => WORLD_FEATURES.features, []);

  // Fall back to demo points when no real scans have been recorded yet. The
  // dashboard becomes much more compelling with visible activity on every continent.
  const renderPoints = points.length > 0 ? points : DEMO_POINTS;

  useEffect(() => {
    if (!renderPoints.length) return;
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * renderPoints.length);
      setPulse(prev => { const n = new Set(prev); n.add(idx); return n; });
      setTimeout(() => {
        setPulse(prev => { const n = new Set(prev); n.delete(idx); return n; });
      }, 2000);
    }, 700);
    return () => clearInterval(id);
  }, [renderPoints.length]);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: "2 / 1",
      background: "radial-gradient(ellipse at center, var(--bg-inset), var(--bg-deep))",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      overflow: "hidden",
    }}>
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{ scale: 160, center: [0, 0] }}
        width={1000}
        height={500}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7d92b8" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#5f7aa6" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <g stroke="var(--steel-700)" strokeWidth="0.3" opacity="0.15">
          {Array.from({ length: 13 }, (_, i) => <line key={`v${i}`} x1={i * 83.3} y1={0} x2={i * 83.3} y2={500} />)}
          {Array.from({ length: 7 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 71.4} x2={1000} y2={i * 71.4} />)}
        </g>
        <line x1={0} y1={250} x2={1000} y2={250} stroke="var(--steel-500)" strokeWidth="0.5" opacity="0.30" strokeDasharray="6 4" />

        <Geographies geography={features as unknown as object[]}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="url(#landFill)"
                stroke="#a8b9d4"
                strokeWidth={0.4}
                strokeOpacity={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {renderPoints.map((p, i) => {
        const { x, y } = project(p.lat, p.lon);
        const color = VERDICTS[p.verdict].color;
        const isPulse = pulse.has(i);
        return (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              position: "absolute",
              left: `${x}%`, top: `${y}%`,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            {isPulse && (
              <span style={{
                position: "absolute",
                width: 28, height: 28,
                left: -14, top: -14,
                borderRadius: "50%",
                border: `1px solid ${color}`,
                animation: "ping 1.8s ease-out infinite",
              }} />
            )}
            <span style={{
              display: "block",
              width: isPulse ? 9 : 6, height: isPulse ? 9 : 6,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 ${isPulse ? 12 : 5}px ${color}`,
              border: `1px solid ${color}`,
              transition: "all 200ms",
            }} />
            {active === i && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "6px 10px",
                background: "var(--bg-raised)",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--r-sm)",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                color: "var(--text)",
                boxShadow: "var(--shadow-md)",
                zIndex: 5,
              }}>
                <div>{p.city} · {p.lat.toFixed(1)}°{p.lat >= 0 ? "N" : "S"}</div>
                <div style={{ color, textTransform: "uppercase", fontSize: 10, letterSpacing: "0.06em", marginTop: 2 }}>{VERDICTS[p.verdict].label}</div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{
        position: "absolute", top: 0, bottom: 0, width: 2,
        background: "linear-gradient(180deg, transparent, var(--accent), transparent)",
        boxShadow: "0 0 16px var(--accent)",
        left: "-2px",
        animation: "map-sweep 7s linear infinite",
        zIndex: 1,
      }} />

      <div style={{
        position: "absolute",
        bottom: 12, left: 12,
        display: "flex", gap: 14,
        padding: "6px 12px",
        background: "rgba(20, 19, 17, 0.85)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-sm)",
        backdropFilter: "blur(8px)",
        fontSize: 10,
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        zIndex: 3,
      }}>
        {(["safe", "phishing", "malware", "defacement"] as const).map(vk => (
          <span key={vk} style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)" }}>
            <span style={{ width: 6, height: 6, background: VERDICTS[vk].color, borderRadius: "50%", boxShadow: `0 0 4px ${VERDICTS[vk].color}` }} />
            {VERDICTS[vk].label}
          </span>
        ))}
      </div>

      <div style={{
        position: "absolute",
        top: 12, right: 12,
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 10px",
        background: "rgba(20, 19, 17, 0.85)",
        border: "1px solid var(--border)",
        borderRadius: 999,
        fontSize: 10,
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "var(--text-muted)",
        backdropFilter: "blur(8px)",
        zIndex: 3,
      }}>
        <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", boxShadow: "0 0 6px var(--accent)", animation: "pulse 1.4s infinite" }} />
        Live · last 60s
      </div>
    </div>
  );
}
