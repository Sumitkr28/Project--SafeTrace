"use client";

import { useCallback, useState } from "react";

import { ScanEmpty } from "@/components/scan/ScanEmpty";
import { ScanProgress, SCAN_STEPS } from "@/components/scan/ScanProgress";
import { ScanResultView } from "@/components/scan/ScanResult";
import { useToast } from "@/hooks/useToast";
import { scanUrl } from "@/lib/api";
import type { ScanResult } from "@/lib/types";

type State = "empty" | "scanning" | "result" | "error";

export default function ScanPage() {
  const [state, setState] = useState<State>("empty");
  const [urlValue, setUrlValue] = useState("");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const toast = useToast();

  const handleScan = useCallback(async (url: string) => {
    setState("scanning");
    setStep(0);

    // Drive the stepper in parallel with the real API call.
    // The synthetic steps make a ~3-second progress feel, which roughly matches the backend.
    let i = 0;
    const stepDuration = 700;
    const tick = setInterval(() => {
      i++;
      if (i < SCAN_STEPS.length) setStep(i);
      else clearInterval(tick);
    }, stepDuration);

    try {
      const data = await scanUrl(url);
      // Make sure we hit the final step even if the API is fast.
      setStep(SCAN_STEPS.length);
      // Tiny pause so the user sees the "Verdict" step light up.
      setTimeout(() => {
        setResult(data);
        setState("result");
      }, 400);
    } catch (err) {
      clearInterval(tick);
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({ kind: "error", title: "Scan failed", message: msg });
      setState("empty");
    } finally {
      clearInterval(tick);
    }
  }, [toast]);

  const reset = () => {
    setState("empty");
    setUrlValue("");
    setStep(0);
    setResult(null);
  };

  if (state === "scanning") {
    return <ScanProgress url={urlValue || "scanning…"} step={step} />;
  }
  if (state === "result" && result) {
    return <ScanResultView result={result} onAgain={reset} />;
  }
  return <ScanEmpty urlValue={urlValue} setUrlValue={setUrlValue} onScan={handleScan} />;
}
