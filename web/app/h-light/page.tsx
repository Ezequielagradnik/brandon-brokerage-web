"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import { ScrollProgress, WordsReveal, FadeIn, CountUp, Magnetic, ctaFillFromCursor, EASE } from "@/components/motion";
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

// Light (ivory) variant of /h — same copy and structure, daylight palette.
const BG2 = "#ece7db";
const NAVY = "#12294a";
const GOLD = "#a9812f";
const GOLD_DEEP = "#9a7526";
const MUTED = "#6b7482";
const HAIR = "1px solid rgba(169,129,47,0.35)";

export default function ConceptHLight() {
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  const serif = "var(--font-cormorant), serif";

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: "18px clamp(20px,5vw,60px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 28 }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.slice(0, 3).map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ padding: "11px 24px", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>Partner with us</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Partner with us"
          ctaHref="#contact"
          panelBg="#f3efe6"
          textColor={NAVY}
          accentColor={GOLD}
        />
      </div>

      {/* HERO — centered, daylight palms */}
      <div id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px clamp(20px,5vw,60px) 100px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <motion.img
            src="/images/miami-palms-sunset.jpg"
            alt=""
            data-photo-slot="hero"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ opacity: 0, scale: 1.14 }}
            animate={{ opacity: 0.35, scale: [1.14, 1] }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
          />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 30%, rgba(243,239,230,0.35), rgba(243,239,230,0.96) 78%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginBottom: 36 }}>
            <motion.svg
              width="82" height="82" viewBox="0 0 82 82" aria-hidden="true"
              initial={{ opacity: 0, rotate: -18, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <motion.circle cx="41" cy="41" r="39.5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.75" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }} />
              <motion.circle cx="41" cy="41" r="33" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.55" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }} />
              <motion.text x="41" y="52" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontSize="34" fill={GOLD_DEEP} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.1 }}>B</motion.text>
              <motion.text x="41" y="12.5" textAnchor="middle" fontSize="7" fill={GOLD} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}>◆</motion.text>
              <motion.text x="41" y="76.5" textAnchor="middle" fontSize="7" fill={GOLD} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}>◆</motion.text>
            </motion.svg>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.5, ease: EASE }} style={{ width: 44, height: 1, background: GOLD, transformOrigin: "100% 50%" }} />
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.7em" }}
                animate={{ opacity: 1, letterSpacing: "0.42em" }}
                transition={{ duration: 1.5, delay: 0.4, ease: EASE }}
                style={{ fontSize: 11.5, textTransform: "uppercase", color: GOLD_DEEP }}
              >Est. the 1970s · Coral Gables</motion.span>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.5, ease: EASE }} style={{ width: 44, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
            </div>
          </div>
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(42px,6.6vw,92px)", lineHeight: 1.08, margin: "0 0 32px", color: NAVY, letterSpacing: "0.005em" }}>
            <WordsReveal
              delay={0.6}
              segments={[
                { text: "The quiet partner behind" },
                { text: "extraordinary", style: { fontStyle: "italic", color: GOLD_DEEP } },
                { text: "cases." },
              ]}
            />
          </h1>
          <FadeIn delay={1.25}>
            <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.75, color: MUTED, fontWeight: 400, maxWidth: 620, margin: "0 auto 44px" }}>Advanced sales support, full case management and 30+ top-rated carriers — placed at the service of producers and financial advisors for over fifty years.</p>
          </FadeIn>
          <FadeIn delay={1.45} style={{ display: "flex", gap: 26, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "17px 40px", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}>Partner with us</a>
            </Magnetic>
            <a href="#firm" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED }}>Discover the firm</a>
          </FadeIn>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ width: 1, height: 44, background: `linear-gradient(${GOLD},transparent)` }} />
        </div>
      </div>

      {/* STATS — centered hairline band */}
      <div data-reveal style={{ borderTop: HAIR, borderBottom: HAIR, background: BG2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}>
          {[
            { num: 50, suffix: "+", label: "Years of expertise" },
            { num: 30, suffix: "+", label: "Top-rated carriers" },
            { num: 5, suffix: "", label: "Product lines" },
            { num: null, text: "FN", label: "Market leadership" },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: "42px clamp(16px,3vw,40px)", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(169,129,47,0.25)" : "none" }}>
              <div style={{ fontFamily: serif, fontSize: "clamp(36px,4vw,54px)", fontWeight: 500, color: NAVY, lineHeight: 1 }}>
                {s.num !== null ? <CountUp to={s.num} suffix={s.suffix} /> : s.text}
              </div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, marginTop: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION — centered manifesto */}
      <div style={{ padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 34 }}>
            <span style={{ width: 60, height: 1, background: "rgba(169,129,47,0.4)" }} />
            <span style={{ color: GOLD, fontSize: 9 }}>◆</span>
            <span style={{ width: 60, height: 1, background: "rgba(169,129,47,0.4)" }} />
          </div>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 38 }}>Our mission</div>
          <p data-reveal style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(26px,3.4vw,42px)", lineHeight: 1.4, margin: 0, color: NAVY }}>Superior service, personalized sales support and tailored business solutions — devoted to <span style={{ fontStyle: "italic", color: GOLD_DEEP }}>long-term relationships</span>.</p>
        </div>
      </div>

      {/* THE FIRM — roman numeral rows */}
      <div id="firm" style={{ padding: "0 clamp(20px,5vw,60px) clamp(80px,11vw,150px)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,70px)" }}>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,4.4vw,56px)", margin: 0, color: NAVY }}>What we offer.</h2>
          </div>
          <div data-reveal style={{ borderTop: HAIR }}>
            {OFFERINGS.map((o, i) => (
              <div key={o.n} className={styles.offRow} style={{ display: "grid", gridTemplateColumns: "clamp(56px,8vw,110px) 1fr", gap: "clamp(16px,3vw,44px)", padding: "clamp(30px,4vw,48px) 8px", borderBottom: HAIR, alignItems: "start" }}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.18, ease: EASE }}
                  style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(26px,3vw,40px)", color: GOLD, lineHeight: 1 }}
                >{ROMANS[i]}.</motion.div>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(22px,2.4vw,30px)", margin: "0 0 12px", color: NAVY, lineHeight: 1.2 }}>{o.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 12px", maxWidth: 680 }}>{o.blurb}</p>
                  <a href="#contact" className={styles.lnk} style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD_DEEP }}>Learn more</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — light band over sunset */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(100px,14vw,190px) clamp(20px,5vw,60px)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/miami-sunset.jpg" alt="" data-photo-slot="foreign-national" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(243,239,230,0.97) 20%, rgba(243,239,230,0.75) 65%, rgba(243,239,230,0.9))" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 32 }}>Signature specialty</div>
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px,5.4vw,70px)", lineHeight: 1.06, margin: "0 0 34px", color: NAVY, maxWidth: 720 }}>We place the cases <span style={{ fontStyle: "italic", color: GOLD_DEEP }}>others turn away</span>.</h2>
          <p data-reveal style={{ fontSize: "clamp(15.5px,1.4vw,18px)", lineHeight: 1.8, color: "#4a5568", fontWeight: 400, margin: "0 0 34px", maxWidth: 560 }}>An industry leader in the foreign national market for over five decades. Customized sales strategies and wealth-management solutions for your international clients — fully within carrier, state and federal guidelines.</p>
          <a data-reveal href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 36px", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Partner with us</a>
        </div>
      </div>

      {/* PRODUCTS — roman numeral ledger */}
      <div id="products" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: BG2, borderTop: HAIR }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,64px)" }}>
            <div style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 22 }}>The collection</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,4.4vw,56px)", margin: 0, color: NAVY }}>Products</h2>
          </div>
          <div data-reveal style={{ borderTop: HAIR }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prod} style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "center", padding: "30px 8px", borderBottom: HAIR }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", color: GOLD, fontSize: 20 }}>{p.n}.</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 500, color: NAVY }}>{p.name}</span>
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
          <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)", fontFamily: serif, fontSize: "clamp(19px,2vw,27px)", color: "#9aa2b0", whiteSpace: "nowrap" }}>
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
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.42em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 32 }}>Contact</div>
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(36px,5.4vw,68px)", lineHeight: 1.05, margin: "0 0 26px", color: NAVY }}>Let&apos;s write more business, <span style={{ fontStyle: "italic", color: GOLD_DEEP }}>together</span>.</h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 auto 44px", maxWidth: 480 }}>Tell us about your case or your book of business. A brokerage director responds within one business day.</p>
          <div data-reveal style={{ position: "relative", display: "inline-block", border: HAIR, padding: "clamp(32px,4vw,48px) clamp(28px,6vw,72px)", background: "#f7f3ea" }}>
            {([
              { top: -1, left: -1, borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` },
              { top: -1, right: -1, borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` },
              { bottom: -1, left: -1, borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` },
              { bottom: -1, right: -1, borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` },
            ] as const).map((corner, i) => (
              <motion.span
                key={i}
                style={{ position: "absolute", width: 20, height: 20, ...corner }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 + i * 0.12 }}
              />
            ))}
            <a href="tel:+13054447401" style={{ display: "block", fontFamily: serif, fontSize: "clamp(26px,3.4vw,40px)", color: GOLD_DEEP, marginBottom: 14 }}>305-444-7401</a>
            <div style={{ fontSize: 13, letterSpacing: "0.08em", color: MUTED, lineHeight: 1.8 }}>Toll-free 1-888-776-4678<br />75 Valencia Avenue, Suite 200 · Coral Gables, FL 33134</div>
            <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", marginTop: 30, padding: "15px 36px", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Partner with us</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "40px clamp(20px,5vw,60px)", borderTop: HAIR, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 22 }} />
        <div style={{ fontSize: 12, color: MUTED }}>© 1970s–2026 Brandon Brokerage Group · For licensed agents &amp; advisors only</div>
      </div>

    </div>
  );
}
