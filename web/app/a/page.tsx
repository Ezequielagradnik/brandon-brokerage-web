"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import styles from "./page.module.css";

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

function useGlobe(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement as HTMLElement;
    let w = parent.clientWidth, h = parent.clientHeight;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.z = 3.35;

    const group = new THREE.Group();
    scene.add(group);

    const solid = new THREE.Mesh(
      new THREE.SphereGeometry(1.19, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x0a1626 })
    );
    group.add(solid);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1.2, 34, 26)),
      new THREE.LineBasicMaterial({ color: 0xc9a24b, transparent: true, opacity: 0.42 })
    );
    group.add(wire);

    const pts: number[] = [];
    for (let i = 0; i < 320; i++) {
      const u = Math.random(), v = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
      const r = 1.205;
      pts.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    group.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xe2c072, size: 0.02, transparent: true, opacity: 0.85 })));

    group.rotation.x = 0.42;
    group.rotation.z = -0.12;
    group.position.x = 1.28;
    group.position.y = 0.05;

    let tx = 0, ty = 0, alive = true, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientY / window.innerHeight - 0.5) * 0.35;
      ty = (e.clientX / window.innerWidth - 0.5) * 0.5;
    };
    window.addEventListener("pointermove", onMove);

    const onResize = () => {
      w = parent.clientWidth; h = parent.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (!alive) return;
      group.rotation.y += 0.0016;
      group.rotation.x += (0.42 + tx - group.rotation.x) * 0.04;
      camera.position.x += (ty * 0.6 - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function ConceptA() {
  const pageRef = useRef<HTMLDivElement>(null);
  const globeCanvas = useRef<HTMLCanvasElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useGlobe(globeCanvas);
  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div style={{ position: "fixed", top: 18, left: 0, right: 0, zIndex: 60, padding: "0 clamp(20px,5vw,60px)", display: "flex", justifyContent: "center" }}>
        <div className={styles.headerBar} style={{ width: "100%", maxWidth: 1300, background: "rgba(245,240,230,0.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: 28, padding: "12px 26px", boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 26 }} /></a>
          <div className={styles.headerNav}>
            <a href="#why" className={styles.nl}>Firm</a>
            <a href="#foreign" className={styles.nl}>Foreign National</a>
            <a href="#products" className={styles.nl}>Products</a>
            <a href="#contact" className={styles.nl}>Contact</a>
            <a href="#contact" className={styles.cta} style={{ padding: "11px 22px", border: "1px solid #0a1626", borderRadius: 999, color: "#0a1626", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner With Us</a>
          </div>
        </div>
      </div>

      {/* HERO with three.js globe */}
      <div id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px clamp(20px,5vw,60px) 80px", background: "radial-gradient(130% 100% at 78% 30%, #10233f 0%, #0a1626 58%)" }}>
        <canvas ref={globeCanvas} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg,#0a1626 6%,rgba(10,22,38,0.82) 34%,rgba(10,22,38,0.2) 60%,rgba(10,22,38,0) 78%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(10,22,38,0.5),transparent 22%,transparent 78%,rgba(10,22,38,0.6))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 760 }}>
            <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 34 }}>
              <span style={{ width: 44, height: 1, background: "#c9a24b" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: "#c9a24b" }}>Coral Gables · Since the 1970s</span>
            </div>
            <h1 ref={heroTitle} style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(46px,7vw,92px)", lineHeight: 1.0, margin: "0 0 30px", color: "#fff", letterSpacing: "-0.01em" }}>A brokerage without<br />borders.</h1>
            <p ref={heroSub} style={{ fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: "#c3ccda", fontWeight: 300, maxWidth: 520, margin: "0 0 42px" }}>For over fifty years, Brandon Brokerage Group has partnered with producers and advisors — pairing advanced sales support and full case management with access to 30+ top-rated carriers, and a rare command of the foreign national market.</p>
            <div ref={heroCta} style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={styles.cta} style={{ padding: "16px 34px", border: "1px solid #c9a24b", color: "#e2c072", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>Partner with us</a>
              <a href="#products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: "#eef2f8" }}>Explore products</a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#7f8da3" }}>Scroll</span>
          <span style={{ width: 1, height: 38, background: "linear-gradient(#c9a24b,transparent)" }} />
        </div>
      </div>

      {/* STATS STRIP */}
      <div data-reveal style={{ borderTop: "1px solid rgba(201,162,75,0.18)", borderBottom: "1px solid rgba(201,162,75,0.18)", background: "#0a1626" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          <div style={{ padding: "44px clamp(20px,4vw,48px)", borderRight: "1px solid rgba(255,255,255,0.06)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#fff", lineHeight: 0.9 }}>50<span style={{ color: "#c9a24b" }}>+</span></div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa", marginTop: 14 }}>Years of expertise</div></div>
          <div style={{ padding: "44px clamp(20px,4vw,48px)", borderRight: "1px solid rgba(255,255,255,0.06)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#fff", lineHeight: 0.9 }}>30<span style={{ color: "#c9a24b" }}>+</span></div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa", marginTop: 14 }}>Top-rated carriers</div></div>
          <div style={{ padding: "44px clamp(20px,4vw,48px)", borderRight: "1px solid rgba(255,255,255,0.06)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#fff", lineHeight: 0.9 }}>5</div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa", marginTop: 14 }}>Product lines</div></div>
          <div style={{ padding: "44px clamp(20px,4vw,48px)" }}><div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 500, color: "#c9a24b", lineHeight: 0.9, fontStyle: "italic" }}>FN</div><div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa", marginTop: 14 }}>Market leader</div></div>
        </div>
      </div>

      {/* MISSION */}
      <div style={{ padding: "clamp(80px,12vw,160px) clamp(20px,5vw,60px)", background: "#0a1626" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a24b", marginBottom: 40 }}>Our mission</div>
          <p data-reveal style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400, fontSize: "clamp(26px,3.6vw,44px)", lineHeight: 1.34, margin: 0, color: "#eef2f8" }}>To provide agents with superior service, personalized sales support and tailored business solutions that <span style={{ fontStyle: "italic", color: "#e2c072" }}>build and develop long-term relationships</span>.</p>
        </div>
      </div>

      {/* WHY */}
      <div id="why" style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#0a1626" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: "#fff", lineHeight: 1.05, maxWidth: 640 }}>Everything an agent needs, from one desk.</h2>
            <span style={{ fontSize: 14, color: "#8896aa", maxWidth: 280, fontWeight: 300 }}>Four disciplines, one team behind every case you write.</span>
          </div>
          <div>
            {WHY.map((w, i) => (
              <div key={w.n} data-reveal style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "clamp(16px,3vw,48px)", padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: i === WHY.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined, alignItems: "baseline" }}>
                <div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: 30, color: "#c9a24b", fontStyle: "italic" }}>{w.n}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24, alignItems: "baseline" }}>
                  <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(22px,2.4vw,30px)", margin: 0, color: "#fff" }}>{w.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.66, color: "#9aa6b8", fontWeight: 300, margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)", background: "linear-gradient(180deg,#0a1626,#0c1c33)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a24b", marginBottom: 34 }}>Signature specialty</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(34px,6vw,76px)", lineHeight: 1.04, margin: "0 0 40px", color: "#fff", maxWidth: 900 }}>We place the cases <span style={{ fontStyle: "italic", color: "#e2c072" }}>others turn away</span>.</h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(30px,5vw,80px)", alignItems: "start" }}>
            <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "#b7c1d1", fontWeight: 300, margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: "#b7c1d1", fontWeight: 300, margin: 0 }}>Our open-architecture approach offers a variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines. <a href="#contact" className={styles.lnk} style={{ color: "#e2c072" }}>Speak with a specialist</a>.</p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(60px,8vw,110px) clamp(20px,5vw,60px)", background: "#0c1c33" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(30px,4.4vw,56px)", margin: 0, color: "#fff" }}>Products</h2>
            <span style={{ fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c9a24b" }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "34px 4px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontStyle: "italic", color: "#c9a24b", fontSize: 18 }}>{p.n}</span>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(24px,3vw,38px)", color: "#fff" }}>{p.name}</span>
                <span style={{ fontSize: 14, color: "#8896aa", textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#0c1c33", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#8896aa", marginBottom: 34 }}>Our carriers — a leading Tellus / Crump firm</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
            <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(30px,4vw,64px)", fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(19px,2vw,28px)", color: "#6f7d92", whiteSpace: "nowrap" }}>
              {[0, 1].map((rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                      <span>{c}</span><span style={{ color: "#c9a24b" }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ position: "relative", padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)", background: "radial-gradient(120% 100% at 30% 20%,#12294a,#0a1626 60%)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a24b", marginBottom: 30 }}>Get started</div>
            <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.02, margin: "0 0 28px", color: "#fff" }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: "#b7c1d1", fontWeight: 300, margin: 0, maxWidth: 440 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(201,162,75,0.3)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa" }}>Phone</span><span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(20px,2.4vw,28px)", color: "#fff" }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa" }}>Toll-Free</span><span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(20px,2.4vw,28px)", color: "#fff" }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8896aa" }}>Office</span><span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(17px,1.8vw,22px)", color: "#fff", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
            <a href="#contact" className={styles.cta} style={{ display: "inline-block", marginTop: 34, padding: "16px 38px", border: "1px solid #c9a24b", color: "#e2c072", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner with us</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "44px clamp(20px,5vw,60px)", background: "#070f1c", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ background: "rgba(245,240,230,0.94)", borderRadius: 999, padding: "8px 18px", display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 22 }} />
        </div>
        <div style={{ fontSize: 12, color: "#5f6d82" }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
