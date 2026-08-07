"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useReveals";
import GlobeArcs, { BLUE_ARCS } from "@/components/GlobeArcs";
import { COPY, OFFERINGS_I18N, type Lang } from "@/lib/copy";
import { ScrollProgress, WordsReveal, FadeIn, CountUp, GrowLine, Magnetic, MaskReveal, ctaFillFromCursor } from "@/components/motion";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { NETWORK_URL } from "@/lib/contact";
import { DHeader, SectionHead, useLang } from "./chrome";
import { BODY, CARRIERS, EASE, HAIR, HAIR_SAPPHIRE, MONO_K, MUTED, NAVY, SAPPHIRE, SAPPHIRE_DEEP, SERIF, EXTRA, OFFICE } from "./copy";
import styles from "./page.module.css";

// Ivory & Sapphire. The landing carries the argument: the marble hero, the
// platform hand-off, the four pillars dissolving on the cream, the specialty in one
// paragraph and the phone number. Everything that needs room , the firm, the
// products, the foreign-national case flow, the forms desk , lives on its own
// page, the way brandonbrokerage.com splits it.

// ----- Signature scroll moment: the pillars dissolve on the cream -----
const D_CATS = {
  en: ["Specialty", "Support", "Operations", "Network"],
  es: ["Especialidad", "Soporte", "Operaciones", "Red"],
};

const dSeg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

function SilkPanel({ i, progress, reduce, lang }: { i: number; progress: MotionValue<number>; reduce: boolean; lang: Lang }) {
  const o = OFFERINGS_I18N[lang][i];
  // without the curtain the swap must be clean: each pillar finishes leaving
  // before the next arrives, with a beat of bare stone in between
  const op = useTransform(progress, (p) => {
    if (reduce) return i === 3 ? 1 : 0;
    const fadeIn = i === 0 ? 1 : dSeg(p, i / 4 + 0.006, i / 4 + 0.034);
    const fadeOut = i === 3 ? 0 : dSeg(p, (i + 1) / 4 - 0.034, (i + 1) / 4 - 0.006);
    return fadeIn * (1 - fadeOut);
  });
  const y = useTransform(progress, (p) => (reduce ? 0 : 16 * (1 - dSeg(p, i / 4 + 0.006, i / 4 + 0.05))));
  return (
    <motion.div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: op, y, pointerEvents: "none" }}>
      <div style={{ maxWidth: 860, padding: "0 clamp(20px,5vw,60px)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11.5, letterSpacing: "0.26em", textTransform: "uppercase", color: SAPPHIRE_DEEP, marginBottom: 24 }}>0{i + 1} / {D_CATS[lang][i]}</div>
        <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(36px,5.5vw,84px)", lineHeight: 1.04, letterSpacing: "-0.01em", margin: "0 0 22px", color: NAVY }}>{o.title}</h3>
        <p style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.65, color: BODY, margin: "0 auto", maxWidth: 520 }}>{o.blurb}</p>
      </div>
    </motion.div>
  );
}

function SilkTick({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const op = useTransform(progress, (p) => (p >= (i === 0 ? -1 : i / 4) && p < (i + 1) / 4 + (i === 3 ? 1 : 0) ? 1 : 0.3));
  return <motion.span style={{ width: 26, height: 2, background: SAPPHIRE, opacity: op, display: "block" }} />;
}

export default function ConceptD() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const silkRevealRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useScrollReveal(pageRef);

  // scrub for the silk-curtain reveal
  const { scrollYProgress: silkRaw } = useScroll({ target: silkRevealRef, offset: ["start start", "end end"] });
  const silkProgress = useSpring(silkRaw, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={SAPPHIRE} />

      <DHeader lang={lang} setLang={setLang} />

      {/* HERO , the matter itself. Real Carrara marble, full bleed, under an
          ivory veil that calms the center where the type sits; a sheen of
          light glides across the polished stone every few breaths, and the
          slab drifts on a very slow Ken Burns. Nothing reacts, nothing asks
          for attention: material, type, light. */}
      <div id="top" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px clamp(20px,5vw,60px) 80px", background: "#f3efe6", overflow: "hidden" }}>
        <motion.img
          src="/images/marble-carrara.jpg"
          alt=""
          data-photo-slot="hero-marble"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.55) brightness(1.03)" }}
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: [1, 1.045] }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
        />
        {/* the veil: ivory settles over the stone, calm at the center */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 55% at 50% 52%, rgba(243,239,230,0.94), rgba(243,239,230,0.6) 60%, rgba(243,239,230,0.24))" }} />
        {/* light gliding across the polished slab */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ position: "absolute", top: "-20%", bottom: "-20%", left: 0, width: "34%", background: "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)", filter: "blur(4px)", mixBlendMode: "soft-light", pointerEvents: "none" }}
            initial={{ x: "-46vw" }}
            animate={{ x: "146vw" }}
            transition={{ duration: 12, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
          />
        )}

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 34 }}>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} style={{ width: 44, height: 1, background: SAPPHIRE, transformOrigin: "0 50%" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", color: SAPPHIRE_DEEP }}>{t.heroKicker}</span>
            </FadeIn>
            <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(44px,6.2vw,94px)", lineHeight: 1.05, margin: "0 0 30px", color: NAVY, letterSpacing: "-0.015em", textWrap: "balance" }}>
              <WordsReveal
                delay={0.25}
                stagger={0.05}
                segments={[
                  { text: x.heroLine1 + " " },
                  { text: x.heroLine2, style: { fontStyle: "italic", color: SAPPHIRE } },
                ]}
              />
            </h1>
            <FadeIn delay={1.1}>
              <p style={{ fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.6, color: BODY, fontWeight: 400, maxWidth: 560, margin: "0 auto 42px" }}>{t.heroSub}</p>
            </FadeIn>
            <FadeIn delay={1.3} style={{ display: "flex", gap: 26, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              <Magnetic>
                <Link href="/d/contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`} style={{ padding: "16px 34px", fontSize: 14, letterSpacing: "0.06em" }}>{t.cta.partner}</Link>
              </Magnetic>
              <Link href="/d/products" className={styles.lnk} style={{ fontSize: 14, letterSpacing: "0.04em", color: NAVY }}>{t.cta.explore}</Link>
            </FadeIn>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8b8574" }}>{t.scroll}</span>
          <span style={{ width: 1, height: 38, background: `linear-gradient(${SAPPHIRE},transparent)` }} />
        </div>
      </div>

      {/* THE PLATFORM , the assistant is not demoed here, it is handed over. It
          leaves the site, so it is an aside on the concept's own cream , one
          card, the gold rule and the header's pulsing dot , and not one of the
          numbered sapphire chapters, which are Brandon's own argument. */}
      <div style={{ padding: "clamp(36px,4.5vw,64px) clamp(20px,5vw,60px) 0", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.platCard}>
            <span className={styles.platCopy}>
              <span className={styles.platKicker}>
                <span className={styles.platDot} aria-hidden="true" />
                {x.aiKicker}
              </span>
              <GrowLine color={HAIR} style={{ marginBottom: "clamp(16px,2vw,22px)" }} />
              <span className={styles.platTitle}>
                <MaskReveal inView delay={0.05}>{x.aiTitle}</MaskReveal>
              </span>
              <span data-reveal className={styles.platBody}>{x.aiBody}</span>
            </span>
            <span className={styles.platAside}>
              <span className={styles.platCta}>
                {x.aiCta}
                <span className={styles.platArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.platHost}>brandonlatamnetwork.com</span>
            </span>
          </a>
        </div>
      </div>

      {/* STATS , drawn hairlines + count-up */}
      <div data-reveal style={{ padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div className={styles.wrapD} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {[
            { num: 60, suffix: "+", label: t.stats.years },
            { num: 30, suffix: "+", label: t.stats.carriers },
            { num: 5, suffix: "", label: t.stats.lines },
            { num: 50, suffix: "", label: t.stats.states },
          ].map((s, i) => (
            <div key={s.label}>
              <GrowLine color={SAPPHIRE} delay={i * 0.12} />
              <div style={{ paddingTop: 20 }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(36px,4vw,54px)", fontWeight: 500, color: NAVY, lineHeight: 1 }}>
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginTop: 12 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE OFFER , the pillars dissolve one after another on the bare
          cream: the stone stays the hero's, this moment is type alone */}
      <div id="why" ref={silkRevealRef} className={styles.silkSection}>
        <div className={styles.silkPin}>
          {/* clears the fixed header, which is ~74px tall over this pin */}
          <div style={{ position: "absolute", top: "clamp(92px,13vh,124px)", left: "clamp(20px,5vw,60px)", right: "clamp(20px,5vw,60px)" }}>
            <div style={{ ...MONO_K, color: SAPPHIRE_DEEP, marginBottom: 14 }}>01 / {t.offerKicker}</div>
            <GrowLine color={HAIR_SAPPHIRE} />
          </div>

          {OFFERINGS.map((_, i) => (
            <SilkPanel key={i} i={i} progress={silkProgress} reduce={!!reduce} lang={lang} />
          ))}

          <div style={{ position: "absolute", right: "clamp(20px,5vw,60px)", bottom: 24, fontFamily: "var(--font-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.3em", color: "#8b8574" }}>{lang === "es" ? "SCROLLEÁ PARA REVELAR" : "SCROLL TO REVEAL"}</div>
          {/* progress ticks */}
          <div style={{ position: "absolute", left: "clamp(20px,5vw,60px)", bottom: 24, display: "flex", gap: 10 }}>
            {OFFERINGS.map((_, i) => (
              <SilkTick key={i} i={i} progress={silkProgress} />
            ))}
          </div>
        </div>

        {/* mobile: plain stacked pillars, no pin */}
        <div className={styles.silkMobile}>
          <div data-reveal style={{ marginBottom: 32 }}>
            <div style={{ ...MONO_K, marginBottom: 14 }}>01 / {t.offerKicker}</div>
            <GrowLine color={HAIR} />
          </div>
          {OFFERINGS.map((o, i) => (
            <div key={o.n} data-reveal style={{ padding: "26px 0", borderBottom: "1px solid rgba(18,41,74,0.14)" }}>
              <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: SAPPHIRE_DEEP, marginBottom: 12 }}>0{i + 1} / {D_CATS[lang][i]}</div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,6vw,36px)", margin: "0 0 10px", color: NAVY, lineHeight: 1.1 }}>{o.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: BODY, margin: 0 }}>{o.blurb}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOREIGN NATIONAL , one paragraph and the 3D globe; the case flow has its own page */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <SectionHead index="02" kicker={x.fnKicker} accent={{ text: SAPPHIRE_DEEP, rule: HAIR_SAPPHIRE }} style={{ marginBottom: 30 }} />
            <h2 className={styles.displayD} style={{ fontSize: "clamp(32px,4.6vw,64px)", margin: "0 0 28px", maxWidth: 620 }}>
              <MaskReveal inView delay={0.05}>{x.fnTitle1}</MaskReveal>
              <MaskReveal inView delay={0.2}><span className={styles.displayItalicD}>{x.fnTitle2}</span></MaskReveal>
            </h2>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.7, color: BODY, margin: "0 0 34px", maxWidth: 560 }}>{x.fnTeaser}</p>
            <Link data-reveal href="/d/foreign-nationals" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`}>{x.fnTeaserCta} →</Link>
          </div>
          <div data-reveal style={{ position: "relative", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 38% 30%, #16304f, #081221 74%)", boxShadow: "0 34px 90px rgba(12,28,51,0.3)", maxWidth: 520, width: "100%", margin: "0 auto" }}>
            <GlobeArcs palette={BLUE_ARCS} />
          </div>
        </div>
      </div>

      {/* CARRIERS MARQUEE , the four inner pages are in the header on every page,
          so the landing no longer repeats them in bigger type down here */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#f3efe6", borderTop: "1px solid rgba(18,41,74,0.12)" }}>
        <div className={styles.wrapD}>
          <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, marginBottom: 34 }}>{t.carriersLabel}</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
            <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(30px,4vw,64px)", fontFamily: SERIF, fontSize: "clamp(19px,2vw,28px)", color: "#8b93a2", whiteSpace: "nowrap" }}>
              {[0, 1].map((rep) => (
                <span key={rep} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }} aria-hidden={rep === 1}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", columnGap: "clamp(30px,4vw,64px)" }}>
                      <span>{c}</span><span style={{ color: SAPPHIRE }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT , a closing band, not the contact page. The office, the desk by
          name, every extension and every mailbox live at /d/contact now; this
          says the sentence and hands over, keeping one number a tap away. */}
      <div id="contact" style={{ position: "relative", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#ece7db" }}>
        <div className={styles.wrapD}>
          <div data-reveal style={{ maxWidth: 760 }}>
            {/* 03 now: the go-deeper signposts used to sit between 02 and this */}
            <div style={{ ...MONO_K, color: SAPPHIRE_DEEP, marginBottom: 14 }}>03 / {t.contactKicker}</div>
            <GrowLine color={HAIR_SAPPHIRE} style={{ marginBottom: 26 }} />
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.02, margin: "0 0 28px", color: NAVY }}>{t.contactTitle}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: BODY, fontWeight: 400, margin: 0, maxWidth: 480 }}>{t.contactBody}</p>
          </div>
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(20px,3vw,40px)", marginTop: "clamp(34px,4.5vw,56px)" }}>
            <Magnetic>
              <Link href="/d/contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`} style={{ padding: "16px 38px", fontSize: 14 }}>{t.cta.partner}</Link>
            </Magnetic>
            <a href={OFFICE.phoneHref} className={styles.lnk} style={{ fontFamily: SERIF, fontSize: "clamp(22px,2.6vw,32px)", color: NAVY }}>{OFFICE.phone}</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "44px clamp(20px,5vw,60px)", background: "#12294a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ background: "rgba(243,239,230,0.94)", borderRadius: 999, padding: "8px 18px", display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 22 }} />
        </div>
        <div style={{ fontSize: 12, color: "#8ea3c4" }}>{t.rights} · {t.licensed}</div>
      </div>

    </div>
  );
}
