"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import Guilloche from "@/components/Guilloche";
import { OFFERINGS } from "@/lib/offerings";
import styles from "./page.module.css";

// ————— Signature scroll moment: the certificate engraves itself —————
const ROMAN = ["I", "II", "III", "IV"];

// ornamental guilloche waves, drawn live with scroll
const CERT_WAVES = [
  "M20 70 Q 120 30, 220 70 T 420 70 T 620 70 T 820 70",
  "M20 88 Q 120 128, 220 88 T 420 88 T 620 88 T 820 88",
  "M20 430 Q 120 390, 220 430 T 420 430 T 620 430 T 820 430",
  "M20 448 Q 120 488, 220 448 T 420 448 T 620 448 T 820 448",
  "M20 79 Q 120 55, 220 79 T 420 79 T 620 79 T 820 79",
  "M20 439 Q 120 415, 220 439 T 420 439 T 620 439 T 820 439",
];

function seg(p: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

function CertWave({ progress, d, i, reduce }: { progress: MotionValue<number>; d: string; i: number; reduce: boolean }) {
  const len = useTransform(progress, (p) => (reduce ? 1 : seg(p, 0.02 + i * 0.03, 0.28 + i * 0.03)));
  return <motion.path d={d} stroke="#a67c3d" strokeWidth="1" fill="none" opacity="0.5" style={{ pathLength: len }} />;
}

function CertArticle({ progress, i, reduce }: { progress: MotionValue<number>; i: number; reduce: boolean }) {
  const o = OFFERINGS[i];
  const clip = useTransform(progress, (p) => {
    const t = reduce ? 1 : seg(p, 0.64 + i * 0.08, 0.76 + i * 0.08);
    return `inset(0 ${(1 - t) * 100}% 0 0)`;
  });
  const op = useTransform(progress, (p) => (reduce ? 1 : seg(p, 0.64 + i * 0.08, 0.7 + i * 0.08)));
  return (
    <motion.div style={{ clipPath: clip, opacity: op, borderTop: "1px solid #1f3d2f2e", padding: "13px 0", display: "grid", gridTemplateColumns: "clamp(150px,20vw,210px) 1fr", gap: 16, alignItems: "baseline" }}>
      <span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#a67c3d", textTransform: "uppercase" }}>Article {ROMAN[i]}</span>
      <span>
        <span style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(15px,1.4vw,18px)", color: "#1f3d2f" }}>{o.title}</span>
        <span style={{ display: "block", fontSize: 12.5, lineHeight: 1.5, color: "#3f5245", marginTop: 3 }}>{o.blurb}</span>
      </span>
    </motion.div>
  );
}

function CertScene({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  const frameLen = useTransform(progress, (p) => (reduce ? 1 : seg(p, 0.26, 0.44)));
  const stampScale = useTransform(progress, (p) => (reduce ? 1 : 1.12 - 0.12 * seg(p, 0.42, 0.56)));
  const stampBlur = useTransform(progress, (p) => (reduce ? "blur(0px)" : `blur(${6 * (1 - seg(p, 0.42, 0.56))}px)`));
  const stampOp = useTransform(progress, (p) => (reduce ? 1 : seg(p, 0.42, 0.54)));
  const sealY = useTransform(progress, (p) => (reduce ? 0 : -110 * (1 - seg(p, 0.54, 0.66))));
  const sealScale = useTransform(progress, (p) => {
    if (reduce) return 1;
    const t = seg(p, 0.54, 0.7);
    // drop + soft settle overshoot
    return t < 0.75 ? 1.25 - 0.35 * (t / 0.75) : 0.9 + 0.1 * seg(p, 0.66, 0.7);
  });
  const sealOp = useTransform(progress, (p) => (reduce ? 1 : seg(p, 0.54, 0.6)));
  const sealRot = useTransform(progress, (p) => (reduce ? 0 : -9 * (1 - seg(p, 0.54, 0.68))));

  return (
    <div style={{ position: "relative", width: "min(880px, 94vw)", padding: "clamp(40px,5vh,64px) clamp(24px,4vw,64px)", background: "#f8f3e4" }}>
      {/* live-engraved ornaments + double frame */}
      <svg viewBox="0 0 840 518" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
        {CERT_WAVES.map((d, i) => (
          <CertWave key={i} progress={progress} d={d} i={i} reduce={reduce} />
        ))}
        <motion.rect x="10" y="10" width="820" height="498" fill="none" stroke="#1f3d2f" strokeWidth="1.5" style={{ pathLength: frameLen }} />
        <motion.rect x="20" y="20" width="800" height="478" fill="none" stroke="#a67c3d" strokeWidth="0.8" style={{ pathLength: frameLen }} />
      </svg>

      <div style={{ position: "relative", textAlign: "center" }}>
        <motion.div style={{ scale: stampScale, filter: stampBlur, opacity: stampOp }}>
          <div className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.26em", color: "#4a5c4f", marginBottom: 12 }}>CERTIFICATE · EST. 1970S · No. 000050</div>
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.15, margin: "0 0 6px", color: "#1f3d2f" }}>Four pillars behind every case.</h2>
          <div className={styles.mono} style={{ fontSize: 10.5, letterSpacing: "0.2em", color: "#a67c3d" }}>BRANDON BROKERAGE GROUP · CORAL GABLES, FLORIDA</div>
        </motion.div>

        <div style={{ margin: "clamp(20px,3vh,34px) auto 0", maxWidth: 660, textAlign: "left" }}>
          {OFFERINGS.map((_, i) => (
            <CertArticle key={i} progress={progress} i={i} reduce={reduce} />
          ))}
        </div>
      </div>

      <motion.div style={{ position: "absolute", right: "clamp(14px,4vw,44px)", bottom: "clamp(10px,2vh,26px)", y: sealY, scale: sealScale, opacity: sealOp, rotate: sealRot, filter: "drop-shadow(0 10px 18px rgba(31,61,47,0.25))" }}>
        <Seal />
      </motion.div>
    </div>
  );
}

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

function Seal() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className={styles.seal}>
      {/* outer + inner boundary define the band the text rides in */}
      <circle cx="60" cy="60" r="57" fill="none" stroke="#1f3d2f" strokeWidth="1" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#1f3d2f" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="37" fill="none" stroke="#a67c3d" strokeWidth="1.4" />
      <text x="60" y="55" textAnchor="middle" fontFamily="var(--font-fraunces), serif" fontStyle="italic" fontSize="20" fill="#1f3d2f">50</text>
      <text x="60" y="70" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="7" letterSpacing="1" fill="#1f3d2f">YEARS</text>
      {/* text arc sits at r=50.5, centered in the 57↔44 band */}
      <path id="sealTop" d="M 9.5 60 A 50.5 50.5 0 0 1 110.5 60" fill="none" />
      <path id="sealBot" d="M 9.5 60 A 50.5 50.5 0 0 0 110.5 60" fill="none" />
      <text fontFamily="var(--font-plex-mono), monospace" fontSize="6" letterSpacing="2" fill="#1f3d2f">
        <textPath href="#sealTop" startOffset="50%" textAnchor="middle">CORAL GABLES · FLORIDA</textPath>
      </text>
      <text fontFamily="var(--font-plex-mono), monospace" fontSize="6" letterSpacing="3" fill="#a67c3d">
        <textPath href="#sealBot" startOffset="50%" textAnchor="middle">EST. 1970s</textPath>
      </text>
    </svg>
  );
}

export default function ConceptB() {
  const pageRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // scrub for the engraving scene
  const { scrollYProgress: certRaw } = useScroll({ target: certRef, offset: ["start start", "end end"] });
  const certProgress = useSpring(certRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "sticky", top: 0, zIndex: 60, padding: "20px clamp(20px,5vw,60px)", background: "rgba(245,239,224,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #1f3d2f" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 28 }} /></a>
        <div className={styles.headerNav}>
          <a href="#why" className={styles.nl}>Firm</a>
          <a href="#foreign" className={styles.nl}>Foreign National</a>
          <a href="#products" className={styles.nl}>Products</a>
          <a href="#contact" className={styles.nl}>Contact</a>
          <a href="#contact" className={styles.cta} style={{ padding: "10px 20px", border: "1px solid #1f3d2f", color: "#1f3d2f", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner With Us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner With Us"
          ctaHref="#contact"
          panelBg="#f5efe0"
          textColor="#1f3d2f"
          accentColor="#1f3d2f"
        />
      </div>

      {/* HERO — the guilloche wipes in like engraved lines being drawn */}
      <div id="top" style={{ position: "relative", padding: "clamp(60px,9vw,120px) clamp(20px,5vw,60px)", overflow: "hidden" }}>
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Guilloche opacity={0.16} />
        </motion.div>
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div ref={heroKicker} className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.22em", color: "#4a5c4f", marginBottom: 28 }}>
            EST. 1970S · CORAL GABLES, FLORIDA · No. 000050
          </div>
          <h1 ref={heroTitle} style={{ fontFamily: "var(--font-fraunces), serif", fontOpticalSizing: "auto", fontWeight: 500, fontSize: "clamp(30px,4.6vw,58px)", lineHeight: 1.16, margin: "0 auto 30px", color: "#1f3d2f", maxWidth: 880 }}>
            Partnering with producers and financial advisors to deliver customized business solutions with seamless execution.
          </h1>
          <div style={{ width: 60, height: 1, background: "#a67c3d", margin: "0 auto 30px" }} />
          <p ref={heroSub} style={{ fontSize: "clamp(15.5px,1.2vw,18px)", lineHeight: 1.7, color: "#3f5245", fontWeight: 400, maxWidth: 560, margin: "0 auto 44px" }}>
            For over fifty years, we have paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.
          </p>
          <div ref={heroCta} style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <a href="#contact" className={styles.cta} style={{ padding: "15px 32px", border: "1px solid #1f3d2f", color: "#1f3d2f", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Partner With Us</a>
            <a href="#products" className={styles.mono} style={{ fontSize: 12.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4a5c4f", borderBottom: "1px solid #4a5c4f", paddingBottom: 3 }}>Explore Products</a>
          </div>
          <Seal />
        </div>
      </div>

      {/* STATS LEDGER */}
      <div data-reveal className={styles.frame} style={{ margin: "0 clamp(20px,5vw,60px)", borderLeft: "none", borderRight: "none" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}>
          {[
            ["50+", "Years of expertise"],
            ["30+", "Top-rated carriers"],
            ["05", "Product lines"],
            ["FN", "Market leader"],
          ].map(([n, l], i) => (
            <div key={l} style={{ padding: "36px 20px", textAlign: "center", borderLeft: i > 0 ? "1px solid #1f3d2f22" : undefined }}>
              <div style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: 34, color: "#1f3d2f" }}>{n}</div>
              <div className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.06em", color: "#4a5c4f", marginTop: 8, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY — signature scroll moment: the certificate engraves itself */}
      <div id="why" ref={certRef} className={styles.certSection}>
        <div className={styles.certPin}>
          <CertScene progress={certProgress} reduce={!!reduce} />
          <div className={styles.mono} style={{ position: "absolute", right: "clamp(20px,5vw,60px)", bottom: 22, fontSize: 10.5, letterSpacing: "0.3em", color: "#4a5c4f99" }}>SCROLL TO ENGRAVE</div>
        </div>

        {/* mobile: plain ledger, no pin */}
        <div className={styles.certMobile}>
          <div data-reveal style={{ marginBottom: 32 }}>
            <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#a67c3d", marginBottom: 16 }}>ARTICLES OF SERVICE</div>
            <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(26px,3.2vw,40px)", margin: 0, color: "#1f3d2f" }}>Four pillars behind every case.</h2>
          </div>
          {OFFERINGS.map((o, i) => (
            <div key={o.n} data-reveal style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, padding: "20px 0", borderTop: "1px solid #1f3d2f2e" }}>
              <div className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.1em", color: "#a67c3d", textTransform: "uppercase" }}>Article {ROMAN[i]}</div>
              <div>
                <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: 18, margin: "0 0 6px", color: "#1f3d2f" }}>{o.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#3f5245", margin: 0 }}>{o.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#1f3d2f", color: "#f5efe0", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-palms-sunset.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22, filter: "grayscale(1) sepia(0.3)" }} />
        <Guilloche color="#f5efe0" opacity={0.08} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#c8a76a", marginBottom: 22 }}>SIGNATURE SPECIALTY</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(28px,4.4vw,50px)", lineHeight: 1.2, margin: "0 0 34px", color: "#f5efe0" }}>We place the cases others turn away.</h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 32, textAlign: "left", maxWidth: 800, margin: "0 auto" }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#d3e0d6", margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market — devising customized sales strategies and wealth-management solutions.</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#d3e0d6", margin: 0 }}>Our open-architecture approach suits your clients&apos; needs while adhering to all carrier, state and federal guidelines. <a href="#contact" style={{ color: "#c8a76a" }}>Partner with us →</a></p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#a67c3d", marginBottom: 16 }}>SCHEDULE OF PRODUCTS</div>
            <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(26px,3.2vw,38px)", margin: 0, color: "#1f3d2f" }}>Products</h2>
          </div>
          <div data-reveal className={styles.frame} style={{ padding: "0 24px" }}>
            {PRODUCTS.map((p, i) => (
              <a key={p.n} href="#contact" className={styles.ledgerRow} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, padding: "20px 4px", borderBottom: i === PRODUCTS.length - 1 ? "none" : "1px dashed #1f3d2f44" }}>
                <span className={styles.mono} style={{ fontSize: 12, color: "#a67c3d", width: 30 }}>{p.n}</span>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(18px,2vw,24px)", color: "#1f3d2f", flex: 1, marginLeft: 8 }}>{p.name}</span>
                <span className={styles.mono} style={{ fontSize: 12, color: "#4a5c4f", textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", borderTop: "1px solid #1f3d2f22" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.14em", color: "#4a5c4f", marginBottom: 26 }}>OUR CARRIERS — A LEADING TELLUS / CRUMP FIRM</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {CARRIERS.map((c) => (
              <span key={c} className={styles.chip} style={{ fontSize: 12, color: "#1f3d2f", border: "1px solid #1f3d2f55", padding: "8px 16px" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ position: "relative", padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#1f3d2f", color: "#f5efe0", overflow: "hidden" }}>
        <Guilloche color="#f5efe0" opacity={0.08} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#c8a76a", marginBottom: 22 }}>CONTACT</div>
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(28px,4.4vw,46px)", lineHeight: 1.16, margin: "0 0 40px", color: "#f5efe0" }}>Let&apos;s write more business, together.</h2>
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(30px,5vw,70px)", marginBottom: 44 }}>
            <div>
              <div className={styles.mono} style={{ fontSize: 11, color: "#a3b8a8", letterSpacing: "0.08em", marginBottom: 8 }}>PHONE</div>
              <a href="tel:+13054447401" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, color: "#f5efe0" }}>305-444-7401</a>
            </div>
            <div>
              <div className={styles.mono} style={{ fontSize: 11, color: "#a3b8a8", letterSpacing: "0.08em", marginBottom: 8 }}>TOLL-FREE</div>
              <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, color: "#f5efe0" }}>1-888-776-4678</div>
            </div>
            <div>
              <div className={styles.mono} style={{ fontSize: 11, color: "#a3b8a8", letterSpacing: "0.08em", marginBottom: 8 }}>OFFICE</div>
              <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 17, color: "#f5efe0" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</div>
            </div>
          </div>
          <a href="tel:+13054447401" className={styles.cta} style={{ display: "inline-block", padding: "15px 34px", border: "1px solid #f5efe0", color: "#f5efe0", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Partner With Us</a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "30px clamp(20px,5vw,60px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, borderTop: "1px solid #1f3d2f" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 20 }} />
        <div className={styles.mono} style={{ fontSize: 11, color: "#4a5c4f", letterSpacing: "0.04em" }}>© 1970s–2026 BRANDON BROKERAGE GROUP · FOR LICENSED AGENTS &amp; ADVISORS ONLY</div>
      </div>

    </div>
  );
}
