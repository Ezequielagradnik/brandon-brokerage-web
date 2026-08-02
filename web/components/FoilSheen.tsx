"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// Raking light across gold foil, for the /n hero. A single full-screen quad:
// two light bands, warped by noise and crossed at different angles, drift over
// the beige and lean towards the pointer. Alpha-only, so the page colour shows
// through and the type stays readable.
//
// Falls back to a still gradient when WebGL is unavailable or motion is
// reduced, and stops rendering whenever the hero is off-screen or the tab is
// hidden , a full-screen fragment shader is not something to leave running.

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uRes;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// three octaves is enough grain for foil and cheap enough to run full-screen
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(vUv.x * aspect, vUv.y);

  float t = uTime * 0.05;

  // stretched vertically: the grain reads as rolled metal, not clouds
  vec2 q = vec2(p.x * 1.15, p.y * 3.4);
  float warp = fbm(q + vec2(t, -t * 0.42));
  float warp2 = fbm(q * 1.7 - vec2(t * 0.55, t * 0.18));

  // the light leans towards the cursor, a fraction of the way
  float lean = uPointer.x * 0.55;
  float rise = uPointer.y * 0.35;

  // two bands crossing at different angles and speeds
  float b1 = sin((p.x * 1.5 + p.y * 1.1 + lean) * 2.6 + warp * 3.4 + t * 1.7);
  float b2 = sin((p.x * 0.8 - p.y * 1.6 - rise) * 3.1 - warp2 * 2.8 - t * 1.1);

  float sheen = pow(max(b1, 0.0), 3.0) * 0.72 + pow(max(b2, 0.0), 4.0) * 0.42;

  // a broad, soft pool so the foil has body between the bands
  float pool = smoothstep(0.35, 0.95, warp * 0.7 + warp2 * 0.5);
  sheen += pool * 0.18;

  // strongest behind the headline (lower left), gone at the far edges
  float focus = smoothstep(1.25, 0.15, length((vUv - vec2(0.28, 0.42)) * vec2(aspect * 0.65, 1.0)));
  float edge = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.72, vUv.y);

  float a = clamp(sheen, 0.0, 1.0) * focus * edge * 0.5;

  vec3 gold = vec3(0.761, 0.631, 0.357);
  vec3 hot = vec3(0.957, 0.882, 0.694);
  vec3 col = mix(gold, hot, clamp(sheen * 0.85, 0.0, 1.0));

  gl_FragColor = vec4(col, a);
}
`;

export default function FoilSheen({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce || failed) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    } catch {
      const id = setTimeout(() => setFailed(true), 0);
      return () => clearTimeout(id);
    }

    // the sheen is all low frequency, so it survives a low pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uRes: { value: new THREE.Vector2(1, 1) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // pointer target vs. the value the shader sees: the lag is what makes the
    // light feel heavy instead of glued to the cursor
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = 1 - (e.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!onScreen || document.hidden) return;

      elapsed += dt;
      const cur = uniforms.uPointer.value;
      cur.x += (target.x - cur.x) * Math.min(dt * 1.6, 1);
      cur.y += (target.y - cur.y) * Math.min(dt * 1.6, 1);
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [reduce, failed]);

  if (reduce || failed) {
    return <div className={className} aria-hidden="true" style={{ background: "radial-gradient(60% 55% at 28% 42%, rgba(194,161,91,0.26), rgba(194,161,91,0) 70%)", pointerEvents: "none" }} />;
  }

  return (
    <div ref={wrapRef} className={className} aria-hidden="true" style={{ pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
