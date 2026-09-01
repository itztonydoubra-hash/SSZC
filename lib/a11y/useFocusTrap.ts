/*
 * useFocusTrap (requirements §23, tasks.md 5.1) — reusable focus management for
 * overlay UIs (the full-screen Menu in Phase 6, the Lightbox in Phase 14.5).
 *
 * When `active` becomes true:
 *   - focus moves into the container (first focusable, or the container itself);
 *   - Tab / Shift+Tab cycle WITHIN the container (trap);
 *   - Escape calls onClose;
 *   - background is inert to the reader is the caller's concern (aria-hidden or
 *     the overlay covering everything) — this hook handles keyboard focus only.
 * When `active` becomes false:
 *   - focus RETURNS to the element that was focused before activation (the
 *     trigger), so keyboard context is preserved.
 *
 * Structural utility only; no motion, no visual output.
 */
"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  active: boolean,
  onClose?: () => void,
): RefObject<T> {
  const ref = useRef<T>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    // Remember where focus was, to restore on release.
    prevFocus.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    // Move focus inside.
    const focusables = getFocusable();
    (focusables[0] ?? container).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        // Nothing focusable but the container: keep focus on it.
        e.preventDefault();
        container.focus();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last || !container.contains(activeEl)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      // Restore focus to the trigger on release.
      const toRestore = prevFocus.current;
      if (toRestore && typeof toRestore.focus === "function") {
        toRestore.focus();
      }
    };
  }, [active, onClose]);

  return ref;
}
