"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// The hero photo with the bay alive. The skyline and the sky stay untouched;
// below the waterline the shader rolls slow waves through the real water,
// sunset glints ride the crests, the cursor drags a wake and a click drops a
// ripple. Ken Burns and the scroll parallax now live inside the sampler, so
// the photo keeps the exact motion the DOM version had. Falls back to the
// plain photo when WebGL is unavailable or motion is reduced.

const SRC = "/images/miami-sunset.jpg";
const IMG_ASPECT = 1600 / 2400;
const WATERLINE = 0.445; // image uv from the bottom, where the towers meet the bay

const VERT = "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }";
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tex;
uniform float t; uniform vec2 res; uniform float imgA;
uniform float ken;   // ken-burns zoom
uniform float par;   // scroll parallax, in image uv
uniform vec2 c; uniform float ca; // click + seconds since
uniform float water;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1,0)),cc=hash(i+vec2(0,1)),d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(cc,d,u.x),u.y); }

vec2 toImg(vec2 uv){
  float canvasA = res.x/res.y;
  vec2 vis = vec2(min(1.0, canvasA/imgA), min(1.0, imgA/canvasA));
  vec2 iuv = 0.5 + (uv - 0.5) * vis / ken;
  iuv.y -= par;
  return iuv;
}

void main(){
  vec2 iuv = toImg(vUv);
  vec2 suv = iuv;
  float glint = 0.0;
  float depth = water - iuv.y;
  if (depth > 0.0) {
    // waves foreshorten toward the horizon: quiet at the waterline, rolling near the viewer
    float amp = smoothstep(0.0, 0.06, depth) * (0.3 + depth * 1.2);
    float w1 = sin(iuv.x*70.0 + t*1.1 + sin(iuv.y*90.0 + t*0.7)*1.4);
    float w2 = noise(vec2(iuv.x*26.0, iuv.y*60.0 - t*0.55))*2.0 - 1.0;

    // a click drops an expanding ring, stretched by the same foreshortening
    vec2 ci = toImg(c);
    float dc = distance(vec2(iuv.x, iuv.y*2.2), vec2(ci.x, ci.y*2.2));
    float ring = exp(-pow((dc - ca*0.22)*26.0, 2.0)) * exp(-ca*1.4) * sin(dc*110.0 - ca*9.0);

    float wave = (w1*0.5 + w2*0.5) * 0.008 * amp + ring*0.02;
    suv.y = iuv.y + wave;
    suv.x = iuv.x + (w2*0.35 + ring*0.6) * 0.006 * amp;
    glint = max(0.0, wave) * 26.0 * amp;
  }
  vec3 col = texture2D(tex, suv).rgb;
  col += vec3(1.0, 0.82, 0.58) * glint * 0.35; // sunset catching the crests
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function WaterPhoto() {
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
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    } catch {
      const id = setTimeout(() => setFailed(true), 0);
      return () => clearTimeout(id);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const tex = new THREE.TextureLoader().load(SRC);
    tex.minFilter = THREE.LinearFilter;
    const uniforms = {
      tex: { value: tex },
      t: { value: 0 },
      res: { value: new THREE.Vector2(w, h) },
      imgA: { value: IMG_ASPECT },
      ken: { value: 1 },
      par: { value: 0 },
      c: { value: new THREE.Vector2(-10, -10) },
      ca: { value: 9e9 },
      water: { value: WATERLINE },
    };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const onResize = () => {
      w = wrap.clientWidth; h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.res.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    const onDown = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right) return;
      uniforms.c.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      uniforms.ca.value = 0;
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

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

    function tick() {
      if (!active) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const tt = (uniforms.t.value += dt);
      if (uniforms.ca.value < 9e8) uniforms.ca.value += dt;

      // the 22s Ken Burns breath the DOM version had
      uniforms.ken.value = 1 + 0.06 * (0.5 - 0.5 * Math.cos((tt * Math.PI) / 11));
      // scroll parallax: the crop slides as the hero leaves the viewport
      const r = wrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      uniforms.par.value = p * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onDown);
      tex.dispose();
      mat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, failed]);

  if (reduce || failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={SRC} alt="" data-photo-slot="hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />;
  }
  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
