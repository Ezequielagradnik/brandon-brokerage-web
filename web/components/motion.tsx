"use client";

import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

// Thin scroll-progress hairline pinned to the very top of the viewport.
export function ScrollProgress({ color }: { color: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: color, transformOrigin: "0 50%", scaleX, zIndex: 80 }}
    />
  );
}

// Word-by-word masked rise for hero headlines. Segments keep their own styling
// (italics, accent colors) while the whole headline wraps naturally.
export function WordsReveal({
  segments,
  delay = 0.15,
  stagger = 0.055,
}: {
  segments: { text: string; style?: CSSProperties }[];
  delay?: number;
  stagger?: number;
}) {
  let i = 0;
  return (
    <>
      {segments.map((seg, si) =>
        seg.text
          .split(" ")
          .filter(Boolean)
          .map((w, wi) => {
            const d = delay + i++ * stagger;
            return (
              <span key={`${si}-${wi}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.09em", marginBottom: "-0.09em" }}>
                <motion.span
                  style={{ display: "inline-block", whiteSpace: "pre", ...seg.style }}
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.95, delay: d, ease: EASE }}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            );
          })
      )}
    </>
  );
}

// A block that rises out of an overflow mask — one editorial line at a time.
export function MaskReveal({
  children,
  delay = 0,
  duration = 1.1,
  inView = false,
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  inView?: boolean;
  style?: CSSProperties;
}) {
  const anim = { y: "0%" };
  return (
    <span style={{ display: "block", overflow: "hidden", ...style }}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "112%" }}
        {...(inView
          ? { whileInView: anim, viewport: { once: true, amount: 0.4 } }
          : { animate: anim })}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Number that counts up when it scrolls into view.
export function CountUp({
  to,
  suffix = "",
  duration = 1.8,
  style,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    const el = ref.current;
    if (!isInView || !el) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, to, suffix, duration]);
  return (
    <span ref={ref} style={style}>
      0{suffix}
    </span>
  );
}

// Image that drifts vertically as it crosses the viewport (subtle depth).
// The image is oversized by 2×range so edges never show.
export function ParallaxImg({
  src,
  alt,
  range = 40,
  style,
  imgStyle,
  imgClassName,
}: {
  src: string;
  alt: string;
  range?: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  imgClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  return (
    <div ref={ref} style={{ overflow: "hidden", position: "relative", ...style }}>
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ width: "100%", height: `calc(100% + ${range * 2}px)`, objectFit: "cover", display: "block", marginTop: -range, y, ...imgStyle }}
      />
    </div>
  );
}

// Hairline that draws itself in when scrolled into view.
export function GrowLine({
  color,
  delay = 0,
  height = 1,
  origin = "left",
  style,
}: {
  color: string;
  delay?: number;
  height?: number;
  origin?: "left" | "center";
  style?: CSSProperties;
}) {
  return (
    <motion.span
      aria-hidden="true"
      style={{ display: "block", height, background: color, transformOrigin: origin === "left" ? "0 50%" : "50% 50%", ...style }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  );
}

// Wrapper that makes its child gently follow the cursor, springing back on leave.
export function Magnetic({
  children,
  strength = 0.32,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 160, damping: 16, mass: 0.12 });
  const y = useSpring(0, { stiffness: 160, damping: 16, mass: 0.12 });
  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-block", x, y }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Simple fade-up on mount, for hero furniture around the headline.
export function FadeIn({
  children,
  delay = 0,
  y = 26,
  duration = 1,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Image unveiled by a rising clip mask while settling from a slight zoom.
export function ClipReveal({
  children,
  delay = 0,
  duration = 1.3,
  inView = false,
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  inView?: boolean;
  style?: CSSProperties;
}) {
  const anim = { clipPath: "inset(0% 0% 0% 0%)" };
  return (
    <motion.div
      style={{ ...style }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      {...(inView
        ? { whileInView: anim, viewport: { once: true, amount: 0.3 } }
        : { animate: anim })}
      transition={{ duration, delay, ease: EASE }}
    >
      <motion.div
        initial={{ scale: 1.18 }}
        {...(inView
          ? { whileInView: { scale: 1 }, viewport: { once: true, amount: 0.3 } }
          : { animate: { scale: 1 } })}
        transition={{ duration: duration + 0.5, delay, ease: EASE }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
