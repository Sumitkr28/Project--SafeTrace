import type { Config } from "tailwindcss";

// Most styling in SafeTrace is inline; Tailwind just exposes
// the verdict + steel colors as utilities for the rare places they're handy.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        safe: "var(--safe)",
        phishing: "var(--phishing)",
        malware: "var(--malware)",
        defacement: "var(--defacement)",
        suspicious: "var(--suspicious)",
        accent: "var(--accent)",
        "accent-bright": "var(--accent-bright)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
