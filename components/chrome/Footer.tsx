"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { Logo } from "./Logo";

interface FooterLink {
  label: string;
  href?: string;
  toast?: string;
}

const LINKS: FooterLink[] = [
  { label: "Terms & Conditions", toast: "Terms doc opens in a new tab. (Demo mode — no PDF attached.)" },
  { label: "Privacy Policy",     toast: "We log only the URL string and verdict — never page contents." },
  { label: "Responsible disclosure", toast: "Email: security@safetrace.example. PGP key on About page." },
  { label: "Status",             toast: "All regions: operational. Median latency 3.8s." },
  { label: "API",                href: "/about" },
];

export function Footer() {
  const router = useRouter();
  const toast = useToast();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, l: FooterLink) => {
    e.preventDefault();
    if (l.href) { router.push(l.href); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    toast({ kind: "info", title: l.label, message: l.toast || "Coming soon." });
  };

  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      marginTop: 48,
      padding: "28px 32px 32px",
      borderTop: "1px solid var(--border)",
      background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))",
    }}>
      <div style={{
        maxWidth: 1240,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 32,
        alignItems: "center",
      }}>
        <div onClick={() => { router.push("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
          <Logo />
        </div>

        <nav style={{ display: "flex", justifyContent: "center", gap: 22, fontSize: 12.5, color: "var(--text-muted)" }}>
          {LINKS.map(l => (
            <a
              key={l.label}
              href={l.href || "#"}
              onClick={(e) => onClick(e, l)}
              style={{ color: "inherit", textDecoration: "none", transition: "color 150ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.04em" }}>
          <span>© 2026 SafeTrace</span>
          <span style={{ color: "var(--steel-700)" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 5, height: 5, background: "var(--safe)", borderRadius: "50%", boxShadow: "0 0 6px var(--safe)" }} />
            All systems operational
          </span>
        </div>
      </div>

      <div style={{
        maxWidth: 1240,
        margin: "20px auto 0",
        paddingTop: 18,
        borderTop: "1px solid var(--border-subtle)",
        fontSize: 11,
        color: "var(--text-dim)",
        textAlign: "center",
        lineHeight: 1.6,
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.02em",
      }}>
        SafeTrace v1.5-beta · By using this service you agree to our{" "}
        <a href="#" onClick={(e) => onClick(e, LINKS[0])} style={{ color: "var(--text-muted)", textDecoration: "underline", textUnderlineOffset: 2 }}>Terms</a>.
        Threat intel sourced from PhishTank, OpenPhish, URLhaus & Google Safe Browsing. Not affiliated with any brand shown for impersonation testing.
      </div>
    </footer>
  );
}
