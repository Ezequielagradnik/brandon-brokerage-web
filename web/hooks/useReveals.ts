"use client";

import { useEffect, type RefObject } from "react";
import { animate, inView, stagger } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Choreographed hero entrance: eyebrow → title → paragraph → CTA, 100ms apart.
export function useHeroReveal(refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    const els = refs.map((r) => r.current).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length || prefersReducedMotion()) return;
    els.forEach((el) => {
      el.style.opacity = "0";
    });
    const controls = animate(
      els,
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.9, ease: EASE, delay: stagger(0.1, { startDelay: 0.12 }) }
    );
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Fade-up on scroll for every [data-reveal] element inside containerRef.
// Elements that enter the viewport together stagger 80ms apart.
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length || prefersReducedMotion()) return;
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
    });
    // Items revealed within the same beat share a batch and stagger 80ms apart.
    let batchStart = 0;
    let batchIndex = 0;
    const stop = inView(
      items,
      (el) => {
        const now = performance.now();
        if (now - batchStart > 220) {
          batchStart = now;
          batchIndex = 0;
        }
        const delay = batchIndex * 0.08;
        batchIndex += 1;
        animate(
          el,
          { opacity: [0, 1], y: [24, 0] },
          { duration: 0.9, ease: EASE, delay }
        );
      },
      { amount: 0.12, margin: "0px 0px -6% 0px" }
    );
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
