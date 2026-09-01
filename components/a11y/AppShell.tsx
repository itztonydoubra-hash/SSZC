/*
 * AppShell (tasks.md 5.1) — the shared landmark structure every route inherits.
 *
 * Provides: the SkipLink (first focusable), and the <main id="main"> content
 * landmark (focus target for the skip link, tabindex=-1 so it can receive
 * programmatic focus without being in the tab order).
 *
 * The site header/nav (Phase 6) and the colophon/footer (Phase 12) are rendered
 * WITHIN pages/their own landmarks; this shell only guarantees the main landmark
 * and skip link exist consistently. It introduces NO visual pattern.
 *
 * Content-first: children are plain server-rendered content present in the DOM
 * regardless of JS/motion.
 */
import type { ReactNode } from "react";

/*
 * AppShell provides the <main id="main"> content landmark (focus target for the
 * skip link, tabindex=-1 for programmatic focus). The SkipLink itself is
 * rendered FIRST in the document body (in the root layout, before the chrome)
 * so it is the first focusable element — see app/layout.tsx.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" tabIndex={-1}>
      {children}
    </main>
  );
}
