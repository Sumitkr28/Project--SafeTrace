import type { BrandRow } from "@/lib/types";

export interface BrandBarsProps {
  data?: BrandRow[];
}

const FALLBACK: BrandRow[] = [
  { brand: "PayPal",    count: 248, color: "#003087" },
  { brand: "SBI",       count: 186, color: "#22247a" },
  { brand: "Amazon",    count: 154, color: "#FF9900" },
  { brand: "Microsoft", count: 132, color: "#0078D4" },
  { brand: "HDFC Bank", count: 108, color: "#004B8D" },
  { brand: "Netflix",   count:  84, color: "#E50914" },
  { brand: "Apple",     count:  72, color: "#a8a8a8" },
  { brand: "Google",    count:  61, color: "#4285F4" },
];

export function BrandBars({ data }: BrandBarsProps) {
  const rows = data?.length ? data : FALLBACK;
  const max = rows[0]?.count || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map((b, i) => (
        <div key={b.brand} style={{ display: "grid", gridTemplateColumns: "100px 1fr 50px", gap: 12, alignItems: "center", fontSize: 13, animation: `fade-up 400ms ease-out ${i * 60}ms backwards` }}>
          <div style={{ color: "var(--text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis" }}>{b.brand}</div>
          <div style={{ height: 14, background: "var(--bg-inset)", borderRadius: 3, overflow: "hidden", border: "1px solid var(--border)" }}>
            <div style={{
              height: "100%",
              width: `${(b.count / max) * 100}%`,
              background: `linear-gradient(90deg, ${b.color}aa, ${b.color})`,
              borderRadius: 2,
              boxShadow: `0 0 8px ${b.color}55`,
              transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1)",
            }} />
          </div>
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontWeight: 600, textAlign: "right" }}>{b.count}</div>
        </div>
      ))}
    </div>
  );
}
