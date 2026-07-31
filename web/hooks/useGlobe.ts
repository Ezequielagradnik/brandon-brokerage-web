"use client";

import { useEffect } from "react";
import * as THREE from "three";

export type GlobePalette = {
  occluder: number;
  graticule: number;
  graticuleAccent: number;
  points: number;
  arcA: number;
  arcB: number;
  arcC: number;
  orbitA: number;
  orbitB: number;
  travelDot: number;
};

// Navy + gold by default (concept D). Concept E passes an electric-blue palette.
export const GOLD_GLOBE: GlobePalette = {
  occluder: 0x0b1b30,
  graticule: 0xc8a76a,
  graticuleAccent: 0xe0c489,
  points: 0xf0d9a6,
  arcA: 0xe0c489,
  arcB: 0x9fb4dc,
  arcC: 0xc8a76a,
  orbitA: 0xc8a76a,
  orbitB: 0x9fb4dc,
  travelDot: 0xf0d9a6,
};

export const BLUE_GLOBE: GlobePalette = {
  occluder: 0x060b18,
  graticule: 0x2451b8,
  graticuleAccent: 0x5c8dff,
  points: 0x9fb8ff,
  arcA: 0x5c8dff,
  arcB: 0x3b82f6,
  arcC: 0x2563eb,
  orbitA: 0x2563eb,
  orbitB: 0x5c8dff,
  travelDot: 0x9fb8ff,
};

// Wireframe globe with city points, revolving great-circle "flight paths" and
// two outer orbits with travelling dots — the foreign-national network motif.
export function useGlobe(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  palette: GlobePalette = GOLD_GLOBE
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let w = canvas.clientWidth, h = canvas.clientHeight;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.z = 3.5;

    const globe = new THREE.Group();
    globe.rotation.z = -0.16;
    scene.add(globe);

    // Solid occluder so only the front-facing lines show through.
    const occluder = new THREE.Mesh(
      new THREE.SphereGeometry(1.19, 64, 64),
      new THREE.MeshBasicMaterial({ color: palette.occluder })
    );
    globe.add(occluder);

    // Graticule (lat/long) — dense mesh
    const grat = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.2, 64, 40)),
      new THREE.LineBasicMaterial({ color: palette.graticule, transparent: true, opacity: 0.42 })
    );
    globe.add(grat);
    // brighter accent meridians/parallels on top for depth
    const gratAccent = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.202, 16, 10)),
      new THREE.LineBasicMaterial({ color: palette.graticuleAccent, transparent: true, opacity: 0.7 })
    );
    globe.add(gratAccent);

    // "City" points scattered on the surface
    const pts: number[] = [];
    for (let i = 0; i < 420; i++) {
      const u = Math.random(), v = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
      const r = 1.205;
      pts.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    globe.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: palette.points, size: 0.03, transparent: true, opacity: 0.95 })));

    // Independently-revolving great-circle "flight paths".
    const arcs: { obj: THREE.Line; ax: "x" | "y" | "z"; sp: number }[] = [];
    function makeArc(rx: number, ry: number, rz: number, color: number, opacity: number, axis: "x" | "y" | "z", speed: number) {
      const seg = 160, arr: number[] = [];
      for (let i = 0; i <= seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        arr.push(Math.cos(a) * 1.212, Math.sin(a) * 1.212, 0);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
      line.rotation.set(rx, ry, rz);
      scene.add(line);
      arcs.push({ obj: line, ax: axis, sp: speed });
    }
    makeArc(1.1, 0.4, 0, palette.arcA, 0.7, "x", 0.0042);
    makeArc(0.5, 1.3, 0, palette.arcB, 0.5, "y", -0.0034);
    makeArc(1.5, 2.1, 0.3, palette.arcA, 0.5, "z", 0.0038);
    makeArc(0.2, 0.9, 0, palette.arcC, 0.45, "y", 0.0028);
    makeArc(2.3, 1.7, 0, palette.arcB, 0.4, "x", -0.0046);
    makeArc(0.9, 0.0, 1.2, palette.arcA, 0.4, "z", -0.003);

    // Two thin orbit rings outside, each with a travelling dot.
    function makeOrbit(radius: number, tilt: number, color: number, ringOpacity: number) {
      const grp = new THREE.Group();
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.004, 8, 180),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: ringOpacity })
      );
      ring.rotation.x = tilt;
      grp.add(ring);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.026, 16, 16), new THREE.MeshBasicMaterial({ color: palette.travelDot }));
      grp.add(dot);
      scene.add(grp);
      return { grp, dot, radius, tilt };
    }
    const orbits = [
      makeOrbit(1.6, 1.32, palette.orbitA, 0.5),
      makeOrbit(1.82, 0.6, palette.orbitB, 0.4),
    ];

    let alive = true, raf = 0, t = 0;
    const onResize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (!alive) return;
      t += 0.01;
      globe.rotation.y += 0.0016;
      arcs.forEach((a) => { a.obj.rotation[a.ax] += a.sp; });
      orbits.forEach((o, i) => {
        o.grp.rotation.y += 0.0022 * (i % 2 ? -1 : 1);
        const a = t * (0.7 + i * 0.35);
        o.dot.position.set(Math.cos(a) * o.radius * Math.cos(o.tilt), Math.sin(a) * o.radius, Math.cos(a) * o.radius * Math.sin(o.tilt));
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
