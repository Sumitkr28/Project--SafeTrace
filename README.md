# SafeTrace

> **A free tool that tells you if a website is safe to visit — in under 5 seconds.**

<p align="center"><strong>Try&nbsp;&nbsp;↓</strong></p>
<p align="center">
  <a href="https://safetrace-ai.vercel.app">
    <img src="https://img.shields.io/badge/SafeTrace--ai-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="SafeTrace-ai" height="40" />
  </a>
</p>

<p align="center">SafeTrace analyzes any URL and returns an explainable, evidence-backed safety verdict in under 5 seconds — combining an ML stacking ensemble with live-browser forensic checks.</p>

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

Hi, I'm **Sumit Kumar** — an AI/ML Engineer based in Noida, India. I design, build, and ship production-grade AI products end-to-end, and I built **SafeTrace** across every layer: the ML stacking ensemble, the live-browser forensic analyzer, the FastAPI backend, and the Next.js interface.

I'm always open to connecting with recruiters, founders, and fellow builders — if you like what you see here, let's talk.

- 🌐 **Portfolio:** [sumitkr28.vercel.app](https://sumitkr28.vercel.app)
- 💼 **LinkedIn:** [linkedin.com/in/sumit-kumar2812](https://www.linkedin.com/in/sumit-kumar2812/)
- 🐙 **GitHub:** [github.com/Sumitkr28](https://github.com/Sumitkr28)
- 🚀 **AI Studio:** [Xorvion](https://xorvion-ai.vercel.app)
