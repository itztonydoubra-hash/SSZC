"use client";
/*
 * HeroLogo3D — premium 3D floating logo for the homepage hero.
 * Mouse parallax tilt + floating animation + ambient glow rings.
 * Respects prefers-reduced-motion: all motion collapses to static.
 */
import Image from "next/image";
import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/asset";

export function HeroLogo3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Respect reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientY - cy) / cy) * -12;
      targetY = ((e.clientX - cx) / cx) * 12;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      if (scene) {
        scene.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero3d__stage" aria-hidden>
      {/* Ambient glow behind everything */}
      <div className="hero3d__glow" />

      {/* 3D scene — tilt driven by mousemove */}
      <div className="hero3d__scene" ref={sceneRef}>

        {/* Depth rings */}
        <div className="hero3d__ring hero3d__ring--1" />
        <div className="hero3d__ring hero3d__ring--2" />
        <div className="hero3d__ring hero3d__ring--3" />

        {/* Floating particle dots */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={`hero3d__dot hero3d__dot--${i + 1}`} />
        ))}

        {/* Logo card — the centrepiece */}
        <div className="hero3d__card">
          <div className="hero3d__card-inner">
            <Image
              src={assetPath("/media/general/lawsan-south-south-logo.png.jpeg")}
              alt="LAWSAN South South Zonal Logo"
              fill
              priority
              sizes="(max-width: 767px) 260px, 360px"
              style={{ objectFit: "contain" }}
            />
          </div>
          {/* Card edge highlight — gives the 3D plate illusion */}
          <div className="hero3d__card-shine" />
        </div>

        {/* Gold halo ring directly behind logo */}
        <div className="hero3d__halo" />
      </div>
    </div>
  );
}
