"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport radial-gradient spotlight that follows the pointer.
 * Purely CSS-driven (via custom properties) so it costs ~nothing to run.
 * Automatically disables itself on touch-only devices and for users who
 * prefer reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const apply = () => {
      ref.current?.style.setProperty("--mx", `${mx}px`);
      ref.current?.style.setProperty("--my", `${my}px`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}
