"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// The hero's field: a silk of gold contour threads over the navy, running as
// slow swells. It lifts under the cursor and a click drops a ring wave onto
// it. Drawn as line rows (no triangles), displaced entirely in the vertex
// shader, with a layer of gold dust drifting above , everything on the GPU,
// so the whole scene is two draw calls. Falls back to the CSS glows alone
// when WebGL is unavailable or motion is reduced.

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const SILK_VERT = /* glsl */ `
uniform float uTime;
uniform vec3 uMouse;      // x,z on the surface; y = presence 0..1
uniform vec3 uClick;      // x,z of the last click; y unused
uniform float uClickAge;  // seconds since the click (9e9 = never)
varying float vElev;
varying vec2 vXZ;
${NOISE}
float fbm(vec3 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * snoise(p); p *= 2.02; a *= 0.5; }
  return v;
}
void main(){
  vec3 pos = position;
  float t = uTime * 0.10;
  float elev = fbm(vec3(pos.x * 0.34, pos.z * 0.52, t)) * 0.56;
  elev += 0.16 * sin(pos.x * 0.48 + uTime * 0.22) * cos(pos.z * 0.66 - uTime * 0.15);
  float d = distance(pos.xz, uMouse.xz);
  elev += uMouse.y * 0.52 * exp(-d * d * 1.5);
  float r = uClickAge * 2.3;
  float ring = exp(-pow((distance(pos.xz, uClick.xz) - r) * 2.2, 2.0)) * exp(-uClickAge * 1.05);
  elev += ring * 0.55;
  pos.y += elev;
  vElev = elev;
  vXZ = position.xz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const SILK_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uDeep;
uniform vec3 uBright;
varying float vElev;
varying vec2 vXZ;
void main(){
  float h = clamp(vElev * 0.85 + 0.42, 0.0, 1.0);
  vec3 col = mix(uDeep, uBright, h * h);
  float fx = smoothstep(6.2, 4.4, abs(vXZ.x));
  float fz = smoothstep(3.4, 2.0, abs(vXZ.y));
  gl_FragColor = vec4(col, 0.42 * fx * fz);
}
`;

const DUST_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSeed;
varying float vTwinkle;
void main(){
  vec3 p = position;
  p.x = mod(p.x + uTime * (0.10 + 0.16 * fract(aSeed * 7.31)) + 6.0, 12.0) - 6.0;
  p.y += 0.16 * sin(uTime * 0.5 + aSeed * 6.2831);
  vTwinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + fract(aSeed * 3.7)) + aSeed * 40.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.1 + 2.4 * fract(aSeed * 13.7)) * uPixelRatio * (2.6 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const DUST_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uBright;
varying float vTwinkle;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.06, d) * 0.55 * vTwinkle;
  gl_FragColor = vec4(uBright, a);
}
`;

export default function HeroField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce || failed) return;
    const wrapNullable = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrapNullable || !canvas) return;
    // narrowing does not reach the hoisted tick(); pin the non-null alias
    const wrap: HTMLDivElement = wrapNullable;

    let w = wrap.clientWidth, h = wrap.clientHeight;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      const id = setTimeout(() => setFailed(true), 0);
      return () => clearTimeout(id);
    }
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 60);
    camera.position.set(0, 0.5, 3.4);
    camera.lookAt(0, -0.18, 0);

    const group = new THREE.Group();
    group.position.y = -0.78;
    scene.add(group);

    const small = w < 768;
    const ROWS = small ? 64 : 96;
    const COLS = small ? 150 : 230;
    const W = 12, D = 6;

    // Contour rows only: threads along X, stacked in Z. LineSegments pairs.
    const positions = new Float32Array(ROWS * (COLS - 1) * 2 * 3);
    let o = 0;
    for (let r = 0; r < ROWS; r++) {
      const z = (r / (ROWS - 1) - 0.5) * D;
      for (let c = 0; c < COLS - 1; c++) {
        const x1 = (c / (COLS - 1) - 0.5) * W;
        const x2 = ((c + 1) / (COLS - 1) - 0.5) * W;
        positions[o++] = x1; positions[o++] = 0; positions[o++] = z;
        positions[o++] = x2; positions[o++] = 0; positions[o++] = z;
      }
    }
    const silkGeo = new THREE.BufferGeometry();
    silkGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uClick: { value: new THREE.Vector3(0, 0, 0) },
      uClickAge: { value: 9e9 },
      uDeep: { value: new THREE.Color("#8a6f33") },
      uBright: { value: new THREE.Color("#f0dcae") },
    };
    const silkMat = new THREE.ShaderMaterial({
      vertexShader: SILK_VERT,
      fragmentShader: SILK_FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.LineSegments(silkGeo, silkMat));

    // Gold dust above the silk
    const DUST = small ? 1100 : 2200;
    const dustPos = new Float32Array(DUST * 3);
    const dustSeed = new Float32Array(DUST);
    for (let i = 0; i < DUST; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * W;
      dustPos[i * 3 + 1] = Math.random() * 1.9 + 0.05;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * D;
      dustSeed[i] = Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
    const dustUniforms = {
      uTime: uniforms.uTime,
      uPixelRatio: { value: pixelRatio },
      uBright: { value: new THREE.Color("#e8d3a0") },
    };
    const dustMat = new THREE.ShaderMaterial({
      vertexShader: DUST_VERT,
      fragmentShader: DUST_FRAG,
      uniforms: dustUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(dustGeo, dustMat));

    // Pointer → point on the silk plane. The wrapper is pointer-events none
    // (links and CTAs live above), so both listeners ride on the window and
    // clip themselves to the hero's rect.
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.78);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const target = new THREE.Vector3(0, 0, 0); // x,z aim; y = presence aim
    let camDriftX = 0;

    const toSurface = (e: PointerEvent, out: THREE.Vector3) => {
      const rect = wrap.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) return false;
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return false;
      out.set(THREE.MathUtils.clamp(hit.x, -W / 2, W / 2), out.y, THREE.MathUtils.clamp(hit.z, -D / 2, D / 2));
      camDriftX = ndc.x;
      return true;
    };
    const onMove = (e: PointerEvent) => {
      target.y = toSurface(e, target) ? 1 : 0;
    };
    const onLeave = () => { target.y = 0; };
    const onDown = (e: PointerEvent) => {
      const p = new THREE.Vector3();
      if (toSurface(e, p)) {
        uniforms.uClick.value.set(p.x, 0, p.z);
        uniforms.uClickAge.value = 0;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let active = false;
    let raf = 0;
    const clock = new THREE.Clock();
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0].isIntersecting;
        if (on && !active) { active = true; clock.getDelta(); tick(); }
        else if (!on) { active = false; cancelAnimationFrame(raf); }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const onResize = () => {
      w = wrap.clientWidth; h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    function tick() {
      if (!active) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;
      if (uniforms.uClickAge.value < 9e8) uniforms.uClickAge.value += dt;

      // the bump glides after the cursor instead of snapping to it
      const m = uniforms.uMouse.value;
      m.x += (target.x - m.x) * Math.min(1, dt * 6);
      m.z += (target.z - m.z) * Math.min(1, dt * 6);
      m.y += (target.y - m.y) * Math.min(1, dt * 3.2);

      // slight camera sway with the cursor, and a slow breathing drift
      camera.position.x += (camDriftX * 0.22 - camera.position.x) * Math.min(1, dt * 2);
      camera.lookAt(0, -0.18, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      silkGeo.dispose(); dustGeo.dispose();
      silkMat.dispose(); dustMat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, failed]);

  if (reduce || failed) return null;

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
