"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

// House easing: slow, physical, no bounce.
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Sets --mx/--my on the event target so a CTA's ::after can fill from the
// cursor with a circular clip-path. Attach as onPointerEnter on the anchor.
export function ctaFillFromCursor(e: ReactPointerEvent<HTMLElement>) {
  // touch fires pointerenter on tap from a corner; the fill only makes sense for a real cursor
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

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
  const reduce = useReducedMotion();
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
                  initial={reduce ? false : { y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.95, delay: d, ease: EASE }}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            );
          })
      )}
    </>
  );
}

// Letter-by-letter masked rise, for editorial mastheads.
export function LettersReveal({
  text,
  delay = 0.15,
  stagger = 0.032,
  style,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <span style={{ display: "inline-block", whiteSpace: "pre", ...style }} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
          <motion.span
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={reduce ? false : { y: "112%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// A block that rises out of an overflow mask , one editorial line at a time.
// The in-view observer watches the (unclipped) mask container: the inner span
// starts fully clipped, so observing it directly would never fire.
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
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const visible = reduce || !inView || seen;
  return (
    // The mask box hugs the line box, and tight display line-heights leave
    // g/y descenders overhanging it: pad the window downward and pull the
    // next line back up, so the glyphs render whole and the rhythm holds.
    <span ref={ref} style={{ display: "block", overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em", ...style }}>
      <motion.span
        style={{ display: "block" }}
        initial={reduce ? false : { y: "125%" }}
        animate={visible ? { y: "0%" } : { y: "125%" }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Number that counts up when it scrolls into view. The final value is rendered
// in the HTML from the start (SEO / no-JS fallback); JS rewinds to 0 and counts
// up only when the element enters the viewport.
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
  const reduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    const el = ref.current;
    if (!isInView || !el || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, to, suffix, duration, reduce]);
  return (
    <span ref={ref} style={style}>
      {to}
      {suffix}
    </span>
  );
}

// Image that drifts vertically as it crosses the viewport (subtle depth) and
// settles from a slight zoom on entry. Displacement is capped at ~8% of the
// container height.
export function ParallaxImg({
  src,
  alt,
  range = 32,
  settle = true,
  style,
  imgStyle,
  imgClassName,
  photoSlot,
}: {
  src: string;
  alt: string;
  range?: number;
  settle?: boolean;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  imgClassName?: string;
  photoSlot?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  return (
    <div ref={ref} style={{ overflow: "hidden", position: "relative", ...style }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        data-photo-slot={photoSlot}
        className={imgClassName}
        initial={reduce || !settle ? false : { scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ width: "100%", height: `calc(100% + ${range * 2}px)`, objectFit: "cover", display: "block", marginTop: -range, y: reduce ? 0 : y, ...imgStyle }}
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
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      style={{ display: "block", height, background: color, transformOrigin: origin === "left" ? "0 50%" : "50% 50%", ...style }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    />
  );
}

// Wrapper that makes its child follow the cursor by a few pixels (max ~4px),
// springing back on leave.
export function Magnetic({
  children,
  max = 4,
}: {
  children: ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 18, mass: 0.15 });
  const y = useSpring(0, { stiffness: 180, damping: 18, mass: 0.15 });
  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-block", x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max);
        y.set(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * max);
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
  y = 24,
  duration = 0.9,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
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
  const reduce = useReducedMotion();
  const anim = { clipPath: "inset(0% 0% 0% 0%)" };
  return (
    <motion.div
      style={{ ...style }}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      {...(inView
        ? { whileInView: anim, viewport: { once: true, amount: 0.3 } }
        : { animate: anim })}
      transition={{ duration, delay, ease: EASE }}
    >
      <motion.div
        initial={reduce ? false : { scale: 1.12 }}
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

// Very light 3D tilt on hover , capped at `max` degrees. For cards.
export function Tilt({
  children,
  max = 2,
  style,
}: {
  children: ReactNode;
  max?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 180, damping: 20, mass: 0.2 });
  const ry = useSpring(0, { stiffness: 180, damping: 20, mass: 0.2 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max);
        rx.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * max);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Custom cursor: a small dot that follows the pointer and grows over links.
// Renders nothing on touch devices or with reduced motion.
export function CursorDot({ color = "#1a56ff", size = 10 }: { color?: string; size?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.3 });
  const y = useSpring(-100, { stiffness: 500, damping: 40, mass: 0.3 });
  const scale = useSpring(1, { stiffness: 300, damping: 24 });
  useEffect(() => {
    if (reduce || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      scale.set(t && t.closest("a, button") ? 3.2 : 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y, scale]);
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: -size / 2,
        left: -size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        x,
        y,
        scale,
        pointerEvents: "none",
        zIndex: 90,
        mixBlendMode: "difference",
      }}
    />
  );
}

// Editorial color block that sweeps across its parent once, revealing content.
// Parent must be position:relative and overflow:hidden.
export function Sweep({ color, delay = 0 }: { color: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, background: color, zIndex: 5, pointerEvents: "none" }}
      initial={{ x: "-101%" }}
      whileInView={{ x: "101%" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay, ease: [0.7, 0, 0.2, 1] }}
    />
  );
}
