# SafeTrace

> **A free tool that tells you if a website is safe to visit — in under 5 seconds.**

<p align="center">
  <a href="https://project-safe-trace.vercel.app">
    <img src="https://img.shields.io/badge/🛡️_Try_SafeTrace_Live-22d3ee?style=for-the-badge&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <a href="https://project-safe-trace.vercel.app"><b>👉 project-safe-trace.vercel.app</b></a>
</p>

---

## What it does

Paste any URL. SafeTrace checks if it's:

🟢 **Safe** · 🟡 **Suspicious** · 🔴 **Phishing** · 🔴 **Malware** · 🟠 **Defacement**

…and shows you **exactly why** with concrete evidence — not just a yes/no.

## Why it's different

Most URL checkers only look at the link itself. SafeTrace actually **visits the website in a real browser**, takes a screenshot, and inspects:

- Who owns the domain and when it was registered
- Whether the page contains fake login forms or hidden iframes
- Whether the JavaScript is hiding suspicious behaviour
- Whether the page is impersonating a known brand (PayPal, Amazon, banks, etc.)
- Whether security databases (Google Safe Browsing, URLhaus) already flagged it

Two independent verdicts run side-by-side — a Machine Learning model and a deep forensic analyzer — so you can see them agree (high confidence) or disagree (worth a closer look).

## Try these examples

| URL | Expected verdict |
|---|---|
| `https://github.com` | 🟢 Safe |
| `https://www.google.com` | 🟢 Safe |
| `http://paypa1-verify.tk/login.php` | 🔴 Phishing |
| `https://demo.io/dashboard` | 🟠 Suspicious |

## Features

- ⚡ **Sub-5-second verdict** on a single URL
- 📸 **Live screenshot** of the page inside the result
- 🧠 **Explainable AI** — shows which features pushed the prediction up or down
- 📊 **Risk breakdown** across 4 categories (Network, HTML, JavaScript, Visual)
- 📋 **Bulk scan** — upload a CSV of up to 500 URLs at once
- 🌍 **Live threat dashboard** with a world map of recent scans

## Tech behind it

| Layer | Stack |
|---|---|
| Frontend | Next.js 14 · TypeScript · TailwindCSS |
| Backend | FastAPI (Python 3.11) · Uvicorn · Playwright (headless Chromium) |
| Machine Learning | scikit-learn · XGBoost · LightGBM · CatBoost · SHAP (stacking ensemble) |
| Brand-impersonation | imagehash (perceptual hash) |
| Threat feeds | Google Safe Browsing · URLhaus |
| Hosting | Vercel (frontend) + Hugging Face Spaces (backend) — 100% free tier |

## Architecture

```text
┌───────────────────┐       ┌──────────────────────┐       ┌────────────────────┐
│  Next.js (Vercel) │ ──►   │  FastAPI (HF Space)  │ ──►   │  HF Model repo     │
│   the UI          │       │   ML + analyzers     │       │  2 GB model file   │
└───────────────────┘       └──────────────────────┘       └────────────────────┘
```

Fully stateless — no database, no user accounts, no tracking. Screenshots are inlined as base64 in the API response.

## Built by

**Sumit Kumar** — Final-year B.Tech CSE major project.
Looking for opportunities? Connect on [LinkedIn](https://www.linkedin.com/in/sumitkr28) or email me.

## For developers — running locally

<details>
<summary>Click to expand</summary>

```bash
# Frontend
git clone https://github.com/Sumitkr28/Project--SafeTrace.git
cd Project--SafeTrace
npm install
cp .env.example .env.local
# point NEXT_PUBLIC_API_URL at your backend (default: http://localhost:7860)
npm run dev

# Backend (separate clone)
git clone https://huggingface.co/spaces/Sumitkr28/safetrace-api
cd safetrace-api
pip install -r requirements.txt
playwright install chromium
uvicorn api:app --port 7860
```

The 2 GB model auto-downloads from <https://huggingface.co/Sumitkr28/safetrace-model> on first run.

</details>

## License

MIT — free to use, fork, and adapt.
