/*
 * MaskImage (design.md A5 / A6.1 / C12) — the shared optimised image with the
 * mask-open reveal. It composes MaskReveal (Phase 4) around a next/image, and
 * enforces the performance + a11y contract: required alt, explicit aspect
 * ratio, lazy loading, responsive sizes, and a blur placeholder when a
 * blurDataURL is supplied.
 *
 * Real photography (CLIENT-SUPPLIED MEDIA, decisions.md D2) and section imagery
 * flow through this. Native aspect ratios are respected — the ratio prop is the
 * image's own ratio, not a forced uniform crop.
 */
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { assetPath } from "@/lib/asset";

export function MaskImage({
  src,
  alt,
  ratio,
  sizes = "100vw",
  priority = false,
  blurDataURL,
  delayMs,
  className,
  style,
}: {
  src: string;
  /** REQUIRED — a factual description; never fabricated (design.md media rules) */
  alt: string;
  /** e.g. "3 / 2", "4 / 5" — the image's own ratio */
  ratio: string;
  sizes?: string;
  /** only the LCP hero image should set priority (design.md C14) */
  priority?: boolean;
  blurDataURL?: string;
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <MaskReveal ratio={ratio} delayMs={delayMs} className={className} style={style}>
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        style={{ objectFit: "cover" }}
      />
    </MaskReveal>
  );
}
