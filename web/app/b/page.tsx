"use client";

import { useRef } from "react";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import Guilloche from "@/components/Guilloche";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#why", label: "Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const WHY = [
  { n: "I", title: "Advanced Sales Support", desc: "Case planning and design, marketing concepts, carrier insight and point-of-sale support — for domestic and foreign national cases alike." },
  { n: "II", title: "Full Case Management", desc: "A dedicated new-business team packages, submits and follows every case through underwriting, records and delivery." },
  { n: "III", title: "Quality Carriers & Products", desc: "Full access to over thirty top-rated carriers, as a leading Tellus / Crump firm — with individualized support." },
  { n: "IV", title: "Half a Century of Trust", desc: "Fifty years of brokerage expertise, and a recognized leader in the foreign national market." },
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
      <circle cx="60" cy="60" r="57" fill="none" stroke="#1f3d2f" strokeWidth="1" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#1f3d2f" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="#a67c3d" strokeWidth="1.4" />
      <text x="60" y="55" textAnchor="middle" fontFamily="var(--font-fraunces), serif" fontStyle="italic" fontSize="22" fill="#1f3d2f">50</text>
      <text x="60" y="72" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="8" letterSpacing="1" fill="#1f3d2f">YEARS</text>
      <path id="sealArcTop" d="M 18 60 A 42 42 0 0 1 102 60" fill="none" />
      <text fontFamily="var(--font-plex-mono), monospace" fontSize="7.5" letterSpacing="2" fill="#1f3d2f">
        <textPath href="#sealArcTop" startOffset="50%" textAnchor="middle">CORAL GABLES · FLORIDA</textPath>
      </text>
    </svg>
  );
}

export default function ConceptB() {
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

      {/* HERO */}
      <div id="top" style={{ position: "relative", padding: "clamp(60px,9vw,120px) clamp(20px,5vw,60px)", overflow: "hidden" }}>
        <Guilloche opacity={0.16} />
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

      {/* WHY — LEDGER LIST */}
      <div id="why" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#a67c3d", marginBottom: 16 }}>ARTICLES OF SERVICE</div>
            <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: "clamp(26px,3.2vw,38px)", margin: 0, color: "#1f3d2f" }}>Everything an agent needs, from one desk.</h2>
          </div>
          <div data-reveal>
            {WHY.map((w, i) => (
              <div key={w.n} className={styles.ledgerRow} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 24, padding: "28px 16px", borderTop: "1px solid #1f3d2f2e", borderBottom: i === WHY.length - 1 ? "1px solid #1f3d2f2e" : undefined }}>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontStyle: "italic", fontSize: 26, color: "#a67c3d" }}>{w.n}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: 20, margin: "0 0 8px", color: "#1f3d2f" }}>{w.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "#3f5245", margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#1f3d2f", color: "#f5efe0", overflow: "hidden" }}>
        <Guilloche color="#f5efe0" opacity={0.08} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#c8a76a", marginBottom: 22 }}>SIGNATURE SPECIALTY</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(28px,4.4vw,50px)", lineHeight: 1.2, margin: "0 0 34px", color: "#f5efe0" }}>We place the cases others turn away.</h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 32, textAlign: "left", maxWidth: 800, margin: "0 auto" }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#d3e0d6", margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market — devising customized sales strategies and wealth-management solutions.</p>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#d3e0d6", margin: 0 }}>Our open-architecture approach suits your clients&apos; needs while adhering to all carrier, state and federal guidelines. <a href="#contact" style={{ color: "#c8a76a" }}>Speak with a specialist →</a></p>
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
          <div className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.18em", color: "#c8a76a", marginBottom: 22 }}>GET STARTED</div>
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
