"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { CountUp } from "@/components/motion";
import { COPY, OFFERINGS_I18N } from "@/lib/copy";
import { CARRIERS, DEEP, OFFICE } from "@/lib/deep";
import { NETWORK_URL } from "@/lib/contact";
import { MHeader, MFooter, MClosing, Tag, useLang } from "./chrome";
import styles from "./page.module.css";

// Meridian , boutique block architecture. The hero runs full bleed, and
// everything after it is a stack of rounded blocks inset on a bone canvas,
// with cards nested inside them at concentric radii and a glyph-and-pill tag
// opening every chapter. Navy carries the weight, gold the accent, and every
// word is Brandon's own. The header, the closing band and the footer are
// shared with the five inner pages via ./chrome, so all six pages end the
// same way and the nav highlights the page you're actually on.

const EASE = [0.32, 0.72, 0, 1] as const;

const T = {
  en: {
    heroCardKicker: "The case desk",
    heroCardLine: "Tell us about your case or your book of business. A brokerage director responds within one business day.",
    carrierLabel: "Chosen by the carriers agents ask for",
    offerTag: "What we offer",
    offerTitle: "Carriers quote. Brandon places the case.",
    offerBody: "Agents who write complex business do not lose weeks learning a carrier's appetite or chasing paperwork between offices. One team in Coral Gables designs the case, packages the application, argues the underwriting and delivers the policy, across an open architecture of 30+ carriers.",
    offerCta: "See how a case moves",
    statesLabel: "States licensed",
    specialtyTag: "Signature specialty",
    caseFlowLabel: "How a case moves",
    fnCta: "Start a foreign national case",
    aiTag: "Brandon Latam Network",
    aiCta: "Open the platform",
    productsTag: "Five lines, one relationship",
    firmTag: "The firm",
    firmTitle: "The firms that place difficult business place it here.",
    firmBody: "Our customers are other businesses looking to expand their book by offering life insurance alongside their core line: P&C agencies, law firms, banks, financial advisors, accountants and independent agents.",
    quoteTag: "The Brandon standard",
  },
  es: {
    heroCardKicker: "La mesa de casos",
    heroCardLine: "Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.",
    carrierLabel: "Elegidos por las aseguradoras que los agentes piden",
    offerTag: "Qué ofrecemos",
    offerTitle: "Las aseguradoras cotizan. Brandon coloca el caso.",
    offerBody: "Los agentes que escriben negocio complejo no pierden semanas aprendiendo el apetito de cada aseguradora ni persiguiendo papeles entre oficinas. Un solo equipo en Coral Gables diseña el caso, arma la solicitud, discute el underwriting y entrega la póliza, sobre una arquitectura abierta de más de 30 aseguradoras.",
    offerCta: "Cómo avanza un caso",
    statesLabel: "Estados con licencia",
    specialtyTag: "Especialidad distintiva",
    caseFlowLabel: "Cómo avanza un caso",
    fnCta: "Iniciar un caso extranjero",
    aiTag: "Brandon Latam Network",
    aiCta: "Abrir la plataforma",
    productsTag: "Cinco líneas, una relación",
    firmTag: "La firma",
    firmTitle: "Las firmas que colocan negocio difícil lo colocan acá.",
    firmBody: "Nuestros clientes son otras empresas que buscan ampliar su cartera ofreciendo seguros de vida junto a su línea principal: agencias de P&C, estudios jurídicos, bancos, asesores financieros, contadores y agentes independientes.",
    quoteTag: "El estándar Brandon",
  },
} as const;

export default function ConceptM() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const d = DEEP[lang];
  const m = T[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal(pageRef);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const STATS = [
    { num: 60, suffix: "+", label: t.stats.years },
    { num: 30, suffix: "+", label: t.stats.carriers },
    { num: 5, suffix: "", label: t.stats.lines },
    { num: 50, suffix: "", label: m.statesLabel },
  ];

  return (
    <div ref={pageRef} className={styles.page}>
      <MHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      {/* ————— hero: full bleed, edge to edge. The block architecture starts
          below it, so the page opens on the vista and only then settles into
          its stack of cards. ————— */}
      <section id="top" className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-aerial-day.jpg" alt="" className={styles.heroPhoto} fetchPriority="high" />
        <div className={styles.heroWash} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* the choreography runs as full transform strings, not the x/y
              shorthand: this fires exactly when the main thread is busiest
              (the hero photo and fonts are still loading), and only the full
              string form gets GPU compositing under that load */}
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, transform: "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className={styles.badgeDot} aria-hidden="true" />
            {t.heroKicker}
          </motion.span>

          <motion.h1
            className={`${styles.display} ${styles.heroTitle}`}
            initial={{ opacity: 0, transform: "translateY(18px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            {d.heroLine1} {d.heroLine2}
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, transform: "translateY(14px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
          >
            {t.heroSub}
          </motion.p>

          {/* the desk, nested: a glass shell around a cream core */}
          <motion.div
            className={styles.heroShell}
            initial={{ opacity: 0, transform: "translateY(22px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.95, delay: 0.34, ease: EASE }}
          >
            <div className={styles.heroCard}>
              <div className={styles.heroCardCopy}>
                <span className={styles.kicker}>{m.heroCardKicker}</span>
                <p className={styles.heroCardLine}>{m.heroCardLine}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
                <a href={OFFICE.phoneHref} className={styles.heroPhone}>{OFFICE.phone}</a>
                <a href="/m/contact" className={`${styles.pill} ${styles.pillDark} ${styles.pillSm}`}>
                  {t.cta.partner} <span className={styles.pillDisc} aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ————— everything below the hero lives in the block stack ————— */}
      <div className={styles.stack}>
        {/* carriers: their own navy block, textured */}
        <div data-reveal className={`${styles.block} ${styles.blockNavy}`} style={{ padding: "clamp(28px,3.4vw,50px) 0" }}>
          <div className={styles.topo} aria-hidden="true" />
          <div className={styles.carrierLabel}>{m.carrierLabel}</div>
          <div style={{ position: "relative", zIndex: 2, overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}>
            <div className={styles.carrierTrack}>
              {[0, 1].map((rep) => (
                <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(30px,4vw,62px)", paddingRight: "clamp(30px,4vw,62px)" }} aria-hidden={rep === 1}>
                  {CARRIERS.map((c) => (
                    <span key={c} className={styles.carrierName}>{c}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* what we offer: the statement beside the four pillars */}
        <section id="offer" className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardNavy} ${styles.colHalf} ${styles.rowTwo}`}>
            <div className={styles.topo} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
              <Tag glyph="compass" dark>{m.offerTag}</Tag>
              <h2 className={`${styles.display} ${styles.statementTitle}`}>{m.offerTitle}</h2>
              <p className={styles.statementBody}>{m.offerBody}</p>
              <div className={styles.cardFoot}>
                <a href="#specialty" className={`${styles.pill} ${styles.pillGold}`}>
                  {m.offerCta} <span className={styles.pillDisc} aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>

          {/* four pillars, two of them read , two of them seen: a checkerboard
              beats four identical text quarters, and it's the one place on
              the landing bblatam's own photo rhythm gets to show up twice
              in one glance */}
          <article data-reveal className={`${styles.card} ${styles.cardCream} ${styles.colQuarter}`} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {OFFERINGS.slice(0, 2).map((o) => (
              <div key={o.n}>
                <div className={styles.pillarNum} style={{ marginBottom: 8 }}>{o.n}</div>
                <h3 className={styles.serifTitle} style={{ fontSize: "clamp(14.5px,1.25vw,16.5px)", color: "var(--navy)", marginBottom: 6 }}>{o.title}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>{o.blurb}</p>
              </div>
            ))}
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colQuarter}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bb-family-mountain.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colQuarter}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bb-family-hands.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardBone} ${styles.colQuarter}`} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {OFFERINGS.slice(2, 4).map((o) => (
              <div key={o.n}>
                <div className={styles.pillarNum} style={{ marginBottom: 8 }}>{o.n}</div>
                <h3 className={styles.serifTitle} style={{ fontSize: "clamp(14.5px,1.25vw,16.5px)", color: "var(--navy)", marginBottom: 6 }}>{o.title}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--body)", margin: 0 }}>{o.blurb}</p>
              </div>
            ))}
          </article>
        </section>

        {/* the numbers, one card each. The reference's own stat row runs
            four distinct surfaces (dark green, lime, black, photo) — one
            gold card here borrows that rhythm instead of leaving the token
            unused. Both bone and gold inherit --ink from the canvas, so
            unlike the navy card that used to sit here, neither needs a
            color override. */}
        <section className={styles.bento}>
          {STATS.map((s, i) => (
            <article key={s.label} data-reveal className={`${styles.card} ${i === 1 ? styles.cardGold : styles.cardBone} ${styles.colQuarter}`}>
              <div className={styles.statNum}>
                <CountUp to={s.num} suffix={s.suffix} />
              </div>
              <div className={styles.statRule}>
                <span className={styles.statDot} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </article>
          ))}
        </section>

        {/* the specialty: a photo card beside the argument */}
        <section id="specialty" className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colHalf}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/miami-palms-sunset.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardCream} ${styles.colHalf}`}>
            <Tag glyph="globe">{m.specialtyTag}</Tag>
            <h2 className={styles.display} style={{ fontSize: "clamp(27px,2.9vw,42px)", color: "var(--navy)", maxWidth: "14ch", marginBottom: 16 }}>
              {d.fnTitle1} {d.fnTitle2}
            </h2>
            <p style={{ fontSize: "clamp(14.5px,1.15vw,16px)", lineHeight: 1.68, color: "var(--body)", margin: 0, maxWidth: "46ch" }}>{d.fnTeaser}</p>

            <div className={styles.stepShell}>
              <div className={styles.stepCore}>
                <div className={styles.kicker} style={{ paddingBottom: 6 }}>{m.caseFlowLabel}</div>
                {d.fnSteps.map((s) => (
                  <div key={s.n} className={styles.step}>
                    <span className={styles.stepNum}>{s.n}</span>
                    <span className={styles.stepName}>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.cardFoot}>
              <a href="/m/foreign-nationals" className={`${styles.pill} ${styles.pillDark}`}>
                {m.fnCta} <span className={styles.pillDisc} aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </section>

        {/* the assistant and the shelf */}
        <section id="products" className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardNavy} ${styles.colHalf}`}>
            <div className={styles.topo} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
              <Tag glyph="layers" dark>{m.aiTag}</Tag>
              <h2 className={styles.display} style={{ fontSize: "clamp(27px,2.9vw,42px)", color: "#fff", maxWidth: "14ch" }}>{d.aiTitle}</h2>
              <p className={styles.statementBody}>{d.aiBody}</p>
              <div className={styles.cardFoot}>
                <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.pill} ${styles.pillLight}`}>
                  {m.aiCta} <span className={styles.pillDisc} aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardBone} ${styles.colHalf}`}>
            <Tag glyph="shield">{m.productsTag}</Tag>
            <div style={{ marginTop: "auto" }}>
              {t.products.map((p) => (
                <div key={p.name} className={styles.prodRow} style={{ borderColor: "var(--hair)" }}>
                  <span className={styles.prodName} style={{ color: "var(--navy)" }}>{p.name}</span>
                  <span className={styles.prodDesc} style={{ color: "var(--muted)" }}>{p.desc}</span>
                </div>
              ))}
            </div>
            <div className={styles.cardFoot}>
              <a href="/m/products" className={`${styles.pill} ${styles.pillLine}`}>
                {t.cta.explore} <span className={styles.pillDisc} aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </section>

        {/* ————— the breath. The one chapter with no card around it: the
            statement sits on the bare canvas with air on every side, so the
            blocks before and after read as a decision rather than a template.
            ————— */}
        <section className={styles.breath}>
          <div data-reveal className={styles.breathInner}>
            <span className={styles.breathMark} aria-hidden="true">&ldquo;</span>
            <p className={styles.breathText}>{d.statement}</p>
            <div className={styles.breathAttrib}>
              <span className={styles.breathRule} aria-hidden="true" />
              {m.quoteTag}
            </div>
          </div>
        </section>

        {/* the firm */}
        <section id="firm" className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardCream} ${styles.colHalf}`}>
            <Tag glyph="compass">{m.firmTag}</Tag>
            <h2 className={styles.display} style={{ fontSize: "clamp(26px,2.7vw,40px)", color: "var(--navy)", maxWidth: "15ch", marginBottom: 18 }}>
              {m.firmTitle}
            </h2>
            <p style={{ fontSize: "clamp(14.5px,1.15vw,16px)", lineHeight: 1.68, color: "var(--body)", margin: "0 0 22px", maxWidth: "48ch" }}>{m.firmBody}</p>
            <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--hair)" }}>
              <div className={styles.kicker} style={{ marginBottom: 10 }}>{t.carriersLabel}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--body)", margin: 0 }}>{d.tellusBody}</p>
            </div>
            <div className={styles.cardFoot}>
              <a href="/m/firm" className={`${styles.pill} ${styles.pillLine}`}>
                {t.nav.firm} <span className={styles.pillDisc} aria-hidden="true">→</span>
              </a>
            </div>
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colHalf}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/handshake-office.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>
        </section>

        <MClosing lang={lang} />
        <MFooter lang={lang} />
      </div>
    </div>
  );
}
