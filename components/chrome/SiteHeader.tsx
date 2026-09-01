/*
 * SiteHeader (design.md A8) — fixed, minimal chrome: wordmark left, a single
 * MENU trigger right. NOT a page-bar of links (the Menu is the navigation).
 *
 * Surface-aware: transparent over the hero, and after ~1 viewport it gains a
 * hairline + a tint of the surface beneath. Its text colour inverts to match
 * the surface under it, sampled from the nearest element carrying
 * `data-surface` ("ink" | "ivory"). Sections set this via SurfaceSection.
 *
 * Reuses tokens + type roles only; no new pattern. The MENU button is a real
 * <button> with aria-expanded/controls, wired to the Menu (Phase 6.2) via the
 * onToggle/open props lifted to the MenuChrome wrapper.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { WORDMARK_FALLBACK } from "@/content/site";
import { TransitionLink } from "@/components/motion/TransitionLink";

export function SiteHeader({
  menuId,
  menuOpen,
  onToggleMenu,
}: {
  menuId: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [surface, setSurface] = useState<"ink" | "ivory">("ink");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sample = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.9);

      // Sample the surface directly beneath the header's lower edge.
      const header = headerRef.current;
      const y = header ? header.getBoundingClientRect().bottom + 2 : 8;
      // Look at the element chain at that point; find the nearest [data-surface].
      const el = document.elementFromPoint(window.innerWidth / 2, y);
      const surfEl = el?.closest?.("[data-surface]") as HTMLElement | null;
      const s = surfEl?.getAttribute("data-surface");
      if (s === "ink" || s === "ivory") setSurface(s);
    };

    sample();
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("resize", sample, { passive: true });
    return () => {
      window.removeEventListener("scroll", sample);
      window.removeEventListener("resize", sample);
    };
  }, []);

  // While the menu is open, the header sits above the ink plate — force ink.
  const effectiveSurface = menuOpen ? "ink" : surface;

  return (
    <header
      ref={headerRef}
      className="c-header"
      data-surface={effectiveSurface}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <TransitionLink
        href="/"
        label={{ num: "00", title: "HOME" }}
        className="c-header__wordmark type-label"
      >
        {/* [OFFICIAL LOGO] — text fallback until the vector asset is supplied */}
        {WORDMARK_FALLBACK}
      </TransitionLink>

      <button
        type="button"
        className="c-header__menu type-label"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={onToggleMenu}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
    </header>
  );
}
