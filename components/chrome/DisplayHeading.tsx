/*
 * DisplayHeading (design.md A3 / A6.1, C12) — a serif heading (institution
 * voice) that reveals with the shared line-rise primitive. `size` maps to the
 * A3.1 display roles. It composes the existing Reveal primitive (no new motion).
 *
 * Serif is reserved for the institution voice (names/titles/statements) — this
 * component is for those, never for long body copy (A3 / Part D §8).
 */
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";

type DisplaySize = "xxl" | "xl" | "l" | "m";

const SIZE_CLASS: Record<DisplaySize, string> = {
  xxl: "type-display-xxl",
  xl: "type-display-xl",
  l: "type-display-l",
  m: "type-display-m",
};

export function DisplayHeading({
  as = "h2",
  size = "l",
  reveal = true,
  clip = true,
  delayMs,
  id,
  className,
  style,
  children,
}: {
  /** headings for true titles; "p" for large serif statements that are not headings */
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  size?: DisplaySize;
  /** set false to render static (e.g. inside an already-animated context) */
  reveal?: boolean;
  clip?: boolean;
  delayMs?: number;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  const cls = join(SIZE_CLASS[size], className);

  if (!reveal) {
    const Tag = as;
    return (
      <Tag id={id} className={cls} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Reveal as={as} clip={clip} delayMs={delayMs} id={id} className={cls} style={{ ...style }}>
      {children}
    </Reveal>
  );
}

function join(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
