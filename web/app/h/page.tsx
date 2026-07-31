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
  { n: "I", name: "Term Life", desc: "Income & mortgage protection" },
  { n: "II", name: "Permanent Life", desc: "Whole, universal & IUL" },
  { n: "III", name: "Annuities", desc: "Fixed & indexed income" },
  { n: "IV", name: "Long-Term Care", desc: "Traditional & hybrid" },
  { n: "V", name: "Disability Income", desc: "Protect earning power" },
];

const ROMANS = ["I", "II", "III", "IV"];

const BG = "#0b1420";
const BG2 = "#0e1926";
const CHAMPAGNE = "#e9dfc8";
const GOLD = "#c3a15f";
const GOLD_BRIGHT = "#e0c489";
const MUTED = "#9aa5b4";
const HAIR = "1px solid rgba(195,161,95,0.22)";

export default function ConceptH() {
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
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: 28 }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.slice(0, 3).map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <a href="#contact" className={styles.cta} style={{ padding: "11px 24px", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>Private inquiry</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Private inquiry"
          ctaHref="#contact"
          panelBg={BG}
          textColor={CHAMPAGNE}
          accentColor={GOLD}
        />
      </div>

      {/* HERO — centered, moody Miami night */}
      <div id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px clamp(20px,5vw,60px) 100px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/miami-night.jpg" alt="" className={styles.kenburns} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 30%, rgba(11,20,32,0.2), rgba(11,20,32,0.94) 78%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900 }}>
          <div ref={heroKicker} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginBottom: 36 }}>
            <svg width="82" height="82" viewBox="0 0 82 82" aria-hidden="true">
              <circle cx="41" cy="41" r="39.5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.75" />
              <circle cx="41" cy="41" r="33" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.55" />
              <text x="41" y="52" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontSize="34" fill={GOLD_BRIGHT}>B</text>
              <text x="41" y="12.5" textAnchor="middle" fontSize="7" fill={GOLD}>◆</text>
              <text x="41" y="76.5" textAnchor="middle" fontSize="7" fill={GOLD}>◆</text>
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ width: 44, height: 1, background: GOLD }} />
              <span style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD_BRIGHT }}>Est. the 1970s · Coral Gables</span>
              <span style={{ width: 44, height: 1, background: GOLD }} />
            </div>
          </div>
          <h1 ref={heroTitle} style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(42px,6.6vw,92px)", lineHeight: 1.04, margin: "0 0 32px", color: CHAMPAGNE, letterSpacing: "0.005em" }}>The quiet partner behind <span style={{ fontStyle: "italic", color: GOLD_BRIGHT }}>extraordinary</span> cases.</h1>
          <p ref={heroSub} style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.75, color: MUTED, fontWeight: 400, maxWidth: 620, margin: "0 auto 44px" }}>Advanced sales support, full case management and 30+ top-rated carriers — placed at the service of producers and financial advisors for over fifty years.</p>
          <div ref={heroCta} style={{ display: "flex", gap: 26, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" className={styles.cta} style={{ padding: "17px 40px", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}>Partner with us</a>
            <a href="#firm" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>Discover the firm</a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ width: 1, height: 44, background: `linear-gradient(${GOLD},transparent)` }} />
        </div>
      </div>

      {/* STATS — centered hairline band */}
      <div data-reveal style={{ borderTop: HAIR, borderBottom: HAIR, background: BG2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}>
          {[["50+", "Years of expertise"], ["30+", "Top-rated carriers"], ["5", "Product lines"], ["FN", "Market leadership"]].map(([v, l], i) => (
            <div key={l} style={{ padding: "42px clamp(16px,3vw,40px)", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(195,161,95,0.14)" : "none" }}>
              <div style={{ fontFamily: serif, fontSize: "clamp(36px,4vw,54px)", fontWeight: 500, color: GOLD_BRIGHT, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginTop: 14 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION — centered manifesto */}
      <div style={{ padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 34 }}>
            <span style={{ width: 60, height: 1, background: "rgba(195,161,95,0.4)" }} />
            <span style={{ color: GOLD, fontSize: 9 }}>◆</span>
            <span style={{ width: 60, height: 1, background: "rgba(195,161,95,0.4)" }} />
          </div>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD, marginBottom: 38 }}>Our mission</div>
          <p data-reveal style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(26px,3.4vw,42px)", lineHeight: 1.4, margin: 0, color: CHAMPAGNE }}>Superior service, personalized sales support and tailored business solutions — devoted to <span style={{ fontStyle: "italic", color: GOLD_BRIGHT }}>long-term relationships</span>.</p>
        </div>
      </div>

      {/* THE FIRM — roman numeral rows */}
      <div id="firm" style={{ padding: "0 clamp(20px,5vw,60px) clamp(80px,11vw,150px)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,70px)" }}>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,4.4vw,56px)", margin: 0, color: CHAMPAGNE }}>What we offer.</h2>
          </div>
          <div data-reveal style={{ borderTop: HAIR }}>
            {OFFERINGS.map((o, i) => (
              <div key={o.n} className={styles.offRow} style={{ display: "grid", gridTemplateColumns: "clamp(56px,8vw,110px) 1fr", gap: "clamp(16px,3vw,44px)", padding: "clamp(30px,4vw,48px) 8px", borderBottom: HAIR, alignItems: "start" }}>
                <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(26px,3vw,40px)", color: GOLD, lineHeight: 1 }}>{ROMANS[i]}.</div>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(22px,2.4vw,30px)", margin: "0 0 12px", color: CHAMPAGNE, lineHeight: 1.2 }}>{o.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: 0, maxWidth: 680 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — full-bleed sunset band */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(100px,14vw,190px) clamp(20px,5vw,60px)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/miami-sunset.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,20,32,0.96) 20%, rgba(11,20,32,0.55) 65%, rgba(11,20,32,0.85))" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD_BRIGHT, marginBottom: 32 }}>Signature specialty</div>
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px,5.4vw,70px)", lineHeight: 1.06, margin: "0 0 34px", color: CHAMPAGNE, maxWidth: 720 }}>We place the cases <span style={{ fontStyle: "italic", color: GOLD_BRIGHT }}>others turn away</span>.</h2>
          <p data-reveal style={{ fontSize: "clamp(15.5px,1.4vw,18px)", lineHeight: 1.8, color: "#c4ccd8", fontWeight: 400, margin: "0 0 34px", maxWidth: 560 }}>An industry leader in the foreign national market for over five decades. Customized sales strategies and wealth-management solutions for your international clients — fully within carrier, state and federal guidelines.</p>
          <a data-reveal href="#contact" className={styles.cta} style={{ display: "inline-block", padding: "16px 36px", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Speak with a specialist</a>
        </div>
      </div>

      {/* PRODUCTS — roman numeral ledger */}
      <div id="products" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: BG2, borderTop: HAIR }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,64px)" }}>
            <div style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD, marginBottom: 22 }}>The collection</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,4.4vw,56px)", margin: 0, color: CHAMPAGNE }}>Products</h2>
          </div>
          <div data-reveal style={{ borderTop: HAIR }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "30px 8px", borderBottom: HAIR }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", color: GOLD, fontSize: 20 }}>{p.n}.</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 500, color: CHAMPAGNE }}>{p.name}</span>
                <span style={{ fontSize: 13.5, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS MARQUEE */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) 0", borderTop: HAIR }}>
        <div style={{ fontSize: 11.5, letterSpacing: "0.32em", textTransform: "uppercase", color: MUTED, marginBottom: 36, textAlign: "center" }}>Our carriers — a leading Tellus / Crump firm</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
          <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)", fontFamily: serif, fontSize: "clamp(19px,2vw,27px)", color: "#7d8898", whiteSpace: "nowrap" }}>
            {[0, 1].map((rep) => (
              <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)" }}>
                {CARRIERS.map((c) => (
                  <span key={c} style={{ display: "flex", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)" }}>
                    <span>{c}</span><span style={{ color: GOLD, fontSize: 12 }}>◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT — centered, engraved card feel */}
      <div id="contact" style={{ padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)", textAlign: "center", borderTop: HAIR }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD, marginBottom: 32 }}>Private inquiry</div>
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(36px,5.4vw,68px)", lineHeight: 1.05, margin: "0 0 26px", color: CHAMPAGNE }}>Let&apos;s write more business, <span style={{ fontStyle: "italic", color: GOLD_BRIGHT }}>together</span>.</h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 auto 44px", maxWidth: 480 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          <div data-reveal style={{ position: "relative", display: "inline-block", border: HAIR, padding: "clamp(32px,4vw,48px) clamp(28px,6vw,72px)" }}>
            <span style={{ position: "absolute", top: -1, left: -1, width: 20, height: 20, borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            <span style={{ position: "absolute", top: -1, right: -1, width: 20, height: 20, borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
            <span style={{ position: "absolute", bottom: -1, left: -1, width: 20, height: 20, borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            <span style={{ position: "absolute", bottom: -1, right: -1, width: 20, height: 20, borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
            <a href="tel:+13054447401" style={{ display: "block", fontFamily: serif, fontSize: "clamp(26px,3.4vw,40px)", color: GOLD_BRIGHT, marginBottom: 14 }}>305-444-7401</a>
            <div style={{ fontSize: 13, letterSpacing: "0.08em", color: MUTED, lineHeight: 1.8 }}>Toll-free 1-888-776-4678<br />75 Valencia Avenue, Suite 200 · Coral Gables, FL 33134</div>
            <a href="#contact" className={styles.cta} style={{ display: "inline-block", marginTop: 30, padding: "15px 36px", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Partner with us</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "40px clamp(20px,5vw,60px)", borderTop: HAIR, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: 22, opacity: 0.85 }} />
        <div style={{ fontSize: 12, color: "#6c7686" }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
