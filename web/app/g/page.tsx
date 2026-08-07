"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { ScrollProgress, MaskReveal, FadeIn, CountUp, GrowLine, Magnetic, ctaFillFromCursor } from "@/components/motion";
import { COPY } from "@/lib/copy";
import { NETWORK_URL } from "@/lib/contact";
import { GHeader, SectionHead, useLang } from "./chrome";
import { CARRIERS, CONTACT, EASE, EXTRA, G, GOLD, GRAY, HAIR, MASTHEAD, NAVY, OFFWHITE, deepNav, mono, monoEyebrow, sans, serif } from "./copy";
import styles from "./page.module.css";
import WaterPhoto from "./WaterPhoto";

// Boutique Latam , white canvas, navy and gold, Lora on Plex Mono. Two tones
// carry the whole concept: white for the page, #f4f1e9 for anything recessed.
// The landing carries the argument and nothing else: the hero, the four pillars
// fanning out of a pinned deck, the numbers, a short word on the specialty and
// the phone number. Our Firm, Products, Foreign Nationals and Forms each live on
// their own page, reached from the header nav on every page.

// ----- Card deck (pinned, scroll-driven) -----
const DECK_IMGS = ["/images/miami-palms-sunset.jpg", "/images/miami-aerial-day.jpg", "/images/miami-night.jpg", "/images/miami-sunset.jpg"];
const DECK_ACCENTS = ["#c2a15b", "#3d7a64", "#4179ab", "#b26a4a"];
// lighter tints for the mono label over the dark photo
const DECK_ACCENTS_LIGHT = ["#e3c98f", "#8fd0b4", "#9cc4ec", "#e8a988"];
// deck (stacked) state → fanned state
const DECK_X_VW = [52, 31, 10, -11];
const DECK_Y_PX = [10, -14, 18, -8];
const DECK_ROT = [-6, -2, 3, 7];
const FINAL_ROT = [-2, 1.5, -1, 2];
const FINAL_LEFT = [4, 28, 52, 76];
const DRIFT_DIR = [-1, 1, -1, 1];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// fan completes at 82% of the pin; the last 18% is residual drift
const fanAt = (p: number) => easeInOut(clamp01(p / 0.82));
const driftAt = (p: number) => clamp01((p - 0.82) / 0.18);

type DeckCardData = { cat: string; title: string; desc: string };

function DeckCardInner({ i, card }: { i: number; card: DeckCardData }) {
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: DECK_ACCENTS[i], zIndex: 2 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={DECK_IMGS[i]} alt={card.title} loading="lazy" decoding="async" data-photo-slot={`pillar-0${i + 1}`} className={styles.deckPhoto} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(146deg, #14224a, #2b3f6e 55%, #c2a15b)", mixBlendMode: "color" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.12) 28%, rgba(16,24,40,0.9) 82%)" }} />
      <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, zIndex: 2 }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: DECK_ACCENTS_LIGHT[i], marginBottom: 10 }}>0{i + 1} / {card.cat}</div>
        <div style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(19px,1.7vw,24px)", lineHeight: 1.15, color: "#fff", marginBottom: 8 }}>{card.title}</div>
        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{card.desc}</p>
      </div>
    </>
  );
}

function DeckCard({
  i,
  progress,
  hovered,
  setHovered,
  card,
}: {
  i: number;
  progress: MotionValue<number>;
  hovered: number | null;
  setHovered: (v: number | null) => void;
  card: DeckCardData;
}) {
  const reduce = useReducedMotion();
  const hover = useSpring(0, { stiffness: 260, damping: 26 });
  useEffect(() => {
    hover.set(hovered === i ? 1 : 0);
  }, [hovered, i, hover]);

  const x = useTransform(progress, (p) => (reduce ? "0vw" : `${DECK_X_VW[i] * (1 - fanAt(p))}vw`));
  const y = useTransform(progress, (p) =>
    reduce ? "-50%" : `calc(-50% + ${DECK_Y_PX[i] * (1 - fanAt(p)) + DRIFT_DIR[i] * 26 * driftAt(p)}px)`
  );
  const rotate = useTransform([progress, hover], (v) => {
    const [p, h] = v as [number, number];
    const base = reduce ? FINAL_ROT[i] : DECK_ROT[i] + (FINAL_ROT[i] - DECK_ROT[i]) * fanAt(p);
    return base * (1 - h);
  });
  const scale = useTransform(hover, (h) => 1 + 0.03 * h);
  const filter = useTransform(progress, (p) =>
    reduce || i === 0 ? "brightness(1)" : `brightness(${1 - 0.16 * (1 - fanAt(p))})`
  );

  return (
    <motion.div
      className={`${styles.deckCard} ${hovered === i ? styles.deckCardHover : ""}`}
      onPointerEnter={() => setHovered(i)}
      onPointerLeave={() => setHovered(null)}
      style={{
        position: "absolute",
        left: `${FINAL_LEFT[i]}%`,
        top: "50%",
        width: "clamp(220px,20vw,310px)",
        aspectRatio: "3 / 4",
        x,
        y,
        rotate,
        scale,
        filter,
        zIndex: hovered === i ? 20 : 10 - i,
      }}
    >
      <DeckCardInner i={i} card={card} />
    </motion.div>
  );
}

export default function ConceptG() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useLang();
  const [deckHovered, setDeckHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const g = G[lang];

  useScrollReveal(pageRef);

  // Hero photo: 8% parallax on scroll (on top of the slow Ken Burns)

  // Deck scrub: spring-smoothed scroll progress across the 300vh section
  const { scrollYProgress: deckRaw } = useScroll({ target: deckRef, offset: ["start start", "end end"] });
  const deckProgress = useSpring(deckRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  // The giant headline bows out as the cards fan over it (desktop only)
  const deckTitleFade = useTransform(deckProgress, [0.1, 0.45], [1, 0]);
  // the scroll hint has done its job once the fan completes
  const deckHintFade = useTransform(deckProgress, [0.7, 0.85], [1, 0]);
  const [deckDesktop, setDeckDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const update = () => setDeckDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />

      <GHeader lang={lang} setLang={setLang} />

      {/* HERO , full-screen photo, slow Ken Burns + parallax, 3-line masthead */}
      <div id="top" ref={heroRef} style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "flex-end", overflow: "hidden", padding: "clamp(120px,14vw,180px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* the photo with the bay alive: waves, cursor wake, click ripples */}
          <WaterPhoto />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.62), rgba(16,24,40,0.32) 45%, rgba(16,24,40,0.85) 92%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(16,24,40,0.55), rgba(16,24,40,0.1) 60%)", pointerEvents: "none" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", width: "100%" }}>
          <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.25, ease: EASE }} style={{ width: 42, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
            <span style={{ ...monoEyebrow(true), letterSpacing: "0.3em" }}>{g.heroEyebrow}</span>
          </FadeIn>
          <h1 style={{ ...MASTHEAD, margin: "0 0 clamp(30px,3.4vw,44px)", color: "#ffffff" }}>
            <MaskReveal delay={0.2}>{g.heroLines[0]}</MaskReveal>
            <MaskReveal delay={0.35}>{g.heroLines[1]}</MaskReveal>
            <MaskReveal delay={0.5}><span style={{ fontStyle: "italic", color: "#d9c291", fontSize: "0.9em" }}>{g.heroLines[2]}</span></MaskReveal>
          </h1>
          <FadeIn delay={0.65}>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: "rgba(255,255,255,0.87)", fontWeight: 400, maxWidth: 520, margin: "0 0 38px" }}>{g.heroSub}</p>
          </FadeIn>
          <FadeIn delay={0.78} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <Link href="/g/contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 36px", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{g.heroCta}</Link>
            </Magnetic>
            <a href="#solutions" className={styles.lnk} style={{ fontSize: 13.5, letterSpacing: "0.04em", color: "rgba(255,255,255,0.9)" }}>{g.heroLink}</a>
          </FadeIn>
        </div>
        <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(#c2a15b, transparent)" }} />
        </div>
      </div>

      {/* TRUST BAR , one mono line with separators */}
      <div data-reveal style={{ padding: "18px clamp(20px,5vw,60px)", background: "#fff", borderBottom: HAIR }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", fontFamily: mono, fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: GRAY, textAlign: "center" }}>
          {g.trust.split(" · ").map((part, i, arr) => (
            <span key={part}>
              {part}
              {i < arr.length - 1 && <span style={{ color: GOLD, margin: "0 14px" }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* THE ASSISTANT , it lives on Brandon Latam Network, not here, so it gets
          a contained card on the concept's own recessed tone rather than one of
          the page's dark chapters. Card-size type, so it stops competing with
          the section headlines it used to shout over. */}
      <div className={styles.assistBand}>
        <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.assist}>
          <div data-reveal className={styles.assistMain}>
            <div className={styles.assistKicker}>
              <span className={styles.assistDot} aria-hidden="true" />
              {x.aiKicker}
            </div>
            <h2 className={styles.assistTitle}>
              {x.aiTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className={styles.assistTitleItalic}>{x.aiTitle.split(" ").slice(-1)}</span>
            </h2>
            <p className={styles.assistBody}>{x.aiBody}</p>
          </div>
          <span data-reveal className={styles.assistCta}>
            {x.aiCta}
            <span className={styles.assistArrow} aria-hidden="true">↗</span>
          </span>
        </a>
      </div>

      {/* 01 , SOLUTIONS: pinned card deck, scroll-driven */}
      <div id="solutions" ref={deckRef} className={styles.deckSection}>
        <div className={styles.deckPin} style={{ padding: "0 clamp(20px,5vw,60px)" }}>

          {/* headline column , fades out as the deck fans over it */}
          <motion.div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", width: "100%", opacity: deckDesktop ? deckTitleFade : 1 }}>
            <div data-reveal style={{ ...monoEyebrow(), marginBottom: 26 }}>01 / {g.heads.solutions} · Brandon Brokerage</div>
            <h2 className={styles.deckHeadline} data-reveal>
              {g.deck.lines.map((l) => (
                <span key={l} style={{ display: "block" }}>{l}</span>
              ))}
            </h2>
            <Link data-reveal href="/g/contact" className={styles.lnk} style={{ display: "inline-block", marginTop: 34, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY, fontWeight: 700 }}>{g.deck.seeAll} →</Link>
          </motion.div>

          {/* the deck (desktop) */}
          <div className={styles.deckCards}>
            {g.deck.cards.map((c, i) => (
              <DeckCard key={c.title} i={i} progress={deckProgress} hovered={deckHovered} setHovered={setDeckHovered} card={c} />
            ))}
          </div>

          {/* mobile: plain column, no pin */}
          <div className={styles.deckMobile}>
            {g.deck.cards.map((c, i) => (
              <div key={c.title} data-reveal className={styles.deckCard} style={{ position: "relative", aspectRatio: "3 / 4", width: "100%" }}>
                <DeckCardInner i={i} card={c} />
              </div>
            ))}
          </div>

          <motion.div className={styles.deckHint} style={{ right: "clamp(20px,5vw,60px)", opacity: deckHintFade }}>{g.deck.hint}</motion.div>
        </div>
      </div>

      {/* STATS , giant numerals, drawn hairlines + count-up */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,96px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "32px clamp(24px,4vw,64px)" }}>
          {g.stats.map((s, i) => (
            <div key={s.label}>
              <GrowLine color={GOLD} delay={i * 0.12} />
              <div style={{ paddingTop: 22 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(56px,6.5vw,110px)", fontWeight: 500, color: NAVY, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: GRAY, marginTop: 14 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 02 , SPECIALTY: a short word, the case flow lives on its own page */}
      <div id="foreign" style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: OFFWHITE, borderTop: HAIR, borderBottom: HAIR }}>
        <div className={styles.wrap}>
          <SectionHead num="02" label={g.heads.specialty} />
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4.2vw,62px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: NAVY, margin: "0 0 26px", maxWidth: 900 }}>
            <MaskReveal inView delay={0.08}>{x.fnTitle1}</MaskReveal>
            <MaskReveal inView delay={0.22}><span className={styles.titleItalic}>{x.fnTitle2}</span></MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: "clamp(15.5px,1.35vw,18px)", lineHeight: 1.68, color: GRAY, margin: "0 0 clamp(30px,3.4vw,44px)", maxWidth: 720 }}>{x.fnTeaser}</p>
          <div data-reveal>
            <Magnetic>
              <Link href="/g/foreign-nationals" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaDark}`} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{x.fnTeaserCta} →</Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* CARRIERS , slow infinite marquee */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) 0", background: "#fff", borderBottom: HAIR }}>
        <div style={{ ...monoEyebrow(), textAlign: "center", marginBottom: 36 }}>{g.carriersLabel}</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
          <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)", fontFamily: serif, fontSize: "clamp(19px,2vw,27px)", color: "#5f6b7d", whiteSpace: "nowrap" }}>
            {[0, 1].map((rep) => (
              <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)" }} aria-hidden={rep === 1}>
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

      {/* 03 , CONTACT: masthead close, giant clickable phone. The office, the
          toll-free line, the fax, the map and the desk by name all live on
          /g/contact now, so this band keeps the number and points at the page
          instead of repeating it. */}
      <div id="contact" style={{ position: "relative", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: NAVY, overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto" }}>
          <SectionHead num="03" label={g.heads.contact} dark />
          <h2 style={{ ...MASTHEAD, margin: "0 0 30px", color: "#fff", maxWidth: 1050 }}>
            <MaskReveal inView delay={0.1}>{t.contactTitle}</MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.78)", margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 480 }}>{t.contactBody}</p>

          <div data-reveal>
            <a href="tel:+13054447401" className={styles.phoneGiant} style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(44px,7vw,112px)", lineHeight: 1, letterSpacing: "-0.02em" }}>305-444-7401</a>
          </div>

          <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(24px,4vw,56px)", marginTop: "clamp(36px,4vw,56px)", paddingTop: 28, borderTop: "1px solid rgba(194,161,91,0.4)" }}>
            <Magnetic>
              <Link href="/g/contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-flex", alignItems: "center", padding: "16px 36px", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{CONTACT[lang].directory} →</Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* FOOTER , dark, with legal disclaimer */}
      <footer style={{ background: "#0e1833", padding: "clamp(44px,6vw,64px) clamp(20px,5vw,60px) 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(28px,4vw,56px)", paddingBottom: "clamp(32px,4vw,48px)" }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: 24, marginBottom: 18, opacity: 0.9 }} />
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 300 }}>{g.disclaimer}</p>
            </div>
            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c2a15b", fontWeight: 700, marginBottom: 16 }}>{g.footNav}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {deepNav("/g", lang).map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>{l.label}</Link>
                ))}
                <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>{g.nav.assistant} ↗</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c2a15b", fontWeight: 700, marginBottom: 16 }}>{g.footContact}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>
                <a href="tel:+13054447401" style={{ color: "rgba(255,255,255,0.75)" }}>305-444-7401</a>
                <a href="tel:+18887764678" style={{ color: "rgba(255,255,255,0.75)" }}>1-888-776-4678</a>
                <span style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{g.rights}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>brandonbrokerage.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
