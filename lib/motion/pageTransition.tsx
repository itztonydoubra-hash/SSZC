/*
 * Page transition (design.md A8, tasks.md 4.3) — the ONE shared route transition.
 *
 * Model: on an intercepted navigation the ink panel COVERS (wipe up), the router
 * pushes the new route, scroll resets under cover, then the panel REVEALS
 * (wipe off) once the new pathname is committed. A destination "NN — TITLE"
 * index flashes while covered.
 *
 * There are no per-route variants and no FLIP/shared-element morphs — image
 * continuity elsewhere is achieved by reusing the same crop, not by this system.
 *
 * Reduced motion: the CSS reduces this to a <=180ms opacity cross-fade with no
 * movement and no index flash; the timings below also shrink so navigation is
 * effectively immediate.
 */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { prefersReducedMotion } from "./useReducedMotion";

type State = "idle" | "covering" | "revealing";

type Ctx = {
  /** Navigate with the shared transition. `label` is the destination index+title. */
  navigate: (href: string, label?: { num?: string; title?: string }) => void;
};

const TransitionContext = createContext<Ctx | null>(null);

export function usePageTransition(): Ctx {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    // Graceful fallback: if used outside the provider, behave as a no-op that
    // still lets callers navigate via the router directly.
    return { navigate: () => {} };
  }
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useState<State>("idle");
  const [label, setLabel] = useState<{ num?: string; title?: string }>({});
  const pendingHref = useRef<string | null>(null);
  const coverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cover durations mirror the tokens (700–900ms), collapsed under reduced motion.
  const coverMs = () => (prefersReducedMotion() ? 120 : 700);
  const revealMs = () => (prefersReducedMotion() ? 180 : 700);

  const navigate = useCallback(
    (href: string, lbl?: { num?: string; title?: string }) => {
      // Same-path navigation: ignore (no transition to nowhere).
      if (href === pathname) return;
      setLabel(lbl ?? {});
      pendingHref.current = href;
      setState("covering");

      if (coverTimer.current) clearTimeout(coverTimer.current);
      coverTimer.current = setTimeout(() => {
        // Push under cover; scroll reset happens on pathname commit below.
        if (pendingHref.current) router.push(pendingHref.current);
      }, coverMs());
    },
    [pathname, router],
  );

  // When the pathname actually changes to the pending route, reset scroll and
  // play the reveal.
  useEffect(() => {
    if (state !== "covering") return;
    if (pendingHref.current == null) return;
    // pathname has committed to the new route
    if (pathname === pendingHref.current.split("?")[0]?.split("#")[0]) {
      window.scrollTo(0, 0);
      pendingHref.current = null;
      setState("revealing");
      if (revealTimer.current) clearTimeout(revealTimer.current);
      revealTimer.current = setTimeout(() => setState("idle"), revealMs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, state]);

  useEffect(
    () => () => {
      if (coverTimer.current) clearTimeout(coverTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    },
    [],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        className="pt-panel"
        data-state={state}
        aria-hidden={state === "idle"}
        role={state === "idle" ? undefined : "status"}
      >
        {(label.num || label.title) && (
          <span className="pt-index type-label">
            {label.num && <span className="pt-index__num">{label.num} </span>}
            {label.title && `— ${label.title}`}
          </span>
        )}
      </div>
    </TransitionContext.Provider>
  );
}
