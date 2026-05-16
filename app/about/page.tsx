import { Fragment } from "react";

import { Ico, type IconName } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface PipelineStep { num: string; title: string; desc: string; icon: IconName; }
const PIPELINE: PipelineStep[] = [
  { num: "01", title: "URL string",         desc: "Lex the URL into 112 features: length, TLD, subdomain depth, entropy, suspicious tokens (login, verify, secure), Punycode markers.", icon: "globe" },
  { num: "02", title: "ML classifier",      desc: "Gradient-boosted ensemble (XGBoost) trained on PhishTank, OpenPhish, and Tranco. SHAP values explain each prediction.", icon: "cpu" },
  { num: "03", title: "Deep site analyzer", desc: "Headless Chromium fetches the page. 4-layer forensic pass: Network, HTML, JavaScript, Visual.", icon: "layers" },
];

interface Layer { icon: IconName; title: string; color: string; items: string[]; }
const LAYERS: Layer[] = [
  { icon: "globe",     title: "Network & Identity", color: "var(--accent)", items: ["WHOIS domain age", "TLS cert issuer + age", "DNS / hosting country", "Punycode + IDN homograph"] },
  { icon: "file-code", title: "HTML inspection",    color: "#fbbf24",       items: ["Hidden iframes / forms", "Brand-in-title vs domain", "External form actions", "Suspicious redirects"] },
  { icon: "braces",    title: "JavaScript",         color: "#f87171",       items: ["eval / unescape / Function", "Base64 / hex obfuscation", "Keylogger event listeners", "Anti-debug + anti-VM"] },
  { icon: "image",     title: "Visual analysis",    color: "#a78bfa",       items: ["Headless screenshot", "Logo perceptual hash (pHash)", "OCR — scareware text", "Layout entropy vs baseline"] },
];

const STATS = [
  { label: "Accuracy",  v: "97.4%", sub: "5-fold CV" },
  { label: "Precision", v: "96.8%", sub: "phishing class" },
  { label: "Recall",    v: "94.1%", sub: "phishing class" },
  { label: "F1",        v: "0.954", sub: "weighted" },
];

const TECH = [
  "Next.js 14", "FastAPI", "PostgreSQL", "Redis", "XGBoost", "Playwright", "scikit-learn",
  "imagehash", "BeautifulSoup", "esprima", "TailwindCSS", "shadcn/ui", "Docker", "WHOIS", "tldextract",
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 64px", animation: "fade-up 400ms ease-out" }}>
      <SectionHeader
        eyebrow="About · Methodology"
        title="How SafeTrace decides"
        sub="Two independent streams of evidence. They have to agree before we call something safe."
      />

      <Card padding={32} className="about-method-card" style={{ marginBottom: 24 }}>
        <div className="about-pipeline-flow" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "stretch", gap: 16 }}>
          {PIPELINE.map((s, i, arr) => (
            <Fragment key={s.num}>
              <div className="about-pipeline-step" style={{ padding: 20, background: "var(--bg-inset)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>{s.num}</span>
                  <span style={{ color: "var(--accent)" }}><Ico name={s.icon} size={18} /></span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{s.title}</h4>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="about-pipeline-arrow" style={{ display: "flex", alignItems: "center", color: "var(--text-dim)" }}>
                  <Ico name="arrow-right" size={20} />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div style={{
          marginTop: 20,
          padding: "16px 20px",
          background: "var(--accent-glow)",
          border: "1px solid var(--accent)",
          borderRadius: "var(--r-md)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}>
          <Ico name="target" size={22} style={{ color: "var(--accent-bright)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: "var(--accent-bright)", fontWeight: 600, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Final verdict</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>Weighted ensemble: ML 40% + Network 15% + HTML 15% + JS 20% + Visual 10%. Above 50 → flagged.</div>
          </div>
        </div>
      </Card>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, marginTop: 8 }}>Deep analyzer — 4 layers</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 32 }}>
        {LAYERS.map(l => (
          <Card key={l.title} padding={20}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ color: l.color }}><Ico name={l.icon} size={18} /></div>
              <h4 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{l.title}</h4>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {l.items.map(it => (
                <li key={it} style={{ display: "grid", gridTemplateColumns: "12px 1fr", gap: 8, fontSize: 12.5, color: "var(--text-muted)" }}>
                  <span style={{ color: l.color, marginTop: 6, fontSize: 6 }}>●</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Model performance</h3>
      <Card padding={24} style={{ marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", fontFamily: "var(--font-mono)", letterSpacing: "-0.02em", marginTop: 4 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: 14, background: "var(--bg-inset)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)" }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)", marginBottom: 8 }}>Training data</div>
          <div style={{ fontSize: 13, color: "var(--text)", display: "flex", gap: 24, flexWrap: "wrap" }}>
            <span>PhishTank: <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>248,194 URLs</span></span>
            <span>OpenPhish: <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>112,840 URLs</span></span>
            <span>Tranco (safe): <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>500,000 URLs</span></span>
            <span>URLhaus: <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>74,221 URLs</span></span>
          </div>
        </div>
      </Card>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Built with</h3>
      <Card padding={20} style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TECH.map(t => (
            <span key={t} className="chip" style={{ fontFamily: "var(--font-mono)" }}>{t}</span>
          ))}
        </div>
      </Card>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Project</h3>
      <Card padding={24}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 8 }}>Context</div>
            <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6, margin: 0 }}>Personal project. Designed to look and behave like a production security product.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)", marginBottom: 8 }}>Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <div>v1.0 — URL-only ML <span style={{ color: "var(--safe)" }}>shipped</span></div>
              <div>v1.5 — Deep analyzer <span style={{ color: "var(--accent)" }}>in progress</span></div>
              <div>v2.0 — Browser extension <span style={{ color: "var(--text-dim)" }}>planned</span></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
