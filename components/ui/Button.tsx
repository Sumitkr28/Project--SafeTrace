"use client";

import type { CSSProperties, ReactNode } from "react";
import { Ico, type IconName } from "@/components/icons";

export type ButtonVariant = "primary" | "accent" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  title?: string;
}

const SIZES: Record<ButtonSize, CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: 13, height: 32, gap: 6 },
  md: { padding: "10px 16px", fontSize: 14, height: 40, gap: 8 },
  lg: { padding: "14px 22px", fontSize: 15, height: 48, gap: 10 },
};

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "linear-gradient(180deg, var(--steel-600), var(--steel-800))",
    color: "var(--text)",
    border: "1px solid var(--steel-500)",
    boxShadow: "inset 0 1px 0 rgba(255,240,210,0.15), 0 1px 2px rgba(0,0,0,0.5)",
  },
  accent: {
    background: "linear-gradient(180deg, var(--accent-solid), var(--accent-deep))",
    color: "#06242e",
    border: "1px solid var(--accent-solid)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 0 16px var(--accent-glow), 0 1px 2px rgba(0,0,0,0.5)",
    fontWeight: 600,
  },
  ghost: {
    background: "transparent",
    color: "var(--text-muted)",
    border: "1px solid var(--border)",
  },
  danger: {
    background: "linear-gradient(180deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))",
    color: "var(--phishing)",
    border: "1px solid var(--phishing-border)",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  onClick,
  disabled,
  type = "button",
  style,
  title,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--r-md)",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        letterSpacing: "-0.005em",
        transition: "transform 150ms ease, filter 150ms ease, box-shadow 150ms ease",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        ...SIZES[size],
        ...VARIANTS[variant],
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = "brightness(1.1)"; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.filter = "brightness(1)"; }}
    >
      {icon && <Ico name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}
