"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
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

const WHY = [
  { n: "01", title: "Advanced sales support", desc: "Case planning and design, marketing concepts, carrier insight and point-of-sale support — for domestic and foreign national cases alike." },
  { n: "02", title: "Full case management", desc: "A dedicated new-business team packages, submits and follows every case through underwriting, records and delivery." },
  { n: "03", title: "Quality carriers & products", desc: "Full access to over thirty top-rated carriers, as a leading Tellus / Crump firm — with individualized support." },
  { n: "04", title: "Half a century of trust", desc: "Fifty years of brokerage expertise, and a recognized leader in the foreign national market." },
];

const VERTEX_SHADER = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position,1.0); }";
const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv; uniform float t; uniform vec2 res;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
void main(){
  vec2 uv=vUv; uv.x*=res.x/res.y;
  float n=noise(uv*2.0+vec2(t*0.05,t*0.03))*0.6+noise(uv*4.0-vec2(t*0.04))*0.4;
  vec2 c1=vec2(0.72+0.12*sin(t*0.12), 0.42+0.10*cos(t*0.10));
  vec2 c2=vec2(0.55+0.10*cos(t*0.09), 0.72+0.10*sin(t*0.11));
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
    const uniforms = { t: { value: 0 }, res: { value: new THREE.Vector2(w, h) } };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(quad);

    let alive = true, raf = 0;
    const onResize = () => {
      w = parent.clientWidth; h = parent.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.res.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    const start = performance.now();
    const tick = () => {
      if (!alive) return;
      uniforms.t.value = (performance.now() - start) / 1000;
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

export default function ConceptD() {
  const pageRef = useRef<HTMLDivElement>(null);
  const silkCanvas = useRef<HTMLCanvasElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useSilk(silkCanvas);
  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: "22px clamp(20px,5vw,60px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 30 }} /></a>
        <div className={styles.headerNav}>
          <a href="#why" className={styles.nl}>Firm</a>
          <a href="#foreign" className={styles.nl}>Foreign National</a>
          <a href="#products" className={styles.nl}>Products</a>
          <a href="#contact" className={styles.nl}>Contact</a>
          <a href="#contact" className={`${styles.cta} ${styles.ctaGold}`} style={{ padding: "11px 22px", border: "1px solid #12294a", color: "#12294a", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner With Us</a>
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
            <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 34 }}>
              <span style={{ width: 44, height: 1, background: "#a9812f" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: "#9a7526" }}>Coral Gables · Since the 1970s</span>
            </div>
            <h1 ref={heroTitle} style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(38px,5.6vw,74px)", lineHeight: 1.06, margin: "0 0 30px", color: "#12294a", letterSpacing: "-0.01em" }}>Partnering with producers and financial advisors to deliver customized business solutions with seamless execution.</h1>
            <p ref={heroSub} style={{ fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: "#4a5568", fontWeight: 400, maxWidth: 520, margin: "0 0 42px" }}>For over fifty years, Brandon Brokerage Group has paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.</p>
            <div ref={heroCta} style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={styles.cta} style={{ padding: "16px 34px", border: "1px solid #12294a", color: "#12294a", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>Partner with us</a>
              <a href="#products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: "#12294a" }}>Explore products</a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b8574" }}>Scroll</span>
          <span style={{ width: 1, height: 38, background: "linear-gradient(#a9812f,transparent)" }} />
        </div>
      </div>

      {/* STATS STRIP */}
      <div data-reveal style={{ borderTop: "1px solid rgba(18,41,74,0.16)", borderBottom: "1px solid rgba(18,41,74,0.16)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          <div style={{ padding: "44px clamp(20px,4vw,48px)", borderRight: "1px solid rgba(18,41,74,0.1)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#12294a", lineHeight: 0.9 }}>50<span style={{ color: "#a9812f" }}>+</span></div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482", marginTop: 14 }}>Years of expertise</div></div>
          <div style={{ padding: "44px clamp(20px,4vw,48px)", borderRight: "1px solid rgba(18,41,74,0.1)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#12294a", lineHeight: 0.9 }}>30<span style={{ color: "#a9812f" }}>+</span></div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482", marginTop: 14 }}>Top-rated carriers</div></div>
          <div style={{ padding: "44px clamp(20px,4vw,48px)", borderRight: "1px solid rgba(18,41,74,0.1)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#12294a", lineHeight: 0.9 }}>5</div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482", marginTop: 14 }}>Product lines</div></div>
          <div style={{ padding: "44px clamp(20px,4vw,48px)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#a9812f", lineHeight: 0.9, fontStyle: "italic" }}>FN</div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482", marginTop: 14 }}>Market leader</div></div>
        </div>
      </div>

      {/* MISSION */}
      <div style={{ padding: "clamp(80px,12vw,160px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a7526", marginBottom: 40 }}>Our mission</div>
          <p data-reveal style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400, fontSize: "clamp(26px,3.6vw,44px)", lineHeight: 1.34, margin: 0, color: "#1a2536" }}>To provide agents with superior service, personalized sales support and tailored business solutions that <span style={{ fontStyle: "italic", color: "#a9812f" }}>build and develop long-term relationships</span>.</p>
        </div>
      </div>

      {/* WHY */}
      <div id="why" style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#ece7db" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: "#12294a", lineHeight: 1.05, maxWidth: 640 }}>Everything an agent needs, from one desk.</h2>
            <span style={{ fontSize: 14, color: "#6b7482", maxWidth: 280, fontWeight: 400 }}>Four disciplines, one team behind every case you write.</span>
          </div>
          <div data-reveal style={{ borderRadius: 4, overflow: "hidden", height: 280, marginBottom: 56 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/miami-palms-day.jpg" alt="Miami skyline and palm trees" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            {WHY.map((w, i) => (
              <div key={w.n} data-reveal style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "clamp(16px,3vw,48px)", padding: "40px 0", borderTop: "1px solid rgba(18,41,74,0.16)", borderBottom: i === WHY.length - 1 ? "1px solid rgba(18,41,74,0.16)" : undefined, alignItems: "baseline" }}>
                <div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: 30, color: "#a9812f", fontStyle: "italic" }}>{w.n}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, alignItems: "baseline" }}>
                  <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(22px,2.4vw,30px)", margin: 0, color: "#12294a" }}>{w.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.66, color: "#5c6675", fontWeight: 400, margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)", background: "#f3efe6", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/globe-gold.jpg" alt="" style={{ position: "absolute", top: "50%", right: "-60px", transform: "translateY(-50%)", width: 340, height: 340, borderRadius: "50%", objectFit: "cover", opacity: 0.85 }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a7526", marginBottom: 34 }}>Signature specialty</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(34px,6vw,76px)", lineHeight: 1.04, margin: "0 0 40px", color: "#12294a", maxWidth: 900 }}>We place the cases <span style={{ fontStyle: "italic", color: "#a9812f" }}>others turn away</span>.</h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(30px,5vw,80px)", alignItems: "start" }}>
            <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "#4a5568", fontWeight: 400, margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "#4a5568", fontWeight: 400, margin: 0 }}>Our open-architecture approach offers a variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines. <a href="#contact" className={styles.lnk} style={{ color: "#a9812f" }}>Speak with a specialist</a>.</p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#ece7db" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: "#12294a" }}>Products</h2>
            <span style={{ fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9a7526" }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(18,41,74,0.18)" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "34px 4px", borderBottom: "1px solid rgba(18,41,74,0.14)" }}>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontStyle: "italic", color: "#a9812f", fontSize: 18 }}>{p.n}</span>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(24px,3vw,38px)", color: "#12294a" }}>{p.name}</span>
                <span style={{ fontSize: 14, color: "#6b7482", textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS MARQUEE */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.1)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6b7482", marginBottom: 34 }}>Our carriers — a leading Tellus / Crump firm</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
            <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(30px,4vw,64px)", fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(19px,2vw,28px)", color: "#8b93a2", whiteSpace: "nowrap" }}>
              {[0, 1].map((rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                      <span>{c}</span><span style={{ color: "#a9812f" }}>·</span>
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
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a7526", marginBottom: 30 }}>Get started</div>
            <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.02, margin: "0 0 28px", color: "#12294a" }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: "#4a5568", fontWeight: 400, margin: 0, maxWidth: 440 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(169,129,47,0.5)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482" }}>Phone</span><span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(20px,2.4vw,28px)", color: "#12294a" }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482" }}>Toll-Free</span><span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(20px,2.4vw,28px)", color: "#12294a" }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b7482" }}>Office</span><span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(17px,1.8vw,22px)", color: "#12294a", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
            <a href="#contact" className={styles.cta} style={{ display: "inline-block", marginTop: 34, padding: "16px 38px", border: "1px solid #12294a", color: "#12294a", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner with us</a>
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
