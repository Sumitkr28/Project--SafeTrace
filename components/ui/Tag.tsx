import type { ReactNode } from "react";

export interface TagProps {
  children?: ReactNode;
  color?: string;
  bg?: string;
  border?: string;
}

export function Tag({ children, color = "var(--text-muted)", bg, border }: TagProps) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color,
      background: bg || "var(--bg-inset)",
      border: `1px solid ${border || "var(--border)"}`,
      borderRadius: 4,
      fontFamily: "var(--font-mono)",
    }}>{children}</span>
  );
}
