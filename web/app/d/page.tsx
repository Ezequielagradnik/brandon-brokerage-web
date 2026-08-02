"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useScrollReveal } from "@/hooks/useReveals";
import GlobeArcs, { GOLD_ARCS } from "@/components/GlobeArcs";
import MobileMenu from "@/components/MobileMenu";
import { COPY, OFFERINGS_I18N, type Lang } from "@/lib/copy";
import LangToggle from "@/components/LangToggle";
import AgentTools, { type ToolId } from "@/components/AgentTools";
import { ScrollProgress, WordsReveal, FadeIn, CountUp, GrowLine, Magnetic, ctaFillFromCursor, EASE } from "@/components/motion";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CTA_HREF, WHATSAPP_ENABLED } from "@/lib/contact";
import styles from "./page.module.css";

const navLinks = (t: (typeof COPY)[Lang]) => [
  { href: "#why", label: t.nav.firm },
  { href: "#foreign", label: t.nav.foreign },
  { href: "#products", label: t.nav.products },
  { href: "#contact", label: t.nav.contact },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];



const NAVY = "#12294a";
const GOLD = "#a9812f";
const GOLD_DIM = "#9a7526";
const MUTED = "#6b7482";
const BODY = "#4a5568";
// numbered mono section heads, /g structure
const MONO_K: React.CSSProperties = { fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD_DIM };
const D_HAIR = "rgba(169,129,47,0.45)";

const VERTEX_SHADER = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position,1.0); }";
const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv; uniform float t; uniform vec2 res; uniform vec2 m;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
void main(){
  vec2 uv=vUv; uv.x*=res.x/res.y;
  float n=noise(uv*2.0+vec2(t*0.05,t*0.03)+(m-0.5)*0.35)*0.6+noise(uv*4.0-vec2(t*0.04))*0.4;
  vec2 c1=vec2(0.72+0.12*sin(t*0.12), 0.42+0.10*cos(t*0.10))+(m-0.5)*0.12;
  vec2 c2=vec2(0.55+0.10*cos(t*0.09), 0.72+0.10*sin(t*0.11))-(m-0.5)*0.08;
  vec2 p=vUv; p.x*=res.x/res.y;
  float d1=distance(p,vec2(c1.x*res.x/res.y,c1.y));
  float d2=distance(p,vec2(c2.x*res.x/res.y,c2.y));
  vec3 ivory=vec3(0.953,0.937,0.902);
  vec3 gold=vec3(0.78,0.60,0.24);
  vec3 navy=vec3(0.07,0.16,0.29);
  vec3 col=ivory;
  col=mix(col,gold, smoothstep(0.55,0.0,d1)*(0.5+0.2*n));
  col=mix(col,navy, smoothstep(0.6,0.0,d2)*(0.32+0.15*n));
  col+= (n-0.5)*0.03;
  col=mix(col,ivory,0.3);
  gl_FragColor=vec4(col,1.0);
}
`;

function useSilk(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      t: { value: 0 },
      res: { value: new THREE.Vector2(w, h) },
      m: { value: new THREE.Vector2(0.5, 0.5) },
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
    // The silk flow leans gently toward the cursor.
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const start = performance.now();
    const tick = () => {
      if (!alive) return;
      // 40% slower than the original flow, so the text breathes.
      uniforms.t.value = ((performance.now() - start) / 1000) * 0.6;
      uniforms.m.value.x += (mx - uniforms.m.value.x) * 0.03;
      uniforms.m.value.y += (my - uniforms.m.value.y) * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
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
        <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11.5, letterSpacing: "0.26em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>0{i + 1} / {D_CATS[lang][i]}</div>
        <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(36px,5.5vw,84px)", lineHeight: 1.04, letterSpacing: "-0.01em", margin: "0 0 22px", color: NAVY }}>{o.title}</h3>
        <p style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.65, color: BODY, margin: "0 auto", maxWidth: 520 }}>{o.blurb}</p>
      </div>
    </motion.div>
  );
}

function SilkTick({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const op = useTransform(progress, (p) => (p >= (i === 0 ? -1 : i / 4) && p < (i + 1) / 4 + (i === 3 ? 1 : 0) ? 1 : 0.3));
  return <motion.span style={{ width: 26, height: 2, background: GOLD, opacity: op, display: "block" }} />;
}

export default function ConceptD() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const NAV_LINKS = navLinks(t);
  const [tool, setTool] = useState<ToolId | null>(null);
  const [toolOrigin, setToolOrigin] = useState({ x: 50, y: 8 });
  const pageRef = useRef<HTMLDivElement>(null);
  const silkCanvas = useRef<HTMLCanvasElement>(null);
  const curtainCanvas = useRef<HTMLCanvasElement>(null);
  const silkRevealRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useSilk(silkCanvas);
  useSilk(curtainCanvas);
  useScrollReveal(pageRef);

  // scrub for the silk-curtain reveal
  const { scrollYProgress: silkRaw } = useScroll({ target: silkRevealRef, offset: ["start start", "end end"] });
  const silkProgress = useSpring(silkRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  const curtainX = useTransform(silkProgress, (p) => (reduce ? "-120vw" : `${sweepX(p)}vw`));

  const serif = "var(--font-bodoni), serif";

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: "22px clamp(20px,5vw,60px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 30 }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <button
            type="button"
            className={`${styles.nl} ${styles.navTool}`}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setToolOrigin({ x: ((r.left + r.width / 2) / window.innerWidth) * 100, y: ((r.top + r.height / 2) / window.innerHeight) * 100 });
              setTool("assistant");
            }}
          >
            <span className={styles.navToolDot} aria-hidden="true" />
            {t.nav.assistant}
          </button>
          <LangToggle lang={lang} setLang={setLang} color="rgba(18,41,74,0.55)" activeColor={NAVY} />
          <a href="#contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaGold}`} style={{ padding: "11px 22px", border: "1px solid #12294a", color: "#12294a", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.cta.partnerCaps}</a>
        </div>
        <MobileMenu
          links={[{ href: "#tools", label: t.nav.assistant }, ...NAV_LINKS]}
          ctaLabel={t.cta.partnerCaps}
          ctaHref="#contact"
          panelBg="#f3efe6"
          textColor="#12294a"
          accentColor="#12294a"
        />
      </div>

      {/* HERO with shader silk */}
      <div id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px clamp(20px,5vw,60px) 80px", background: "#f3efe6" }}>
        <canvas ref={silkCanvas} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg,#f3efe6 5%,rgba(243,239,230,0.86) 32%,rgba(243,239,230,0.25) 60%,rgba(243,239,230,0) 80%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 760 }}>
            <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 34 }}>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} style={{ width: 44, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD_DIM }}>{t.heroKicker}</span>
            </FadeIn>
            <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(38px,5.6vw,74px)", lineHeight: 1.08, margin: "0 0 30px", color: NAVY, letterSpacing: "-0.01em" }}>
              <WordsReveal
                delay={0.25}
                stagger={0.045}
                segments={[
                  { text: t.heroTitleA },
                  { text: t.heroTitleB, style: { fontStyle: "italic", color: GOLD } },
                ]}
              />
            </h1>
            <FadeIn delay={1.1}>
              <p style={{ fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: BODY, fontWeight: 400, maxWidth: 520, margin: "0 0 42px" }}>{t.heroSub}</p>
            </FadeIn>
            <FadeIn delay={1.3} style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
              <Magnetic>
                <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 34px", border: "1px solid #12294a", color: "#12294a", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.cta.partner}</a>
              </Magnetic>
              <a href="#products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: NAVY }}>{t.cta.explore}</a>
            </FadeIn>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b8574" }}>{t.scroll}</span>
          <span style={{ width: 1, height: 38, background: "linear-gradient(#a9812f,transparent)" }} />
        </div>
      </div>

      {/* AGENT TOOLS , the AI assistant and its two companions */}
      <AgentTools lang={lang} id="tools" tone="sapphire" open={tool} origin={toolOrigin} onOpenChange={setTool} />

      {/* STATS , drawn hairlines + count-up, /g structure */}
      <div data-reveal style={{ padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {[
            { num: 60, suffix: "+", label: t.stats.years },
            { num: 30, suffix: "+", label: t.stats.carriers },
            { num: 5, suffix: "", label: t.stats.lines },
            { num: null, text: "FN", label: t.stats.leader },
          ].map((s, i) => (
            <div key={s.label}>
              <GrowLine color={GOLD} delay={i * 0.12} />
              <div style={{ paddingTop: 20 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(36px,4vw,54px)", fontWeight: 500, color: s.num === null ? GOLD : NAVY, lineHeight: 1, fontStyle: s.num === null ? "italic" : "normal" }}>
                  {s.num !== null ? <CountUp to={s.num} suffix={s.suffix} /> : s.text}
                </div>
                <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginTop: 12 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION , two-column band, /g structure */}
      <div style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", borderBottom: "1px solid rgba(18,41,74,0.12)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)" }}>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>01 / {t.missionKicker}</div>
            <GrowLine color={D_HAIR} style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.42, margin: 0, color: "#1a2536" }}>{t.missionText}<span style={{ fontStyle: "italic", color: GOLD }}>{t.missionHighlight}</span>.</p>
          </div>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>{t.approachKicker}</div>
            <GrowLine color={D_HAIR} delay={0.12} style={{ marginBottom: 24 }} />
            <p style={{ fontSize: 16, lineHeight: 1.75, color: BODY, fontWeight: 400, margin: 0 }}>{t.approachText}</p>
          </div>
        </div>
      </div>

      {/* WHAT WE OFFER , signature scroll moment: the silk curtain reveals each pillar */}
      <div id="why" ref={silkRevealRef} className={styles.silkSection}>
        <div className={styles.silkPin}>
          {/* clears the fixed header, which is ~74px tall over this pin */}
          <div style={{ position: "absolute", top: "clamp(92px,13vh,124px)", left: "clamp(20px,5vw,60px)", right: "clamp(20px,5vw,60px)" }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>02 / {t.offerKicker}</div>
            <GrowLine color={D_HAIR} />
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
            <div style={{ ...MONO_K, marginBottom: 14 }}>02 / {t.offerKicker}</div>
            <GrowLine color={D_HAIR} />
          </div>
          {OFFERINGS.map((o, i) => (
            <div key={o.n} data-reveal style={{ padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}>
              <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>0{i + 1} / {D_CATS[lang][i]}</div>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(26px,6vw,36px)", margin: "0 0 10px", color: NAVY, lineHeight: 1.1 }}>{o.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: BODY, margin: 0 }}>{o.blurb}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PULL QUOTE , the quiet beat between the two pinned scenes */}
      <div style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#f3efe6", textAlign: "center", borderTop: "1px solid rgba(18,41,74,0.1)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <GrowLine color={GOLD} origin="center" style={{ width: 44, margin: "0 auto 36px" }} />
          <p data-reveal style={{ fontFamily: serif, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.4, margin: 0, color: NAVY }}>{t.quote}</p>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, marginTop: 32 }}>{t.quoteAttrib}</div>
        </div>
      </div>

      {/* FOREIGN NATIONAL , the 3D globe, the signature of this concept */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <div data-reveal style={{ marginBottom: 30, maxWidth: 720 }}>
              <div style={{ ...MONO_K, marginBottom: 14 }}>{t.spcKicker}</div>
              <GrowLine color={D_HAIR} />
            </div>
            <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,5vw,68px)", lineHeight: 1.04, margin: "0 0 32px", color: NAVY }}>
              {t.spcTitle1} <span style={{ fontStyle: "italic", color: GOLD }}>{t.spcTitle2}</span>
            </h2>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: BODY, margin: "0 0 20px", maxWidth: 560 }}>{t.spcBody1}</p>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: BODY, margin: "0 0 34px", maxWidth: 560 }}>{t.spcBody2}</p>
            <a data-reveal href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "15px 34px", border: `1px solid ${NAVY}`, color: NAVY, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.cta.partner}</a>
          </div>
          <div data-reveal style={{ position: "relative", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 38% 30%, #16304f, #081221 74%)", boxShadow: "0 34px 90px rgba(12,28,51,0.3)", maxWidth: 520, width: "100%", margin: "0 auto" }}>
            <GlobeArcs palette={GOLD_ARCS} />
          </div>
        </div>
      </div>

      {/* PRODUCTS , display serif for names only, sans numerals */}
      <div id="products" style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: 24 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>04 / {t.productsKicker}</div>
            <GrowLine color={D_HAIR} />
          </div>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: NAVY }}>{t.productsKicker}</h2>
            <span style={{ ...MONO_K, fontSize: 11.5 }}>{t.productsBacked}</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(18,41,74,0.18)" }}>
            {t.products.map((p, i) => (
              <a key={p.name} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "34px 4px", borderBottom: "1px solid rgba(18,41,74,0.14)" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD }}>0{i + 1}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(24px,3vw,38px)", color: NAVY }}>{p.name}</span>
                <span style={{ fontSize: 14, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS MARQUEE */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.1)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, marginBottom: 34 }}>{t.carriersLabel}</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
            <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(30px,4vw,64px)", fontFamily: serif, fontSize: "clamp(19px,2vw,28px)", color: "#8b93a2", whiteSpace: "nowrap" }}>
              {[0, 1].map((rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                      <span>{c}</span><span style={{ color: GOLD }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ position: "relative", padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)", background: "#ece7db" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>05 / {t.contactKicker}</div>
            <GrowLine color={D_HAIR} style={{ marginBottom: 26 }} />
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.02, margin: "0 0 28px", color: NAVY }}>{t.contactTitle}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: BODY, fontWeight: 400, margin: 0, maxWidth: 440 }}>{t.contactBody}</p>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(169,129,47,0.5)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>{t.phone}</span><span style={{ fontFamily: serif, fontSize: "clamp(20px,2.4vw,28px)", color: NAVY }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>{t.tollFree}</span><span style={{ fontFamily: serif, fontSize: "clamp(20px,2.4vw,28px)", color: NAVY }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>{t.office}</span><span style={{ fontFamily: serif, fontSize: "clamp(17px,1.8vw,22px)", color: NAVY, textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
            <Magnetic>
              <a href={CTA_HREF} {...(WHATSAPP_ENABLED ? { target: "_blank", rel: "noopener noreferrer" } : {})} onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-flex", alignItems: "center", marginTop: 34, padding: "16px 38px", border: "1px solid #12294a", color: "#12294a", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>{WHATSAPP_ENABLED && <WhatsAppIcon />}{t.cta.partner}</a>
            </Magnetic>
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
