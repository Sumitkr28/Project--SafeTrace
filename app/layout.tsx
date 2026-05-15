import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { ReactNode } from "react";

import { Footer } from "@/components/chrome/Footer";
import { Particles } from "@/components/chrome/Particles";
import { Splash } from "@/components/chrome/Splash";
import { TopNav } from "@/components/chrome/TopNav";
import { Toast } from "@/components/ui/Toast";
import { ToastProvider } from "@/hooks/useToast";

import "./globals.css";
import { AppShell } from "./_shell";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-import",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-import",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SafeTrace — AI-Powered URL Threat Detection",
  description:
    "Paste a URL. Our ML classifier and deep site forensic analyzer cross-check it in under five seconds.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ToastProvider>
          <AppShell>{children}</AppShell>
          <Toast />
        </ToastProvider>
      </body>
    </html>
  );
}
