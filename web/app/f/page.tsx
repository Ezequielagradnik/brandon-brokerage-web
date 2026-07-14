"use client";

import { useEffect, useRef, useState } from "react";
import MobileMenu from "../../components/MobileMenu";
import { OFFERINGS } from "../../lib/offerings";
import { useHeroReveal, useScrollReveal } from "../../hooks/useReveals";
import styles from "./page.module.css";

const NAV_LINKS = [
  { href: "#offer", label: "Firm" },
  { href: "#foreign", label: "Foreign National" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const PRODUCTS = [
  { n: "I", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "II", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "III", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "IV", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "V", name: "Disability Income", desc: "Protect earning power" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

export default function ConceptF() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);
  const heroStats = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta, heroStats]);
  useScrollReveal(pageRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER — transparent over the photograph, ink glass on scroll */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: scrolled ? "14px clamp(20px,5vw,60px)" : "24px clamp(20px,5vw,60px)", background: scrolled ? "rgba(16,13,10,0.88)" : "linear-gradient(180deg, rgba(12,9,6,0.5), transparent)", backdropFilter: scrolled ? "blur(12px)" : "none", WebkitBackdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(207,167,104,0.25)" : "1px solid transparent", transition: "padding 0.28s ease, background 0.28s ease, border-color 0.28s ease" }}>
        <a href="#top" style={{ display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: scrolled ? 24 : 30, transition: "height 0.28s ease" }} />
        </a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <a href="#contact" className={`${styles.cta} ${styles.ctaBronze}`} style={{ padding: "12px 26px", fontSize: 12 }}>Partner With Us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner With Us"
          ctaHref="#contact"
          panelBg="#14100c"
          textColor="#f4ede1"
          accentColor="#cfa768"
        />
      </div>

      {/* HERO — full-bleed photograph */}
      <div id="top" style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", padding: "clamp(120px,14vw,180px) clamp(20px,5vw,60px) clamp(36px,5vw,64px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-palms-sunset.jpg" alt="" className={styles.heroImg} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,9,6,0.55), rgba(12,9,6,0.18) 42%, rgba(12,9,6,0.68) 88%)" }} />
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
            <span style={{ width: 40, height: 1, background: "#cfa768" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#e8d6b4", fontWeight: 600 }}>Coral Gables · Since the 1970s</span>
          </div>
          <h1 ref={heroTitle} className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(34px,4.6vw,64px)", lineHeight: 1.12, letterSpacing: "-0.01em", margin: "0 0 24px", color: "#fdfaf4", maxWidth: 980 }}>
            Partnering with producers and financial advisors to deliver customized business solutions with <em style={{ fontStyle: "italic", color: "#e0bd7f" }}>seamless execution</em>.
          </h1>
          <p ref={heroSub} style={{ fontSize: "clamp(15.5px,1.3vw,18px)", lineHeight: 1.7, color: "rgba(253,250,244,0.85)", fontWeight: 500, maxWidth: 560, margin: "0 0 34px" }}>
            For over fifty years, Brandon Brokerage Group has paired advanced sales support and full case management with access to 30+ top-rated carriers — and a rare command of the foreign national market.
          </p>
          <div ref={heroCta} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: "clamp(40px,6vw,72px)" }}>
            <a href="#contact" className={`${styles.cta} ${styles.ctaBronze}`} style={{ padding: "16px 34px", fontSize: 12.5 }}>Partner With Us</a>
            <a href="#products" className={`${styles.cta} ${styles.ctaLight}`} style={{ padding: "16px 34px", fontSize: 12.5 }}>Explore Products</a>
          </div>
          <div ref={heroStats} className={styles.statStrip}>
            {[["50+", "Years of expertise"], ["30+", "Top-rated carriers"], ["No.1", "Foreign national market"], ["5", "Product lines"]].map(([n, l]) => (
              <div key={l} className={styles.statCell}>
                <div className={styles.serif} style={{ fontSize: "clamp(24px,2.6vw,34px)", fontWeight: 500, color: n === "No.1" ? "#e0bd7f" : "#fdfaf4", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(253,250,244,0.72)", marginTop: 9, fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#a87f4a", fontWeight: 700, marginBottom: 28 }}>Our Mission</div>
          <p data-reveal className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.42, margin: 0, color: "#26211b" }}>
            To provide agents with superior service, personalized sales support and tailored business solutions that <em style={{ fontStyle: "italic", color: "#a87f4a" }}>build and develop long-term relationships</em>.
          </p>
        </div>
      </div>

      {/* WHAT WE OFFER — alternating editorial rows */}
      <div id="offer" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)", borderTop: "1px solid #e2d9c6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: "clamp(52px,7vw,88px)" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#a87f4a", fontWeight: 700, marginBottom: 16 }}>What We Offer</div>
            <h2 className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(30px,3.8vw,48px)", margin: 0, color: "#191613" }}>Everything an agent needs, from one desk.</h2>
          </div>
          {OFFERINGS.map((o, i) => (
            <div key={o.n} data-reveal className={`${styles.offerRow} ${i % 2 === 1 ? styles.offerRowFlip : ""}`}>
              <div className={styles.offerMedia}>
                <div className={styles.offerImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={o.title} className={styles.offerImg} />
                </div>
              </div>
              <div>
                <div className={styles.serif} style={{ fontStyle: "italic", fontSize: 20, color: "#c9a86e", marginBottom: 14 }}>{o.n}</div>
                <h3 className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(24px,2.4vw,32px)", lineHeight: 1.2, margin: "0 0 18px", color: "#191613" }}>{o.title}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#544c40", margin: 0, fontWeight: 500 }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOREIGN NATIONAL — full-bleed night photograph */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-night.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,6,0.72), rgba(10,8,6,0.55) 50%, rgba(10,8,6,0.75))" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#e0bd7f", fontWeight: 700, marginBottom: 26 }}>Signature Specialty</div>
          <h2 data-reveal className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(32px,4.6vw,62px)", lineHeight: 1.1, margin: "0 0 44px", color: "#fdfaf4", maxWidth: 820 }}>
            We place the cases <em style={{ fontStyle: "italic", color: "#e0bd7f" }}>others turn away</em>.
          </h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(28px,4vw,64px)", borderTop: "1px solid rgba(224,189,127,0.35)", paddingTop: 36 }}>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(253,250,244,0.88)", margin: 0, fontWeight: 500 }}>With over 50 years of experience, we are an industry leader in the foreign national market. We help agents devise customized sales strategies and wealth-management solutions for their foreign national clients.</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(253,250,244,0.88)", margin: 0, fontWeight: 500 }}>Our open-architecture approach offers a variety of products and services to best suit your clients&apos; needs — while adhering to all carrier, state and federal guidelines. <a href="#contact" style={{ color: "#e0bd7f", borderBottom: "1px solid rgba(224,189,127,0.5)" }}>Speak with a specialist →</a></p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#a87f4a", fontWeight: 700, marginBottom: 16 }}>Products</div>
              <h2 className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(30px,3.8vw,48px)", margin: 0, color: "#191613" }}>Five lines, one relationship.</h2>
            </div>
            <span style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#877c69", fontWeight: 600 }}>Backed by 30+ carriers</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid #ddd3bf" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prodRow}>
                <span className={styles.serif} style={{ fontStyle: "italic", fontSize: 19, color: "#c9a86e" }}>{p.n}</span>
                <span className={`${styles.serif} ${styles.prodName}`} style={{ fontWeight: 500, fontSize: "clamp(22px,2.6vw,32px)" }}>{p.name}</span>
                <span style={{ fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#877c69", textAlign: "right", fontWeight: 600 }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", borderTop: "1px solid #e2d9c6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#877c69", fontWeight: 700, marginBottom: 32, textAlign: "center" }}>Our carriers — a leading Tellus / Crump firm</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}>
            <div className={styles.marquee}>
              {[0, 1].map((rep) => (
                <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(28px,3.6vw,56px)", paddingRight: "clamp(28px,3.6vw,56px)" }} aria-hidden={rep === 1}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", gap: "clamp(28px,3.6vw,56px)", whiteSpace: "nowrap" }}>
                      <span className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(18px,1.9vw,26px)", color: "#8d8270" }}>{c}</span>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c9a86e" }} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ position: "relative", padding: "clamp(76px,10vw,130px) clamp(20px,5vw,60px)", background: "#14100c", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,110,0.14), transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#e0bd7f", fontWeight: 700, marginBottom: 24 }}>Get Started</div>
            <h2 className={styles.serif} style={{ fontWeight: 500, fontSize: "clamp(30px,4.4vw,54px)", lineHeight: 1.12, margin: "0 0 24px", color: "#fdfaf4" }}>Let&apos;s write more business, <em style={{ fontStyle: "italic", color: "#e0bd7f" }}>together</em>.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(253,250,244,0.72)", margin: 0, maxWidth: 460, fontWeight: 500 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          </div>
          <div data-reveal style={{ border: "1px solid rgba(201,168,110,0.35)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 26px", borderBottom: "1px solid rgba(201,168,110,0.25)" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(253,250,244,0.55)", fontWeight: 700 }}>Phone</span>
              <span className={styles.serif} style={{ fontSize: 22, fontWeight: 500, color: "#fdfaf4" }}>305-444-7401</span>
            </a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 26px", borderBottom: "1px solid rgba(201,168,110,0.25)" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(253,250,244,0.55)", fontWeight: 700 }}>Toll-Free</span>
              <span className={styles.serif} style={{ fontSize: 22, fontWeight: 500, color: "#fdfaf4" }}>1-888-776-4678</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 26px" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(253,250,244,0.55)", fontWeight: 700 }}>Office</span>
              <span className={styles.serif} style={{ fontSize: 16.5, fontWeight: 500, color: "#fdfaf4", textAlign: "right", lineHeight: 1.45 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#f6f2ea", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px) 0", borderTop: "1px solid #e2d9c6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={styles.footerGrid}>
            <div>
              <div style={{ display: "inline-flex", marginBottom: 18 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 30 }} />
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#877c69", margin: 0, maxWidth: 280, fontWeight: 500 }}>A leading Tellus / Crump firm serving producers and financial advisors since the 1970s.</p>
            </div>

            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a87f4a", fontWeight: 700, marginBottom: 16 }}>Company</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className={styles.footLink} style={{ fontSize: 14, color: "#544c40", fontWeight: 600 }}>{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a87f4a", fontWeight: 700, marginBottom: 16 }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#544c40", fontWeight: 600 }}>
                <a href="tel:+13054447401" className={styles.footLink} style={{ color: "#544c40" }}>305-444-7401</a>
                <a href="tel:+18887764678" className={styles.footLink} style={{ color: "#544c40" }}>1-888-776-4678</a>
                <span style={{ color: "#877c69", lineHeight: 1.5, fontWeight: 500 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a87f4a", fontWeight: 700, marginBottom: 16 }}>Get started</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#877c69", margin: "0 0 16px", fontWeight: 500 }}>A brokerage director responds within one business day.</p>
              <a href="#contact" className={`${styles.cta} ${styles.ctaBronze}`} style={{ display: "inline-block", padding: "12px 24px", fontSize: 11.5 }}>Partner With Us</a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #e2d9c6", marginTop: "clamp(40px,5vw,56px)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 12, color: "#877c69", fontWeight: 600 }}>© 1970s–2026 Brandon Brokerage Group. All rights reserved.</div>
            <div style={{ fontSize: 12, color: "#877c69", fontWeight: 600 }}>For licensed agents &amp; advisors only</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
