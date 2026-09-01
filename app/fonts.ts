/*
 * Font loading — design.md A3 / requirements.md §3.2 / tasks.md 2.1.
 *
 * Instrument Serif  = the institution speaking (display, names, titles, figures).
 *                     Ships one weight (400) + matching italic; it is a DISPLAY
 *                     face and is never used for long body copy.
 * Manrope           = the record around it (nav, metadata, labels, body, dates).
 *                     Variable 400–700.
 *
 * Both are loaded via next/font/google, which SELF-HOSTS the files at build time
 * (no runtime request to Google) and injects size-adjust/fallback metrics to
 * prevent layout shift. display: "swap". No third font is introduced anywhere.
 */
import { Instrument_Serif, Manrope } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
  // The display face is used above the fold (hero/section titles) — preload it.
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: true,
});
