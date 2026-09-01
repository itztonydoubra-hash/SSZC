/*
 * MotionProvider (tasks.md 4.1) — mounts the global, A-level motion mechanisms
 * once, at the root: smooth scroll (gated), the custom cursor (fine-pointer
 * only), and the single page-transition provider. These are site-wide and do
 * NOT count toward any page's motion budget (design.md A6.0). Signature
 * experience motions are added in their own phases, not here.
 */
"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/lib/motion/SmoothScroll";
import { PageTransitionProvider } from "@/lib/motion/pageTransition";
import { Cursor } from "./Cursor";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <PageTransitionProvider>
      <SmoothScroll />
      {children}
      <Cursor />
    </PageTransitionProvider>
  );
}
