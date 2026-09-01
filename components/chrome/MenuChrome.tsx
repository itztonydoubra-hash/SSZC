/*
 * MenuChrome — owns the menu open/close state and renders the SiteHeader + Menu
 * together (they share the trigger's aria-controls/expanded wiring). Mounted
 * once at the root (in the layout), above the page content.
 *
 * Body scroll is locked while the menu is open. Focus trapping + Esc + focus
 * return are handled inside Menu via useFocusTrap.
 */
"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { Menu } from "./Menu";

const MENU_ID = "site-menu";

export function MenuChrome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lock body scroll while the menu covers the screen.
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  return (
    <>
      <SiteHeader
        menuId={MENU_ID}
        menuOpen={open}
        onToggleMenu={() => setOpen((v) => !v)}
      />
      <Menu id={MENU_ID} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
