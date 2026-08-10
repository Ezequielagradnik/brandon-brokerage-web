"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import { motion, useMotionTemplate, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { worldPoints } from "@/lib/world";

// The phone on the contact pages: a real element, not a picture of one.
//
// Built in DOM rather than WebGL on purpose. CSS draws bezels, rails, glass and
// shadows better than a hand-lit box ever will, and, more importantly, the call
// button is then a genuine <a href="tel:">: tapping it dials, exactly like the
// number set large beside it. A canvas can only ever look like a button.
//
// The only WebGL left is the globe in the logo lockup , a sphere with the world
// dotted onto it, turning. If WebGL is missing it simply does not draw and the
// lockup falls back to the wordmark, which is why nothing depends on it.

export type DevicePalette = {
  /** screen background */
  screen: string;
  /** wordmark, status bar and UI ink */
  ink: string;
  /** the ocean sphere and the rule under the wordmark */
  accent: string;
};

type Props = {
  palette: DevicePalette;
  /** number printed on the call button */
  number: string;
  /** where the button dials, normally OFFICE.phoneHref */
  href: string;
  /** label under the button */
  callLabel: string;
  /** the concept's display face, for the wordmark */
  serif?: string;
  /** the concept's mono face, for the small caps */
  mono?: string;
  className?: string;
  /**
   * Whether the phone leans towards the cursor on top of its float. On concepts
   * whose motion is all one-shot reveals, a thing that keeps answering the
   * pointer is a different category of movement and reads as a demo dropped
   * into the page.
   */
  lean?: boolean;
};

/* ————— the globe, the one piece that earns being 3D ————— */
function GlobeChip({ palette, size }: { palette: DevicePalette; size: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10);
    cam.position.z = 4;

    const globe = new THREE.Group();
    // tipped the way the printed mark is drawn, not straight on
    globe.rotation.z = 0.16;
    globe.rotation.x = 0.22;
    scene.add(globe);

    const R = 0.85;
    const bin: { dispose(): void }[] = [];
    const keep = <T extends { dispose(): void }>(x: T) => {
      bin.push(x);
      return x;
    };

    // ocean
    globe.add(new THREE.Mesh(
      keep(new THREE.SphereGeometry(R, 48, 36)),
      keep(new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.accent) }))
    ));

    // land, dotted just above the surface so the sphere never eats it
    const land = keep(new THREE.BufferGeometry());
    land.setAttribute("position", new THREE.Float32BufferAttribute(worldPoints(R * 1.015, 1.0), 3));
    globe.add(new THREE.Points(land, keep(new THREE.PointsMaterial({
      color: new THREE.Color(palette.screen),
      size: 0.036,
      sizeAttenuation: true,
    }))));

    // The case, arriving. A gold arc lifting off São Paulo and landing on Miami,
    // which is the firm's whole business drawn in one line, with a bead running
    // it. It turns out of view with the globe, so it reads as a route on a
    // planet rather than a decoration stuck to the front.
    const onSphere = (lat: number, lon: number, r: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const th = ((lon + 180) * Math.PI) / 180;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(th),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(th)
      );
    };
    const from = onSphere(-23.5, -46.6, R * 1.02);
    const to = onSphere(25.76, -80.19, R * 1.02);
    const lift = from.clone().add(to).normalize().multiplyScalar(R * 1.4);
    const route = new THREE.QuadraticBezierCurve3(from, lift, to);
    const arcPts = route.getPoints(60);
    globe.add(new THREE.Line(
      keep(new THREE.BufferGeometry().setFromPoints(arcPts)),
      keep(new THREE.LineBasicMaterial({ color: new THREE.Color(palette.screen), transparent: true, opacity: 0.9 }))
    ));

    const bead = new THREE.Mesh(
      keep(new THREE.SphereGeometry(0.035, 12, 12)),
      keep(new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.screen) }))
    );
    globe.add(bead);

    // the two ends, marked
    const pin = keep(new THREE.SphereGeometry(0.028, 12, 12));
    const pinMat = keep(new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.screen) }));
    for (const v of [from, to]) {
      const m = new THREE.Mesh(pin, pinMat);
      m.position.copy(v);
      globe.add(m);
    }

    // the meridian ring the printed mark carries
    const ring: THREE.Vector3[] = [];
    for (let i = 0; i <= 90; i++) {
      const a = (i / 90) * Math.PI * 2;
      ring.push(new THREE.Vector3(Math.cos(a) * R * 1.035, Math.sin(a) * R * 1.035, 0));
    }
    globe.add(new THREE.Line(
      keep(new THREE.BufferGeometry().setFromPoints(ring)),
      keep(new THREE.LineBasicMaterial({ color: new THREE.Color(palette.screen), transparent: true, opacity: 0.45 }))
    ));

    const resize = () => {
      const s = wrap.clientWidth;
      if (!s) return;
      renderer.setSize(s, s, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!onScreen || document.hidden) return;
      if (!reduce) {
        globe.rotation.y += dt * 0.34;
        t += dt;
        // the bead runs the route, waits a beat at Miami, and goes again
        const cycle = (t % 4.6) / 3.2;
        bead.position.copy(route.getPoint(Math.min(cycle, 1)));
        bead.visible = cycle <= 1;
      } else {
        bead.position.copy(to);
      }
      renderer.render(scene, cam);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      bin.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [palette, reduce]);

  return (
    <div ref={wrapRef} style={{ width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

/**
 * The visitor's own clock, not a screenshot of 9:41. Read through
 * useSyncExternalStore so the server renders 9:41 and the client swaps to the
 * real time on hydration, with no setState inside an effect.
 */
function useClock() {
  return useSyncExternalStore(
    (notify) => {
      const id = setInterval(notify, 20_000);
      return () => clearInterval(id);
    },
    () => {
      // formatted by hand: toLocaleTimeString drags in "p. m." and iOS never
      // shows a period designator in the status bar
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      return `${h}:${String(d.getMinutes()).padStart(2, "0")}`;
    },
    () => "9:41"
  );
}

/* Status bar glyphs, drawn so the phone needs no icon font. */
function StatusIcons({ ink }: { ink: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: "1.7cqw" }}>
      <svg viewBox="0 0 18 13" fill={ink} style={{ width: "4.6cqw", height: "auto" }}>
        <rect x="0" y="9" width="3" height="4" rx="1" />
        <rect x="5" y="6" width="3" height="7" rx="1" />
        <rect x="10" y="3" width="3" height="10" rx="1" />
        <rect x="15" y="0" width="3" height="13" rx="1" />
      </svg>
      <svg viewBox="0 0 16 12" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" style={{ width: "4.4cqw", height: "auto" }}>
        <path d="M1.2 4.2a10 10 0 0 1 13.6 0" />
        <path d="M3.9 7a6.2 6.2 0 0 1 8.2 0" />
        <circle cx="8" cy="10" r="1" fill={ink} stroke="none" />
      </svg>
      <svg viewBox="0 0 26 13" fill="none" style={{ width: "6.6cqw", height: "auto" }}>
        <rect x="0.7" y="0.7" width="21" height="11.6" rx="3" stroke={ink} strokeWidth="1.4" opacity="0.55" />
        <rect x="2.4" y="2.4" width="16" height="8.2" rx="1.8" fill={ink} />
        <path d="M23.6 4.4v4.2c1.1-.4 1.7-1.1 1.7-2.1s-.6-1.7-1.7-2.1Z" fill={ink} opacity="0.55" />
      </svg>
    </span>
  );
}

export default function DeviceCall({
  palette,
  number,
  href,
  callLabel,
  serif = 'Georgia, "Times New Roman", serif',
  mono = "ui-monospace, SFMono-Regular, Menlo, monospace",
  className,
  lean = true,
}: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);
  const clock = useClock();

  // a spring, so the lean has weight and can be interrupted mid-move
  const mx = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const my = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotY = useTransform(mx, (v) => -14 + v);
  const rotX = useTransform(my, (v) => 6 + v);
  // the specular rides the same springs, so the sheen tracks the cursor across
  // the glass instead of sitting in one corner like a printed gradient
  const gx = useTransform(mx, (v) => `${34 + v * 3.4}%`);
  const gy = useTransform(my, (v) => `${18 + v * 4.5}%`);
  const sheen = useMotionTemplate`radial-gradient(58% 44% at ${gx} ${gy}, rgba(255,255,255,0.30), rgba(255,255,255,0.05) 46%, rgba(255,255,255,0) 72%)`;

  useEffect(() => {
    if (reduce || !lean) return;
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)) * 9);
      my.set(((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)) * 5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, lean, mx, my]);

  const ink = palette.ink;
  const screen = palette.screen;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1500 }}
    >
      {/* the shadow sits outside the 3D box: inside it, a sibling wider than the
          phone swallowed taps on the call button */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: "6%",
          width: "34%",
          height: "10%",
          transform: "translateX(-50%)",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.34), rgba(0,0,0,0) 72%)",
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          height: "min(100%, 580px)",
          /* 10% shorter than a 9/19.5 handset: the lockup is compact, and the
             full-height body left a dead panel under the call button. Paired
             with the reduced bottom padding below, the whole reduction comes
             off the bottom and the gap under the status bar stays put. */
          aspectRatio: "9 / 17.6",
          position: "relative",
          /* deliberately NOT preserve-3d: it propagates the 3D context to every
             descendant, and then a child's bounding box stops agreeing with
             where the browser actually hit-tests it , which silently killed
             taps on the call button. The perspective on the wrapper is what
             renders the tilt; nothing here needs its own 3D plane. */
          rotateY: reduce ? -14 : rotY,
          rotateX: reduce ? 6 : rotX,
        }}
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* frame: the rail gradient, with its padding acting as the bezel */}
        <div
          style={{
            position: "relative",
            height: "100%",
            borderRadius: "13.5% / 6.2%",
            padding: "2.7%",
            background: "linear-gradient(146deg, #565b64 0%, #24272c 34%, #0f1114 70%, #2e3138 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 44px 80px -26px rgba(12,16,26,0.55), 0 10px 26px -8px rgba(12,16,26,0.35), inset 0 0 0 1px rgba(0,0,0,0.45)",
          }}
        >
          {/* side buttons */}
          <span aria-hidden="true" style={{ position: "absolute", left: -2, top: "17%", width: 3, height: "4.5%", borderRadius: "2px 0 0 2px", background: "#40444b" }} />
          <span aria-hidden="true" style={{ position: "absolute", left: -2, top: "24.5%", width: 3, height: "8%", borderRadius: "2px 0 0 2px", background: "#40444b" }} />
          <span aria-hidden="true" style={{ position: "absolute", left: -2, top: "34%", width: 3, height: "8%", borderRadius: "2px 0 0 2px", background: "#40444b" }} />
          <span aria-hidden="true" style={{ position: "absolute", right: -2, top: "27%", width: 3, height: "11%", borderRadius: "0 2px 2px 0", background: "#40444b" }} />

          {/* screen */}
          <div
            style={{
              position: "relative",
              height: "100%",
              borderRadius: "11.4% / 5.4%",
              overflow: "hidden",
              background: screen,
              containerType: "inline-size",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* glass */}
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: reduce
                  ? "linear-gradient(133deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 26%, rgba(255,255,255,0) 45%)"
                  : sheen,
                pointerEvents: "none",
                zIndex: 30,
              }}
            />

            {/* status bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5.6cqw 7cqw 0",
                fontFamily: mono,
                fontSize: "3.9cqw",
                fontWeight: 600,
                color: ink,
                position: "relative",
                zIndex: 10,
              }}
            >
              <span>{clock}</span>
              <StatusIcons ink={ink} />
            </div>

            {/* dynamic island */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "2.8cqw",
                left: "50%",
                transform: "translateX(-50%)",
                width: "29cqw",
                height: "8.4cqw",
                borderRadius: 999,
                background: "#08090b",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                /* The bottom padding shrinks the centring box, lifting the
                   lockup by half of it so it sits under the status bar rather
                   than in the middle of a tall screen. Tuned against the
                   shorter aspect above: together they hold the top gap at
                   ~54cqw while the body loses 10% of its height. */
                padding: "0 7cqw 5cqw",
                position: "relative",
                zIndex: 10,
              }}
            >
              {/* the lockup: the globe, then the wordmark, as the mark is drawn */}
              <div style={{ display: "flex", alignItems: "center", gap: "4.2cqw" }}>
                <GlobeChip palette={palette} size="22cqw" />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: serif, fontSize: "10.2cqw", lineHeight: 1, color: ink, whiteSpace: "nowrap" }}>
                    BRANDON
                  </span>
                  <span aria-hidden="true" style={{ display: "block", height: 1, background: palette.accent, margin: "2.4cqw 0" }} />
                  <span style={{ display: "block", fontFamily: mono, fontSize: "2.8cqw", letterSpacing: "0.17em", color: ink, opacity: 0.75, whiteSpace: "nowrap" }}>
                    BROKERAGE GROUP
                  </span>
                </span>
              </div>

              <span style={{ display: "block", textAlign: "center", marginTop: "12cqw", fontFamily: mono, fontSize: "2.9cqw", letterSpacing: "0.22em", color: ink, opacity: 0.5 }}>
                CORAL GABLES · FLORIDA
              </span>

              {/* This dials. It is the same tel: as the number beside the phone,
                  which is the whole reason the phone is DOM and not a canvas. */}
              <a
                href={href}
                onPointerDown={() => setPressed(true)}
                onPointerUp={() => setPressed(false)}
                onPointerLeave={() => setPressed(false)}
                style={{
                  position: "relative",
                  zIndex: 40,
                  marginTop: "8.5cqw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3.2cqw",
                  padding: "4.6cqw 5cqw",
                  borderRadius: 999,
                  background: ink,
                  color: screen,
                  textDecoration: "none",
                  fontFamily: mono,
                  fontSize: "4.9cqw",
                  fontWeight: 600,
                  transform: pressed ? "scale(0.97)" : "scale(1)",
                  transition: reduce ? "none" : "transform 160ms cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={screen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "5.2cqw", height: "auto", flexShrink: 0 }}>
                  <path d="M6.6 2.9 9 2l2.1 4.6-2.2 1.6a12 12 0 0 0 6.9 6.9l1.6-2.2L22 15l-.9 2.4a2.6 2.6 0 0 1-2.9 1.6C11.8 17.8 6.2 12.2 5 5.8A2.6 2.6 0 0 1 6.6 2.9Z" />
                </svg>
                {number}
              </a>

              <span style={{ display: "block", textAlign: "center", marginTop: "4cqw", fontFamily: mono, fontSize: "2.7cqw", letterSpacing: "0.2em", color: ink, opacity: 0.55 }}>
                {callLabel.toUpperCase()}
              </span>
            </div>

            {/* home indicator */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "2.6cqw",
                left: "50%",
                transform: "translateX(-50%)",
                width: "36cqw",
                height: "1.2cqw",
                borderRadius: 999,
                background: ink,
                opacity: 0.28,
                zIndex: 20,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
