/*
 * Menu (design.md C1) — the full-screen navigation composed as a site INDEX,
 * not a centered link stack and not a generic hamburger dropdown.
 *
 * - An ink plate covers from the top (its own mechanism; reduced motion →
 *   crossfade, no wipe — see chrome.css).
 * - Three groups (01 THE ZONE / 02 EXPLORE / 03 CONNECT) from content/site.ts,
 *   each with an IndexTitle-style heading; items are large serif (display-l),
 *   so the crimson hover colour is the approved LARGE-text exception on ink (D4).
 * - Active route carries a crimson dot (non-text mark, allowed on ink).
 * - Accessibility: focus trap while open (useFocusTrap), Esc closes, focus
 *   returns to the trigger; the dialog is labelled; links navigate via the one
 *   shared page transition and close the menu.
 * - A quiet corner block for socials + official email is [NEEDS CONTENT].
 */
"use client";

import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/content/site";
import { useFocusTrap } from "@/lib/a11y/useFocusTrap";
import { usePageTransition } from "@/lib/motion/pageTransition";

export function Menu({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const trapRef = useFocusTrap<HTMLDivElement>(open, onClose);

  const go = (href: string, label: { num?: string; title?: string }) => {
    onClose();
    navigate(href, label);
  };

  return (
    <div
      id={id}
      ref={trapRef}
      className="c-menu"
      data-open={open ? "true" : "false"}
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="c-menu__inner l-container">
        <nav aria-label="Primary">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="c-menu__group">
              <p className="c-index type-label" style={{ marginBottom: "var(--space-5)" }}>
                {/* on ink: index uses surface text (D4); label follows */}
                <span className="c-index__num">{group.index}</span>
                <span aria-hidden>—</span>
                <span>{group.title}</span>
              </p>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="c-menu__item type-display-l"
                        aria-current={active ? "page" : undefined}
                        onClick={(e) => {
                          if (
                            e.defaultPrevented || e.button !== 0 ||
                            e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
                          ) return;
                          e.preventDefault();
                          go(item.href, { num: group.index, title: item.label.toUpperCase() });
                        }}
                      >
                        <span className="c-menu__arrow" aria-hidden>→</span>
                        <span>{item.label}</span>
                        {active && <span className="c-menu__dot" aria-hidden />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Quiet corner: official channels — content not yet supplied. */}
        <div className="c-menu__group" style={{ borderTop: "1px solid var(--hairline-on-ink)" }}>
          <p className="type-label" style={{ color: "var(--stone)" }}>
            Connect
          </p>
          <p className="type-body-s" style={{ color: "var(--stone)", marginTop: "var(--space-3)" }}>
            {/* Official email + social links render here once supplied (C1/C13). */}
            Official channels to be published.
          </p>
        </div>
      </div>
    </div>
  );
}
