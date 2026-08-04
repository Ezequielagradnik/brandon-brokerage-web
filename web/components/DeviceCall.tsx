"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// A phone lying in the contact page, showing the desk's number on its screen.
// It breathes on a slow idle and leans towards the cursor with a spring, so it
// reads as an object on a desk rather than a spinning logo. Tapping it dials.
//
// The whole thing is decorative , the number beside it is the real affordance ,
// so it disappears entirely under reduced motion or without WebGL, and it stops
// rendering when it scrolls out of view or the tab is hidden.

export type DevicePalette = {
  /** phone body */
  shell: string;
  /** screen background */
  screen: string;
  /** number and glyphs on the screen */
  ink: string;
  /** accent: the call pill and the side button */
  accent: string;
  /** page colour behind the phone, used for the soft ground shadow */
  ground: string;
};

type Props = {
  palette: DevicePalette;
  /** the number drawn on the screen */
  number: string;
  /** small line above the number */
  caption: string;
  className?: string;
  /**
   * Whether the phone leans towards the cursor. On concepts whose motion is all
   * one-shot reveals, a thing that keeps answering the pointer is a different
   * category of movement and reads as a demo embedded in the page. Turn it off
   * and the slow float alone reads as breath.
   */
  lean?: boolean;
};

const W = 2.05; // phone width in world units
const H = 4.15;
const D = 0.2;

function screenTexture(p: DevicePalette, number: string, caption: string) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 1040;
  const g = c.getContext("2d");
  if (!g) return null;

  g.fillStyle = p.screen;
  g.fillRect(0, 0, c.width, c.height);

  // status bar
  g.fillStyle = p.ink;
  g.globalAlpha = 0.5;
  g.font = "500 26px ui-sans-serif, system-ui, sans-serif";
  g.textAlign = "left";
  g.fillText("Brandon", 44, 62);
  g.textAlign = "right";
  g.fillText("Coral Gables", c.width - 44, 62);
  g.globalAlpha = 1;

  // caption
  g.textAlign = "center";
  g.globalAlpha = 0.62;
  g.font = "500 30px ui-monospace, SFMono-Regular, Menlo, monospace";
  g.fillText(caption.toUpperCase(), c.width / 2, 404);
  g.globalAlpha = 1;

  // the number, the reason the screen exists
  g.font = "600 66px ui-sans-serif, system-ui, sans-serif";
  g.fillText(number, c.width / 2, 486);

  // call pill
  const pw = 300;
  const ph = 92;
  const px = (c.width - pw) / 2;
  const py = 620;
  const r = ph / 2;
  g.fillStyle = p.accent;
  g.beginPath();
  g.moveTo(px + r, py);
  g.arcTo(px + pw, py, px + pw, py + ph, r);
  g.arcTo(px + pw, py + ph, px, py + ph, r);
  g.arcTo(px, py + ph, px, py, r);
  g.arcTo(px, py, px + pw, py, r);
  g.closePath();
  g.fill();

  // handset glyph, drawn rather than shipped as an asset
  g.strokeStyle = p.screen;
  g.lineWidth = 7;
  g.lineCap = "round";
  g.lineJoin = "round";
  const cx = c.width / 2;
  const cy = py + ph / 2;
  g.beginPath();
  g.moveTo(cx - 21, cy - 17);
  g.lineTo(cx - 8, cy - 4);
  g.lineTo(cx - 14, cy + 2);
  g.quadraticCurveTo(cx, cy + 16, cx + 14, cy + 2);
  g.lineTo(cx + 8, cy - 4);
  g.lineTo(cx + 21, cy - 17);
  g.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export default function DeviceCall({ palette, number, caption, className, lean = true }: Props) {
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const phone = new THREE.Group();
    scene.add(phone);

    // body
    const shell = new THREE.Mesh(
      new THREE.BoxGeometry(W, H, D),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(palette.shell), roughness: 0.34, metalness: 0.55 })
    );
    phone.add(shell);

    // screen, inset a hair so the shell reads as a bezel
    const tex = screenTexture(palette, number, caption);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(W * 0.9, H * 0.93),
      new THREE.MeshBasicMaterial({ map: tex ?? undefined, color: tex ? 0xffffff : new THREE.Color(palette.screen), toneMapped: false })
    );
    screen.position.z = D / 2 + 0.002;
    phone.add(screen);

    // side button, the detail that makes it read as a device
    const btn = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.42, 0.1),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(palette.accent), roughness: 0.4, metalness: 0.4 })
    );
    btn.position.set(W / 2 + 0.01, 0.75, 0);
    phone.add(btn);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(-3, 4, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(new THREE.Color(palette.accent), 1.5);
    rim.position.set(4.5, -2, 2.5);
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

    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      target.x = ((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)) * 0.5;
      target.y = ((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)) * 0.34;
    };
    if (lean) window.addEventListener("pointermove", onMove, { passive: true });

    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    // velocity-based spring, so the lean has weight and can be interrupted
    const rot = { x: 0, y: 0, vx: 0, vy: 0 };
    const STIFF = 42;
    const DAMP = 9;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!onScreen || document.hidden) return;
      t += dt;

      const wantY = target.x + Math.sin(t * 0.32) * 0.1;
      const wantX = target.y + Math.sin(t * 0.24 + 1.1) * 0.05;
      rot.vy += (wantY - rot.y) * STIFF * dt;
      rot.vx += (wantX - rot.x) * STIFF * dt;
      rot.vy -= rot.vy * DAMP * dt;
      rot.vx -= rot.vx * DAMP * dt;
      rot.y += rot.vy * dt;
      rot.x += rot.vx * dt;

      phone.rotation.y = rot.y;
      phone.rotation.x = rot.x;
      phone.position.y = Math.sin(t * 0.5) * 0.09;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (lean) window.removeEventListener("pointermove", onMove);
      tex?.dispose();
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      screen.geometry.dispose();
      (screen.material as THREE.Material).dispose();
      btn.geometry.dispose();
      (btn.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [palette, number, caption, reduce, failed, lean]);

  // Decorative only: the number next to it is the real way to call.
  if (reduce || failed) return null;

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
