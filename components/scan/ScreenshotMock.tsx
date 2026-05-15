"use client";

export interface ScreenshotMockProps {
  kind?: "sbi" | "phish" | "malware" | "deface";
  scanning?: boolean;
  bboxes?: boolean;
  /** When set, the component renders this real screenshot instead of the mock SVG. */
  src?: string;
}

/**
 * Used during development before /scan returns real screenshots.
 * When the backend supplies a data:image/png;base64,... URL in `src`,
 * render it directly inside the same browser-chrome shell.
 *
 * TODO: delete `kind`-based mocks once /scan returns real screenshots reliably.
 */
export function ScreenshotMock({ kind = "sbi", scanning = false, bboxes = false, src }: ScreenshotMockProps) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: "4 / 3",
      borderRadius: "var(--r-sm)",
      overflow: "hidden",
      border: "1px solid var(--border-strong)",
      background: "#1a1a1a",
      boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04)",
    }}>
      <div style={{
        height: 16, background: "var(--bg-raised-2)", display: "flex", alignItems: "center", padding: "0 8px", gap: 4,
        borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444" }} />
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fbbf24" }} />
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
      </div>
      <div style={{ position: "relative", height: "calc(100% - 16px)" }}>
        {src ? (
          <img src={src} alt="Page screenshot" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <NotFoundMock />
        )}
        {scanning && (
          <div style={{
            position: "absolute",
            left: 0, right: 0,
            height: 60,
            background: "linear-gradient(180deg, transparent, rgba(103, 232, 249, 0.35), transparent)",
            mixBlendMode: "screen",
            animation: "scanline 2s linear infinite",
            pointerEvents: "none",
          }} />
        )}
      </div>
    </div>
  );
}

function NotFoundMock() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#f8f9fa",
      color: "#202124",
      display: "flex", flexDirection: "column",
      padding: "18px 22px",
      fontFamily: "'Segoe UI', Roboto, system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        marginBottom: 18, color: "#5f6368", fontSize: 9,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
        <span>This site can&apos;t be reached</span>
      </div>

      <div style={{
        position: "absolute",
        top: 50, left: 22,
        width: 48, height: 48,
        border: "3px solid #dadce0",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dadce0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="3" x2="21" y2="21"/>
          <path d="M10.66 5H14a2 2 0 0 1 2 2v3.34"/>
          <path d="M14 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8.66"/>
        </svg>
      </div>

      <div style={{ marginTop: 110, paddingLeft: 0 }}>
        <div style={{
          fontSize: 22, fontWeight: 400, color: "#202124",
          marginBottom: 10, lineHeight: 1.25,
        }}>
          This site can&apos;t be reached
        </div>
        <div style={{
          fontSize: 11, color: "#5f6368", lineHeight: 1.55,
          marginBottom: 14, maxWidth: "92%",
        }}>
          The webpage at this address might be temporarily down or it may have moved permanently to a new web address.
        </div>
        <div style={{
          fontSize: 10, color: "#5f6368",
          fontFamily: "Consolas, 'Courier New', monospace",
          background: "#f1f3f4",
          padding: "5px 8px",
          borderRadius: 3,
          display: "inline-block",
          marginBottom: 16,
        }}>
          ERR_NAME_NOT_RESOLVED
        </div>
        <div style={{
          display: "flex", gap: 8, marginTop: 10,
        }}>
          <div style={{
            background: "#1a73e8", color: "#fff",
            padding: "5px 14px", borderRadius: 3,
            fontSize: 10, fontWeight: 500,
          }}>
            Reload
          </div>
          <div style={{
            background: "#fff", color: "#1a73e8",
            border: "1px solid #dadce0",
            padding: "5px 14px", borderRadius: 3,
            fontSize: 10, fontWeight: 500,
          }}>
            Details
          </div>
        </div>
      </div>
    </div>
  );
}

function MockInner({ kind, bboxes }: { kind: "sbi" | "phish" | "malware" | "deface"; bboxes: boolean }) {
  if (kind === "sbi") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#fff", color: "#111", overflow: "hidden", fontSize: 8 }}>
        <div style={{ background: "#22247a", color: "#fff", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 11 }}>SBI</div>
          <div style={{ display: "flex", gap: 8, fontSize: 7 }}>
            <span>Personal</span><span>SME</span><span>Corporate</span><span>NRI</span>
          </div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #1d2374, #0a1656)", color: "#fff", padding: "24px 12px", minHeight: 100 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>YONO — Banking made simple</div>
          <div style={{ fontSize: 7, opacity: 0.85, marginBottom: 12 }}>Now offering 7.25% on Senior Citizen FDs</div>
          <div style={{ background: "#facc15", color: "#111", padding: "4px 10px", fontWeight: 700, fontSize: 8, display: "inline-block", borderRadius: 2 }}>Open Account →</div>
        </div>
        <div style={{ padding: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {["Internet Banking", "Mobile Banking", "Cards", "Loans", "Insurance", "Investment"].map(t => (
            <div key={t} style={{ border: "1px solid #ddd", padding: 4, fontSize: 7, textAlign: "center", background: "#f8fafc" }}>{t}</div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "phish") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#fff", color: "#111", overflow: "hidden", fontSize: 8, position: "relative" }}>
        <div style={{ background: "#003087", color: "#fff", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
          <div style={{ fontWeight: 900, fontSize: 13, fontStyle: "italic" }}>PayPal</div>
          {bboxes && <div style={{ position: "absolute", inset: "4px 6px 4px 6px", border: "1.5px dashed var(--phishing)", borderRadius: 3, pointerEvents: "none" }}>
            <span style={{ position: "absolute", top: -14, left: 0, fontSize: 7, background: "var(--phishing)", color: "#fff", padding: "1px 4px", borderRadius: 2, fontFamily: "var(--font-mono)" }}>LOGO pHash 91%</span>
          </div>}
        </div>
        <div style={{ padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Verify your account</div>
          <div style={{ fontSize: 7, color: "#666", marginBottom: 12 }}>Your account access has been limited.<br/>Confirm your identity to restore service.</div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6, maxWidth: 140, margin: "0 auto" }}>
            <div style={{ border: "1px solid #ccc", borderRadius: 3, padding: "4px 6px", textAlign: "left", color: "#999", fontSize: 7 }}>Email</div>
            <div style={{ border: "1px solid #ccc", borderRadius: 3, padding: "4px 6px", textAlign: "left", color: "#999", fontSize: 7 }}>Password</div>
            <div style={{ background: "#003087", color: "#fff", padding: 4, borderRadius: 3, fontWeight: 600, fontSize: 8 }}>Log In</div>
            {bboxes && <div style={{ position: "absolute", inset: "-4px -4px -4px -4px", border: "1.5px solid var(--phishing)", borderRadius: 5, boxShadow: "0 0 0 1px rgba(0,0,0,0.5)" }}>
              <span style={{ position: "absolute", top: -14, right: -2, fontSize: 7, background: "var(--phishing)", color: "#fff", padding: "1px 4px", borderRadius: 2, fontFamily: "var(--font-mono)" }}>FORM POST → evil-collector.tk</span>
            </div>}
          </div>
        </div>
      </div>
    );
  }
  if (kind === "malware") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#fff", color: "#111", overflow: "hidden", fontSize: 8 }}>
        <div style={{ background: "#ed1c24", color: "#fff", padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 14, height: 14, background: "#fff", color: "#ed1c24", fontWeight: 900, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2 }}>Fl</div>
          <div style={{ fontSize: 8, fontWeight: 600 }}>Adobe Flash Player Update</div>
        </div>
        <div style={{ padding: "16px 12px", background: "#f5f5f5" }}>
          <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6 }}>⚠ Your Flash Player is outdated</div>
          <div style={{ fontSize: 7, color: "#444", marginBottom: 14 }}>Click below to install the critical security update.</div>
          <div style={{ position: "relative", background: "#16a34a", color: "#fff", padding: "8px 12px", borderRadius: 4, textAlign: "center", fontWeight: 700, fontSize: 9, maxWidth: 140, margin: "0 auto" }}>
            ⬇ DOWNLOAD NOW (2.4 MB)
            {bboxes && <div style={{ position: "absolute", inset: "-4px -4px -4px -4px", border: "1.5px solid var(--phishing)", borderRadius: 5 }}>
              <span style={{ position: "absolute", top: -14, left: 0, fontSize: 7, background: "var(--phishing)", color: "#fff", padding: "1px 4px", borderRadius: 2, fontFamily: "var(--font-mono)" }}>AUTO-DOWNLOAD .exe</span>
            </div>}
          </div>
          <div style={{ marginTop: 14, fontSize: 6.5, color: "#888", textAlign: "center" }}>By clicking, you agree to install fp_setup.exe</div>
        </div>
      </div>
    );
  }
  // deface
  return (
    <div style={{ width: "100%", height: "100%", background: "#000", color: "#ff0040", overflow: "hidden", fontSize: 8, position: "relative", fontFamily: "var(--font-mono)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 30%, rgba(255,0,64,0.15), transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,0,64,0.08) 1px, transparent 1px)", backgroundSize: "100% 4px" }} />
      <div style={{ position: "relative", padding: "20px 12px", textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "0.1em", textShadow: "0 0 8px #ff0040, 0 0 2px #fff" }}>HACKED</div>
        <div style={{ fontSize: 9, marginTop: 4, color: "#fff", letterSpacing: "0.2em" }}>BY Mr.Phantom</div>
        <div style={{ fontSize: 6.5, marginTop: 14, color: "#ff0040", opacity: 0.7 }}>// your security is an illusion</div>
        <div style={{ fontSize: 6.5, marginTop: 4, color: "#ff0040", opacity: 0.7 }}>// greetz to anonymous_squad</div>
        <div style={{ marginTop: 14, fontSize: 14, animation: "blink 1.2s infinite" }}>☠</div>
      </div>
    </div>
  );
}
