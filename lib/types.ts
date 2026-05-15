// SafeTrace — shared TypeScript types
// These must match the Pydantic schemas in apps/api/models/schemas.py exactly.
// VERDICT_DATA in the prototype (screens/scan.jsx) is the canonical example.

export type Verdict = "safe" | "suspicious" | "phishing" | "malware" | "defacement";

export type SubScoreStatus = "ok" | "warn" | "bad";

export interface SubScore {
  icon: "globe" | "file-code" | "braces" | "image";
  label: "Network & Identity" | "HTML inspection" | "JavaScript" | "Visual analysis";
  score: number;             // 0–25
  status: SubScoreStatus;
}

export interface ShapFeature {
  feature: string;
  weight: number;            // negative = pushes toward risk
  dir: "safe" | "risk";
}

export type EvidenceType = "ok" | "warn" | "bad";

export interface EvidenceItem {
  type: EvidenceType;
  text: string;
}

export interface EvidenceSection {
  flags: number;
  items: EvidenceItem[];
}

export interface ThreatIntelEntry {
  name: "Google Safe Browsing" | "PhishTank" | "URLhaus" | "OpenPhish" | "Zone-H archive";
  status: "clean" | "flagged";
  detail?: string;
}

export interface BrandMatch {
  name: string;
  match: number;             // 0–100 pHash similarity
  logo: string;              // 2–3 char swatch
  imposter: boolean;
}

export interface CodeSnippet {
  title: string;
  language: "html" | "js" | "css";
  code: string;
  highlights: number[];      // line numbers to flag red
}

export interface ScanResult {
  id: string;
  verdict: Verdict;
  url: string;
  domain: string;
  ip: string;
  riskScore: number;         // 0–100 aggregate
  confidence: number;        // 0–100
  scannedAt: string;         // ISO 8601
  // IMPORTANT: this is a data URL (data:image/png;base64,...) NOT a remote URL.
  // The FastAPI backend embeds the Playwright screenshot inline so we don't need S3/R2.
  screenshotUrl: string;
  brand: BrandMatch;
  subscores: SubScore[];     // exactly 4
  shap: ShapFeature[];       // top 5
  evidence: {
    network: EvidenceSection;
    html: EvidenceSection;
    js: EvidenceSection;
    visual: EvidenceSection;
  };
  threatIntel: ThreatIntelEntry[];
  codeSnippets?: CodeSnippet[];
}

export interface ScanPoint {
  lat: number;
  lon: number;
  verdict: Verdict;
  city: string;
}

export interface RecentPhishRow {
  url: string;
  brand: string;
  score: number;
  when: string;
}

export interface BrandRow {
  brand: string;
  count: number;
  color: string;
}

export interface DashboardStats {
  kpis: {
    scansToday: number;
    phishingCaught: number;
    malwareCaught: number;
    avgResponse: string;
  };
  scanPoints: ScanPoint[];
  timeSeries: {
    safe: number[];
    phishing: number[];
    malware: number[];
    defacement: number[];
  };
  topBrands: BrandRow[];
  recentPhish: RecentPhishRow[];
}

// Verdict palette mapping — used by VerdictChip and anything that color-codes by verdict.
export interface VerdictMeta {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: "shield-check" | "shield-alert" | "fish" | "bug" | "paint-bucket";
}

export const VERDICTS: Record<Verdict, VerdictMeta> = {
  safe:       { label: "Safe",       color: "var(--safe)",       bg: "var(--safe-bg)",       border: "var(--safe-border)",       icon: "shield-check" },
  suspicious: { label: "Suspicious", color: "var(--suspicious)", bg: "var(--suspicious-bg)", border: "var(--suspicious-border)", icon: "shield-alert" },
  phishing:   { label: "Phishing",   color: "var(--phishing)",   bg: "var(--phishing-bg)",   border: "var(--phishing-border)",   icon: "fish" },
  malware:    { label: "Malware",    color: "var(--malware)",    bg: "var(--malware-bg)",    border: "var(--malware-border)",    icon: "bug" },
  defacement: { label: "Defacement", color: "var(--defacement)", bg: "var(--defacement-bg)", border: "var(--defacement-border)", icon: "paint-bucket" },
};
