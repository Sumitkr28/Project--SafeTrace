import type { ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  sub?: ReactNode;
  right?: ReactNode;
}

export function SectionHeader({ eyebrow, title, sub, right }: SectionHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18, gap: 24 }}>
      <div>
        {eyebrow && (
          <div style={{
            fontSize: 11, color: "var(--accent)",
            textTransform: "uppercase", letterSpacing: "0.16em",
            fontWeight: 600, marginBottom: 6,
            fontFamily: "var(--font-mono)",
          }}>{eyebrow}</div>
        )}
        {title && <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>}
        {sub && <p style={{ marginTop: 4, fontSize: 14, color: "var(--text-muted)" }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}
