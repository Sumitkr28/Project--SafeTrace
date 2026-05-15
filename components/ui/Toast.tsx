"use client";

import { Ico } from "@/components/icons";
import { useToasts, useDismissToast, type ToastKind } from "@/hooks/useToast";

const COLORS: Record<ToastKind, { bd: string; ic: "info" | "check" | "x" }> = {
  info:    { bd: "var(--accent)",          ic: "info"  },
  success: { bd: "var(--safe-border)",     ic: "check" },
  error:   { bd: "var(--phishing-border)", ic: "x"     },
};

export function Toast() {
  const toasts = useToasts();
  const dismiss = useDismissToast();
  return (
    <div style={{
      position: "fixed",
      bottom: 24, left: 24,
      zIndex: 1000,
      display: "flex",
      flexDirection: "column-reverse",
      gap: 10,
      pointerEvents: "none",
      maxWidth: 360,
    }}>
      {toasts.map(t => {
        const c = COLORS[t.kind || "info"];
        return (
          <div key={t.id} style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "12px 14px",
            background: "var(--bg-raised)",
            border: `1px solid ${c.bd}`,
            borderLeft: `3px solid ${c.bd}`,
            borderRadius: "var(--r-sm)",
            boxShadow: "var(--shadow-lg)",
            fontSize: 13,
            color: "var(--text)",
            backdropFilter: "blur(10px)",
            minWidth: 240,
            animation: "fade-up 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onClick={() => dismiss(t.id)}
          >
            <div style={{ color: c.bd, marginTop: 1 }}><Ico name={c.ic === "info" ? "info" : c.ic} size={14} stroke={2.2} /></div>
            <div style={{ flex: 1 }}>
              {t.title && <div style={{ fontWeight: 600, marginBottom: 2 }}>{t.title}</div>}
              {t.message && <div style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{t.message}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
