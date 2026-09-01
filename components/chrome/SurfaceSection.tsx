/*
 * SurfaceSection (design.md A2 surfaces / C12) — sets a section's SURFACE
 * (ink/ivory/photographic), applies the outer container margin, and optionally
 * injects the "NN — TITLE" IndexTitle eyebrow.
 *
 * Crucially it imposes NO internal layout / no "section look" (Part D §2): what
 * goes inside is the caller's composition. This prevents every section from
 * looking the same while still giving a consistent surface + eyebrow system.
 */
import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/layout/Grid";
import { IndexTitle } from "./IndexTitle";

type Surface = "ink" | "ivory" | "photo";

export function SurfaceSection({
  surface,
  index,
  title,
  labelledById,
  contained = true,
  clearHeader,
  className,
  style,
  children,
}: {
  surface: Surface;
  /** eyebrow index + title; omit to render no eyebrow */
  index?: string;
  title?: string;
  /** id used to link the section's accessible name (aria-labelledby) */
  labelledById?: string;
  /** wrap children in the max-width container; set false for full-bleed sections */
  contained?: boolean;
  /** add top padding so the section's first content clears the fixed header.
   *  Defaults to true when an eyebrow is present (route-opening sections). */
  clearHeader?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const surfaceClass =
    surface === "ink"
      ? "surface-ink"
      : surface === "ivory"
        ? "surface-ivory"
        : "surface-photo";

  const eyebrow =
    index && title ? (
      <IndexTitle index={index} title={title} as="p" />
    ) : null;

  const body = (
    <>
      {eyebrow}
      {children}
    </>
  );

  // data-surface is sampled by SiteHeader to invert its colour over each section.
  // Only ink/ivory are sampled; photographic sections declare their effective
  // reading surface (default ink, since text over photos sits on a dark scrim).
  const dataSurface = surface === "ivory" ? "ivory" : "ink";
  const doClear = clearHeader ?? Boolean(eyebrow);

  return (
    <section
      className={join(surfaceClass, doClear && "c-section-clear", className)}
      data-surface={dataSurface}
      style={style}
      aria-labelledby={labelledById}
    >
      {contained ? <Container>{body}</Container> : body}
    </section>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
