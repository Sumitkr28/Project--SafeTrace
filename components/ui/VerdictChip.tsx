import { Ico } from "@/components/icons";
import { VERDICTS, type Verdict } from "@/lib/types";

export type VerdictChipSize = "sm" | "md" | "lg";

export interface VerdictChipProps {
  verdict: Verdict;
  size?: VerdictChipSize;
  animate?: boolean;
}

const SIZES = {
  sm: { padding: "4px 10px", fontSize: 11, gap: 4, iconSize: 12, fontWeight: 600 },
  md: { padding: "8px 14px", fontSize: 13, gap: 6, iconSize: 14, fontWeight: 600 },
  lg: { padding: "14px 24px", fontSize: 22, gap: 10, iconSize: 24, fontWeight: 700 },
} as const;

export function VerdictChip({ verdict, size = "md", animate = true }: VerdictChipProps) {
  const v = VERDICTS[verdict];
  const s = SIZES[size];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: v.color,
        background: v.bg,
        border: `1px solid ${v.border}`,
        borderRadius: size === "lg" ? "var(--r-md)" : 999,
        boxShadow: `inset 0 0 24px ${v.bg}`,
        animation: animate ? "verdict-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
      }}
    >
      <Ico name={v.icon} size={s.iconSize} stroke={2} />
      {v.label}
    </div>
  );
}
