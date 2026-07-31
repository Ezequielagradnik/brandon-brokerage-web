"use client";

import { useRef } from "react";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#firm", label: "The Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

const PRODUCTS = [
  { n: "No. 1", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "No. 2", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "No. 3", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "No. 4", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "No. 5", name: "Disability Income", desc: "Protect earning power" },
];

const INK = "#1a1814";
const PAPER = "#f7f4ee";
const MUTED = "#6a6357";
const HAIR = "1px solid rgba(26,24,20,0.16)";

export default function ConceptI() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  const serif = "var(--font-cormorant), serif";
  const label: React.CSSProperties = { fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED };

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: "18px clamp(20px,5vw,60px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 27 }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <a href="#contact" className={styles.cta} style={{ padding: "10px 22px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>Inquire</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Inquire"
          ctaHref="#contact"
          panelBg={PAPER}
          textColor={INK}
          accentColor={INK}
        />
      </div>

      {/* HERO — oversized editorial masthead */}
      <div id="top" style={{ padding: "clamp(140px,18vh,200px) clamp(20px,5vw,60px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={heroKicker} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderBottom: `1px solid ${INK}`, paddingBottom: 18, marginBottom: "clamp(30px,4vw,52px)" }}>
            <span style={label}>Brandon Brokerage Group</span>
            <span style={label}>Coral Gables, Florida</span>
            <span style={label}>Since the 1970s</span>
          </div>
          <h1 ref={heroTitle} style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(52px,9.4vw,142px)", lineHeight: 0.98, margin: "0 0 clamp(30px,4vw,52px)", color: INK, letterSpacing: "-0.015em" }}>
            Seamless<br /><span style={{ fontStyle: "italic", marginLeft: "clamp(30px,10vw,180px)" }}>execution,</span><br />since the &rsquo;70s.
          </h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", gap: "clamp(16px,2.4vw,36px)", alignItems: "end", paddingBottom: "clamp(40px,6vw,80px)" }}>
            <p ref={heroSub} style={{ gridColumn: "span 12", maxWidth: 460, fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: 0 }}>We partner with producers and financial advisors to deliver customized business solutions — advanced sales support, full case management and 30+ top-rated carriers behind every case.</p>
            <div ref={heroCta} style={{ gridColumn: "span 12", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginTop: 8 }}>
              <a href="#contact" className={styles.cta} style={{ padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Partner with us</a>
              <a href="#firm" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.06em", color: INK }}>The firm, in brief</a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO IMAGE — b&w full width with caption */}
      <div data-reveal style={{ padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ height: "clamp(300px,52vh,600px)", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/handshake-moody.jpg" alt="A firm handshake" className={styles.bw} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "14px 2px 0", flexWrap: "wrap" }}>
            <span style={label}>Fig. 01 — The partnership</span>
            <span style={label}>50+ years · 30+ carriers · 5 product lines</span>
          </div>
        </div>
      </div>

      {/* MISSION — indented editorial pull quote */}
      <div style={{ padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", gap: "clamp(16px,2.4vw,36px)" }}>
          <div data-reveal style={{ gridColumn: "1 / span 2", ...label, paddingTop: 10 }}>No. 01<br />Mission</div>
          <p data-reveal style={{ gridColumn: "4 / span 9", fontFamily: serif, fontWeight: 400, fontSize: "clamp(26px,3.6vw,46px)", lineHeight: 1.32, margin: 0, color: INK }}>To provide agents with superior service, personalized sales support and tailored business solutions that build <span style={{ fontStyle: "italic" }}>long-term relationships</span>.</p>
        </div>
      </div>

      {/* THE FIRM — alternating asymmetric photo rows */}
      <div id="firm" style={{ padding: "0 clamp(20px,5vw,60px) clamp(60px,8vw,110px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ borderTop: `1px solid ${INK}`, paddingTop: 18, marginBottom: "clamp(44px,6vw,80px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={label}>No. 02 — What we offer</span>
            <span style={label}>Four disciplines, one team</span>
          </div>
          <div style={{ display: "grid", gap: "clamp(60px,8vw,110px)" }}>
            {OFFERINGS.map((o, i) => (
              <div key={o.n} data-reveal className={styles.offRow}>
                <div className={i % 2 === 0 ? styles.offImgA : styles.offImgB} style={{ height: "clamp(240px,34vw,420px)", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.title} className={styles.bw} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className={i % 2 === 0 ? styles.offTextA : styles.offTextB}>
                  <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20, color: MUTED, marginBottom: 14 }}>({o.n})</div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(26px,2.8vw,38px)", margin: "0 0 16px", color: INK, lineHeight: 1.12 }}>{o.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: 0 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — ink band, inverse */}
      <div id="foreign" style={{ padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)", background: INK }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", gap: "clamp(16px,2.4vw,36px)" }}>
          <div data-reveal style={{ gridColumn: "1 / span 2", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#948c7c", paddingTop: 12 }}>No. 03<br />Specialty</div>
          <div style={{ gridColumn: "4 / span 9" }}>
            <h2 data-reveal style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(34px,5.4vw,74px)", lineHeight: 1.04, margin: "0 0 34px", color: PAPER }}>The foreign national market — <span style={{ fontStyle: "italic" }}>we place the cases others turn away.</span></h2>
            <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(24px,3vw,44px)", maxWidth: 760 }}>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#b6ad9e", fontWeight: 400, margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market — devising customized sales strategies and wealth-management solutions for international clients.</p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#b6ad9e", fontWeight: 400, margin: 0 }}>Open architecture. A variety of products and services to suit each client — always within carrier, state and federal guidelines.</p>
            </div>
            <a data-reveal href="#contact" className={`${styles.cta} ${styles.ctaInverse}`} style={{ display: "inline-block", marginTop: 40, padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Speak with a specialist</a>
          </div>
        </div>
      </div>

      {/* PRODUCTS — catalogue index */}
      <div id="products" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ borderTop: `1px solid ${INK}`, paddingTop: 18, marginBottom: "clamp(40px,5vw,64px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={label}>No. 04 — Products</span>
            <span style={label}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "clamp(64px,8vw,110px) 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "baseline", padding: "26px 2px", borderBottom: HAIR }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", color: MUTED, fontSize: 17 }}>{p.n}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(26px,3.6vw,48px)", fontWeight: 400, color: INK, letterSpacing: "-0.01em" }}>{p.name}</span>
                <span style={{ fontSize: 13, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
          <div data-reveal style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "10px clamp(20px,2.6vw,36px)" }}>
            <span style={label}>Carriers —</span>
            {CARRIERS.map((c) => (
              <span key={c} style={{ fontSize: 13, color: "#8d8577", letterSpacing: "0.02em" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT — oversized sign-off */}
      <div id="contact" style={{ padding: "0 clamp(20px,5vw,60px) clamp(80px,11vw,150px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: `1px solid ${INK}`, paddingTop: "clamp(44px,6vw,80px)" }}>
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(44px,8vw,120px)", lineHeight: 1, margin: "0 0 clamp(36px,5vw,60px)", color: INK, letterSpacing: "-0.015em" }}>Let&rsquo;s write more <span style={{ fontStyle: "italic" }}>business.</span></h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
            <div>
              <div style={{ ...label, marginBottom: 14 }}>Telephone</div>
              <a href="tel:+13054447401" className={styles.lnk} style={{ fontFamily: serif, fontSize: "clamp(22px,2.4vw,30px)", color: INK }}>305-444-7401</a>
              <div style={{ fontSize: 13.5, color: MUTED, marginTop: 8 }}>Toll-free 1-888-776-4678</div>
            </div>
            <div>
              <div style={{ ...label, marginBottom: 14 }}>Office</div>
              <div style={{ fontFamily: serif, fontSize: "clamp(19px,1.9vw,24px)", color: INK, lineHeight: 1.4 }}>75 Valencia Avenue, Suite 200<br />Coral Gables, FL 33134</div>
            </div>
            <div>
              <div style={{ ...label, marginBottom: 14 }}>Response</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED, margin: "0 0 22px" }}>A brokerage director responds within one business day.</p>
              <a href="#contact" className={styles.cta} style={{ display: "inline-block", padding: "14px 32px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Partner with us</a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "32px clamp(20px,5vw,60px)", borderTop: HAIR, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 21 }} />
        <div style={{ fontSize: 12, color: MUTED }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
