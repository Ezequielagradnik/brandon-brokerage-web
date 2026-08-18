"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY, OFFERINGS_I18N } from "@/lib/copy";
import { CountUp, GrowLine, MaskReveal, FadeIn, Magnetic, ParallaxImg, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { NETWORK_URL } from "@/lib/contact";
import { NHeader, SectionMark, useLang } from "./chrome";
import { CARRIERS, CONTACT, EASE, GOLD, GOLD_SOFT, GOLD_DEEP, HAIR, INK_MUTED, NAVY, EXTRA } from "./copy";
import styles from "./page.module.css";

// Network , beige canvas, navy depth, Brandon gold. The landing carries the
// argument: who we are, the four pillars, the specialty and the phone number.
// Everything that needs room , the firm, the products, the foreign-national
// case flow, the forms desk , lives on its own page, the way the real site
// splits it.

/* the statement inks in word by word as it crosses the viewport */
function StatementWord({ progress, range, word }: { progress: MotionValue<number>; range: [number, number]; word: string }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function Statement({ text, reduce }: { text: string; reduce: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  const style: React.CSSProperties = {
    fontFamily: "var(--font-bodoni), serif",
    fontWeight: 500,
    fontSize: "clamp(24px,3.4vw,50px)",
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
    margin: 0,
    color: NAVY,
  };
  if (reduce) return <p style={style}>{text}</p>;
  return (
    <p ref={ref} style={style}>
      {words.map((w, i) => (
        <StatementWord key={`${i}-${w}`} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]} word={w} />
      ))}
    </p>
  );
}

export default function ConceptN() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [galSpan, setGalSpan] = useState(0);

  useScrollReveal(pageRef);

  // hero glows drift with scroll on top of their own slow loop
  const { scrollYProgress: heroRaw } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(heroRaw, [0, 1], ["0%", "26%"]);
  const glowY2 = useTransform(heroRaw, [0, 1], ["0%", "-18%"]);
  const heroFade = useTransform(heroRaw, [0, 0.8], [1, 0.25]);
  const lineY1 = useTransform(heroRaw, [0, 1], [0, -30]);
  const lineY2 = useTransform(heroRaw, [0, 1], [0, -70]);

  // the four pillars travel horizontally while the section is pinned; the
  // distance is measured so the last card lands flush with the right edge.
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setGalSpan(Math.max(0, el.scrollWidth - el.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [lang]);
  const { scrollYProgress: galRaw } = useScroll({ target: galRef, offset: ["start start", "end end"] });
  const galP = useSpring(galRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  const galTransform = useTransform(galP, (p) => `translate3d(${reduce ? 0 : -p * galSpan}px,0,0)`);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <NHeader lang={lang} setLang={setLang} />

      {/* ----- hero ----- The lighthouse sits behind the masthead instead of
          as its own band: bblatam's own mood photo, full-bleed under the
          type, with a navy wash standing in for the beige so the same
          centered symmetry still reads. */}
      <section id="top" ref={heroRef} className={styles.hero}>
        <div className={styles.photo} style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <ParallaxImg
            src="/images/lighthouse-sunset.jpg"
            alt="A lighthouse in silhouette against a sunset sky"
            range={30}
            photoSlot="hero"
            style={{ height: "100%" }}
            imgClassName={styles.photoImg}
          />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(180deg, rgba(20,34,74,0.58) 0%, rgba(20,34,74,0.68) 55%, rgba(20,34,74,0.86) 100%)",
          }}
        />
        <motion.div className={styles.heroGlow} style={{ y: reduce ? 0 : glowY }} aria-hidden="true" />
        <motion.div className={styles.heroGlow2} style={{ y: reduce ? 0 : glowY2 }} aria-hidden="true" />
        <motion.div className={styles.wrap} style={{ position: "relative", zIndex: 2, width: "100%", textAlign: "center", opacity: reduce ? 1 : heroFade }}>
          <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 30 }}>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} style={{ width: 40, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
            <span className={styles.kicker} style={{ color: GOLD_SOFT }}>{t.heroKicker}</span>
          </FadeIn>

          {/* the two lines drift apart on scroll , cheap depth, no extra paint */}
          <h1 className={styles.display} style={{ margin: "0 auto 32px", maxWidth: 940, color: "#f5f1e8" }}>
            <motion.span style={{ display: "block", y: reduce ? 0 : lineY1 }}><MaskReveal delay={0.2}>{x.heroLine1}</MaskReveal></motion.span>
            <motion.span style={{ display: "block", y: reduce ? 0 : lineY2 }}><MaskReveal delay={0.35}><span className={styles.displayItalic}>{x.heroLine2}</span></MaskReveal></motion.span>
          </h1>

          <FadeIn delay={0.7}>
            <p style={{ fontSize: "clamp(16px,1.25vw,18.5px)", lineHeight: 1.7, color: "rgba(245,241,232,0.82)", maxWidth: 560, margin: "0 auto 38px" }}>{x.heroSub}</p>
          </FadeIn>

          <FadeIn delay={0.85} style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <Link href="/n/contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ background: GOLD, borderColor: GOLD, color: NAVY }}>{t.cta.partner}</Link>
            </Magnetic>
            <a
              href={NETWORK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={ctaFillFromCursor}
              className={`${styles.cta} ${styles.ctaGhostOnPhoto}`}
            >
              {x.aiNav} ↗
            </a>
          </FadeIn>
        </motion.div>
      </section>

      {/* ----- trust line ----- Tellus/Crump is the strongest third-party
          proof on the page, so it reads as a line, not as a footnote */}
      <div data-reveal style={{ borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`, padding: "clamp(20px,2.6vw,30px) 0" }}>
        <div className={styles.wrap}>
          <p style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(17px,1.6vw,23px)", lineHeight: 1.45, letterSpacing: "-0.005em", color: NAVY, textAlign: "center", textWrap: "balance", margin: 0 }}>
            {t.footAbout}
          </p>
        </div>
      </div>

      {/* ----- the statement and the numbers behind it ----- */}
      <section style={{ padding: "clamp(56px,7vw,104px) 0" }}>
        <div className={styles.wrap}>
          <div style={{ maxWidth: 1000, marginBottom: "clamp(46px,6vw,86px)" }}>
            <Statement text={x.statement} reduce={reduce} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "32px clamp(24px,4vw,60px)" }}>
            {[
              { num: 60, suffix: "+", label: t.stats.years },
              { num: 30, suffix: "+", label: t.stats.carriers },
              { num: 5, suffix: "", label: t.stats.lines },
              { num: 50, suffix: "", label: x.states },
            ].map((st, i) => (
              <StatCell key={st.label} i={i} stat={st} reduce={reduce} />
            ))}
          </div>
        </div>
      </section>

      {/* ----- the four pillars travel horizontally while pinned ----- */}
      <section id="pillars" ref={galRef} className={styles.galSection}>
        <div className={styles.galPin}>
          <div className={styles.grain} aria-hidden="true" />
          <div className={`${styles.mark} ${styles.markDark}`} aria-hidden="true">01</div>
          <div style={{ position: "relative", zIndex: 2, padding: "0 clamp(24px,6vw,90px)", marginBottom: "clamp(24px,3vh,42px)" }}>
            <h2 className={styles.display} style={{ color: "#f5f1e8", fontSize: "clamp(28px,3.6vw,52px)", maxWidth: 700 }}>{x.pillarsTitle}</h2>
          </div>

          <motion.div ref={trackRef} className={styles.galTrack} style={{ transform: galTransform }}>
            {OFFERINGS.map((o, i) => (
              <GalCard key={o.n} i={i} progress={galP} reduce={reduce} offering={o} />
            ))}
          </motion.div>

          <div style={{ position: "relative", zIndex: 2, padding: "clamp(20px,3vh,34px) clamp(24px,6vw,90px) 0", display: "flex", gap: 8 }}>
            {OFFERINGS.map((o, i) => (
              <GalTick key={o.n} i={i} progress={galP} />
            ))}
          </div>
        </div>
      </section>

      {/* ----- the platform: hands off to the real assistant -----
          It leaves the site, so it sits after the pillars have argued for
          Brandon: a card on the beige, never a navy chapter of its own. */}
      <section style={{ padding: "clamp(38px,5vw,66px) 0" }}>
        <div className={styles.wrap}>
          <a data-reveal href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.aiCard}>
            <div className={styles.aiCardRow}>
              <div className={styles.aiCardText}>
                <div className={styles.aiCardHead}>
                  <span className={styles.aiPulse} aria-hidden="true" />
                  <span className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10 }}>{x.aiKicker}</span>
                </div>
                <div className={styles.aiCardTitle}>{x.aiTitle}</div>
                <p className={styles.aiCardBody}>{x.aiBody}</p>
              </div>
              <span className={styles.aiCta}>
                {x.aiCta} <span className={styles.aiArrow} aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ----- the specialty, in short: the depth lives on its own page ----- */}
      <section id="foreign" style={{ position: "relative", padding: "clamp(64px,8vw,110px) 0", background: "#f0ece1", overflow: "hidden" }}>
        <SectionMark n="02" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color={HAIR} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(36px,5vw,70px)", alignItems: "center", marginTop: "clamp(26px,3vw,40px)" }}>
            <div>
              <div className={styles.kicker} style={{ color: GOLD_DEEP, marginBottom: 18, fontSize: 10.5 }}>{x.fnKicker}</div>
              {/* the italic-gold second line lives in the hero only; here the
                  two lines hold the same ink and the kicker carries the color */}
              <h2 className={styles.display} style={{ fontSize: "clamp(30px,4.2vw,64px)", margin: "0 0 24px", maxWidth: 820 }}>
                <MaskReveal inView delay={0.1}>{x.fnTitle1}</MaskReveal>
                <MaskReveal inView delay={0.25}>{x.fnTitle2}</MaskReveal>
              </h2>
              <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: INK_MUTED, margin: "0 0 30px", maxWidth: 680 }}>{x.fnTeaser}</p>
              <Link data-reveal href="/n/foreign-nationals" onPointerEnter={ctaFillFromCursor} className={styles.cta}>{x.fnTeaserCta} →</Link>
            </div>
            <div data-reveal className={styles.photo} style={{ height: "clamp(300px,34vw,420px)" }}>
              <ParallaxImg
                src="/images/miami-palms-sunset.jpg"
                alt="Biscayne Bay at sunset, the bridge from Latin America to Coral Gables"
                range={26}
                photoSlot="specialty"
                style={{ height: "100%" }}
                imgClassName={styles.photoImg}
              />
              <span className={styles.photoEdge} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* The four deep pages were repeated here as a signpost row. They sit in
          the header on every page, and the teaser above already links to the
          foreign-national page, so the row was the nav in bigger type. */}

      {/* ----- carriers ----- */}
      <div data-reveal style={{ padding: "clamp(46px,6vw,76px) 0", borderTop: `1px solid ${HAIR}`, background: "#f0ece1" }}>
        <div className={styles.kicker} style={{ color: INK_MUTED, textAlign: "center", marginBottom: 30, fontSize: 10.5 }}>{t.carriersLabel}</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
          <VelocityMarquee reduce={reduce}>
            {[0, 1].map((rep) => (
              <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(28px,3.4vw,56px)", paddingRight: "clamp(28px,3.4vw,56px)" }} aria-hidden={rep === 1}>
                {CARRIERS.map((c) => (
                  <span key={c} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(18px,2vw,26px)", color: "rgba(20,34,74,0.55)", whiteSpace: "nowrap" }}>{c}</span>
                ))}
              </div>
            ))}
          </VelocityMarquee>
        </div>
      </div>

      {/* ----- contact ----- */}
      <section id="contact" style={{ position: "relative", padding: "clamp(70px,9vw,130px) 0 clamp(50px,6vw,80px)", background: NAVY, color: "#f5f1e8", overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <SectionMark n="03" dark />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color="rgba(194,161,91,0.4)" />
          <h2 className={styles.display} style={{ color: "#f5f1e8", fontSize: "clamp(34px,5vw,74px)", margin: "clamp(30px,4vw,48px) 0 26px", maxWidth: 900 }}>
            <MaskReveal inView delay={0.1}>{t.contactTitle}</MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,241,232,0.75)", margin: "0 0 clamp(36px,5vw,56px)", maxWidth: 460 }}>{t.contactBody}</p>

          <div data-reveal>
            <a href="tel:+13054447401" className={styles.phoneGiant} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,6.4vw,104px)", lineHeight: 1, letterSpacing: "-0.02em" }}>305-444-7401</a>
          </div>

          {/* The office, the toll-free line, the fax and the desk by name now
              live on /n/contact. This band keeps the number and hands over. */}
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3.4vw,44px)", alignItems: "center", marginTop: "clamp(34px,4vw,52px)", paddingTop: 26, borderTop: "1px solid rgba(194,161,91,0.35)" }}>
            <Magnetic>
              <Link
                href="/n/contact"
                onPointerEnter={ctaFillFromCursor}
                className={styles.cta}
                style={{ background: GOLD, borderColor: GOLD, color: NAVY }}
              >
                {t.cta.partner}
              </Link>
            </Magnetic>
            <span className={styles.kicker} style={{ color: GOLD_SOFT, fontSize: 9.5 }}>{CONTACT[lang].directory}</span>
          </div>

          <div style={{ marginTop: "clamp(44px,6vw,72px)", paddingTop: 22, borderTop: "1px solid rgba(245,241,232,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span className={styles.kicker} style={{ color: "rgba(245,241,232,0.45)", fontSize: 9.5 }}>{t.rights}</span>
            <span className={styles.kicker} style={{ color: "rgba(245,241,232,0.45)", fontSize: 9.5 }}>{t.licensed}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Each card lifts as it crosses the middle of the pin. No photography here ,
   four unrelated stock shots in a row read as filler; the numeral carries it. */
function GalCard({ i, progress, reduce, offering }: { i: number; progress: MotionValue<number>; reduce: boolean; offering: { n: string; title: string; blurb: string } }) {
  const center = i / 4 + 0.06;
  const y = useTransform(progress, [center - 0.22, center, center + 0.22], [26, -14, 26]);
  return (
    <motion.article className={styles.galCard} style={{ y: reduce ? 0 : y }}>
      <div>
        <div className={styles.galNum} aria-hidden="true">{offering.n}</div>
      </div>
      <div className={styles.galBody}>
        <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(22px,2.1vw,30px)", lineHeight: 1.14, margin: "0 0 14px", color: "#14224a", textWrap: "balance" }}>{offering.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#4a5568", margin: 0 }}>{offering.blurb}</p>
      </div>
    </motion.article>
  );
}

/* progress ticks under the horizontal gallery */
function GalTick({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const op = useTransform(progress, [i / 4 - 0.14, i / 4, (i + 1) / 4], [0.3, 1, 0.3]);
  return <motion.span style={{ width: 24, height: 2, background: "#c2a15b", opacity: op, display: "block" }} />;
}

/* Stats: each column rises at its own pace as the block crosses the viewport. */
function StatCell({ i, stat, reduce }: { i: number; stat: { num: number; suffix: string; label: string }; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [22 + i * 9, -22 - i * 9]);
  return (
    <motion.div ref={ref} data-reveal style={{ y: reduce ? 0 : y }}>
      <GrowLine color={GOLD} delay={i * 0.1} />
      <div style={{ paddingTop: 20 }}>
        <div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(46px,5.4vw,84px)", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.02em", color: NAVY, fontVariantNumeric: "tabular-nums" }}>
          <CountUp to={stat.num} suffix={stat.suffix} />
        </div>
        <div className={styles.kicker} style={{ color: INK_MUTED, marginTop: 14, fontSize: 10.5 }}>{stat.label}</div>
      </div>
    </motion.div>
  );
}

/* The carrier list runs on its own, then leans into whichever direction you are
   scrolling and speeds up with how hard you throw the page. */
function VelocityMarquee({ children, reduce }: { children: React.ReactNode; reduce: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1800, 0, 1800], [-4, 0, 4], { clamp: false });
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * 2.4 * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  // the track holds two identical copies, so wrapping over 50% is seamless
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  return (
    <motion.div className={styles.marquee} style={{ x: reduce ? 0 : x }}>
      {children}
    </motion.div>
  );
}
