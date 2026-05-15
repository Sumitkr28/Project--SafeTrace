"use client";

export interface AiMeshBackgroundProps {
  scanning?: boolean;
}

/**
 * Ambient mesh decoration behind hero + scanning states.
 * `scanning` cranks up motion: faster radar, packet flow, scan lines, blinking STATUS.
 */
export function AiMeshBackground({ scanning = false }: AiMeshBackgroundProps) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "min(900px, 90vw)",
        height: "min(900px, 90vw)",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(ellipse at center, rgba(103, 232, 249, 0.06) 0%, transparent 60%)",
      }} />

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(1200px, 110vw)",
        height: "min(1200px, 110vw)",
        maskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 45%, black 75%, black 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 45%, black 75%, black 100%)",
      }}>
        {[1, 0.78, 0.58].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${s})`,
            borderRadius: "50%",
            border: `1px solid ${i === 0 ? "var(--border)" : "var(--border-subtle)"}`,
            animation: `ring-breathe ${scanning ? 5 + i * 0.8 : 8 + i * 1.2}s ease-in-out infinite`,
            animationDelay: `${i * (scanning ? 0.25 : 0.5)}s`,
          }} />
        ))}
      </div>

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "min(1200px, 110vw)",
        height: "min(1200px, 110vw)",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: scanning
          ? "conic-gradient(from 0deg, transparent 0deg, rgba(103, 232, 249, 0.20) 30deg, transparent 60deg)"
          : "conic-gradient(from 0deg, transparent 0deg, rgba(103, 232, 249, 0.10) 24deg, transparent 50deg)",
        animation: `radar-sweep ${scanning ? "4s" : "9s"} linear infinite`,
        maskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 50%, black 78%)",
        WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, transparent 50%, black 78%)",
      }} />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", opacity: scanning ? 0.75 : 0.55,
      }}>
        {/* Top-left cluster */}
        <g>
          <line x1="6"  y1="14" x2="14" y2="18" stroke="var(--accent)" strokeWidth="0.08" opacity="0.4"/>
          <line x1="14" y1="18" x2="11" y2="26" stroke="var(--accent)" strokeWidth="0.08" opacity="0.4"/>
          <line x1="6"  y1="14" x2="11" y2="26" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <line x1="14" y1="18" x2="20" y2="14" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <circle cx="6"  cy="14" r="0.5" fill="var(--accent)">
            <animate attributeName="r" values={scanning ? "0.5;1;0.5" : "0.5;0.75;0.5"} dur={scanning ? "1.8s" : "4.5s"} repeatCount="indefinite"/>
          </circle>
          <circle cx="14" cy="18" r="0.7" fill="var(--accent)">
            <animate attributeName="r" values={scanning ? "0.7;1.2;0.7" : "0.7;0.95;0.7"} dur={scanning ? "1.4s" : "3.8s"} begin="0.3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="11" cy="26" r="0.5" fill="var(--accent)" opacity="0.7"/>
          <circle cx="20" cy="14" r="0.4" fill="var(--accent)" opacity="0.6"/>
          <circle r={scanning ? "0.6" : "0.45"} fill="var(--accent-bright)" style={{ filter: "drop-shadow(0 0 2px var(--accent))" }}>
            <animateMotion path="M 6 14 L 14 18 L 11 26" dur={scanning ? "2.4s" : "6s"} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur={scanning ? "2.4s" : "6s"} repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Bottom-right cluster */}
        <g>
          <line x1="94" y1="86" x2="86" y2="82" stroke="var(--accent)" strokeWidth="0.08" opacity="0.4"/>
          <line x1="86" y1="82" x2="89" y2="74" stroke="var(--accent)" strokeWidth="0.08" opacity="0.4"/>
          <line x1="94" y1="86" x2="89" y2="74" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <line x1="86" y1="82" x2="80" y2="86" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <circle cx="94" cy="86" r="0.5" fill="var(--accent)">
            <animate attributeName="r" values={scanning ? "0.5;1;0.5" : "0.5;0.75;0.5"} dur={scanning ? "1.6s" : "5s"} begin="0.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="86" cy="82" r="0.7" fill="var(--accent)">
            <animate attributeName="r" values={scanning ? "0.7;1.2;0.7" : "0.7;0.95;0.7"} dur={scanning ? "1.5s" : "4.2s"} begin="0.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="89" cy="74" r="0.5" fill="var(--accent)" opacity="0.7"/>
          <circle cx="80" cy="86" r="0.4" fill="var(--accent)" opacity="0.6"/>
          <circle r={scanning ? "0.6" : "0.45"} fill="var(--accent-bright)" style={{ filter: "drop-shadow(0 0 2px var(--accent))" }}>
            <animateMotion path="M 94 86 L 86 82 L 89 74" dur={scanning ? "2.0s" : "5.5s"} begin={scanning ? "0.5s" : "1.5s"} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur={scanning ? "2.0s" : "5.5s"} begin={scanning ? "0.5s" : "1.5s"} repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Top-right cluster */}
        <g>
          <line x1="92" y1="20" x2="84" y2="16" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <line x1="84" y1="16" x2="78" y2="22" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <circle cx="92" cy="20" r="0.5" fill="var(--accent)" opacity="0.7"/>
          <circle cx="84" cy="16" r="0.6" fill="var(--accent)">
            <animate attributeName="r" values={scanning ? "0.6;1.1;0.6" : "0.6;0.85;0.6"} dur={scanning ? "1.7s" : "4.6s"} begin="0.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="78" cy="22" r="0.4" fill="var(--accent)" opacity="0.6"/>
          <circle r={scanning ? "0.5" : "0.4"} fill="var(--accent-bright)" style={{ filter: "drop-shadow(0 0 2px var(--accent))" }}>
            <animateMotion path="M 92 20 L 84 16 L 78 22" dur={scanning ? "2.8s" : "7s"} begin={scanning ? "0.8s" : "2.4s"} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur={scanning ? "2.8s" : "7s"} begin={scanning ? "0.8s" : "2.4s"} repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Bottom-left cluster */}
        <g>
          <line x1="8"  y1="80" x2="16" y2="76" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <line x1="16" y1="76" x2="20" y2="84" stroke="var(--accent)" strokeWidth="0.08" opacity="0.3"/>
          <circle cx="8"  cy="80" r="0.5" fill="var(--accent)" opacity="0.7"/>
          <circle cx="16" cy="76" r="0.6" fill="var(--accent)">
            <animate attributeName="r" values={scanning ? "0.6;1.1;0.6" : "0.6;0.85;0.6"} dur={scanning ? "1.5s" : "5.2s"} begin="0.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="84" r="0.4" fill="var(--accent)" opacity="0.6"/>
          <circle r={scanning ? "0.5" : "0.4"} fill="var(--accent-bright)" style={{ filter: "drop-shadow(0 0 2px var(--accent))" }}>
            <animateMotion path="M 8 80 L 16 76 L 20 84" dur={scanning ? "2.6s" : "6.8s"} begin={scanning ? "0.2s" : "0.8s"} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;1;0" dur={scanning ? "2.6s" : "6.8s"} begin={scanning ? "0.2s" : "0.8s"} repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>

      <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "linear-gradient(180deg, transparent, var(--border-subtle) 30%, var(--border-subtle) 70%, transparent)", opacity: 0.4 }} />

      {scanning && (
        <>
          <div style={{
            position: "absolute",
            top: 0, bottom: 0, width: 2,
            background: "linear-gradient(180deg, transparent, var(--accent), transparent)",
            boxShadow: "0 0 24px var(--accent)",
            left: "-2px",
            animation: "map-sweep 5s linear infinite",
            opacity: 0.5,
          }} />
          <div style={{
            position: "absolute",
            left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            boxShadow: "0 0 18px var(--accent)",
            top: "-2px",
            animation: "scan-vertical 4.2s linear infinite",
            opacity: 0.35,
          }} />
        </>
      )}

      <div style={{
        position: "absolute",
        top: 32, left: 32,
        fontFamily: "var(--font-mono)", fontSize: 10,
        color: "var(--text-dim)", opacity: 0.5,
        letterSpacing: "0.08em",
      }}>
        <div>NODE / xgb-v2.3</div>
        <div style={{ color: "var(--accent)", opacity: 0.7 }}>
          STATUS · {scanning ? <span style={{ animation: "blink 1.1s infinite" }}>SCANNING</span> : "ONLINE"}
        </div>
      </div>
      <div style={{
        position: "absolute",
        bottom: 32, right: 32,
        fontFamily: "var(--font-mono)", fontSize: 10,
        color: "var(--text-dim)", opacity: 0.5,
        textAlign: "right",
        letterSpacing: "0.08em",
      }}>
        <div>FEATURES · 112</div>
        <div style={{ color: "var(--accent)", opacity: 0.7 }}>LATENCY ~ 3.8s</div>
      </div>
    </div>
  );
}
