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

// Meridian , the magnar.ai language on Brandon's brand and Brandon's own words.
// What is preserved from the reference: a full-bleed graded vista behind a
// centered geometric-sans masthead with a pill badge and one floating light
// card; warm bone canvas in two tones; huge left headlines paired with a right
// paragraph; hairline-divided numbered blocks whose titles are serif; giant
// tabular stat numbers; rounded photo/panel pairs; pill controls; a dark band
// and a dark multi-column footer.
// What is adapted: magnar's near-black becomes Brandon navy, its accent becomes
// Brandon gold, and every word comes from brandonbrokerage.com.

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
    announce: "A leading Tellus / Crump firm, serving producers and advisors since the 1960s.",
    announceCta: "Talk to a director",
    heroCardKicker: "The case desk",
    heroCardLine: "Tell us about your case or your book of business. A brokerage director responds within one business day.",
    heroLink: "See what we place",
    carrierLabel: "Some of our carriers",
    carrierCta: "30+ top-rated carriers",
    offerKicker: "Why agents place through Brandon",
    offerTitle: "Carriers quote. Brandon places the case.",
    offerBody: "Agents who write complex business do not lose weeks learning a carrier's appetite or chasing paperwork between offices. One team in Coral Gables designs the case, packages the application, argues the underwriting and delivers the policy, across an open architecture of 30+ carriers.",
    statesLabel: "States licensed",
    specialtyKicker: "Signature specialty",
    caseFlowLabel: "How a case moves",
    fnCta: "Start a foreign national case",
    aiKicker: "Brandon Latam Network",
    aiCta: "Open the platform",
    productsKicker: "Products",
    firmKicker: "Real adoption",
    firmTitle: "The firms that place difficult business place it here.",
    firmBody: "Our customers are other businesses looking to expand their book by offering life insurance alongside their core line: P&C agencies, law firms, banks, financial advisors, accountants and independent agents.",
    closingBody: "Tell us about your case or your book of business. A brokerage director responds within one business day.",
    footProduct: "Product",
    footFirm: "Firm",
    footContact: "Contact",
    footAbout: "Advanced sales support, full case management and 30+ top-rated carriers, from one Coral Gables office.",
  },
  es: {
    announce: "Firma líder de Tellus / Crump, al servicio de productores y asesores desde los años 60.",
    announceCta: "Hablar con un director",
    heroCardKicker: "La mesa de casos",
    heroCardLine: "Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.",
    heroLink: "Vea lo que colocamos",
    carrierLabel: "Algunas de nuestras aseguradoras",
    carrierCta: "Más de 30 aseguradoras top",
    offerKicker: "Por qué los agentes colocan con Brandon",
    offerTitle: "Las aseguradoras cotizan. Brandon coloca el caso.",
    offerBody: "Los agentes que escriben negocio complejo no pierden semanas aprendiendo el apetito de cada aseguradora ni persiguiendo papeles entre oficinas. Un solo equipo en Coral Gables diseña el caso, arma la solicitud, discute el underwriting y entrega la póliza, sobre una arquitectura abierta de más de 30 aseguradoras.",
    statesLabel: "Estados con licencia",
    specialtyKicker: "Especialidad distintiva",
    caseFlowLabel: "Cómo avanza un caso",
    fnCta: "Iniciar un caso extranjero",
    aiKicker: "Brandon Latam Network",
    aiCta: "Abrir la plataforma",
    productsKicker: "Productos",
    firmKicker: "Adopción real",
    firmTitle: "Las firmas que colocan negocio difícil lo colocan acá.",
    firmBody: "Nuestros clientes son otras empresas que buscan ampliar su cartera ofreciendo seguros de vida junto a su línea principal: agencias de P&C, estudios jurídicos, bancos, asesores financieros, contadores y agentes independientes.",
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

  return (
    <div ref={pageRef} className={styles.page}>
      {/* ————— announce bar: the Tellus/Crump affiliation leads, the way
          magnar leads with its product news ————— */}
      <div className={styles.announce}>
        <span className={styles.announceNote}>{m.announce}</span>
        <a href={OFFICE.phoneHref} className={styles.announceLink}>
          {m.announceCta} <span aria-hidden="true">→</span>
        </a>
      </div>

      {/* ————— header ————— */}
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
          <LangToggle lang={lang} setLang={setLang} color={scrolled ? "rgba(74,85,104,0.7)" : "rgba(245,241,232,0.6)"} activeColor={scrolled ? "#14224a" : "#f5f1e8"} />
          <a href={OFFICE.phoneHref} className={`${styles.pill} ${scrolled ? styles.pillDark : styles.pillLight} ${styles.pillSm} ${styles.navHideSm}`}>
            {t.cta.partner}
          </a>

          {/* under 780px the section links collapse into the shared panel, so
              the page is still navigable on a phone */}
          <span className={styles.navBurger}>
            <MobileMenu
              links={[...NAV[lang], { href: NETWORK_URL, label: t.nav.assistant }]}
              ctaLabel={t.cta.partner}
              ctaHref={OFFICE.phoneHref}
              panelBg="#0f1a38"
              textColor="#f5f1e8"
              accentColor="#c2a15b"
              toggleColor={scrolled ? "#14224a" : "#f5f1e8"}
            />
          </span>
        </nav>
      </header>

      {/* ————— hero ————— */}
      <section id="top" className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-aerial-day.jpg" alt="" className={styles.heroPhoto} fetchPriority="high" />
        <div className={styles.heroWash} aria-hidden="true" />

        <div className={styles.heroInner}>
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.badgeDot} aria-hidden="true" />
            {t.heroKicker}
          </motion.span>

          <motion.h1
            className={`${styles.display} ${styles.heroTitle}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {d.heroLine1} {d.heroLine2}
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.heroSub}
          </motion.p>

          {/* the floating card: magnar puts its product's first move here, so
              this one carries Brandon's , the desk that answers the phone */}
          <motion.div
            className={styles.heroCard}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.heroCardCopy}>
              <span className={styles.kicker}>{m.heroCardKicker}</span>
              <p className={styles.heroCardLine}>{m.heroCardLine}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
              <a href={OFFICE.phoneHref} className={styles.heroPhone}>{OFFICE.phone}</a>
              <a href="#contact" className={`${styles.pill} ${styles.pillDark} ${styles.pillSm}`}>
                {t.cta.partner} <span className={styles.pillArrow} aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>

          <motion.a
            href="#offer"
            className={styles.heroLink}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {m.heroLink}
          </motion.a>
        </div>
      </section>

      {/* ————— carrier bar ————— */}
      <div className={styles.carrierBar}>
        <div className={styles.carrierHead}>
          <span className={styles.kicker}>{m.carrierLabel}</span>
          <span className={styles.kicker} style={{ color: "var(--gold-deep)" }}>{m.carrierCta}</span>
        </div>
        <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}>
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

      {/* ————— what we offer: the split headline, then the numbered pillars ————— */}
      <section id="offer" className={`${styles.section} ${styles.sectionBone}`}>
        <div className={styles.wrap}>
          <div data-reveal className={styles.kicker} style={{ marginBottom: 22 }}>{m.offerKicker}</div>
          <div className={styles.split}>
            <h2 data-reveal className={`${styles.display} ${styles.splitTitle}`}>{m.offerTitle}</h2>
            <p data-reveal className={styles.splitBody}>{m.offerBody}</p>
          </div>

          <div className={styles.pillars}>
            {OFFERINGS.map((o) => (
              <article key={o.n} data-reveal className={styles.pillar}>
                <span className={styles.pillarNum}>{o.n}</span>
                <h3 className={styles.pillarTitle}>{o.title}</h3>
                <p className={styles.pillarBody}>{o.blurb}</p>
              </article>
            ))}
          </div>

          <div className={styles.stats} style={{ marginTop: "clamp(40px,5vw,72px)" }}>
            {[
              { num: 60, suffix: "+", label: t.stats.years },
              { num: 30, suffix: "+", label: t.stats.carriers },
              { num: 5, suffix: "", label: t.stats.lines },
              { num: 50, suffix: "", label: m.statesLabel },
            ].map((s) => (
              <div key={s.label} data-reveal className={styles.stat}>
                <div className={styles.statNum}>
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— the specialty, as magnar's photo/panel pair ————— */}
      <section id="specialty" className={`${styles.section} ${styles.sectionDeep}`}>
        <div className={styles.wrap}>
          <div className={styles.feature}>
            <div data-reveal className={styles.featureMedia}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-palms-sunset.jpg" alt="" className={styles.featureImg} loading="lazy" />
            </div>

            <div data-reveal className={styles.featurePanel}>
              <div className={styles.featureHead}>
                <span className={styles.kicker}>01</span>
                <span className={styles.kicker}>{m.specialtyKicker}</span>
              </div>

              <h2 className={`${styles.display} ${styles.featureTitle}`}>
                {d.fnTitle1} {d.fnTitle2}
              </h2>
              <p className={styles.featureBody}>{d.fnTeaser}</p>

              <div className={styles.steps}>
                <div className={styles.kicker} style={{ paddingTop: 16, paddingBottom: 4 }}>{m.caseFlowLabel}</div>
                {d.fnSteps.map((s) => (
                  <div key={s.n} className={styles.step}>
                    <span className={styles.stepNum}>{s.n}</span>
                    <span className={styles.stepName}>{s.title}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className={`${styles.pill} ${styles.pillDark}`} style={{ marginTop: "clamp(24px,3vw,34px)", alignSelf: "flex-start" }}>
                {m.fnCta} <span className={styles.pillArrow} aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ————— dark band: the assistant hand-off and the product shelf ————— */}
      <section id="products" className={styles.dark}>
        <div className={styles.wrap}>
          <div className={styles.split}>
            <div>
              <div data-reveal className={styles.kicker} style={{ color: "var(--gold)", marginBottom: 20 }}>{m.aiKicker}</div>
              <h2 data-reveal className={`${styles.display} ${styles.darkTitle}`}>{d.aiTitle}</h2>
              <p data-reveal className={styles.darkBody} style={{ margin: "20px 0 30px" }}>{d.aiBody}</p>
              <a data-reveal href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.pill} ${styles.pillLight}`}>
                {m.aiCta} <span className={styles.pillArrow} aria-hidden="true">↗</span>
              </a>
            </div>

            <div data-reveal className={styles.darkPanel}>
              <div className={styles.kicker} style={{ color: "rgba(245,241,232,0.5)", marginBottom: 16 }}>{m.productsKicker}</div>
              {t.products.map((p) => (
                <div key={p.name} className={styles.darkRow}>
                  <span className={styles.darkRowName}>{p.name}</span>
                  <span className={styles.darkRowDesc}>{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— adoption and the pull quote ————— */}
      <section id="firm" className={`${styles.section} ${styles.sectionBone}`}>
        <div className={styles.wrap}>
          <div className={styles.quoteGrid}>
            <div>
              <div data-reveal className={styles.kicker} style={{ marginBottom: 20 }}>{m.firmKicker}</div>
              <h2 data-reveal className={`${styles.display}`} style={{ fontSize: "clamp(28px,3.4vw,46px)", color: "var(--navy)", maxWidth: "15ch" }}>
                {m.firmTitle}
              </h2>
              <p data-reveal className={styles.splitBody} style={{ marginTop: 20 }}>{m.firmBody}</p>
              <div data-reveal style={{ marginTop: "clamp(26px,3vw,38px)", paddingTop: 20, borderTop: "1px solid var(--hair)" }}>
                <div className={styles.kicker} style={{ marginBottom: 10 }}>{t.carriersLabel}</div>
                <p className={styles.splitBody} style={{ fontSize: 14.5 }}>{d.tellusBody}</p>
              </div>
            </div>

            <div data-reveal className={styles.quoteRule}>
              <p className={styles.quoteText}>{d.statement}</p>
              <div className={styles.kicker} style={{ marginTop: "clamp(24px,3vw,34px)" }}>{t.quoteAttrib}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— closing CTA over the vista, the way magnar closes ————— */}
      <section id="contact" className={styles.closing}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/miami-sunset.jpg" alt="" className={styles.heroPhoto} loading="lazy" />
        <div className={styles.heroWash} aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 data-reveal className={`${styles.display} ${styles.closingTitle}`}>{t.contactTitle}</h2>
          <p data-reveal className={styles.closingBody}>{m.closingBody}</p>
          <div data-reveal style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillLight}`}>
              {OFFICE.phone} <span className={styles.pillArrow} aria-hidden="true">→</span>
            </a>
            {/* the second control is the toll-free desk: both numbers here are
                the firm's real ones, no invented inbox */}
            <a href={OFFICE.tollFreeHref} className={`${styles.pill} ${styles.pillGhost}`}>
              {OFFICE.tollFree}
            </a>
          </div>
        </div>
      </section>

      {/* ————— footer ————— */}
      <footer className={styles.footer}>
        <div className={styles.wrap}>
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
              <a href="#offer" className={styles.footLink}>{t.offerKicker}</a>
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
        </div>
      </footer>
    </div>
  );
}
