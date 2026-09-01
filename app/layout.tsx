import type { Metadata } from "next";
import type { ReactNode } from "react";
import { instrumentSerif, manrope } from "@/app/fonts";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AppShell } from "@/components/a11y/AppShell";
import { SkipLink } from "@/components/a11y/SkipLink";
import { MenuChrome } from "@/components/chrome/MenuChrome";
import "@/styles/globals.css";

// Fonts: Instrument Serif (display/institution voice) + Manrope (record/UI/body),
// self-hosted via next/font (Task 2.1). Per-route metadata completed in Phase 16.
export const metadata: Metadata = {
  // metadataBase resolves OG/canonical URLs. Placeholder host until the domain
  // is decided (requirements §26.5); update when hosting is confirmed.
  metadataBase: new URL("https://itztonydoubra-hash.github.io/SSZC"),
  title: {
    default: "LAWSAN South South",
    template: "%s",
  },
  description:
    "Official website of the Law Students' Association of Nigeria, South South Zone.",
  openGraph: {
    type: "website",
    siteName: "LAWSAN South South",
    title: "LAWSAN South South",
    description:
      "Official website of the Law Students' Association of Nigeria, South South Zone.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // The font variables (--font-serif, --font-sans) are exposed on <html> so the
  // type tokens in styles/type.css can reference them.
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body>
        {/* SkipLink is first in the body so it is the first focusable element,
            before the chrome (header/menu). */}
        <SkipLink />
        <MotionProvider>
          <MenuChrome />
          <AppShell>{children}</AppShell>
        </MotionProvider>
      </body>
    </html>
  );
}
