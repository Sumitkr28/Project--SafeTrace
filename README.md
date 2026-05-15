# SafeTrace — Web Frontend (pre-built)

Next.js 14 + TypeScript + Tailwind project, **already ported from the design prototype**. Drop this folder into your monorepo as `apps/web/` and it works.

## Quick start

```bash
cd apps/web
cp .env.example .env.local        # edit NEXT_PUBLIC_API_URL to point at your FastAPI backend
npm install
npm run dev                       # http://localhost:3000
```

If the backend isn't running yet, the UI still renders — `/scan` calls will fail with a toast, dashboard data shows zeros, but every screen displays correctly. The splash, animations, mesh background, world map continents, and verdict pages all work without a backend.

## What's wired up

| File | Status |
|---|---|
| Splash intro (2.7s, click-to-skip, `?nosplash=1` to skip via URL) | ✅ |
| Top nav with 4 routes + active state | ✅ |
| Footer with toast links + 2026 copyright | ✅ |
| Toast system (replaces prototype's `window.toast`) | ✅ |
| Scan flow: empty → scanning → result, all states wired to real `/scan` | ✅ |
| 4 verdict variants render from API response | ✅ |
| Real Playwright screenshots via inline base64 data URLs | ✅ |
| Bulk scan with live SSE progress | ✅ |
| Dashboard with live world map, charts, KPIs | ✅ |
| About / methodology static page | ✅ |
| Particles background (toggleable behaviour preserved) | ✅ |
| Every animation from the prototype | ✅ |

## What's NOT here (intentional)

- **No History page** — feature cut per the final plan
- **No Tweaks panel** — design-time only, not for production
- **No database** — backend uses in-memory deque
- **No external storage** — screenshots come as base64 in the JSON response

## Folder structure

```
apps/web/
├── app/
│   ├── layout.tsx                # root layout — fonts + ToastProvider
│   ├── _shell.tsx                # client shell — Splash + TopNav + Footer + Particles
│   ├── page.tsx                  # / Scan
│   ├── bulk/page.tsx             # /bulk
│   ├── dashboard/page.tsx        # /dashboard
│   ├── about/page.tsx            # /about
│   └── globals.css               # all design tokens + keyframes (ported from theme.css)
├── components/
│   ├── icons.tsx                 # Ico component + all icon names
│   ├── ui/                       # 13 primitives
│   ├── chrome/                   # Logo, TopNav, Footer, Splash, Particles
│   ├── scan/                     # AiMeshBackground, ScanEmpty, ScanProgress, ScanResult, ScreenshotMock
│   └── dashboard/                # WorldMap, TimeSeriesChart, BrandBars
├── lib/
│   ├── api.ts                    # scanUrl, getDashboardStats, bulkScan (SSE)
│   └── types.ts                  # ScanResult + supporting types — keep in sync with backend
├── hooks/useToast.tsx            # ToastProvider + useToast()
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
└── .env.example
```

## Wiring the backend

The single source of truth for what the backend should return is `apps/web/lib/types.ts`. The FastAPI Pydantic schemas in `apps/api/models/schemas.py` must match `ScanResult`, `DashboardStats`, and `ScanPoint` field names + types exactly.

The screenshot URL field is **a data URL**, not a remote URL:
```python
import base64
data_url = f"data:image/png;base64,{base64.b64encode(png_bytes).decode()}"
return ScanResult(..., screenshotUrl=data_url, ...)
```

## Deploying to Vercel

1. Push the monorepo to GitHub.
2. On Vercel, "Import Project" → set **Root Directory** to `apps/web`.
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-username-safetrace-api.hf.space`.
4. Deploy. Auto-deploys on every push to `main`.

## Where the design lives

If you ever need to verify a visual detail, open `SafeTrace.html` (the prototype, in the same handoff bundle) in your browser. That file is the design source of truth. Every component in `components/` was ported from a corresponding chunk of that prototype.

The original JSX prototype files are kept in the handoff bundle root for reference:
- `theme.css` → `app/globals.css` (verbatim port)
- `lib/icons.jsx` → `components/icons.tsx`
- `lib/ui.jsx` → `components/ui/*.tsx`
- `app.jsx` → `components/chrome/*.tsx`
- `screens/scan.jsx` → `components/scan/*.tsx`
- `screens/dashboard-about.jsx` → `app/{dashboard,about}/page.tsx` + `components/dashboard/*.tsx`
- `screens/bulk-history.jsx` → `app/bulk/page.tsx` (History portion deleted)
