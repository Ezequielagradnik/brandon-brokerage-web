"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScrollReveal } from "@/hooks/useReveals";
import { useGlobe, GOLD_GLOBE } from "@/hooks/useGlobe";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import { ScrollProgress, WordsReveal, FadeIn, CountUp, GrowLine, Magnetic, ctaFillFromCursor, EASE } from "@/components/motion";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#why", label: "Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

const PRODUCTS = [
  { n: "01", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "02", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "03", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "04", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "05", name: "Disability Income", desc: "Protect earning power" },
];

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

export default function ConceptD() {
  const pageRef = useRef<HTMLDivElement>(null);
  const silkCanvas = useRef<HTMLCanvasElement>(null);
  const globeCanvas = useRef<HTMLCanvasElement>(null);

  useSilk(silkCanvas);
  useGlobe(globeCanvas, GOLD_GLOBE);
  useScrollReveal(pageRef);

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
          <a href="#contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaGold}`} style={{ padding: "11px 22px", border: "1px solid #12294a", color: "#12294a", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner With Us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner With Us"
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
              <span style={{ fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD_DIM }}>Coral Gables · Since the 1970s</span>
            </FadeIn>
            <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(38px,5.6vw,74px)", lineHeight: 1.08, margin: "0 0 30px", color: NAVY, letterSpacing: "-0.01em" }}>
              <WordsReveal
                delay={0.25}
                stagger={0.045}
                segments={[
                  { text: "Partnering with producers and financial advisors to deliver customized business solutions with" },
                  { text: "seamless execution.", style: { fontStyle: "italic", color: GOLD } },
                ]}
              />
            </h1>
            <FadeIn delay={1.1}>
              <p style={{ fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: BODY, fontWeight: 400, maxWidth: 520, margin: "0 0 42px" }}>For over fifty years, Brandon Brokerage Group has paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.</p>
            </FadeIn>
            <FadeIn delay={1.3} style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
              <Magnetic>
                <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 34px", border: "1px solid #12294a", color: "#12294a", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>Partner with us</a>
              </Magnetic>
              <a href="#products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: NAVY }}>Explore products</a>
            </FadeIn>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b8574" }}>Scroll</span>
          <span style={{ width: 1, height: 38, background: "linear-gradient(#a9812f,transparent)" }} />
        </div>
      </div>

      {/* STATS — drawn hairlines + count-up, /g structure */}
      <div data-reveal style={{ padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {[
            { num: 50, suffix: "+", label: "Years of expertise" },
            { num: 30, suffix: "+", label: "Top-rated carriers" },
            { num: 5, suffix: "", label: "Product lines" },
            { num: null, text: "FN", label: "Market leader" },
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

      {/* MISSION — two-column band, /g structure */}
      <div style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", borderBottom: "1px solid rgba(18,41,74,0.12)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)" }}>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>01 — Our mission</div>
            <GrowLine color={D_HAIR} style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.42, margin: 0, color: "#1a2536" }}>To provide agents with superior service, personalized sales support and tailored business solutions that <span style={{ fontStyle: "italic", color: GOLD }}>build long-term relationships</span>.</p>
          </div>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>Our approach</div>
            <GrowLine color={D_HAIR} delay={0.12} style={{ marginBottom: 24 }} />
            <p style={{ fontSize: 16, lineHeight: 1.75, color: BODY, fontWeight: 400, margin: 0 }}>Open architecture, individualized attention and an exceptional standard of quality. From case design to policy delivery, one dedicated team follows every application — so you can stay in front of your clients, not behind paperwork.</p>
          </div>
        </div>
      </div>

      {/* WHAT WE OFFER — /g photo cards with numbered hairline */}
      <div id="why" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "clamp(40px,5vw,64px)", maxWidth: 640 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>02 — What we offer</div>
            <GrowLine color={D_HAIR} style={{ marginBottom: 24 }} />
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: NAVY, lineHeight: 1.05 }}>Everything behind the case you write.</h2>
          </div>
          <div className={styles.solGrid}>
            {OFFERINGS.map((o, i) => (
              <motion.a
                key={o.n}
                href="#contact"
                className={styles.solCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              >
                <div className={styles.solImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.title} className={styles.solImg} data-photo-slot={`offer-${o.n}`} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD }}>{o.n}</span>
                  <span style={{ flex: 1, height: 1, background: "rgba(18,41,74,0.14)" }} />
                </div>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 22, margin: "0 0 10px", color: NAVY, lineHeight: 1.2 }}>{o.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.62, color: "#5c6675", fontWeight: 400, margin: "0 0 14px" }}>{o.blurb}</p>
                <span className={styles.solMore} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: NAVY }}>Learn more →</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — the globe stays */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", right: "clamp(-90px,-5vw,-50px)", transform: "translateY(-50%)", width: "clamp(260px,30vw,420px)", height: "clamp(260px,30vw,420px)", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 38% 30%, #16304f, #081221 74%)", boxShadow: "0 30px 80px rgba(12,28,51,0.28)" }}>
          <canvas ref={globeCanvas} style={{ width: "100%", height: "100%", display: "block" }} />
        </div>
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: 34, maxWidth: 720 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>03 — Signature specialty</div>
            <GrowLine color={D_HAIR} />
          </div>
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px,6vw,76px)", lineHeight: 1.04, margin: "0 0 40px", color: NAVY, maxWidth: 760 }}>We place the cases <span style={{ fontStyle: "italic", color: GOLD }}>others turn away</span>.</h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(28px,3vw,48px)", alignItems: "start", maxWidth: 720 }}>
            <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: BODY, fontWeight: 400, margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: BODY, fontWeight: 400, margin: 0 }}>Our open-architecture approach offers a variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines. <a href="#contact" className={styles.lnk} style={{ color: GOLD }}>Partner with us</a>.</p>
          </div>
        </div>
      </div>

      {/* PRODUCTS — display serif for names only, sans numerals */}
      <div id="products" style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: 24 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>04 — Products</div>
            <GrowLine color={D_HAIR} />
          </div>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: NAVY }}>Products</h2>
            <span style={{ ...MONO_K, fontSize: 11.5 }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(18,41,74,0.18)" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "34px 4px", borderBottom: "1px solid rgba(18,41,74,0.14)" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD }}>{p.n}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(24px,3vw,38px)", color: NAVY }}>{p.name}</span>
                <span style={{ fontSize: 14, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* PULL QUOTE — quiet manifesto band */}
      <div style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#f3efe6", textAlign: "center", borderTop: "1px solid rgba(18,41,74,0.1)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <GrowLine color={GOLD} origin="center" style={{ width: 44, margin: "0 auto 36px" }} />
          <p data-reveal style={{ fontFamily: serif, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.4, margin: 0, color: NAVY }}>Individualized attention and an exceptional standard of quality — behind every case you write.</p>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, marginTop: 32 }}>The Brandon standard</div>
        </div>
      </div>

      {/* CARRIERS MARQUEE */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.1)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, marginBottom: 34 }}>Our carriers — a leading Tellus / Crump firm</div>
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
            <div style={{ ...MONO_K, marginBottom: 14 }}>05 — Contact</div>
            <GrowLine color={D_HAIR} style={{ marginBottom: 26 }} />
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.02, margin: "0 0 28px", color: NAVY }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: BODY, fontWeight: 400, margin: 0, maxWidth: 440 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(169,129,47,0.5)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Phone</span><span style={{ fontFamily: serif, fontSize: "clamp(20px,2.4vw,28px)", color: NAVY }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Toll-Free</span><span style={{ fontFamily: serif, fontSize: "clamp(20px,2.4vw,28px)", color: NAVY }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Office</span><span style={{ fontFamily: serif, fontSize: "clamp(17px,1.8vw,22px)", color: NAVY, textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
            <Magnetic>
              <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", marginTop: 34, padding: "16px 38px", border: "1px solid #12294a", color: "#12294a", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner with us</a>
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
        <div style={{ fontSize: 12, color: "#8ea3c4" }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
