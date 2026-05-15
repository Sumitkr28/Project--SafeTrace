# SafeTrace — AI-Powered Malicious URL Detection

[![Live Demo](https://img.shields.io/badge/demo-live-22d3ee?style=flat-square)](https://safetrace.vercel.app)
[![Backend API](https://img.shields.io/badge/api-huggingface-yellow?style=flat-square)](https://huggingface.co/spaces/Sumitkr28/safetrace-api)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

SafeTrace tells you whether a URL is **Safe, Suspicious, Phishing, Malware, or Defacement** in under 5 seconds — and shows *exactly why* with concrete forensic evidence. Final-year B.Tech CSE major project; built to look and feel like a real security product (think VirusTotal / urlscan.io), not a college demo.

## What it does

For every URL you paste:

- **Stacking-ensemble ML classifier** (RandomForest + LightGBM + XGBoost + CatBoost → Logistic Regression meta-model) gives a verdict with SHAP feature explanations.
- **Deep site analyzer** visits the page in a real headless browser, takes a screenshot, and inspects: WHOIS / TLS / DNS, HTML forms + iframes, JavaScript obfuscation patterns, perceptual-hash brand impersonation, scareware text overlays.
- **Live threat intelligence** — Google Safe Browsing + URLhaus lookups in parallel.

The result page surfaces **two streams of evidence side by side** — the ML model verdict and the deep-site forensics — so you can see them agree (high confidence) or disagree (worth investigating).

## Live URLs

- **Frontend** — <https://safetrace.vercel.app>
- **Backend API** — <https://sumitkr28-safetrace-api.hf.space> (`/docs` for Swagger UI)
- **Model weights** — <https://huggingface.co/Sumitkr28/safetrace-model>

## Architecture

```text
┌────────────────────┐         ┌──────────────────────────┐         ┌────────────────────┐
│  Next.js frontend  │  HTTPS  │     FastAPI backend      │   HTTP  │   HF Model repo    │
│   on Vercel        │ ──────► │   on Hugging Face Space  │ ──────► │  (2 GB pickle)     │
└────────────────────┘         │   Playwright + Chromium  │         └────────────────────┘
                               │   ML stack + SHAP        │
                               │   Threat intel (GSB +    │
                               │   URLhaus) in parallel   │
                               └──────────────────────────┘
```

100% free tier — Vercel Hobby + Hugging Face Spaces Docker (CPU basic, 16 GB RAM). $0/month total.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) · TypeScript · TailwindCSS · IBM Plex Sans / JetBrains Mono |
| World map | `react-simple-maps` + Natural Earth `world-atlas` topojson |
| Backend | FastAPI · Uvicorn · Python 3.11 |
| ML | scikit-learn · XGBoost · LightGBM · CatBoost · SHAP (TreeExplainer) |
| Browser automation | Playwright (Chromium headless) |
| Brand impersonation | `imagehash` (pHash) |
| State | In-memory `deque` only — fully stateless, no DB |
| Hosting | Vercel (frontend) + Hugging Face Spaces (backend) + HF Model repo (weights) |
| Threat feeds | Google Safe Browsing API · URLhaus |

## Features

- ⚡ **Sub-5-second verdict** for a single URL
- 📊 **Aggregate risk score** (0–100) + 4 sub-scores (Network, HTML, JavaScript, Visual)
- 🧠 **Explainable ML** — top SHAP features per prediction
- 📸 **Real Playwright screenshots** inlined as base64 data URLs (no S3/R2)
- 📋 **Bulk scan** — upload a CSV (≤ 500 rows), stream results via SSE
- 🌍 **Threat dashboard** — live world map of recent scans, KPIs, brand impersonation chart
- 🔁 **Fully stateless** — no database, in-memory ring buffer

## Running locally

You'll need Node.js 18+ and Python 3.11+.

### Frontend

```bash
git clone https://github.com/Sumitkr28/Project--SafeTrace.git
cd Project--SafeTrace
npm install
cp .env.example .env.local
# edit NEXT_PUBLIC_API_URL → http://localhost:7860 to point at your local backend
npm run dev
```

Opens at <http://localhost:3000>.

### Backend (separate repo)

```bash
git clone https://huggingface.co/spaces/Sumitkr28/safetrace-api
cd safetrace-api
pip install -r requirements.txt
playwright install chromium
# create a .env with:
#   GOOGLE_SAFE_BROWSING_API_KEY=...
#   URLHAUS_API_KEY=...
uvicorn api:app --port 7860
```

Backend starts at <http://localhost:7860>; the 2 GB model auto-downloads from the HF Model repo on first request.

## API contract

`POST /scan` body: `{ "url": "https://..." }` returns `ScanResult` (see [lib/types.ts](lib/types.ts) for the full shape). Other endpoints: `POST /bulk` (CSV → SSE stream), `GET /dashboard/stats`, `GET /healthz`.

## Project structure

```text
.
├── app/                    # Next.js App Router
│   ├── page.tsx            # / Scan
│   ├── bulk/page.tsx       # /bulk
│   ├── dashboard/page.tsx  # /dashboard
│   ├── about/page.tsx      # /about
│   └── globals.css         # design tokens + keyframes
├── components/
│   ├── ui/                 # Button, Card, VerdictChip, …
│   ├── chrome/             # Logo, TopNav, Footer, Splash, Particles
│   ├── scan/               # Scan flow + AiMeshBackground
│   └── dashboard/          # WorldMap, TimeSeriesChart, BrandBars
├── lib/
│   ├── api.ts              # fetch client for the FastAPI backend
│   └── types.ts            # TypeScript types — mirror of the Pydantic schemas
└── hooks/useToast.tsx
```

## Acknowledgements

- World map data: [Natural Earth](https://www.naturalearthdata.com/) via `world-atlas`
- Threat feeds: [Google Safe Browsing](https://safebrowsing.google.com/) · [URLhaus](https://urlhaus.abuse.ch/)
- Icons: [Lucide](https://lucide.dev/)

## License

MIT — see [LICENSE](LICENSE).
