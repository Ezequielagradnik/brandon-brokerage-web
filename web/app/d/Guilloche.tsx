"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// The certificate watermark: a guilloché rosette, the engraved-line pattern
// of bonds, share certificates and banknotes, drawn in sapphire hairlines on
// the ivory. Two slow motions keep it alive without ever performing: the
// whole rosette turns once every few minutes, and the harmonic phase drifts
// so the weave breathes. Reduced motion renders it once and leaves it still.

const SAPPHIRE = "47,102,196";
const CURVES = 34;
const SEGS = 720;

export default function Guilloche() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, ink = 1;
    const measure = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      // on a phone the whole masthead sits over the weave: thin the ink
      ink = w < 480 ? 0.62 : 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    measure();
    window.addEventListener("resize", measure);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = (Math.min(w, h) / 2) * 0.98;
      const rot = time * 0.006;
      const drift = time * 0.03;
      ctx.lineWidth = 0.7;
      // the woven band: a tight engraved torus, not a flower
      for (let i = 0; i < CURVES; i++) {
        const f = i / (CURVES - 1);
        const phi = f * Math.PI * 2;
        ctx.strokeStyle = `rgba(${SAPPHIRE},${((0.08 + 0.18 * f) * ink).toFixed(3)})`;
        ctx.beginPath();
        for (let s = 0; s <= SEGS; s++) {
          const th = (s / SEGS) * Math.PI * 2;
          const r = R * (0.72 + 0.115 * Math.sin(18 * th + phi + drift) + 0.055 * Math.sin(7 * th - 2 * phi + rot * 3));
          const x = cx + r * Math.cos(th + rot);
          const y = cy + r * Math.sin(th + rot);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      // bounding rings, the way a seal closes its engraving
      for (const [rr, a] of [[0.985, 0.26], [0.955, 0.14], [0.52, 0.2], [0.545, 0.11]] as const) {
        ctx.strokeStyle = `rgba(${SAPPHIRE},${a * ink})`;
        ctx.beginPath();
        ctx.arc(cx, cy, R * rr, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    if (reduce) {
      draw(0);
      return () => window.removeEventListener("resize", measure);
    }

    let active = false;
    let raf = 0;
    let frame = 0;
    const start = performance.now();
    const tick = () => {
      if (!active) return;
      // the turn takes minutes; every other frame is plenty
      if ((frame++ & 1) === 0) draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0].isIntersecting;
        if (on && !active) { active = true; tick(); }
        else if (!on) { active = false; cancelAnimationFrame(raf); }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} style={{ position: "absolute", left: "50%", top: "52%", transform: "translate(-50%,-50%)", width: "min(112vh, 88vw, 860px)", aspectRatio: "1 / 1", pointerEvents: "none" }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
