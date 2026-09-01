/*
 * TransitionLink (design.md A8, tasks.md 4.3) — an anchor that navigates via the
 * ONE shared page transition. It renders a real <a> (accessible, keyboard-
 * operable, right-click/open-in-new-tab friendly) and intercepts plain left
 * clicks to run the transition. Modifier/middle clicks fall through to native
 * behaviour. External links are NOT handled here (use a normal link + ↗).
 */
"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { usePageTransition } from "@/lib/motion/pageTransition";

type Props = {
  href: string;
  /** destination index + title flashed during the transition, e.g. {num:"04", title:"LEADERSHIP"} */
  label?: { num?: string; title?: string };
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  children: ReactNode;
};

export function TransitionLink({
  href,
  label,
  className,
  style,
  children,
  ...rest
}: Props) {
  const { navigate } = usePageTransition();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Respect new-tab / modifier / non-left clicks.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(href, label);
  };

  return (
    <a href={href} onClick={onClick} className={className} style={style} {...rest}>
      {children}
    </a>
  );
}
