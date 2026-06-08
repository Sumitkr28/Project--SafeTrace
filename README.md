# SafeTrace

> **A free tool that tells you if a website is safe to visit — in under 5 seconds.**

<p align="center"><strong>Try&nbsp;&nbsp;↓</strong></p>
<p align="center">
  <a href="https://safetrace-ai.vercel.app">
    <img src="https://img.shields.io/badge/SafeTrace--ai-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="SafeTrace-ai" height="40" />
  </a>
</p>

<p align="center">Designed &amp; built end-to-end by <strong><a href="https://sumitkr28.vercel.app/">Sumit Kumar</a></strong> — creator of <strong><a href="https://xorvion-ai.vercel.app/">Xorvion</a></strong>, my studio for shipping AI projects from idea to production.</p>

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

## 👋 About the creator

Hi, I'm **Sumit Kumar** — an AI/ML Engineer based in Noida, India who loves taking AI products from idea to production. I build under **Xorvion**, my personal studio where I design, build, and ship multiple AI projects end-to-end. SafeTrace is one of them, and I owned every layer of it: the ML stacking ensemble, the live-browser forensic analyzer, the FastAPI backend, the Next.js interface, and the whole design system.

I'm always open to connecting with recruiters, founders, and fellow builders. If you like what you see here, let's talk.

- 🌐 **Portfolio:** [sumitkr28.vercel.app](https://sumitkr28.vercel.app/)
- 💼 **LinkedIn:** [linkedin.com/in/sumit-kumar2812](https://www.linkedin.com/in/sumit-kumar2812/)
- 🐙 **GitHub:** [github.com/Sumitkr28](https://github.com/Sumitkr28)

### 🚀 Xorvion — my studio

- 🌐 **Website:** [xorvion-ai.vercel.app](https://xorvion-ai.vercel.app/)
- 🔗 **LinkedIn:** [linkedin.com/company/xorvion](https://linkedin.com/company/xorvion)
- 🐙 **GitHub:** [github.com/xorvion-ai](https://github.com/xorvion-ai)
