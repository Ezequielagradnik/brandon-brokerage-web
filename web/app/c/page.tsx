"use client";

import { useRef } from "react";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#why", label: "Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const WHY = [
  { n: "01", title: "Advanced Sales Support", desc: "Case planning and design, marketing concepts, carrier insight and point-of-sale support — for domestic and foreign national cases alike." },
  { n: "02", title: "Full Case Management", desc: "A dedicated new-business team packages, submits and follows every case through underwriting, records and delivery." },
  { n: "03", title: "Quality Carriers & Products", desc: "Full access to over thirty top-rated carriers, as a leading Tellus / Crump firm — with individualized support." },
  { n: "04", title: "Half a Century of Trust", desc: "Fifty years of brokerage expertise, and a recognized leader in the foreign national market." },
];

const PRODUCTS = [
  { n: "01", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "02", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "03", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "04", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "05", name: "Disability Income", desc: "Protect earning power" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

export default function ConceptC() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "sticky", top: 0, zIndex: 60, padding: "20px clamp(20px,5vw,60px)", background: "#fff", borderBottom: "2px solid #0a0a0a" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 26, filter: "grayscale(1) contrast(1.4)" }} /></a>
        <div className={styles.headerNav}>
          <a href="#why" className={styles.nl}>Firm</a>
          <a href="#foreign" className={styles.nl}>Foreign National</a>
          <a href="#products" className={styles.nl}>Products</a>
          <a href="#contact" className={styles.nl}>Contact</a>
          <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ padding: "11px 22px", fontSize: 13 }}>Partner With Us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner With Us"
          ctaHref="#contact"
          panelBg="#ffffff"
          textColor="#0a0a0a"
          accentColor="#1a56ff"
        />
      </div>

      {/* HERO */}
      <div id="top" style={{ position: "relative", padding: "clamp(50px,7vw,90px) clamp(20px,5vw,60px) clamp(70px,9vw,110px)", borderBottom: "2px solid #0a0a0a", overflow: "hidden" }}>
        <div className={styles.bgType} style={{ top: "6%", left: "-2%", fontSize: "clamp(90px,16vw,240px)", lineHeight: 1 }}>BRANDON</div>
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto" }}>
          <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
            <span style={{ width: 10, height: 10, background: "#1a56ff" }} />
            <span style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>Coral Gables — Since the 1970s</span>
          </div>
          <h1 ref={heroTitle} style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "clamp(40px,7.2vw,108px)", lineHeight: 0.98, letterSpacing: "-0.03em", margin: "0 0 40px", color: "#0a0a0a", maxWidth: 1150 }}>
            Partnering with producers and advisors to deliver customized solutions with seamless execution.
          </h1>
          <div className={styles.heroFooter}>
            <p ref={heroSub} style={{ fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.6, color: "#2a2a2a", fontWeight: 500, margin: 0 }}>
              For over fifty years, Brandon Brokerage Group has paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.
            </p>
            <div ref={heroCta} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ padding: "18px 36px", fontSize: 15 }}>Partner With Us</a>
              <a href="#products" className={`${styles.cta} ${styles.ctaOutline}`} style={{ padding: "18px 36px", fontSize: 15 }}>Products</a>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div data-reveal style={{ borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {[["50+", "Years of expertise"], ["30+", "Top-rated carriers"], ["05", "Product lines"], ["FN", "Market leader"]].map(([n, l], i) => (
            <div key={l} style={{ padding: "40px clamp(20px,4vw,48px)", borderLeft: i > 0 ? "2px solid #0a0a0a" : undefined }}>
              <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "clamp(38px,5vw,58px)", fontWeight: 900, color: n === "FN" ? "#1a56ff" : "#0a0a0a", lineHeight: 0.9 }}>{n}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 12, color: "#2a2a2a" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div id="why" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 8, borderBottom: "2px solid #0a0a0a", paddingBottom: 24 }}>
            <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "clamp(30px,4.6vw,58px)", margin: 0, color: "#0a0a0a", letterSpacing: "-0.02em" }}>What we do.</h2>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#1a56ff" }}>Four disciplines, one desk</span>
          </div>
          <div data-reveal>
            {WHY.map((w, i) => (
              <div key={w.n} className={styles.ledgerRow} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 28, padding: "34px 10px", borderBottom: i === WHY.length - 1 ? "none" : "1px solid #d8d8d8" }}>
                <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 26, fontWeight: 900, color: "#c9c9c9" }}>{w.n}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
                  <h3 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.2vw,28px)", margin: 0, color: "#0a0a0a", letterSpacing: "-0.01em" }}>{w.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#3a3a3a", margin: 0, fontWeight: 500 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#0a0a0a", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1a56ff", marginBottom: 24 }}>Signature Specialty</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "clamp(32px,6vw,88px)", lineHeight: 0.98, margin: "0 0 44px", color: "#fff", letterSpacing: "-0.02em", maxWidth: 1000 }}>
            We place the cases others turn away.
          </h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(30px,5vw,70px)", borderTop: "2px solid #fff", paddingTop: 32 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#d4d4d4", margin: 0, fontWeight: 500 }}>With over 50 years of experience, we are an industry leader in the foreign national market — devising customized sales strategies and wealth-management solutions.</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#d4d4d4", margin: 0, fontWeight: 500 }}>Our open-architecture approach suits your clients&apos; needs while adhering to all carrier, state and federal guidelines. <a href="#contact" style={{ color: "#1a56ff", fontWeight: 700 }}>Speak with a specialist →</a></p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,60px)", borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 8, borderBottom: "2px solid #0a0a0a", paddingBottom: 24 }}>
            <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "clamp(30px,4.6vw,58px)", margin: 0, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Products.</h2>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#1a56ff" }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal>
            {PRODUCTS.map((p, i) => (
              <a key={p.n} href="#contact" className={styles.ledgerRow} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "30px 10px", borderBottom: i === PRODUCTS.length - 1 ? "none" : "1px solid #d8d8d8" }}>
                <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, color: "#c9c9c9", fontSize: 18 }}>{p.n}</span>
                <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: "#0a0a0a", letterSpacing: "-0.01em" }}>{p.name}</span>
                <span style={{ fontSize: 14, color: "#3a3a3a", textAlign: "right", fontWeight: 600 }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#3a3a3a", marginBottom: 26 }}>Our carriers — a leading Tellus / Crump firm</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, border: "2px solid #0a0a0a", borderLeft: "none", borderTop: "none" }}>
            {CARRIERS.map((c) => (
              <span key={c} className={styles.chip} style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a", border: "2px solid #0a0a0a", borderRight: "none", borderBottom: "none", padding: "12px 18px" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#1a56ff", color: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0a0a0a", marginBottom: 24 }}>Get Started</div>
            <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,64px)", lineHeight: 0.98, margin: "0 0 26px", color: "#fff", letterSpacing: "-0.02em" }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#e4ebff", margin: 0, maxWidth: 440, fontWeight: 500 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal style={{ border: "2px solid #0a0a0a" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 22px", borderBottom: "2px solid #0a0a0a" }}><span style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", color: "#0a0a0a" }}>Phone</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 22px", borderBottom: "2px solid #0a0a0a" }}><span style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", color: "#0a0a0a" }}>Toll-Free</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 22px" }}><span style={{ fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", color: "#0a0a0a" }}>Office</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 16, fontWeight: 800, color: "#fff", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "28px clamp(20px,5vw,60px)", background: "#0a0a0a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 20, filter: "grayscale(1) invert(1) contrast(1.4)" }} />
        <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", color: "#999" }}>© 1970s–2026 Brandon Brokerage Group · Licensed Agents Only</div>
      </div>

    </div>
  );
}
