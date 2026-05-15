"use client";

// Client-side shell — splash + chrome live here because Splash needs state.
// Server-rendered layout.tsx wraps this so Next can still cache the doc shell.

import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import { Footer } from "@/components/chrome/Footer";
import { Particles } from "@/components/chrome/Particles";
import { Splash } from "@/components/chrome/Splash";
import { TopNav } from "@/components/chrome/TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  // Splash plays every load — pass ?nosplash=1 to skip (useful for sharing deep links).
  const params = useSearchParams();
  const skipSplash = params?.get("nosplash") === "1";
  const [splashDone, setSplashDone] = useState(skipSplash);

  useEffect(() => {
    if (skipSplash) setSplashDone(true);
  }, [skipSplash]);

  return (
    <>
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
      <Particles count={36} />
      <TopNav />
      <main style={{ position: "relative", zIndex: 1, paddingBottom: 40 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
