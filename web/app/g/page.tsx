"use client";

import { useRef } from "react";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#firm", label: "The Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

const PRODUCTS = [
  { n: "01", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "02", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "03", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "04", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "05", name: "Disability Income", desc: "Protect earning power" },
];

const NAVY = "#14263f";
const INK = "#1c2635";
const MUTED = "#5a6779";
const BRONZE = "#9d7c3a";
const HAIR = "1px solid rgba(20,38,63,0.12)";

export default function ConceptG() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);
  useScrollReveal(pageRef);

  const serif = "var(--font-cormorant), serif";

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: "18px clamp(20px,5vw,60px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 28 }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <a href="#contact" className={styles.cta} style={{ padding: "11px 24px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Contact</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Contact"
          ctaHref="#contact"
          panelBg="#fdfdfb"
          textColor={NAVY}
          accentColor={NAVY}
        />
      </div>

      {/* HERO — quiet, white, bblatam-style */}
      <div id="top" style={{ padding: "clamp(150px,20vh,220px) clamp(20px,5vw,60px) clamp(56px,7vw,90px)", background: "#fdfdfb" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
            <span style={{ width: 40, height: 1, background: BRONZE }} />
            <span style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: MUTED }}>Life brokerage · Coral Gables, Florida</span>
          </div>
          <h1 ref={heroTitle} style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(44px,7vw,96px)", lineHeight: 1.02, margin: "0 0 34px", color: NAVY, letterSpacing: "-0.01em", maxWidth: 980 }}>Five decades of placing business, <span style={{ fontStyle: "italic", color: BRONZE }}>seamlessly</span>.</h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
            <p ref={heroSub} style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.7, color: MUTED, fontWeight: 400, maxWidth: 560, margin: 0 }}>Brandon Brokerage Group partners with producers and financial advisors to deliver customized business solutions — advanced sales support, full case management and access to 30+ top-rated carriers.</p>
            <div ref={heroCta} style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={styles.cta} style={{ padding: "16px 34px", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Partner with us</a>
              <a href="#solutions" className={styles.lnk} style={{ fontSize: 14, color: NAVY }}>Our solutions</a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO IMAGE — full width, gallery-matted */}
      <div data-reveal style={{ padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(10px,1.3vw,16px)", border: "1px solid rgba(20,38,63,0.16)", background: "#fff" }}>
          <div style={{ height: "clamp(280px,48vh,540px)", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/miami-aerial-day.jpg" alt="Coral Gables, Florida" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.6) contrast(0.95) brightness(1.02)" }} />
          </div>
        </div>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 2px 0", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED }}>Coral Gables, Florida</span>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED }}>Serving agents nationwide</span>
        </div>
      </div>

      {/* STATS — hairline row */}
      <div data-reveal style={{ padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {[["50+", "Years of expertise"], ["30+", "Top-rated carriers"], ["5", "Product lines"], ["Nationwide", "Tellus / Crump firm"]].map(([v, l]) => (
            <div key={l} style={{ borderTop: `1px solid ${BRONZE}`, paddingTop: 20 }}>
              <div style={{ fontFamily: serif, fontSize: "clamp(32px,3.4vw,46px)", fontWeight: 500, color: NAVY, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginTop: 12 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SOLUTIONS — photo card grid, the bblatam signature */}
      <div id="solutions" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fdfdfb" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "clamp(40px,5vw,64px)", maxWidth: 640 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: BRONZE, marginBottom: 22 }}>Solutions</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,4.6vw,58px)", lineHeight: 1.08, margin: 0, color: NAVY }}>Everything behind the case you write.</h2>
          </div>
          <div data-reveal className={styles.solGrid}>
            {OFFERINGS.map((o) => (
              <a key={o.n} href="#contact" className={styles.solCard}>
                <div className={styles.solImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.title} className={styles.solImg} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.2em", color: BRONZE }}>{o.n}</span>
                  <span style={{ flex: 1, height: 1, background: "rgba(20,38,63,0.14)" }} />
                </div>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 24, margin: "0 0 10px", color: NAVY, lineHeight: 1.15 }}>{o.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.66, color: MUTED, fontWeight: 400, margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{o.desc}</p>
                <span className={styles.solMore} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: NAVY }}>Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FIRM — mission & vision, two column like bblatam philosophy */}
      <div id="firm" style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#f6f5f0", borderTop: HAIR, borderBottom: HAIR }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)" }}>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: BRONZE, marginBottom: 26 }}>Our mission</div>
            <p style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.42, margin: 0, color: INK }}>To provide agents with superior service, personalized sales support and tailored business solutions that build long-term relationships.</p>
          </div>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: BRONZE, marginBottom: 26 }}>Our approach</div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: 0 }}>Open architecture, individualized attention and an exceptional standard of quality. From case design to policy delivery, one dedicated team follows every application — so you can stay in front of your clients, not behind paperwork.</p>
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — quiet photo split */}
      <div id="foreign" style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#fdfdfb" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal style={{ height: "clamp(300px,42vw,520px)", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/globe-gold.jpg" alt="Foreign national market" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.7)" }} />
          </div>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: BRONZE, marginBottom: 24 }}>Signature specialty</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.08, margin: "0 0 26px", color: NAVY }}>The foreign national market, <span style={{ fontStyle: "italic", color: BRONZE }}>mastered</span>.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 18px" }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 30px" }}>A variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines.</p>
            <a href="#contact" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: NAVY }}>Speak with a specialist</a>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#f6f5f0", borderTop: HAIR }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,4.6vw,58px)", margin: 0, color: NAVY }}>Products</h2>
            <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(20,38,63,0.2)" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "52px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "30px 4px", borderBottom: HAIR }}>
                <span style={{ fontSize: 12, letterSpacing: "0.1em", color: BRONZE }}>{p.n}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 500, color: NAVY }}>{p.name}</span>
                <span style={{ fontSize: 13.5, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* PULL QUOTE — quiet manifesto band */}
      <div style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#fdfdfb", textAlign: "center" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div data-reveal style={{ width: 44, height: 1, background: BRONZE, margin: "0 auto 36px" }} />
          <p data-reveal style={{ fontFamily: serif, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.4, margin: 0, color: NAVY }}>Individualized attention and an exceptional standard of quality — behind every case you write.</p>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, marginTop: 32 }}>The Brandon standard</div>
        </div>
      </div>

      {/* CARRIERS — quiet grid, no marquee */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#fdfdfb" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, marginBottom: 34 }}>Our carriers — a leading Tellus / Crump firm</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px clamp(28px,3.4vw,52px)" }}>
            {CARRIERS.map((c) => (
              <span key={c} className={styles.carrierCell} style={{ fontFamily: serif, fontSize: "clamp(18px,1.8vw,24px)", color: "#98a0ad" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT — navy band */}
      <div id="contact" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: NAVY }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c8ab6e", marginBottom: 26 }}>Get started</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px,5vw,64px)", lineHeight: 1.05, margin: "0 0 24px", color: "#fdfdfb" }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#aab7c9", fontWeight: 400, margin: 0, maxWidth: 440 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal>
            {[["Phone", "305-444-7401", "tel:+13054447401"], ["Toll-Free", "1-888-776-4678", "tel:+18887764678"]].map(([l, v, href]) => (
              <a key={l} href={href} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0", borderBottom: "1px solid rgba(253,253,251,0.16)", color: "#fdfdfb" }}>
                <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8b9bb2" }}>{l}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(20px,2.4vw,28px)" }}>{v}</span>
              </a>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0", borderBottom: "1px solid rgba(253,253,251,0.16)" }}>
              <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8b9bb2" }}>Office</span>
              <span style={{ fontFamily: serif, fontSize: "clamp(16px,1.7vw,20px)", color: "#fdfdfb", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "36px clamp(20px,5vw,60px)", background: "#fdfdfb", borderTop: HAIR, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 22 }} />
        <div style={{ fontSize: 12, color: MUTED }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
