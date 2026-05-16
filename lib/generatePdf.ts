// PDF report generator — uses jsPDF to render a clean SafeTrace scan report.
// Downloads directly to the user's device (Downloads folder on desktop,
// Files app / Photos on mobile depending on browser).

import { jsPDF } from "jspdf";
import type { ScanResult } from "./types";

const VERDICT_LABEL: Record<string, string> = {
  safe: "SAFE",
  suspicious: "SUSPICIOUS",
  phishing: "PHISHING",
  malware: "MALWARE",
  defacement: "DEFACEMENT",
};

const VERDICT_HEX: Record<string, [number, number, number]> = {
  safe:       [74, 222, 128],
  suspicious: [251, 191, 36],
  phishing:   [248, 113, 113],
  malware:    [239, 68, 68],
  defacement: [251, 146, 60],
};

export function generateScanPdf(d: ScanResult): void {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const W = pdf.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  // ----- Header -----
  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, W, 70, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("SafeTrace", margin, 38);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(180, 200, 220);
  pdf.text("AI-Powered URL Threat Detection Report", margin, 55);

  pdf.setFontSize(9);
  pdf.text(new Date(d.scannedAt).toLocaleString(), W - margin, 38, { align: "right" });
  pdf.text("safetrace-ai.vercel.app", W - margin, 55, { align: "right" });

  y = 100;
  pdf.setTextColor(20, 20, 20);

  // ----- Verdict banner -----
  const [r, g, b] = VERDICT_HEX[d.verdict] || [120, 120, 120];
  pdf.setFillColor(r, g, b);
  pdf.rect(margin, y, W - margin * 2, 60, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.text(VERDICT_LABEL[d.verdict] || "UNKNOWN", margin + 16, y + 26);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Risk Score: ${d.riskScore}/100`, margin + 16, y + 44);
  pdf.text(`Confidence: ${d.confidence}%`, margin + 200, y + 44);
  y += 80;

  // ----- URL block -----
  pdf.setTextColor(80, 80, 80);
  pdf.setFontSize(9);
  pdf.text("TARGET URL", margin, y);
  y += 14;
  pdf.setTextColor(20, 20, 20);
  pdf.setFontSize(11);
  pdf.setFont("courier", "normal");
  const urlLines = pdf.splitTextToSize(d.url, W - margin * 2);
  pdf.text(urlLines, margin, y);
  y += urlLines.length * 13 + 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(80, 80, 80);
  pdf.text(`Domain: ${d.domain}    IP: ${d.ip || "—"}`, margin, y);
  y += 24;

  // ----- Sub-scores -----
  pdf.setTextColor(20, 20, 20);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Sub-scores (Deep Analyzer)", margin, y);
  y += 18;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  for (const s of d.subscores) {
    const barX = margin + 180;
    const barW = 200;
    pdf.setTextColor(60, 60, 60);
    pdf.text(s.label, margin, y);
    pdf.text(`${s.score}/25`, margin + 130, y);
    // bar background
    pdf.setFillColor(230, 230, 230);
    pdf.rect(barX, y - 8, barW, 8, "F");
    // bar fill
    const pct = Math.min(1, s.score / 25);
    const bg: [number, number, number] = s.status === "ok" ? [74, 222, 128] : s.status === "warn" ? [251, 191, 36] : [248, 113, 113];
    pdf.setFillColor(...bg);
    pdf.rect(barX, y - 8, barW * pct, 8, "F");
    y += 18;
  }
  y += 8;

  // ----- SHAP features -----
  if (d.shap?.length) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 20, 20);
    pdf.text("Top ML Features (SHAP)", margin, y);
    y += 16;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    for (const s of d.shap) {
      pdf.setTextColor(s.dir === "risk" ? 200 : 60, s.dir === "risk" ? 50 : 140, s.dir === "risk" ? 50 : 60);
      const sign = s.dir === "risk" ? "−" : "+";
      pdf.text(`${sign}${Math.abs(s.weight).toFixed(3)}`, margin, y);
      pdf.setTextColor(60, 60, 60);
      pdf.text(s.feature, margin + 70, y);
      y += 14;
    }
    y += 8;
  }

  // ----- Evidence -----
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(20, 20, 20);
  pdf.text("Forensic Evidence", margin, y);
  y += 16;

  const sections: { title: string; items: { type: string; text: string }[] }[] = [
    { title: "Network & Identity", items: d.evidence.network.items },
    { title: "HTML Inspection",   items: d.evidence.html.items },
    { title: "JavaScript",         items: d.evidence.js.items },
    { title: "Visual Analysis",    items: d.evidence.visual.items },
  ];

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  for (const section of sections) {
    if (y > 720) { pdf.addPage(); y = margin; }
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(40, 40, 40);
    pdf.text(`${section.title}  (${section.items.length} flag${section.items.length === 1 ? "" : "s"})`, margin, y);
    y += 14;
    pdf.setFont("helvetica", "normal");
    if (section.items.length === 0) {
      pdf.setTextColor(140, 140, 140);
      pdf.text("  No issues detected.", margin, y);
      y += 14;
    } else {
      for (const it of section.items) {
        if (y > 760) { pdf.addPage(); y = margin; }
        const color: [number, number, number] = it.type === "ok" ? [40, 130, 60] : it.type === "warn" ? [180, 130, 0] : [180, 30, 30];
        pdf.setTextColor(...color);
        pdf.text("•", margin + 6, y);
        pdf.setTextColor(50, 50, 50);
        const lines = pdf.splitTextToSize(it.text, W - margin * 2 - 20);
        pdf.text(lines, margin + 16, y);
        y += lines.length * 12 + 2;
      }
    }
    y += 8;
  }

  // ----- Threat Intel -----
  if (d.threatIntel?.length) {
    if (y > 700) { pdf.addPage(); y = margin; }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 20, 20);
    pdf.text("Threat Intelligence Feeds", margin, y);
    y += 16;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    for (const t of d.threatIntel) {
      pdf.setTextColor(50, 50, 50);
      pdf.text(t.name, margin, y);
      pdf.setTextColor(t.status === "flagged" ? 200 : 40, t.status === "flagged" ? 50 : 130, t.status === "flagged" ? 50 : 60);
      pdf.text(t.status.toUpperCase(), margin + 200, y);
      y += 14;
    }
    y += 8;
  }

  // ----- Screenshot -----
  if (d.screenshotUrl && d.screenshotUrl.startsWith("data:image")) {
    if (y > 500) { pdf.addPage(); y = margin; }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 20, 20);
    pdf.text("Live Screenshot", margin, y);
    y += 14;
    try {
      const imgW = W - margin * 2;
      const imgH = imgW * 0.625;
      const fmt = d.screenshotUrl.includes("png") ? "PNG" : "JPEG";
      pdf.addImage(d.screenshotUrl, fmt, margin, y, imgW, imgH);
      y += imgH + 12;
    } catch {
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(140, 140, 140);
      pdf.text("[Screenshot unavailable]", margin, y);
      y += 14;
    }
  }

  // ----- Footer on every page -----
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `SafeTrace v1.5 · Generated ${new Date().toLocaleString()} · Page ${p}/${totalPages}`,
      W / 2,
      820,
      { align: "center" }
    );
  }

  // Trigger download
  const safeDomain = (d.domain || "scan").replace(/[^a-z0-9.-]/gi, "_").slice(0, 40);
  pdf.save(`safetrace_${d.verdict}_${safeDomain}_${Date.now()}.pdf`);
}
