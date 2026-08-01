"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// Shared 3D globe with LatAm → Miami arcs. Gold palette on /g, blue on /e.
// Falls back to a static SVG when WebGL is unavailable or motion is reduced.

export type ArcPalette = {
  wire: number;
  coast: number;
  city: number;
  arc: number;
  particle: number;
  hub: number;
  labelCss: string;
  hubLabelCss: string;
  svgLine: string;
  svgDim: string;
};

export const GOLD_ARCS: ArcPalette = {
  wire: 0xc2a15b,
  coast: 0xd9c291,
  city: 0xc2a15b,
  arc: 0xc2a15b,
  particle: 0xf0dcae,
  hub: 0xd9c291,
  labelCss: "rgba(255,255,255,0.55)",
  hubLabelCss: "#d9c291",
  svgLine: "#c2a15b",
  svgDim: "rgba(217,194,145,0.18)",
};

export const BLUE_ARCS: ArcPalette = {
  wire: 0x2f66c4,
  coast: 0x9fb8ff,
  city: 0x5c8dff,
  arc: 0x5c8dff,
  particle: 0xcfe0ff,
  hub: 0x9fb8ff,
  labelCss: "rgba(159,184,255,0.7)",
  hubLabelCss: "#cfe0ff",
  svgLine: "#5c8dff",
  svgDim: "rgba(159,184,255,0.18)",
};

type City = { lat: number; lon: number; label: string; hub?: boolean };

const CITIES: City[] = [
  { lat: 25.76, lon: -80.19, label: "MIA", hub: true },
  { lat: 19.43, lon: -99.13, label: "MEX" },
  { lat: 4.71, lon: -74.07, label: "BOG" },
  { lat: -12.05, lon: -77.04, label: "LIM" },
  { lat: -33.45, lon: -70.67, label: "SCL" },
  { lat: -34.6, lon: -58.38, label: "BUE" },
  { lat: -23.55, lon: -46.63, label: "SAO" },
];

// Coarse Americas coastline, enough to read as continents at dot scale.
const COAST: [number, number][] = [
  [60, -150], [58, -140], [55, -132], [48, -125], [40, -124], [33, -117], [23, -110], [20, -105], [16, -95],
  [21, -90], [30, -84], [29, -95], [26, -97], [25, -80], [32, -80], [35, -76], [40, -74], [45, -66], [50, -60],
  [60, -64], [62, -92], [58, -94], [52, -79], [46, -84], [41, -87],
  [14, -87], [9, -80], [11, -74], [10, -64], [5, -52], [-5, -35], [-13, -38], [-23, -43], [-34, -53],
  [-38, -57], [-46, -67], [-54, -68], [-42, -73], [-33, -71], [-18, -70], [-12, -77], [-4, -81], [1, -78], [8, -77],
  [19, -72], [22, -80], [18, -66],
];

const R = 1.15;

function latLonToVec3(lat: number, lon: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Static SVG fallback (no WebGL / reduced motion)
export function ArcsSVG({ palette }: { palette: ArcPalette }) {
  const MIA = { x: 258, y: 96 };
  const cities = [
    { x: 128, y: 178, label: "MEX" },
    { x: 214, y: 240, label: "BOG" },
    { x: 188, y: 312, label: "LIM" },
    { x: 222, y: 408, label: "SCL" },
    { x: 290, y: 412, label: "BUE" },
    { x: 352, y: 330, label: "SAO" },
  ];
  return (
    <svg viewBox="0 0 480 500" fill="none" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      <circle cx="240" cy="256" r="204" stroke={palette.svgDim} strokeWidth="1" />
      <ellipse cx="240" cy="256" rx="204" ry="82" stroke={palette.svgDim} strokeWidth="1" />
      <ellipse cx="240" cy="256" rx="150" ry="203" stroke={palette.svgDim} strokeWidth="1" />
      <ellipse cx="240" cy="256" rx="78" ry="203" stroke={palette.svgDim} strokeWidth="1" />
      {cities.map((c, i) => {
        const midX = (c.x + MIA.x) / 2 + (c.x < MIA.x ? -34 : 34);
        const midY = Math.min(c.y, MIA.y) - 54 - i * 5;
        return <path key={c.label} d={`M ${c.x} ${c.y} Q ${midX} ${midY} ${MIA.x} ${MIA.y}`} stroke={palette.svgLine} strokeWidth="1.2" opacity="0.9" />;
      })}
      {[{ ...MIA, label: "MIA" }, ...cities].map((c, i) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={i === 0 ? 5 : 3} fill={palette.svgLine} />
          <text x={c.x + 12} y={c.y + 4} fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1.5" fill={i === 0 ? palette.hubLabelCss : palette.labelCss}>{c.label}</text>
        </g>
      ))}
    </svg>
  );
}

export default function GlobeArcs({ palette }: { palette: ArcPalette }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce || failed) return;
    const wrapNullable = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrapNullable || !canvas) return;
    const wrap: HTMLDivElement = wrapNullable;

    let w = wrap.clientWidth, h = wrap.clientHeight;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.z = 3.1;

    const globe = new THREE.Group();
    scene.add(globe);

    // Thin lat/long rings (no triangle-edge noise), opacity 0.15
    const ringMat = new THREE.LineBasicMaterial({ color: palette.wire, transparent: true, opacity: 0.15 });
    const mkCircle = (r: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    };
    for (let lat = -60; lat <= 60; lat += 30) {
      const rad = (lat * Math.PI) / 180;
      const ring = new THREE.Line(mkCircle(R * Math.cos(rad)), ringMat);
      ring.position.y = R * Math.sin(rad);
      globe.add(ring);
    }
    for (let i = 0; i < 6; i++) {
      const mer = new THREE.Line(mkCircle(R), ringMat);
      mer.rotation.z = Math.PI / 2;
      mer.rotation.y = (i / 6) * Math.PI;
      globe.add(mer);
    }

    // Continent hint: coarse coastline dots
    const coastArr: number[] = [];
    COAST.forEach(([lat, lon]) => {
      const v = latLonToVec3(lat, lon, R * 1.002);
      coastArr.push(v.x, v.y, v.z);
    });
    const coastGeo = new THREE.BufferGeometry();
    coastGeo.setAttribute("position", new THREE.Float32BufferAttribute(coastArr, 3));
    globe.add(new THREE.Points(coastGeo, new THREE.PointsMaterial({ color: palette.coast, size: 0.028, transparent: true, opacity: 0.5 })));

    // City dots
    const cityVecs = CITIES.map((c) => latLonToVec3(c.lat, c.lon, R * 1.004));
    const cityArr: number[] = [];
    cityVecs.forEach((v) => cityArr.push(v.x, v.y, v.z));
    const cityGeo = new THREE.BufferGeometry();
    cityGeo.setAttribute("position", new THREE.Float32BufferAttribute(cityArr, 3));
    globe.add(new THREE.Points(cityGeo, new THREE.PointsMaterial({ color: palette.city, size: 0.05, transparent: true, opacity: 0.95 })));

    // Arcs: 3D quadratic beziers city → MIA, drawn in sequentially
    const mia = cityVecs[0];
    const ARC_SEGS = 90;
    const arcs = CITIES.slice(1).map((c, i) => {
      const from = cityVecs[i + 1];
      const mid = from.clone().add(mia).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.4);
      const curve = new THREE.QuadraticBezierCurve3(from, mid, mia);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(ARC_SEGS));
      geo.setDrawRange(0, 0);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: palette.arc, transparent: true, opacity: 0.85 }));
      globe.add(line);
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), new THREE.MeshBasicMaterial({ color: palette.particle }));
      particle.visible = false;
      globe.add(particle);
      return { curve, geo, particle, delay: 0.3 + i * 0.28, pulseOffset: i * 1.15 };
    });

    // MIA hub: pulsing ring tangent to the sphere
    const hubRing = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.06, 40),
      new THREE.MeshBasicMaterial({ color: palette.hub, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
    );
    hubRing.position.copy(mia.clone().multiplyScalar(1.01));
    hubRing.lookAt(mia.clone().multiplyScalar(2));
    globe.add(hubRing);

    // Interaction: slow auto-rotation + horizontal drag with inertia
    let rotY = 0, velY = 0, dragging = false, lastX = 0;
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      rotY += dx * 0.005;
      velY = dx * 0.005;
    };
    const onUp = () => { dragging = false; };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y";

    // Pause rendering when off-screen; arcs start drawing on first entry
    let active = false;
    let raf = 0;
    let drawStart: number | null = null;
    const clock = new THREE.Clock();
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0].isIntersecting;
        if (on && !active) {
          active = true;
          if (drawStart === null) drawStart = performance.now() / 1000;
          clock.getDelta();
          tick();
        } else if (!on) {
          active = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(wrap);

    const onResize = () => {
      w = wrap.clientWidth; h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const proj = new THREE.Vector3();
    function tick() {
      if (!active) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const now = performance.now() / 1000;
      const elapsed = drawStart === null ? 0 : now - drawStart;

      // one revolution ≈ 60s + drag inertia
      if (!dragging) {
        rotY += (Math.PI * 2 / 60) * dt + velY;
        velY *= 0.94;
      }
      globe.rotation.y = rotY;
      // rotational parallax with scroll
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrollT = clamp01((rect.top + rect.height / 2) / vh);
      globe.rotation.x = 0.14 + (scrollT - 0.5) * 0.24;

      // arcs draw in sequentially, then a particle rides each arc every ~8s
      arcs.forEach((a) => {
        const t = clamp01((elapsed - a.delay) / 1.5);
        a.geo.setDrawRange(0, Math.floor(easeInOut(t) * ARC_SEGS) + (t > 0 ? 1 : 0));
        if (t >= 1) {
          const cycle = (elapsed - a.delay - 1.5 + a.pulseOffset) % 8;
          const tt = cycle / 2.6;
          if (tt >= 0 && tt <= 1) {
            a.particle.visible = true;
            a.particle.position.copy(a.curve.getPointAt(easeInOut(tt)));
          } else {
            a.particle.visible = false;
          }
        }
      });

      // hub pulse
      const pulse = (now % 2.4) / 2.4;
      hubRing.scale.setScalar(1 + pulse * 1.6);
      (hubRing.material as THREE.MeshBasicMaterial).opacity = 0.75 * (1 - pulse);

      // project labels to HTML overlay
      globe.updateMatrixWorld();
      CITIES.forEach((c, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        proj.copy(cityVecs[i]).applyMatrix4(globe.matrixWorld);
        const facing = proj.z > 0.12;
        proj.project(camera);
        el.style.transform = `translate(${(proj.x * 0.5 + 0.5) * w + 9}px, ${(-proj.y * 0.5 + 0.5) * h - 6}px)`;
        el.style.opacity = facing ? "1" : "0";
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, failed]);

  if (reduce || failed) return <ArcsSVG palette={palette} />;

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      {CITIES.map((c, i) => (
        <span
          key={c.label}
          ref={(el) => { labelRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            fontFamily: "var(--font-plex-mono), monospace",
            fontSize: 10.5,
            letterSpacing: "0.15em",
            color: c.hub ? palette.hubLabelCss : palette.labelCss,
            pointerEvents: "none",
            transition: "opacity 0.3s",
            opacity: 0,
            willChange: "transform",
          }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}
