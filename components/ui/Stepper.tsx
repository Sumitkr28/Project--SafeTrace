import { Fragment } from "react";
import { Ico } from "@/components/icons";

export interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const c = done ? "var(--safe)" : active ? "var(--accent)" : "var(--steel-700)";
        return (
          <Fragment key={i}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 0, flex: "0 0 auto" }}>
              <div style={{
                width: 28, height: 28,
                borderRadius: "50%",
                background: done ? "var(--safe-bg)" : active ? "var(--accent-glow)" : "var(--bg-inset)",
                border: `1.5px solid ${c}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: c,
                transition: "all 300ms ease",
                position: "relative",
                boxShadow: active ? `0 0 16px ${c}` : "none",
              }}>
                {done ? <Ico name="check" size={14} stroke={2.5} /> :
                 active ? <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, animation: "pulse 1.2s ease-in-out infinite", boxShadow: `0 0 8px ${c}` }} /> :
                 <div style={{ width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0.6 }} />}
              </div>
              <div style={{
                fontSize: 11.5,
                fontWeight: 500,
                color: done || active ? "var(--text)" : "var(--text-dim)",
                whiteSpace: "nowrap",
                transition: "color 300ms ease",
              }}>{s}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1,
                height: 2,
                background: "var(--bg-inset)",
                margin: "0 8px",
                marginBottom: 26,
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{
                  height: "100%",
                  width: done ? "100%" : active ? "50%" : "0%",
                  background: done ? "var(--safe)" : "var(--accent)",
                  transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: done ? "0 0 8px var(--safe)" : "0 0 8px var(--accent)",
                }} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
