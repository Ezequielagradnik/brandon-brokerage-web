"use client";

import { useRef } from "react";
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
  { name: "Term Life", desc: "Income & mortgage protection", tag: "Life" },
  { name: "Permanent Life", desc: "Whole, universal & IUL", tag: "Life" },
  { name: "Annuities", desc: "Fixed & indexed income", tag: "Retirement" },
  { name: "Long-Term Care", desc: "Traditional & hybrid", tag: "Care" },
  { name: "Disability Income", desc: "Protect earning power", tag: "Income" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

export default function ConceptA() {
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
      <div className={styles.headerBar} style={{ position: "sticky", top: 0, zIndex: 60, padding: "18px clamp(20px,5vw,60px)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #eceef2" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 28 }} /></a>
        <div className={styles.headerNav}>
          <a href="#why" className={styles.nl}>Firm</a>
          <a href="#foreign" className={styles.nl}>Foreign National</a>
          <a href="#products" className={styles.nl}>Products</a>
          <a href="#contact" className={styles.nl}>Contact</a>
          <a href="#contact" className={`${styles.cta} ${styles.ctaPrimary}`} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13.5 }}>Partner With Us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner With Us"
          ctaHref="#contact"
          panelBg="#ffffff"
          textColor="#12294a"
          accentColor="#d97706"
        />
      </div>

      {/* HERO */}
      <div id="top" style={{ padding: "clamp(56px,8vw,110px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)", background: "linear-gradient(180deg,#f8f9fb,#fff)" }}>
        <div className={styles.heroGrid} style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div>
            <div ref={heroKicker} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fdf1e0", border: "1px solid #f3dcb2", borderRadius: 999, padding: "7px 16px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#d97706" }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#92450b", letterSpacing: "0.03em" }}>Coral Gables · Serving advisors since the 1970s</span>
            </div>
            <h1 ref={heroTitle} style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(34px,4.4vw,56px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 24px", color: "#0e1c33" }}>
              Partnering with producers and financial advisors to deliver customized business solutions with seamless execution.
            </h1>
            <p ref={heroSub} style={{ fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.65, color: "#4b5769", fontWeight: 400, maxWidth: 540, margin: "0 0 36px" }}>
              For over fifty years, Brandon Brokerage Group has paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.
            </p>
            <div ref={heroCta} style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={`${styles.cta} ${styles.ctaPrimary}`} style={{ padding: "14px 28px", borderRadius: 9, fontSize: 15 }}>Partner with us</a>
              <a href="#products" className={`${styles.cta} ${styles.ctaGhost}`} style={{ padding: "14px 28px", borderRadius: 9, fontSize: 15 }}>Explore products</a>
            </div>
          </div>

          <div className={styles.heroCards}>
            <div className={`${styles.floatCard} ${styles.heroPhoto}`} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 70px rgba(15,23,42,0.16)", animationDelay: "0s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-aerial-day.jpg" alt="Miami skyline" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(14,28,51,0.04),rgba(14,28,51,0.22))" }} />
            </div>

            <div className={`${styles.card} ${styles.floatCard} ${styles.heroCardBL}`} style={{ padding: "20px 22px", animationDelay: "0.18s" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#8a94a6", marginBottom: 12 }}>Book of business</div>
              <div style={{ display: "flex", gap: 22 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: 26, color: "#0e1c33" }}>50<span style={{ color: "#d97706" }}>+</span></div>
                  <div style={{ fontSize: 11.5, color: "#6b7688" }}>Years</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: 26, color: "#0e1c33" }}>30<span style={{ color: "#d97706" }}>+</span></div>
                  <div style={{ fontSize: 11.5, color: "#6b7688" }}>Carriers</div>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", alignItems: "flex-end", gap: 5, height: 40 }}>
                {[38, 58, 46, 70, 52, 84, 64].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i === 5 ? "#d97706" : "#e7ecf3" }} />
                ))}
              </div>
            </div>

            <div className={`${styles.card} ${styles.floatCard} ${styles.heroCardTR}`} style={{ padding: "13px 16px", display: "flex", alignItems: "center", gap: 10, animationDelay: "0.34s" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#e7f6ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 26 26" fill="none" stroke="#1a8a4c" strokeWidth="2.2"><path d="M6 14l5 5 9-11" /></svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: "#0e1c33" }}>Case approved</div>
                <div style={{ fontSize: 11, color: "#8a94a6" }}>Tellus / Crump network</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div data-reveal style={{ borderTop: "1px solid #eceef2", borderBottom: "1px solid #eceef2", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          <div style={{ padding: "38px clamp(20px,4vw,48px)", borderRight: "1px solid #eceef2" }}><div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: "#0e1c33" }}>50<span style={{ color: "#d97706" }}>+</span></div><div style={{ fontSize: 13, color: "#6b7688", marginTop: 8, fontWeight: 600 }}>Years of expertise</div></div>
          <div style={{ padding: "38px clamp(20px,4vw,48px)", borderRight: "1px solid #eceef2" }}><div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: "#0e1c33" }}>30<span style={{ color: "#d97706" }}>+</span></div><div style={{ fontSize: 13, color: "#6b7688", marginTop: 8, fontWeight: 600 }}>Top-rated carriers</div></div>
          <div style={{ padding: "38px clamp(20px,4vw,48px)", borderRight: "1px solid #eceef2" }}><div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: "#0e1c33" }}>5</div><div style={{ fontSize: 13, color: "#6b7688", marginTop: 8, fontWeight: 600 }}>Product lines</div></div>
          <div style={{ padding: "38px clamp(20px,4vw,48px)" }}><div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: "#d97706" }}>FN</div><div style={{ fontSize: 13, color: "#6b7688", marginTop: 8, fontWeight: 600 }}>Market leader</div></div>
        </div>
      </div>

      {/* WHY / SERVICES */}
      <div id="why" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)", background: "#f8f9fb" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ maxWidth: 640, marginBottom: 44 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#d97706", letterSpacing: "0.04em", marginBottom: 14 }}>WHAT WE OFFER</div>
            <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.4vw,42px)", margin: 0, color: "#0e1c33", lineHeight: 1.15, letterSpacing: "-0.01em" }}>Everything an agent needs, from one desk.</h2>
          </div>
          <div data-reveal className={styles.offerGrid}>
            {OFFERINGS.map((o) => (
              <div key={o.n} className={`${styles.card} ${styles.offerCard}`}>
                <div className={styles.offerImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.title} className={styles.offerImg} />
                  <span className={styles.offerNum}>{o.n}</span>
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <h3 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 18, margin: "0 0 10px", color: "#0e1c33", lineHeight: 1.25 }}>{o.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5c6579", margin: 0 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#12294a", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-sunset.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.28 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#12294a 30%,rgba(18,41,74,0.55) 70%,rgba(18,41,74,0.3))" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 13, fontWeight: 700, color: "#f0b053", letterSpacing: "0.04em", marginBottom: 20 }}>SIGNATURE SPECIALTY</div>
          <h2 data-reveal style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(28px,4.4vw,52px)", lineHeight: 1.14, margin: "0 0 32px", color: "#fff", maxWidth: 780, letterSpacing: "-0.01em" }}>We place the cases others turn away.</h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(28px,4vw,60px)" }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#c3cddc", margin: 0 }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#c3cddc", margin: 0 }}>Our open-architecture approach offers a variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines. <a href="#contact" style={{ color: "#f0b053", fontWeight: 600 }}>Speak with a specialist →</a></p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
            <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.4vw,40px)", margin: 0, color: "#0e1c33" }}>Products</h2>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#d97706" }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal>
            {PRODUCTS.map((p) => (
              <a key={p.name} href="#contact" className={`${styles.card} ${styles.prodRow}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "20px 24px", marginBottom: 12, color: "#0e1c33" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "#92450b", background: "#fdf1e0", padding: "5px 10px", borderRadius: 999 }}>{p.tag}</span>
                  <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 700, fontSize: 18 }}>{p.name}</span>
                </div>
                <span style={{ fontSize: 14, color: "#6b7688" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f8f9fb", borderTop: "1px solid #eceef2" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#8a94a6", letterSpacing: "0.04em", marginBottom: 24 }}>OUR CARRIERS — A LEADING TELLUS / CRUMP FIRM</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CARRIERS.map((c) => (
              <span key={c} className={styles.chip} style={{ fontSize: 14, fontWeight: 600, color: "#3c4658", border: "1px solid #dde2ea", borderRadius: 999, padding: "9px 18px" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "clamp(70px,10vw,120px) clamp(20px,5vw,60px)", background: "#12294a" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f0b053", letterSpacing: "0.04em", marginBottom: 22 }}>GET STARTED</div>
            <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.4vw,50px)", lineHeight: 1.12, margin: "0 0 22px", color: "#fff", letterSpacing: "-0.01em" }}>Let&apos;s write more business, together.</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "#c3cddc", margin: 0, maxWidth: 440 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal className={styles.card} style={{ padding: "8px 28px", background: "#173359", border: "1px solid #274870" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 0", borderBottom: "1px solid #2c4d78" }}><span style={{ fontSize: 12.5, fontWeight: 700, color: "#93a3bc" }}>PHONE</span><span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 0", borderBottom: "1px solid #2c4d78" }}><span style={{ fontSize: 12.5, fontWeight: 700, color: "#93a3bc" }}>TOLL-FREE</span><span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 0" }}><span style={{ fontSize: 12.5, fontWeight: 700, color: "#93a3bc" }}>OFFICE</span><span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 15.5, fontWeight: 700, color: "#fff", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "34px clamp(20px,5vw,60px)", background: "#0e1c33", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,0.94)", borderRadius: 10, padding: "7px 16px", display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 20 }} />
        </div>
        <div style={{ fontSize: 12.5, color: "#7c8aa3" }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
