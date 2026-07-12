"use client";

import { useEffect, type RefObject } from "react";

const EASE =
  "opacity 1s cubic-bezier(.2,.7,.2,1), transform 1.05s cubic-bezier(.2,.7,.2,1)";

// Staggered fade-up for a fixed set of hero elements, timed on mount.
export function useHeroReveal(refs: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    const els = refs.map((r) => r.current).filter((el): el is HTMLElement => Boolean(el));
    const timers = els.map((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(38px)";
      el.style.transition = EASE;
      return setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 160 + i * 140);
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// Fade-up on scroll for every [data-reveal] element inside containerRef.
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(44px)";
      el.style.transition = EASE;
    });
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "none";
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
