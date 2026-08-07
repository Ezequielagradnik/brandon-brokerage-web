"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { useScrollReveal } from "@/hooks/useReveals";
import GlobeArcs, { BLUE_ARCS } from "@/components/GlobeArcs";
import { COPY, OFFERINGS_I18N, type Lang } from "@/lib/copy";
import { ScrollProgress, WordsReveal, FadeIn, CountUp, GrowLine, Magnetic, MaskReveal, ctaFillFromCursor } from "@/components/motion";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { NETWORK_URL } from "@/lib/contact";
import { DHeader, SectionHead, useLang } from "./chrome";
import { BODY, CARRIERS, EASE, HAIR, HAIR_SAPPHIRE, MONO_K, MUTED, NAVY, SAPPHIRE, SAPPHIRE_DEEP, SERIF, EXTRA, OFFICE } from "./copy";
import styles from "./page.module.css";

// Ivory & Sapphire. The landing carries the argument: the silk hero, the
// platform hand-off, the four pillars behind the silk curtain, the specialty in one
// paragraph and the phone number. Everything that needs room , the firm, the
// products, the foreign-national case flow, the forms desk , lives on its own
// page, the way brandonbrokerage.com splits it.

const VERTEX_SHADER = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position,1.0); }";

// Marbled sapphire ink on ivory , domain-warped fbm draws veins like the
// endpapers of a fine book. The ink curls around the cursor, and a click
// sends a pulse through the veins. `mk` fades the field to ivory where the
// type sits (left on landscape, top on portrait); the curtain passes 0.
const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform float t; uniform vec2 res; uniform vec2 m; uniform vec2 c; uniform float ca; uniform float mk;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1,0)),cc=hash(i+vec2(0,1)),d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(cc,d,u.x),u.y); }
float fbm(vec2 p){ float v=0.0; float a=0.5; mat2 r=mat2(0.8,0.6,-0.6,0.8); for(int i=0;i<4;i++){ v+=a*noise(p); p=r*p*2.02; a*=0.5; } return v; }
void main(){
  vec2 uv=vUv;
  float aspect=res.x/res.y;
  vec2 p=vec2(uv.x*aspect, uv.y)*2.6;

  // the ink curls around the cursor
  vec2 mp=vec2(m.x*aspect, m.y)*2.6;
  vec2 toM=p-mp; float dm=length(toM);
  p+=0.38*exp(-dm*dm*2.0)*vec2(-toM.y,toM.x);

  // a click pulses outward through the veins
  vec2 cp=vec2(c.x*aspect, c.y)*2.6;
  float ring=exp(-pow((distance(p,cp)-ca*1.7)*3.0,2.0))*exp(-ca*1.1);

  vec2 q=vec2(fbm(p+t*0.05), fbm(p+vec2(5.2,1.3)-t*0.04));
  vec2 w=vec2(fbm(p+3.0*q+vec2(1.7,9.2)), fbm(p+3.0*q+vec2(8.3,2.8)));
  float v=fbm(p+3.2*w)+ring*0.28;

  vec3 ivory=vec3(0.953,0.937,0.902);
  vec3 pale=vec3(0.735,0.795,0.925);
  vec3 sapphire=vec3(0.184,0.40,0.769);
  vec3 depth=vec3(0.051,0.129,0.282);

  vec3 col=ivory;
  col=mix(col,pale, smoothstep(0.34,0.78,v)*0.55);
  float vein=1.0-smoothstep(0.0,0.085,abs(v-0.52));
  col=mix(col,sapphire, vein*0.92);
  float deepVein=1.0-smoothstep(0.0,0.03,abs(v-0.40));
  col=mix(col,depth, deepVein*0.62);
  col+=(noise(p*7.0+t*0.1)-0.5)*0.025;

  // the type floats in a calm ivory eye at the center; the ink blooms around it
  float mask=1.0;
  if (mk>0.5) {
    vec2 dd = uv - vec2(0.5, 0.54);
    if (res.x>res.y) { dd.x*=res.x/res.y; } else { dd.y*=1.6; }
    mask = smoothstep(0.44, 0.8, length(dd));
    mask *= smoothstep(1.0, 0.84, uv.y); // and stays clear of the nav
  }
  col=mix(ivory,col, 0.08+0.92*mask);
  gl_FragColor=vec4(col,1.0);
}
`;

function useSilk(canvasRef: React.RefObject<HTMLCanvasElement | null>, masked = false) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement as HTMLElement;
    let w = parent.clientWidth, h = parent.clientHeight;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      t: { value: 0 },
      res: { value: new THREE.Vector2(w, h) },
      m: { value: new THREE.Vector2(0.5, 0.5) },
      c: { value: new THREE.Vector2(-10, -10) },
      ca: { value: 9e9 },
      mk: { value: masked ? 1 : 0 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(quad);

    let alive = true, raf = 0;
    let mx = 0.5, my = 0.5;
    const onResize = () => {
      w = parent.clientWidth; h = parent.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.res.value.set(w, h);
    };
    window.addEventListener("resize", onResize);
    // The ink flow leans gently toward the cursor.
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    // A click lands as a pulse, in this canvas's own uv space.
    const onDown = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right) return;
      uniforms.c.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      uniforms.ca.value = 0;
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

    const start = performance.now();
    let last = start;
    const tick = () => {
      if (!alive) return;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // 40% slower than the original flow, so the text breathes.
      uniforms.t.value = ((now - start) / 1000) * 0.6;
      if (uniforms.ca.value < 9e8) uniforms.ca.value += dt;
      uniforms.m.value.x += (mx - uniforms.m.value.x) * 0.03;
      uniforms.m.value.y += (my - uniforms.m.value.y) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    // render only while the canvas is actually on screen: the curtain spends
    // most of the scroll parked offscreen and should cost nothing there
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0].isIntersecting;
        if (on && !alive) { alive = true; last = performance.now(); tick(); }
        else if (!on && alive) { alive = false; cancelAnimationFrame(raf); }
      },
      { threshold: 0.01 }
    );
    alive = false;
    io.observe(parent);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ----- Signature scroll moment: the silk curtain reveals each pillar -----
const D_CATS = {
  en: ["Specialty", "Support", "Operations", "Network"],
  es: ["Especialidad", "Soporte", "Operaciones", "Red"],
};

const dSeg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

// curtain X (vw): parked offscreen except while sweeping across each boundary
function sweepX(p: number) {
  for (let j = 1; j <= 3; j++) {
    const c = j / 4;
    if (Math.abs(p - c) <= 0.09) {
      const t = (p - (c - 0.09)) / 0.18;
      return -80 + 215 * t;
    }
  }
  return -120;
}

function SilkPanel({ i, progress, reduce, lang }: { i: number; progress: MotionValue<number>; reduce: boolean; lang: Lang }) {
  const o = OFFERINGS_I18N[lang][i];
  const op = useTransform(progress, (p) => {
    if (reduce) return i === 3 ? 1 : 0;
    const fadeIn = i === 0 ? 1 : dSeg(p, i / 4 - 0.005, i / 4 + 0.012);
    const fadeOut = i === 3 ? 0 : dSeg(p, (i + 1) / 4 - 0.012, (i + 1) / 4 + 0.005);
    return fadeIn * (1 - fadeOut);
  });
  const y = useTransform(progress, (p) => (reduce ? 0 : 16 * (1 - dSeg(p, i / 4, i / 4 + 0.05))));
  return (
    <motion.div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: op, y, pointerEvents: "none" }}>
      <div style={{ maxWidth: 860, padding: "0 clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11.5, letterSpacing: "0.26em", textTransform: "uppercase", color: SAPPHIRE_DEEP, marginBottom: 24 }}>0{i + 1} / {D_CATS[lang][i]}</div>
        <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(36px,5.5vw,84px)", lineHeight: 1.04, letterSpacing: "-0.01em", margin: "0 0 22px", color: NAVY }}>{o.title}</h3>
        <p style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.65, color: BODY, margin: "0 auto", maxWidth: 520 }}>{o.blurb}</p>
      </div>
    </motion.div>
  );
}

function SilkTick({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const op = useTransform(progress, (p) => (p >= (i === 0 ? -1 : i / 4) && p < (i + 1) / 4 + (i === 3 ? 1 : 0) ? 1 : 0.3));
  return <motion.span style={{ width: 26, height: 2, background: SAPPHIRE, opacity: op, display: "block" }} />;
}

export default function ConceptD() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const silkCanvas = useRef<HTMLCanvasElement>(null);
  const curtainCanvas = useRef<HTMLCanvasElement>(null);
  const silkRevealRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useSilk(silkCanvas, true);
  useSilk(curtainCanvas);
  useScrollReveal(pageRef);

  // scrub for the silk-curtain reveal
  const { scrollYProgress: silkRaw } = useScroll({ target: silkRevealRef, offset: ["start start", "end end"] });
  const silkProgress = useSpring(silkRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  const curtainX = useTransform(silkProgress, (p) => (reduce ? "-120vw" : `${sweepX(p)}vw`));

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={SAPPHIRE} />

      <DHeader lang={lang} setLang={setLang} />

      {/* HERO , marbled sapphire ink. The shader draws veined ink across the
          whole viewport, strongest away from the type; the ink curls around
          the cursor and a click pulses through the veins. */}
      <div id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px clamp(20px,5vw,60px) 80px", background: "#f3efe6", overflow: "hidden" }}>
        <canvas ref={silkCanvas} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 34 }}>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} style={{ width: 44, height: 1, background: SAPPHIRE, transformOrigin: "0 50%" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: SAPPHIRE_DEEP }}>{t.heroKicker}</span>
            </FadeIn>
            <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(44px,6.2vw,94px)", lineHeight: 1.05, margin: "0 0 30px", color: NAVY, letterSpacing: "-0.015em", textWrap: "balance" }}>
              <WordsReveal
                delay={0.25}
                stagger={0.05}
                segments={[
                  { text: x.heroLine1 + " " },
                  { text: x.heroLine2, style: { fontStyle: "italic", color: SAPPHIRE } },
                ]}
              />
            </h1>
            <FadeIn delay={1.1}>
              <p style={{ fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: BODY, fontWeight: 400, maxWidth: 560, margin: "0 auto 42px" }}>{t.heroSub}</p>
            </FadeIn>
            <FadeIn delay={1.3} style={{ display: "flex", gap: 26, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              <Magnetic>
                <Link href="/d/contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`} style={{ padding: "16px 34px", fontSize: 14, letterSpacing: "0.06em" }}>{t.cta.partner}</Link>
              </Magnetic>
              <Link href="/d/products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: NAVY }}>{t.cta.explore}</Link>
            </FadeIn>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b8574" }}>{t.scroll}</span>
          <span style={{ width: 1, height: 38, background: `linear-gradient(${SAPPHIRE},transparent)` }} />
        </div>
      </div>

      {/* THE PLATFORM , the assistant is not demoed here, it is handed over. It
          leaves the site, so it is an aside on the concept's own cream , one
          card, the gold rule and the header's pulsing dot , and not one of the
          numbered sapphire chapters, which are Brandon's own argument. */}
      <div style={{ padding: "clamp(36px,4.5vw,64px) clamp(20px,5vw,60px) 0", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.platCard}>
            <span className={styles.platCopy}>
              <span className={styles.platKicker}>
                <span className={styles.platDot} aria-hidden="true" />
                {x.aiKicker}
              </span>
              <GrowLine color={HAIR} style={{ marginBottom: "clamp(16px,2vw,22px)" }} />
              <span className={styles.platTitle}>
                <MaskReveal inView delay={0.05}>{x.aiTitle}</MaskReveal>
              </span>
              <span data-reveal className={styles.platBody}>{x.aiBody}</span>
            </span>
            <span className={styles.platAside}>
              <span className={styles.platCta}>
                {x.aiCta}
                <span className={styles.platArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.platHost}>brandonlatamnetwork.com</span>
            </span>
          </a>
        </div>
      </div>

      {/* STATS , drawn hairlines + count-up */}
      <div data-reveal style={{ padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div className={styles.wrapD} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {[
            { num: 60, suffix: "+", label: t.stats.years },
            { num: 30, suffix: "+", label: t.stats.carriers },
            { num: 5, suffix: "", label: t.stats.lines },
            { num: 50, suffix: "", label: t.stats.states },
          ].map((s, i) => (
            <div key={s.label}>
              <GrowLine color={SAPPHIRE} delay={i * 0.12} />
              <div style={{ paddingTop: 20 }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(36px,4vw,54px)", fontWeight: 500, color: NAVY, lineHeight: 1 }}>
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginTop: 12 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE OFFER , signature scroll moment: the silk curtain reveals each pillar */}
      <div id="why" ref={silkRevealRef} className={styles.silkSection}>
        <div className={styles.silkPin}>
          {/* clears the fixed header, which is ~74px tall over this pin */}
          <div style={{ position: "absolute", top: "clamp(92px,13vh,124px)", left: "clamp(20px,5vw,60px)", right: "clamp(20px,5vw,60px)" }}>
            <div style={{ ...MONO_K, color: SAPPHIRE_DEEP, marginBottom: 14 }}>01 / {t.offerKicker}</div>
            <GrowLine color={HAIR_SAPPHIRE} />
          </div>

          {OFFERINGS.map((_, i) => (
            <SilkPanel key={i} i={i} progress={silkProgress} reduce={!!reduce} lang={lang} />
          ))}

          {/* the silk curtain that sweeps between pillars */}
          <motion.div className={styles.silkCurtain} style={{ x: curtainX }}>
            <canvas ref={curtainCanvas} style={{ width: "100%", height: "100%", display: "block" }} />
          </motion.div>

          <div style={{ position: "absolute", right: "clamp(20px,5vw,60px)", bottom: 24, fontFamily: "var(--font-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.3em", color: "#8b8574" }}>{lang === "es" ? "SCROLLEÁ PARA REVELAR" : "SCROLL TO REVEAL"}</div>
          {/* progress ticks */}
          <div style={{ position: "absolute", left: "clamp(20px,5vw,60px)", bottom: 24, display: "flex", gap: 10 }}>
            {OFFERINGS.map((_, i) => (
              <SilkTick key={i} i={i} progress={silkProgress} />
            ))}
          </div>
        </div>

        {/* mobile: plain stacked pillars, no pin */}
        <div className={styles.silkMobile}>
          <div data-reveal style={{ marginBottom: 32 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>01 / {t.offerKicker}</div>
            <GrowLine color={HAIR} />
          </div>
          {OFFERINGS.map((o, i) => (
            <div key={o.n} data-reveal style={{ padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}>
              <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: SAPPHIRE_DEEP, marginBottom: 12 }}>0{i + 1} / {D_CATS[lang][i]}</div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,6vw,36px)", margin: "0 0 10px", color: NAVY, lineHeight: 1.1 }}>{o.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: BODY, margin: 0 }}>{o.blurb}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOREIGN NATIONAL , one paragraph and the 3D globe; the case flow has its own page */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <SectionHead index="02" kicker={x.fnKicker} accent={{ text: SAPPHIRE_DEEP, rule: HAIR_SAPPHIRE }} style={{ marginBottom: 30 }} />
            <h2 className={styles.displayD} style={{ fontSize: "clamp(32px,4.6vw,64px)", margin: "0 0 28px", maxWidth: 620 }}>
              <MaskReveal inView delay={0.05}>{x.fnTitle1}</MaskReveal>
              <MaskReveal inView delay={0.2}><span className={styles.displayItalicD}>{x.fnTitle2}</span></MaskReveal>
            </h2>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: BODY, margin: "0 0 34px", maxWidth: 560 }}>{x.fnTeaser}</p>
            <Link data-reveal href="/d/foreign-nationals" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`}>{x.fnTeaserCta} →</Link>
          </div>
          <div data-reveal style={{ position: "relative", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 38% 30%, #16304f, #081221 74%)", boxShadow: "0 34px 90px rgba(12,28,51,0.3)", maxWidth: 520, width: "100%", margin: "0 auto" }}>
            <GlobeArcs palette={BLUE_ARCS} />
          </div>
        </div>
      </div>

      {/* CARRIERS MARQUEE , the four inner pages are in the header on every page,
          so the landing no longer repeats them in bigger type down here */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.12)" }}>
        <div className={styles.wrapD}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, marginBottom: 34 }}>{t.carriersLabel}</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
            <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(30px,4vw,64px)", fontFamily: SERIF, fontSize: "clamp(19px,2vw,28px)", color: "#8b93a2", whiteSpace: "nowrap" }}>
              {[0, 1].map((rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }} aria-hidden={rep === 1}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                      <span>{c}</span><span style={{ color: SAPPHIRE }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT , a closing band, not the contact page. The office, the desk by
          name, every extension and every mailbox live at /d/contact now; this
          says the sentence and hands over, keeping one number a tap away. */}
      <div id="contact" style={{ position: "relative", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#ece7db" }}>
        <div className={styles.wrapD}>
          <div data-reveal style={{ maxWidth: 760 }}>
            {/* 03 now: the go-deeper signposts used to sit between 02 and this */}
            <div style={{ ...MONO_K, color: SAPPHIRE_DEEP, marginBottom: 14 }}>03 / {t.contactKicker}</div>
            <GrowLine color={HAIR_SAPPHIRE} style={{ marginBottom: 26 }} />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.02, margin: "0 0 28px", color: NAVY }}>{t.contactTitle}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: BODY, fontWeight: 400, margin: 0, maxWidth: 480 }}>{t.contactBody}</p>
          </div>
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(20px,3vw,40px)", marginTop: "clamp(34px,4.5vw,56px)" }}>
            <Magnetic>
              <Link href="/d/contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`} style={{ padding: "16px 38px", fontSize: 14 }}>{t.cta.partner}</Link>
            </Magnetic>
            <a href={OFFICE.phoneHref} className={styles.lnk} style={{ fontFamily: SERIF, fontSize: "clamp(22px,2.6vw,32px)", color: NAVY }}>{OFFICE.phone}</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "44px clamp(20px,5vw,60px)", background: "#12294a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ background: "rgba(243,239,230,0.94)", borderRadius: 999, padding: "8px 18px", display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 22 }} />
        </div>
        <div style={{ fontSize: 12, color: "#8ea3c4" }}>{t.rights} · {t.licensed}</div>
      </div>

    </div>
  );
}
