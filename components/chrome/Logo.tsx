export interface LogoProps {
  size?: number;
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox="0 0 36 40" fill="none">
          <defs>
            <linearGradient id="shieldSteel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#c8c1b3" />
              <stop offset="40%"  stopColor="#6b6458" />
              <stop offset="100%" stopColor="#2a2722" />
            </linearGradient>
            <linearGradient id="shieldSheen" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%"  stopColor="rgba(255,255,255,0.40)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <radialGradient id="shieldGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.55" />
              <stop offset="70%"  stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="18" cy="20" rx="18" ry="20" fill="url(#shieldGlow)" />

          <path d="M18 2 L33 6 L33 19 C33 28 27 35 18 38 C9 35 3 28 3 19 L3 6 Z"
                fill="url(#shieldSteel)" stroke="var(--steel-400)" strokeWidth="0.7" />
          <path d="M18 2 L33 6 L33 16 C33 16 26 18 18 18 C10 18 3 16 3 16 L3 6 Z"
                fill="url(#shieldSheen)" opacity="0.5" />

          <path d="M18 6 L29 9 L29 19 C29 26 24.5 31 18 33.5 C11.5 31 7 26 7 19 L7 9 Z"
                fill="none" stroke="var(--accent)" strokeWidth="0.7" opacity="0.55" />

          <line x1="18" y1="11" x2="18" y2="16" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="18" y1="24" x2="18" y2="29" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="10" y1="20" x2="15" y2="20" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="21" y1="20" x2="26" y2="20" stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="round"/>

          <circle cx="18" cy="20" r="3.2" fill="var(--bg-deep)" stroke="var(--accent)" strokeWidth="0.9" />
          <circle cx="18" cy="20" r="1.5" fill="var(--accent)" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 3 }}>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.015em" }}>
          Safe<span style={{ color: "var(--accent)" }}>Trace</span>
        </span>
        <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--text-dim)", letterSpacing: "0.22em", textTransform: "uppercase" }}>AI · URL forensics</span>
      </div>
    </div>
  );
}
