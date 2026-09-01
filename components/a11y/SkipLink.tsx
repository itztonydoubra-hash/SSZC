/*
 * SkipLink (requirements §23, tasks.md 5.1).
 *
 * The first focusable element on every page. Visually hidden until focused,
 * then it appears and, when activated, moves focus to the <main> content
 * landmark (id="main"), letting keyboard/AT users bypass the header + menu.
 *
 * Structural only — no visual pattern, no design-system component.
 */
"use client";

import type { MouseEvent } from "react";

export function SkipLink() {
  // On activation, move focus to <main> so subsequent Tab starts in content.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById("main");
    if (main) {
      e.preventDefault();
      // main has tabindex=-1 (set in AppShell) so it can receive focus.
      main.focus();
      main.scrollIntoView();
      // Update the hash without adding a history entry jump-flash.
      history.replaceState(null, "", "#main");
    }
  };

  return (
    <a href="#main" className="skip-link type-label" onClick={onClick}>
      Skip to content
    </a>
  );
}
