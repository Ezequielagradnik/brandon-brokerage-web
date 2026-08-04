"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { useScrollReveal } from "@/hooks/useReveals";
import GlobeArcs, { GOLD_ARCS } from "@/components/GlobeArcs";
import { COPY, OFFERINGS_I18N, type Lang } from "@/lib/copy";
import { ScrollProgress, WordsReveal, FadeIn, CountUp, GrowLine, Magnetic, MaskReveal, ctaFillFromCursor } from "@/components/motion";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { NETWORK_URL } from "@/lib/contact";
import { DHeader, SectionHead, useLang } from "./chrome";
import { BODY, CARRIERS, EASE, GOLD, GOLD_DIM, GOLD_SOFT, HAIR, MONO_K, MUTED, NAVY, SERIF, EXTRA, OFFICE, deepLinks } from "./copy";
import styles from "./page.module.css";

// Ivory & Sapphire. The landing carries the argument: the silk hero, the
// platform hand-off, the four pillars behind the silk curtain, the specialty in one
// paragraph and the phone number. Everything that needs room , the firm, the
// products, the foreign-national case flow, the forms desk , lives on its own
// page, the way brandonbrokerage.com splits it.

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
        <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(36px,5.5vw,84px)", lineHeight: 1.04, letterSpacing: "-0.01em", margin: "0 0 22px", color: NAVY }}>{o.title}</h3>
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
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
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

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />

      <DHeader lang={lang} setLang={setLang} />

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
            <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(38px,5.6vw,74px)", lineHeight: 1.08, margin: "0 0 30px", color: NAVY, letterSpacing: "-0.01em" }}>
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
                <Link href="/d/contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`} style={{ padding: "16px 34px", fontSize: 14, letterSpacing: "0.06em" }}>{t.cta.partner}</Link>
              </Magnetic>
              <Link href="/d/products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: NAVY }}>{t.cta.explore}</Link>
            </FadeIn>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b8574" }}>{t.scroll}</span>
          <span style={{ width: 1, height: 38, background: "linear-gradient(#a9812f,transparent)" }} />
        </div>
      </div>

      {/* THE PLATFORM , the assistant is not demoed here, it is handed over */}
      <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.platBand}>
        <span className={styles.platGlow} aria-hidden="true" />
        <span className={styles.platInner}>
          <span className={styles.platCopy}>
            <span style={{ ...MONO_K, color: GOLD_SOFT, display: "block", marginBottom: 14 }}>{x.aiKicker}</span>
            <GrowLine color="rgba(169,129,47,0.6)" style={{ marginBottom: "clamp(20px,2.6vw,32px)" }} />
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
        </span>
      </a>

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
              <GrowLine color={GOLD} delay={i * 0.12} />
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
            <div style={{ ...MONO_K, marginBottom: 14 }}>01 / {t.offerKicker}</div>
            <GrowLine color={HAIR} />
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
              <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>0{i + 1} / {D_CATS[lang][i]}</div>
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
            <SectionHead index="02" kicker={x.fnKicker} style={{ marginBottom: 30 }} />
            <h2 className={styles.displayD} style={{ fontSize: "clamp(32px,4.6vw,64px)", margin: "0 0 28px", maxWidth: 620 }}>
              <MaskReveal inView delay={0.05}>{x.fnTitle1}</MaskReveal>
              <MaskReveal inView delay={0.2}><span className={styles.displayItalicD}>{x.fnTitle2}</span></MaskReveal>
            </h2>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: BODY, margin: "0 0 34px", maxWidth: 560 }}>{x.fnTeaser}</p>
            <Link data-reveal href="/d/foreign-nationals" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`}>{x.fnTeaserCta} →</Link>
          </div>
          <div data-reveal style={{ position: "relative", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 38% 30%, #16304f, #081221 74%)", boxShadow: "0 34px 90px rgba(12,28,51,0.3)", maxWidth: 520, width: "100%", margin: "0 auto" }}>
            <GlobeArcs palette={GOLD_ARCS} />
          </div>
        </div>
      </div>

      {/* GO DEEPER , signposts into the four inner pages */}
      <div style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.12)" }}>
        <div className={styles.wrapD}>
          <SectionHead index="03" kicker={x.moreKicker} style={{ marginBottom: 34 }} />
          <div className={styles.moreGrid}>
            {deepLinks("/d", lang).map((m, i) => (
              <motion.div
                key={m.href}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              >
                <Link href={m.href} className={styles.moreCard}>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(21px,2.1vw,29px)", lineHeight: 1.16, margin: "0 0 14px", color: NAVY }}>{m.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: BODY, margin: "0 0 20px" }}>{m.body}</p>
                  <span className={styles.moreArrow}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS MARQUEE */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.1)" }}>
        <div className={styles.wrapD}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, marginBottom: 34 }}>{t.carriersLabel}</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
            <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(30px,4vw,64px)", fontFamily: SERIF, fontSize: "clamp(19px,2vw,28px)", color: "#8b93a2", whiteSpace: "nowrap" }}>
              {[0, 1].map((rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }} aria-hidden={rep === 1}>
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

      {/* CONTACT , a closing band, not the contact page. The office, the desk by
          name, every extension and every mailbox live at /d/contact now; this
          says the sentence and hands over, keeping one number a tap away. */}
      <div id="contact" style={{ position: "relative", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#ece7db" }}>
        <div className={styles.wrapD}>
          <div data-reveal style={{ maxWidth: 760 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>04 / {t.contactKicker}</div>
            <GrowLine color={HAIR} style={{ marginBottom: 26 }} />
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
