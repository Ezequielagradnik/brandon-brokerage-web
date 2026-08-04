"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useReducedMotion } from "framer-motion";

// A phone standing on the contact page with the Brandon globe turning inside it.
//
// The screen is a second scene rendered to a texture every frame, so the globe
// is genuinely inside the display rather than a sphere parked in front of it ,
// it clips at the bezel and tilts with the device, which is the whole point.
//
// The body is one rounded box in matte graphite with a lighter rail, a dynamic
// island, and three side buttons. Those details are what separate a phone from
// a black rectangle.
//
// It is decorative: the number beside it on the page is the real affordance, so
// this returns null under reduced motion or without WebGL, and it stops
// rendering when it scrolls out of view or the tab is hidden.

export type DevicePalette = {
  /** screen background */
  screen: string;
  /** wordmark and rules on the screen */
  ink: string;
  /** globe meridians and the rule under the wordmark */
  accent: string;
};

type Props = {
  palette: DevicePalette;
  className?: string;
  /**
   * Whether the phone leans towards the cursor. On concepts whose motion is all
   * one-shot reveals, a thing that keeps answering the pointer is a different
   * category of movement and reads as a demo dropped into the page. Turn it off
   * and the slow float alone reads as breath.
   */
  lean?: boolean;
};

// iPhone proportions: 19.5:9, so the body is 2.06 wide by 4.46 tall.
const W = 2.06;
const H = 4.46;
const D = 0.23;
const BODY_R = 0.3;
const BEZEL = 0.075;
const SW = W - BEZEL * 2;
const SH = H - BEZEL * 2;
const SCREEN_R = BODY_R - BEZEL;

/**
 * Mix two CSS colours the way they look, not the way three stores them. Colour
 * management converts to linear on parse, so lerping a navy 15% toward cream in
 * three's own space lands on mid grey rather than a slightly lighter navy.
 */
function mix(a: string, b: string, t: number) {
  const ha = new THREE.Color(a).getHex(THREE.SRGBColorSpace);
  const hb = new THREE.Color(b).getHex(THREE.SRGBColorSpace);
  const ch = (h: number, shift: number) => (h >> shift) & 255;
  const lerp = (shift: number) => Math.round(ch(ha, shift) + (ch(hb, shift) - ch(ha, shift)) * t);
  const out = new THREE.Color();
  out.setHex((lerp(16) << 16) | (lerp(8) << 8) | lerp(0), THREE.SRGBColorSpace);
  return out;
}

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** ShapeGeometry with UVs remapped to the shape's bounding box, so a texture fills it. */
function shapeGeometry(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 20);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + w / 2) / w;
    uv[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

/** The wordmark, drawn rather than shipped, so it takes the concept's ink. */
function wordmarkTexture(ink: string, accent: string) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 320;
  const g = c.getContext("2d");
  if (!g) return null;

  g.fillStyle = ink;
  g.textAlign = "center";
  g.font = '500 148px Georgia, "Times New Roman", serif';
  g.fillText("BRANDON", c.width / 2, 150);

  g.fillStyle = accent;
  g.fillRect(c.width / 2 - 210, 186, 420, 3);

  g.fillStyle = ink;
  g.globalAlpha = 0.88;
  g.font = '600 54px ui-sans-serif, system-ui, sans-serif';
  const t = "BROKERAGE GROUP";
  g.letterSpacing = "13px";
  g.fillText(t, c.width / 2 + 9, 250);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Soft contact shadow, so the phone sits on something. */
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d");
  if (!g) return null;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.42)");
  grad.addColorStop(0.55, "rgba(0,0,0,0.14)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

export default function DeviceCall({ palette, className, lean = true }: Props) {
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
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      const id = setTimeout(() => setFailed(true), 0);
      return () => clearTimeout(id);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const disposables: { dispose(): void }[] = [];
    const keep = <T extends { dispose(): void }>(x: T) => {
      disposables.push(x);
      return x;
    };

    // ————— the screen, as its own scene rendered to a texture —————
    const target = new THREE.WebGLRenderTarget(600, 1300, {
      colorSpace: THREE.SRGBColorSpace,
      samples: 4,
    });
    disposables.push(target);

    const uiScene = new THREE.Scene();
    uiScene.background = new THREE.Color(palette.screen);
    const halfH = (SH / SW) * 1;
    const uiCam = new THREE.OrthographicCamera(-1, 1, halfH, -halfH, 0.01, 20);
    uiCam.position.z = 6;

    // The globe: a solid ball just inside a cage of meridians and parallels, so
    // the front of the cage draws over it and the back is occluded. Equal radii
    // would z-fight and flatten the whole thing into a disc.
    const R = 0.6;
    const globe = new THREE.Group();
    globe.position.set(0, halfH * 0.2, 0);
    uiScene.add(globe);

    const ball = new THREE.Mesh(
      keep(new THREE.SphereGeometry(R * 0.965, 48, 36)),
      keep(new THREE.MeshBasicMaterial({ color: mix(palette.screen, palette.ink, 0.07) }))
    );
    globe.add(ball);

    const lineMat = keep(new THREE.LineBasicMaterial({ color: new THREE.Color(palette.accent) }));
    const faintMat = keep(new THREE.LineBasicMaterial({ color: new THREE.Color(palette.ink), transparent: true, opacity: 0.42 }));

    /** circle in the XZ plane, for parallels */
    const parallel = (r: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 80; i++) {
        const a = (i / 80) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
      }
      return keep(new THREE.BufferGeometry().setFromPoints(pts));
    };
    /** circle in the XY plane, so a plain yaw spaces the meridians out */
    const meridian = (r: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 80; i++) {
        const a = (i / 80) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      return keep(new THREE.BufferGeometry().setFromPoints(pts));
    };

    // equator bright, the rest a step back
    const eq = new THREE.Line(parallel(R), lineMat);
    globe.add(eq);
    for (const y of [0.3, -0.3, 0.47, -0.47] as const) {
      const l = new THREE.Line(parallel(Math.sqrt(Math.max(R * R - y * y, 0.0001))), faintMat);
      l.position.y = y;
      globe.add(l);
    }
    for (let i = 0; i < 8; i++) {
      const l = new THREE.Line(meridian(R), faintMat);
      l.rotation.y = (i / 8) * Math.PI;
      globe.add(l);
    }

    // Miami, the one place on it that matters
    const hub = new THREE.Mesh(
      keep(new THREE.SphereGeometry(0.032, 16, 16)),
      keep(new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.accent) }))
    );
    hub.position.set(0.17, 0.26, R * 0.9);
    globe.add(hub);

    const wordTex = wordmarkTexture(palette.ink, palette.accent);
    if (wordTex) disposables.push(wordTex);
    const word = new THREE.Mesh(
      keep(new THREE.PlaneGeometry(1.42, 0.444)),
      keep(new THREE.MeshBasicMaterial({ map: wordTex ?? undefined, transparent: true }))
    );
    word.position.set(0, -halfH * 0.46, 0);
    uiScene.add(word);

    // ————— the phone —————
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    camera.position.set(0, 0, 12.4);

    const phone = new THREE.Group();
    // a product-shot three-quarter hint, not a full turn
    phone.rotation.y = -0.13;
    phone.rotation.x = 0.05;
    scene.add(phone);

    // the polished rail sits a hair proud of the matte back
    const rail = new THREE.Mesh(
      keep(new RoundedBoxGeometry(W, H, D, 6, BODY_R)),
      keep(new THREE.MeshStandardMaterial({ color: 0x8d9099, roughness: 0.24, metalness: 0.95 }))
    );
    phone.add(rail);

    const body = new THREE.Mesh(
      keep(new RoundedBoxGeometry(W - 0.035, H - 0.035, D + 0.006, 6, BODY_R - 0.02)),
      keep(new THREE.MeshStandardMaterial({ color: 0x121316, roughness: 0.62, metalness: 0.35 }))
    );
    phone.add(body);

    const screen = new THREE.Mesh(
      keep(shapeGeometry(SW, SH, SCREEN_R)),
      keep(new THREE.MeshBasicMaterial({ map: target.texture, toneMapped: false }))
    );
    screen.position.z = D / 2 + 0.006;
    phone.add(screen);

    // dynamic island
    const island = new THREE.Mesh(
      keep(shapeGeometry(0.5, 0.15, 0.075)),
      keep(new THREE.MeshBasicMaterial({ color: 0x0a0a0c }))
    );
    island.position.set(0, SH / 2 - 0.17, D / 2 + 0.008);
    phone.add(island);

    // side buttons
    const btnMat = keep(new THREE.MeshStandardMaterial({ color: 0x7e8189, roughness: 0.3, metalness: 0.9 }));
    const mkBtn = (h: number, y: number, x: number) => {
      const b = new THREE.Mesh(keep(new RoundedBoxGeometry(0.035, h, D * 0.62, 3, 0.016)), btnMat);
      b.position.set(x, y, 0);
      phone.add(b);
    };
    mkBtn(0.5, 0.62, W / 2 + 0.006);   // power
    mkBtn(0.34, 1.05, -W / 2 - 0.006); // volume up
    mkBtn(0.34, 0.65, -W / 2 - 0.006); // volume down
    mkBtn(0.16, 1.42, -W / 2 - 0.006); // ring switch

    // contact shadow
    const shTex = shadowTexture();
    if (shTex) disposables.push(shTex);
    const shadow = new THREE.Mesh(
      keep(new THREE.PlaneGeometry(W * 2.5, H * 0.7)),
      keep(new THREE.MeshBasicMaterial({ map: shTex ?? undefined, transparent: true, depthWrite: false }))
    );
    shadow.position.set(0.1, -H / 2 - 0.15, -0.5);
    scene.add(shadow);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(-3.5, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 1.9);
    rim.position.set(5, -1.5, 2);
    scene.add(rim);

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const want = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      want.x = ((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)) * 0.34;
      want.y = ((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)) * 0.2;
    };
    if (lean) window.addEventListener("pointermove", onMove, { passive: true });

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    // velocity spring, so the lean has weight and can be interrupted mid-move
    const rot = { x: 0, y: 0, vx: 0, vy: 0 };
    const STIFF = 40;
    const DAMP = 9.5;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!onScreen || document.hidden) return;
      t += dt;

      globe.rotation.y += dt * 0.32;

      const ty = want.x + Math.sin(t * 0.3) * 0.055;
      const tx = want.y + Math.sin(t * 0.23 + 1.1) * 0.03;
      rot.vy += (ty - rot.y) * STIFF * dt;
      rot.vx += (tx - rot.x) * STIFF * dt;
      rot.vy -= rot.vy * DAMP * dt;
      rot.vx -= rot.vx * DAMP * dt;
      rot.y += rot.vy * dt;
      rot.x += rot.vx * dt;

      phone.rotation.y = -0.13 + rot.y;
      phone.rotation.x = 0.05 + rot.x;
      phone.position.y = Math.sin(t * 0.45) * 0.07;

      renderer.setRenderTarget(target);
      renderer.render(uiScene, uiCam);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (lean) window.removeEventListener("pointermove", onMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [palette, reduce, failed, lean]);

  // Decorative only: the number next to it is the real way to call.
  if (reduce || failed) return null;

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
