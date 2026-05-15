"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ico, type IconName } from "@/components/icons";
import { useToast } from "@/hooks/useToast";
import { Logo } from "./Logo";

interface Route { id: string; label: string; icon: IconName; path: string; }

const ROUTES: Route[] = [
  { id: "scan",      label: "Scan",      icon: "radar",   path: "/" },
  { id: "bulk",      label: "Bulk",      icon: "files",   path: "/bulk" },
  { id: "dashboard", label: "Dashboard", icon: "chart",   path: "/dashboard" },
  { id: "about",     label: "About",     icon: "info",    path: "/about" },
];

export function TopNav() {
  const pathname = usePathname();
  const toast = useToast();

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      backdropFilter: "blur(14px)",
      background: "linear-gradient(180deg, rgba(20,19,17,0.92), rgba(20,19,17,0.78))",
      borderBottom: "1px solid var(--border)",
      height: 64,
      display: "flex",
      alignItems: "center",
      padding: "0 28px",
      gap: 32,
    }}>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo />
      </Link>

      <nav style={{
        display: "flex",
        gap: 2,
        padding: 3,
        margin: "0 auto",
        background: "var(--bg-inset)",
        border: "1px solid var(--border)",
        borderRadius: 999,
      }}>
        {ROUTES.map(r => {
          const active = r.path === pathname || (r.path === "/" && pathname === "/");
          return (
            <Link
              key={r.id}
              href={r.path}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 16px",
                fontSize: 13, fontWeight: 500,
                color: active ? "var(--text)" : "var(--text-muted)",
                background: active ? "linear-gradient(180deg, var(--steel-700), var(--steel-800))" : "transparent",
                border: active ? "1px solid var(--steel-500)" : "1px solid transparent",
                borderRadius: 999,
                transition: "all 150ms ease",
                boxShadow: active ? "inset 0 1px 0 rgba(255,240,210,0.10), 0 1px 2px rgba(0,0,0,0.4)" : "none",
                position: "relative",
                textDecoration: "none",
              }}
            >
              <Ico name={r.icon} size={14} />
              {r.label}
              {active && (
                <span style={{
                  position: "absolute",
                  bottom: -4, left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px",
          background: "var(--bg-inset)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          fontSize: 10.5,
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}>
          <span style={{ width: 5, height: 5, background: "var(--safe)", borderRadius: "50%", boxShadow: "0 0 6px var(--safe)", animation: "pulse 1.6s infinite" }} />
          v1.5-beta
        </div>
        <button
          type="button"
          title="GitHub repository"
          onClick={() => toast({ kind: "info", title: "GitHub", message: "Repo is private until launch." })}
          style={{
            width: 36, height: 36,
            borderRadius: "var(--r-sm)",
            background: "var(--bg-inset)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-muted)",
            transition: "all 150ms",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <Ico name="github" size={16} />
        </button>
      </div>
    </header>
  );
}
