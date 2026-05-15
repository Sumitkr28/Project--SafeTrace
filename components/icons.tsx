"use client";

// SafeTrace — Lucide-style icon set.
// All icons share the same SVG props; pass `size` and `stroke` to tune.

import type { CSSProperties, ReactNode } from "react";

export interface IconProps {
  size?: number;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
}

interface InternalProps extends IconProps {
  children: ReactNode;
}

const Icon = ({ size = 18, stroke = 1.6, style, className, children }: InternalProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    {children}
  </svg>
);

const IconShieldCheck = (p: IconProps) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconShieldAlert = (p: IconProps) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></Icon>;
const IconFish = (p: IconProps) => <Icon {...p}><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/></Icon>;
const IconBug = (p: IconProps) => <Icon {...p}><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></Icon>;
const IconPaintBucket = (p: IconProps) => <Icon {...p}><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></Icon>;
const IconGlobe = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></Icon>;
const IconFileCode = (p: IconProps) => <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/></Icon>;
const IconBraces = (p: IconProps) => <Icon {...p}><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></Icon>;
const IconImage = (p: IconProps) => <Icon {...p}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></Icon>;
const IconRadar = (p: IconProps) => <Icon {...p}><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 17.7 14"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/></Icon>;
const IconFiles = (p: IconProps) => <Icon {...p}><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/><path d="M15 2v5h5"/></Icon>;
const IconHistory = (p: IconProps) => <Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></Icon>;
const IconChart = (p: IconProps) => <Icon {...p}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></Icon>;
const IconInfo = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></Icon>;
const IconSearch = (p: IconProps) => <Icon {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon>;
const IconChevronDown = (p: IconProps) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>;
const IconChevronRight = (p: IconProps) => <Icon {...p}><path d="m9 18 6-6-6-6"/></Icon>;
const IconCopy = (p: IconProps) => <Icon {...p}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></Icon>;
const IconCheck = (p: IconProps) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>;
const IconX = (p: IconProps) => <Icon {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>;
const IconDownload = (p: IconProps) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const IconShare = (p: IconProps) => <Icon {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></Icon>;
const IconExternalLink = (p: IconProps) => <Icon {...p}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></Icon>;
const IconArrowRight = (p: IconProps) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
const IconLock = (p: IconProps) => <Icon {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const IconUpload = (p: IconProps) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Icon>;
const IconGithub = (p: IconProps) => <Icon {...p}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></Icon>;
const IconFilter = (p: IconProps) => <Icon {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const IconPlus = (p: IconProps) => <Icon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Icon>;
const IconActivity = (p: IconProps) => <Icon {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>;
const IconZap = (p: IconProps) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const IconCpu = (p: IconProps) => <Icon {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2"/><path d="M15 2v2"/><path d="M9 20v2"/><path d="M15 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M20 15h2"/></Icon>;
const IconTerminal = (p: IconProps) => <Icon {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></Icon>;
const IconClock = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const IconTarget = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>;
const IconLayers = (p: IconProps) => <Icon {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>;
const IconMenu = (p: IconProps) => <Icon {...p}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></Icon>;

export type IconName =
  | "shield-check" | "shield-alert" | "fish" | "bug" | "paint-bucket"
  | "globe" | "file-code" | "braces" | "image" | "radar"
  | "files" | "history" | "chart" | "info" | "search"
  | "chevron-down" | "chevron-right" | "copy" | "check" | "x"
  | "download" | "share" | "external-link" | "arrow-right" | "lock"
  | "upload" | "github" | "filter" | "plus" | "activity"
  | "zap" | "cpu" | "terminal" | "clock" | "target" | "layers" | "menu";

const ICONS: Record<IconName, (p: IconProps) => JSX.Element> = {
  "shield-check": IconShieldCheck,
  "shield-alert": IconShieldAlert,
  fish: IconFish,
  bug: IconBug,
  "paint-bucket": IconPaintBucket,
  globe: IconGlobe,
  "file-code": IconFileCode,
  braces: IconBraces,
  image: IconImage,
  radar: IconRadar,
  files: IconFiles,
  history: IconHistory,
  chart: IconChart,
  info: IconInfo,
  search: IconSearch,
  "chevron-down": IconChevronDown,
  "chevron-right": IconChevronRight,
  copy: IconCopy,
  check: IconCheck,
  x: IconX,
  download: IconDownload,
  share: IconShare,
  "external-link": IconExternalLink,
  "arrow-right": IconArrowRight,
  lock: IconLock,
  upload: IconUpload,
  github: IconGithub,
  filter: IconFilter,
  plus: IconPlus,
  activity: IconActivity,
  zap: IconZap,
  cpu: IconCpu,
  terminal: IconTerminal,
  clock: IconClock,
  target: IconTarget,
  layers: IconLayers,
  menu: IconMenu,
};

export interface IcoProps extends IconProps {
  name: IconName;
}

export const Ico = ({ name, ...rest }: IcoProps) => {
  const C = ICONS[name];
  return C ? <C {...rest} /> : null;
};
