"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#why", label: "Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const PRODUCTS = [
  { n: "01", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "02", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "03", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "04", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "05", name: "Disability Income", desc: "Protect earning power" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

// Electric-blue particle network: drifting nodes joined by lines whenever
// they come close — a living "global placement network" behind the hero.
function useNetwork(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
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
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    const group = new THREE.Group();
    scene.add(group);

    // Nodes drifting inside a wide flat box
    const COUNT = 130;
    const BX = 6.4, BY = 3.4, BZ = 2.2;
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * BX;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * BY;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * BZ;
      vel[i * 3] = (Math.random() * 2 - 1) * 0.004;
      vel[i * 3 + 1] = (Math.random() * 2 - 1) * 0.004;
      vel[i * 3 + 2] = (Math.random() * 2 - 1) * 0.004;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x5c8dff, size: 0.055, transparent: true, opacity: 0.95 }));
    group.add(points);

    // Line buffer, rebuilt per frame from close pairs
    const MAX_SEG = 2600;
    const lPos = new Float32Array(MAX_SEG * 6);
    const lGeo = new THREE.BufferGeometry();
    const lAttr = new THREE.BufferAttribute(lPos, 3);
    lAttr.setUsage(THREE.DynamicDrawUsage);
    lGeo.setAttribute("position", lAttr);
    const lines = new THREE.LineSegments(lGeo, new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.24 }));
    group.add(lines);

    const THRESH = 1.55;

    let tx = 0, ty = 0, alive = true, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientY / window.innerHeight - 0.5) * 0.22;
      ty = (e.clientX / window.innerWidth - 0.5) * 0.35;
    };
    window.addEventListener("pointermove", onMove);
    const onResize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (!alive) return;
      // drift + bounce
      for (let i = 0; i < COUNT; i++) {
        for (let k = 0; k < 3; k++) {
          const idx = i * 3 + k;
          pos[idx] += vel[idx];
          const lim = k === 0 ? BX : k === 1 ? BY : BZ;
          if (pos[idx] > lim || pos[idx] < -lim) vel[idx] *= -1;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      // connect close pairs
      let seg = 0;
      for (let i = 0; i < COUNT && seg < MAX_SEG; i++) {
        for (let j = i + 1; j < COUNT && seg < MAX_SEG; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < THRESH * THRESH) {
            lPos.set([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]], seg * 6);
            seg++;
          }
        }
      }
      lGeo.setDrawRange(0, seg * 2);
      lAttr.needsUpdate = true;

      group.rotation.y += (ty - group.rotation.y) * 0.03;
      group.rotation.x += (tx - group.rotation.x) * 0.03;
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

export default function ConceptE() {
  const pageRef = useRef<HTMLDivElement>(null);
  const netCanvas = useRef<HTMLCanvasElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useNetwork(netCanvas);
  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "sticky", top: 0, zIndex: 60, padding: scrolled ? "13px clamp(20px,5vw,60px)" : "20px clamp(20px,5vw,60px)", background: "rgba(5,7,13,0.82)", backdropFilter: "blur(12px)", borderBottom: scrolled ? "1px solid #1b2842" : "1px solid #10192c", boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.55)" : "none", transition: "padding 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease" }}>
        <a href="#top" style={{ display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: scrolled ? 24 : 28, transition: "height 0.28s ease" }} />
        </a>
        <div className={styles.headerNav}>
          <a href="#why" className={styles.nl}>Firm</a>
          <a href="#foreign" className={styles.nl}>Foreign National</a>
          <a href="#products" className={styles.nl}>Products</a>
          <a href="#contact" className={styles.nl}>Contact</a>
          <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ padding: "11px 22px", borderRadius: 4, fontSize: 13, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Partner With Us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner With Us"
          ctaHref="#contact"
          panelBg="#0a0f1c"
          textColor="#eef2f8"
          accentColor="#3b82f6"
        />
      </div>

      {/* HERO — particle network */}
      <div id="top" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", padding: "clamp(90px,10vw,140px) clamp(20px,5vw,60px) clamp(70px,8vw,110px)", background: "radial-gradient(130% 100% at 50% 0%, #0a1226 0%, #05070d 62%)", overflow: "hidden" }}>
        <canvas ref={netCanvas} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", opacity: 0.85 }} />
        <div className={styles.gridOverlay} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,7,13,0.25), transparent 30%, transparent 68%, #05070d)" }} />
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 860 }}>
            <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
              <span style={{ width: 34, height: 1, background: "#3b82f6" }} />
              <span className={styles.tag}>Coral Gables — Since the 1970s</span>
            </div>
            <h1 ref={heroTitle} style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 26px", color: "#fff" }}>
              Partnering with producers and financial advisors to deliver customized business solutions with <span style={{ color: "#5c8dff" }}>seamless execution</span>.
            </h1>
            <p ref={heroSub} style={{ fontSize: "clamp(16px,1.3vw,18.5px)", lineHeight: 1.65, color: "#9fb0cc", fontWeight: 400, maxWidth: 580, margin: "0 0 40px" }}>
              For over fifty years, Brandon Brokerage Group has paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.
            </p>
            <div ref={heroCta} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ padding: "16px 32px", borderRadius: 4, fontSize: 13.5, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Partner With Us</a>
              <a href="#products" className={`${styles.cta} ${styles.ctaOutline}`} style={{ padding: "16px 32px", borderRadius: 4, fontSize: 13.5, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Explore Products</a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span className={styles.mono} style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#54647f" }}>Scroll</span>
          <span style={{ width: 1, height: 34, background: "linear-gradient(#3b82f6, transparent)" }} />
        </div>
      </div>

      {/* STATS */}
      <div data-reveal style={{ borderTop: "1px solid #10192c", borderBottom: "1px solid #10192c", background: "#05070d" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {[["50+", "Years of expertise"], ["30+", "Top-rated carriers"], ["05", "Product lines"], ["No.1", "Foreign national market"]].map(([n, l], i) => (
            <div key={l} style={{ padding: "40px clamp(20px,4vw,48px)", borderLeft: i > 0 ? "1px solid #10192c" : undefined }}>
              <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "clamp(34px,4.4vw,50px)", fontWeight: 800, color: n === "No.1" ? "#5c8dff" : "#fff", lineHeight: 0.95 }}>{n}</div>
              <div className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7c9c", marginTop: 12 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION */}
      <div style={{ padding: "clamp(76px,10vw,140px) clamp(20px,5vw,60px)", background: "#05070d" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div data-reveal className={styles.tag} style={{ marginBottom: 30 }}>Our Mission</div>
          <p data-reveal style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600, fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.34, margin: 0, color: "#dbe4f5" }}>
            To provide agents with superior service, personalized sales support and tailored business solutions that <span style={{ color: "#5c8dff" }}>build and develop long-term relationships</span>.
          </p>
        </div>
      </div>

      {/* WHAT WE OFFER */}
      <div id="why" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)", background: "#070b14", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 44 }}>
            <div>
              <div className={styles.tag} style={{ marginBottom: 14 }}>What We Offer</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.6vw,44px)", margin: 0, color: "#fff", letterSpacing: "-0.01em" }}>Everything an agent needs, from one desk.</h2>
            </div>
            <span className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7c9c" }}>Four disciplines / one team</span>
          </div>
          <div data-reveal className={styles.offerGrid}>
            {OFFERINGS.map((o) => (
              <div key={o.n} className={styles.offerCard}>
                <div className={styles.offerImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.title} className={styles.offerImg} />
                  <span className={styles.offerNum}>{o.n}</span>
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <h3 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: 17.5, margin: "0 0 10px", color: "#fff", lineHeight: 1.25 }}>{o.title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#8b99b5", margin: 0 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(76px,10vw,130px) clamp(20px,5vw,60px)", background: "linear-gradient(180deg,#070b14,#0a1226)", overflow: "hidden", borderTop: "1px solid #10192c" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-12%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.16), transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal className={styles.tag} style={{ marginBottom: 24 }}>Signature Specialty</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,72px)", lineHeight: 1.02, margin: "0 0 40px", color: "#fff", letterSpacing: "-0.02em", maxWidth: 900 }}>
            We place the cases <span style={{ color: "#5c8dff" }}>others turn away</span>.
          </h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(28px,4vw,64px)", borderTop: "1px solid #1b2842", paddingTop: 34 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9fb0cc", margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9fb0cc", margin: 0 }}>Our open-architecture approach offers a variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines. <a href="#contact" style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 14 }}>Speak with a specialist →</a></p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)", background: "#05070d", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
            <div>
              <div className={styles.tag} style={{ marginBottom: 14 }}>Products</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.6vw,44px)", margin: 0, color: "#fff", letterSpacing: "-0.01em" }}>Five lines, one relationship.</h2>
            </div>
            <span className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7c9c" }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid #16223a" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prodRow}>
                <span className={styles.mono} style={{ fontSize: 12.5, color: "#3b82f6" }}>{p.n}</span>
                <span className={styles.prodName} style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.6vw,30px)", color: "#eef2f8", letterSpacing: "-0.01em" }}>{p.name}</span>
                <span className={styles.mono} style={{ fontSize: 12, color: "#6b7c9c", textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#05070d", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b7c9c", marginBottom: 30 }}>Our carriers — a leading Tellus / Crump firm</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}>
            <div className={styles.marquee}>
              {[0, 1].map((rep) => (
                <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(26px,3.4vw,52px)", paddingRight: "clamp(26px,3.4vw,52px)" }} aria-hidden={rep === 1}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", gap: "clamp(26px,3.4vw,52px)", whiteSpace: "nowrap" }}>
                      <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(17px,1.8vw,24px)", color: "#41506b" }}>{c}</span>
                      <span style={{ width: 5, height: 5, background: "#2563eb" }} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ position: "relative", padding: "clamp(76px,10vw,130px) clamp(20px,5vw,60px)", background: "radial-gradient(110% 120% at 20% 0%, #10254d 0%, #070b14 60%)", overflow: "hidden", borderTop: "1px solid #10192c" }}>
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div className={styles.tag} style={{ marginBottom: 24 }}>Get Started</div>
            <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,58px)", lineHeight: 1.05, margin: "0 0 24px", color: "#fff", letterSpacing: "-0.02em" }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "#9fb0cc", margin: 0, maxWidth: 460 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal style={{ border: "1px solid #1b2842", background: "rgba(7,11,20,0.7)", backdropFilter: "blur(6px)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 24px", borderBottom: "1px solid #1b2842" }}><span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6b7c9c" }}>PHONE</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 21, fontWeight: 700, color: "#fff" }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 24px", borderBottom: "1px solid #1b2842" }}><span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6b7c9c" }}>TOLL-FREE</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 21, fontWeight: 700, color: "#fff" }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 24px" }}><span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6b7c9c" }}>OFFICE</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 15.5, fontWeight: 700, color: "#fff", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#03050a", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px) 0", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className={styles.footerGrid}>
            <div>
              <div style={{ display: "inline-flex", marginBottom: 18 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: 26 }} />
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#6b7c9c", margin: 0, maxWidth: 280 }}>A leading Tellus / Crump firm serving producers and financial advisors since the 1970s.</p>
            </div>

            <div>
              <div className={styles.tag} style={{ marginBottom: 16 }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className={styles.footLink} style={{ fontSize: 14, color: "#9fb0cc" }}>{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.tag} style={{ marginBottom: 16 }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#9fb0cc" }}>
                <a href="tel:+13054447401" className={styles.footLink} style={{ color: "#9fb0cc" }}>305-444-7401</a>
                <a href="tel:+18887764678" className={styles.footLink} style={{ color: "#9fb0cc" }}>1-888-776-4678</a>
                <span style={{ color: "#6b7c9c", lineHeight: 1.5 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
              </div>
            </div>

            <div>
              <div className={styles.tag} style={{ marginBottom: 16 }}>Get started</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#6b7c9c", margin: "0 0 16px" }}>A brokerage director responds within one business day.</p>
              <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ display: "inline-block", padding: "11px 22px", borderRadius: 4, fontSize: 12, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Partner With Us</a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #10192c", marginTop: "clamp(40px,5vw,56px)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div className={styles.mono} style={{ fontSize: 11.5, color: "#54647f" }}>© 1970s–2026 BRANDON BROKERAGE GROUP. ALL RIGHTS RESERVED.</div>
            <div className={styles.mono} style={{ fontSize: 11.5, color: "#54647f" }}>FOR LICENSED AGENTS &amp; ADVISORS ONLY</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
