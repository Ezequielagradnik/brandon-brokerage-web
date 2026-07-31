"use client";

import { useEffect, type RefObject } from "react";
import { animate, inView, stagger } from "framer-motion";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

// Staggered fade-up (with a blur settle) for a fixed set of hero elements,
// driven by framer-motion on mount.
export function useHeroReveal(refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    const els = refs.map((r) => r.current).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    els.forEach((el) => {
      el.style.opacity = "0";
    });
    const controls = animate(
      els,
      { opacity: [0, 1], y: [38, 0], filter: ["blur(8px)", "blur(0px)"] },
      { duration: 1.05, ease: EASE, delay: stagger(0.14, { startDelay: 0.16 }) }
    );
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Fade-up on scroll for every [data-reveal] element inside containerRef,
// driven by framer-motion's inView observer.
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(44px)";
    });
    const stop = inView(
      items,
      (el) => {
        animate(
          el,
          { opacity: [0, 1], y: [44, 0], filter: ["blur(7px)", "blur(0px)"] },
          { duration: 0.95, ease: EASE }
        );
      },
      { amount: 0.12, margin: "0px 0px -6% 0px" }
    );
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
