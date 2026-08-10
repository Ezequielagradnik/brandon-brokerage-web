"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { useLang } from "@/hooks/useLang";
import LangToggle from "@/components/LangToggle";
import MobileMenu from "@/components/MobileMenu";
import { CountUp } from "@/components/motion";
import { COPY, OFFERINGS_I18N } from "@/lib/copy";
import { CARRIERS, DEEP, OFFICE } from "@/lib/deep";
import { NETWORK_URL } from "@/lib/contact";
import styles from "./page.module.css";

// Meridian , boutique block architecture. The hero runs full bleed, and
// everything after it is a stack of rounded blocks inset on a bone canvas,
// with cards nested inside them at concentric radii and a glyph-and-pill tag
// opening every chapter. Navy carries the weight, gold the accent, and every
// word is Brandon's own.

const EASE = [0.32, 0.72, 0, 1] as const;

/* Ultra-light line glyphs, one per chapter. Drawn here rather than pulled
   from an icon set so the stroke weight matches the hairlines around them. */
function Glyph({ name }: { name: "compass" | "globe" | "layers" | "shield" | "quote" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className={styles.tagGlyph} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" {...common} opacity="0.45" />
      {name === "compass" && <path d="M15.2 8.8l-2 4.4-4.4 2 2-4.4z" {...common} />}
      {name === "globe" && <><path d="M2.8 12h18.4" {...common} /><path d="M12 2.8c2.4 2.5 3.7 5.8 3.7 9.2s-1.3 6.7-3.7 9.2c-2.4-2.5-3.7-5.8-3.7-9.2S9.6 5.3 12 2.8z" {...common} /></>}
      {name === "layers" && <><path d="M12 6.6l5 2.9-5 2.9-5-2.9z" {...common} /><path d="M7 13.1l5 2.9 5-2.9" {...common} /></>}
      {name === "shield" && <path d="M12 6.2l4 1.7v3.4c0 2.6-1.6 4.6-4 5.5-2.4-.9-4-2.9-4-5.5V7.9z" {...common} />}
      {name === "quote" && <path d="M9.6 14.4c-1.2 0-2-.9-2-2.1 0-2 1.5-3.7 3.4-4.3M16 14.4c-1.2 0-2-.9-2-2.1 0-2 1.5-3.7 3.4-4.3" {...common} />}
    </svg>
  );
}

function Tag({ glyph, children, dark = false }: { glyph: "compass" | "globe" | "layers" | "shield" | "quote"; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`${styles.tagRow} ${dark ? styles.tagDark : ""}`}>
      <Glyph name={glyph} />
      <span className={styles.tag}>{children}</span>
    </div>
  );
}

const NAV = {
  en: [
    { href: "#offer", label: "What we offer" },
    { href: "#specialty", label: "Foreign nationals" },
    { href: "#products", label: "Products" },
    { href: "#firm", label: "The firm" },
  ],
  es: [
    { href: "#offer", label: "Qué ofrecemos" },
    { href: "#specialty", label: "Clientes extranjeros" },
    { href: "#products", label: "Productos" },
    { href: "#firm", label: "La firma" },
  ],
} as const;

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
    closingBody: "Tell us about your case or your book of business. A brokerage director responds within one business day.",
    footProduct: "Product",
    footFirm: "Firm",
    footContact: "Contact",
    footAbout: "Advanced sales support, full case management and 30+ top-rated carriers, from one Coral Gables office.",
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
    closingBody: "Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.",
    footProduct: "Producto",
    footFirm: "Firma",
    footContact: "Contacto",
    footAbout: "Soporte avanzado de ventas, gestión integral de casos y más de 30 aseguradoras de primer nivel, desde una oficina en Coral Gables.",
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
      {/* ————— header: a white pill floating over the hero ————— */}
      <header className={`${styles.header} ${scrolled ? styles.headerSolid : ""}`}>
        <Link href="#top" className={styles.logoChip}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" width={140} height={28} fetchPriority="high" style={{ height: 28, width: "auto" }} />
        </Link>

        <nav className={styles.nav}>
          {NAV[lang].map((l) => (
            <a key={l.href} href={l.href} className={`${styles.navLink} ${styles.navHideMd}`}>
              {l.label}
            </a>
          ))}
          <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.navLink} ${styles.navTool} ${styles.navHideSm}`}>
            <span className={styles.navDot} aria-hidden="true" />
            {t.nav.assistant}
          </a>
          <span className={`${styles.navRule} ${styles.navHideSm}`} aria-hidden="true" />
          <LangToggle lang={lang} setLang={setLang} color="rgba(74,85,104,0.7)" activeColor="#14224a" />
          <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillDark} ${styles.pillSm} ${styles.pillPlain} ${styles.navHideSm}`}>
            {t.cta.partner}
          </a>

          <span className={styles.navBurger}>
            <MobileMenu
              links={[...NAV[lang], { href: NETWORK_URL, label: t.nav.assistant }]}
              ctaLabel={t.cta.partner}
              ctaHref={OFFICE.phoneHref}
              panelBg="#0d1730"
              textColor="#f5f1e8"
              accentColor="#c2a15b"
              toggleColor="#14224a"
            />
          </span>
        </nav>
      </header>

      {/* ————— hero: full bleed, edge to edge. The block architecture starts
          below it, so the page opens on the vista and only then settles into
          its stack of cards. ————— */}
      <section id="top" className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-aerial-day.jpg" alt="" className={styles.heroPhoto} fetchPriority="high" />
        <div className={styles.heroWash} aria-hidden="true" />

        <div className={styles.heroInner}>
          <motion.span className={styles.badge} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {t.heroKicker}
          </motion.span>

          <motion.h1 className={`${styles.display} ${styles.heroTitle}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            {d.heroLine1} {d.heroLine2}
          </motion.h1>

          <motion.p className={styles.heroSub} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.22, ease: EASE }}>
            {t.heroSub}
          </motion.p>

          {/* the desk, nested: a glass shell around a cream core */}
          <motion.div className={styles.heroShell} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.34, ease: EASE }}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardCopy}>
                <span className={styles.kicker}>{m.heroCardKicker}</span>
                <p className={styles.heroCardLine}>{m.heroCardLine}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
                <a href={OFFICE.phoneHref} className={styles.heroPhone}>{OFFICE.phone}</a>
                <a href="#contact" className={`${styles.pill} ${styles.pillDark} ${styles.pillSm}`}>
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

          {OFFERINGS.map((o, i) => (
            <article key={o.n} data-reveal className={`${styles.card} ${i % 3 === 0 ? styles.cardCream : styles.cardBone} ${styles.colQuarter}`}>
              <div className={styles.pillarNum}>{o.n}</div>
              <h3 className={`${styles.serifTitle} ${styles.pillarTitle}`}>{o.title}</h3>
              <p className={styles.pillarBody}>{o.blurb}</p>
            </article>
          ))}
        </section>

        {/* the numbers, one card each */}
        <section className={styles.bento}>
          {STATS.map((s, i) => (
            <article key={s.label} data-reveal className={`${styles.card} ${i === 1 ? styles.cardNavy : styles.cardBone} ${styles.colQuarter}`}>
              <div className={styles.statNum} style={{ color: i === 1 ? "#fff" : "var(--navy)" }}>
                <CountUp to={s.num} suffix={s.suffix} />
              </div>
              <div className={styles.statRule} style={{ color: i === 1 ? "var(--gold-soft)" : "var(--navy)" }}>
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
              <a href="#contact" className={`${styles.pill} ${styles.pillDark}`}>
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
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colHalf}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/handshake-office.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>
        </section>

        {/* closing block */}
        <section id="contact" className={`${styles.block} ${styles.closing}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/miami-sunset.jpg" alt="" className={styles.heroPhoto} loading="lazy" />
          <div className={styles.heroWash} aria-hidden="true" />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 data-reveal className={`${styles.display} ${styles.closingTitle}`}>{t.contactTitle}</h2>
            <p data-reveal className={styles.closingBody}>{m.closingBody}</p>
            <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillLight}`}>
                {OFFICE.phone} <span className={styles.pillDisc} aria-hidden="true">→</span>
              </a>
              {/* the second control is the toll-free desk: both numbers here
                  are the firm's real ones, no invented inbox */}
              <a href={OFFICE.tollFreeHref} className={`${styles.pill} ${styles.pillGhost} ${styles.pillPlain}`}>
                {OFFICE.tollFree}
              </a>
            </div>
          </div>
        </section>

        {/* footer block */}
        <footer className={`${styles.block} ${styles.footer}`}>
          <div className={styles.footGrid}>
            <div>
              <div style={{ background: "rgba(245,241,232,0.94)", borderRadius: 999, padding: "8px 16px", display: "inline-flex", marginBottom: 18 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 24, width: "auto" }} />
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(245,241,232,0.68)", margin: 0, maxWidth: 340 }}>{m.footAbout}</p>
            </div>

            <div>
              <div className={styles.footHead}>{m.footProduct}</div>
              {t.products.map((p) => (
                <a key={p.name} href="#products" className={styles.footLink}>{p.name}</a>
              ))}
            </div>

            <div>
              <div className={styles.footHead}>{m.footFirm}</div>
              <a href="#offer" className={styles.footLink}>{m.offerTag}</a>
              <a href="#specialty" className={styles.footLink}>{d.nav.foreign}</a>
              <a href="#firm" className={styles.footLink}>{d.nav.firm}</a>
              <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.footLink}>{t.nav.assistant} ↗</a>
            </div>

            <div>
              <div className={styles.footHead}>{m.footContact}</div>
              <a href={OFFICE.phoneHref} className={styles.footLink}>{OFFICE.phone}</a>
              <a href={OFFICE.tollFreeHref} className={styles.footLink}>{OFFICE.tollFree}</a>
              <span className={styles.footLink} style={{ opacity: 0.75 }}>{OFFICE.street}</span>
              <span className={styles.footLink} style={{ opacity: 0.75 }}>{OFFICE.city}</span>
            </div>
          </div>

          <div className={styles.footBottom}>
            <span>{t.rights}</span>
            <span>{t.licensed}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
