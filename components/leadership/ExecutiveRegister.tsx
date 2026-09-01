/*
 * ExecutiveRegister (design.md B1.1, tasks.md 8.1/8.2) — the signature Leadership
 * interaction: a pinned, scroll-driven replacement of ONE zonal executive by the
 * next within a FIXED frame.
 *
 * Mechanism (library-agnostic, design.md A6.3): the register is a tall scroll
 * TRACK; a stage PINS via position:sticky; a scroll-progress listener maps the
 * track progress to the active executive index. On change, the outgoing portrait
 * mask closes upward (+slide 6%), the incoming opens downward, the name line-
 * rises, and the index mechanically COUNTS (never fades), briefly deepening.
 * Budget (3): pin + mask + count-tick. No parallax, no FLIP.
 *
 * Fixed: spine, index/role/name slots. Only the person changes.
 *
 * Accessibility & fallback: a left-edge rail lists 01…0N as real <button>s that
 * move the register identically to scroll (keyboard parity). Under reduced
 * motion OR on mobile, the pin is abandoned and each executive renders as a
 * full-height stacked panel (content-first, no scroll-hijack). Fast scroll is
 * last-one-wins (index snaps to the resolved value).
 *
 * Reads getLeadership().zonal. Renders index/role/name/portrait even when
 * bio/socials are absent; portraits with no src show a marked [OFFICIAL IMAGE]
 * placeholder (never a stock image).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ZonalExecutive } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { usePageTransition } from "@/lib/motion/pageTransition";
import { Reveal } from "@/components/motion/Reveal";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

function Portrait({
  exec,
  state,
}: {
  exec: ZonalExecutive;
  state: "active" | "incoming" | "outgoing" | "hidden";
}) {
  return (
    <div className="lr-portrait" data-state={state} aria-hidden={state !== "active"}>
      <div className="lr-portrait__img">
        {exec.portrait.src ? (
          <Image
            src={exec.portrait.src}
            alt={exec.portrait.alt}
            fill
            sizes="58vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="lr-portrait__placeholder">
            <span className="type-label-s" style={{ color: "var(--stone)" }}>
              {exec.portrait.alt}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ExecutiveRegister({ execs }: { execs: ZonalExecutive[] }) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const { navigate } = usePageTransition();

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [hover, setHover] = useState(false);
  const tickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stacked = reduced || mobile;

  // Scroll-driven active index (pinned mode only).
  useEffect(() => {
    if (stacked) return;
    const track = trackRef.current;
    if (!track || execs.length === 0) return;

    let raf = 0;
    let queued = false;
    const compute = () => {
      queued = false;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrolled = -rect.top;
      const total = rect.height - vh; // scrollable distance within the track
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      // Map progress to an index; last-one-wins is inherent (we read current p).
      const idx = Math.min(execs.length - 1, Math.floor(p * execs.length));
      setActive((cur) => (cur === idx ? cur : idx));
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stacked, execs.length]);

  // Count-tick: when active changes, briefly deepen the crimson index.
  useEffect(() => {
    if (active === prev) return;
    setPrev(active);
    if (reduced) return;
    setTicking(true);
    if (tickTimer.current) clearTimeout(tickTimer.current);
    tickTimer.current = setTimeout(() => setTicking(false), 220);
    return () => {
      if (tickTimer.current) clearTimeout(tickTimer.current);
    };
  }, [active, prev, reduced]);

  // Move to an executive from the rail (keyboard parity with scroll).
  const goTo = (idx: number) => {
    const track = trackRef.current;
    if (!stacked && track) {
      const vh = window.innerHeight || 1;
      const total = track.getBoundingClientRect().height - vh;
      const targetY =
        window.scrollY +
        track.getBoundingClientRect().top +
        (total * (idx + 0.5)) / execs.length;
      window.scrollTo({ top: targetY, behavior: reduced ? "auto" : "smooth" });
    }
    setActive(idx);
  };

  if (execs.length === 0) {
    return (
      <p className="type-body-m" style={{ color: "var(--stone)", paddingBlock: "var(--space-9)" }}>
        Zonal executive profiles — [NEEDS CONTENT].
      </p>
    );
  }

  const current = execs[active]!;
  const openable = Boolean(current.slug && (current.bio || current.socials?.length));

  const openDetail = () => {
    if (openable && current.slug) {
      navigate(`/leadership/${current.slug}`, { num: current.index, title: (current.name || "PROFILE").toUpperCase() });
    }
  };

  // ---- STACKED (mobile / reduced motion): full-height panels, no pin -------
  if (stacked) {
    return (
      <div className="lr-register">
        <StackedProgress count={execs.length} reduced={reduced} />
        {execs.map((exec) => (
          <article className="lr-panel" key={exec.index} aria-label={`${exec.role}: ${exec.name}`}>
            <div className="lr-panel__portrait">
              {exec.portrait.src ? (
                <Image src={exec.portrait.src} alt={exec.portrait.alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
              ) : (
                <div className="lr-portrait__placeholder">
                  <span className="type-label-s" style={{ color: "var(--stone)" }}>{exec.portrait.alt}</span>
                </div>
              )}
            </div>
            <div className="lr-panel__type">
              <p className="lr-index type-display-l">{exec.index}</p>
              <hr className="lr-rule" />
              <p className="lr-role type-label">{exec.role}</p>
              <p className="lr-name type-display-xl">{exec.name}</p>
              {exec.bio && <p className="type-body-m measure" style={{ color: "var(--stone)" }}>{exec.bio}</p>}
            </div>
          </article>
        ))}
      </div>
    );
  }

  // ---- PINNED (desktop, motion on): sticky stage + scroll-driven swap ------
  return (
    <div
      className="lr-register"
      ref={trackRef}
      style={{ height: `${execs.length * 100}svh` }}
    >
      <div className="lr-stage">
        <div className="lr-frame">
          {/* Left type column — fixed frame; only the values change. */}
          <div className="lr-type">
            <p className="lr-index type-display-l" data-ticking={ticking ? "true" : "false"} aria-hidden>
              {current.index}
            </p>
            <hr className="lr-rule" />
            <p className="lr-role type-label">{current.role}</p>
            {/* name re-mounts on active change (key) so the line-rise replays */}
            <Reveal as="p" clip key={active} className="lr-name type-display-xl">
              {current.name}
            </Reveal>
          </div>

          {/* Portrait column with the ghost numeral + layered portraits. */}
          <div
            className="lr-portraits"
            data-hover={hover ? "true" : "false"}
            data-cursor={openable ? "open" : "view"}
            role={openable ? "link" : undefined}
            tabIndex={openable ? 0 : undefined}
            aria-label={openable ? `Open profile: ${current.name}` : undefined}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={openable ? openDetail : undefined}
            onKeyDown={
              openable
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openDetail();
                    }
                  }
                : undefined
            }
          >
            <p className="lr-ghost type-numeral" aria-hidden>{current.index}</p>
            {execs.map((exec, i) => {
              const state =
                i === active
                  ? "active"
                  : i === active + 1
                    ? "incoming"
                    : i === active - 1
                      ? "outgoing"
                      : "hidden";
              return <Portrait key={exec.index} exec={exec} state={state} />;
            })}
          </div>

          {/* Register rail — focusable ticks (keyboard parity with scroll). */}
          <ul className="lr-rail" aria-label="Executives">
            {execs.map((exec, i) => (
              <li key={exec.index}>
                <button
                  type="button"
                  className="lr-rail__tick type-label-s tnum"
                  aria-current={i === active ? "true" : "false"}
                  aria-label={`Go to executive ${exec.index}${exec.name ? `: ${exec.name}` : ""}`}
                  onClick={() => goTo(i)}
                >
                  {exec.index}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* Mobile top progress bar (replaces the rail); tracks scroll through the list. */
function StackedProgress({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let queued = false;
    const compute = () => {
      queued = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--lr-progress", `${(p * 100).toFixed(1)}%`);
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, count]);

  return (
    <div className="lr-progress" aria-hidden>
      <div className="lr-progress__fill" ref={ref} />
    </div>
  );
}
