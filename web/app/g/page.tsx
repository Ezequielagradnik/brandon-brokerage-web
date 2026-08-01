"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import { ScrollProgress, MaskReveal, FadeIn, CountUp, GrowLine, ParallaxImg, Magnetic, ctaFillFromCursor } from "@/components/motion";
import styles from "./page.module.css";

// Palette shared with Brandon Latam Network (sister firm)
const NAVY = "#14224a";
const GRAY = "#475467";
const GOLD = "#c2a15b";
const GOLD_DEEP = "#9a7b32";
const HAIR = "1px solid rgba(20,34,74,0.14)";

type Lang = "en" | "es";

const T = {
  en: {
    nav: { solutions: "Solutions", firm: "The Firm", insights: "Insights", contact: "Contact", cta: "Partner with us" },
    heroEyebrow: "Est. the 1970s · Coral Gables, Florida",
    heroLine1: "The quiet partner behind",
    heroLine2: "extraordinary cases.",
    heroSub: "Brandon Brokerage Group partners with producers and financial advisors to deliver customized business solutions — advanced sales support, full case management and access to 30+ top-rated carriers.",
    heroCta: "Partner with us",
    heroLink: "Our solutions",
    stats: [
      { num: 50, suffix: "+", label: "Years of expertise" },
      { num: 30, suffix: "+", label: "Top-rated carriers" },
      { num: 5, suffix: "", label: "Product lines" },
      { num: null, text: "FN", label: "Foreign national leader" },
    ],
    solKicker: "Solutions",
    solTitle: "Everything behind the case you write.",
    solutions: [
      { title: "Solutions for Foreign National Clients", blurb: "An industry leader in the foreign national market, with customized strategies for your international clients." },
      { title: "Advanced Sales Support", blurb: "Case design, sales concepts, carrier insight and point-of-sale support across every line we broker." },
      { title: "Full Case Management", blurb: "A dedicated new-business team runs underwriting and paperwork from application to policy delivery." },
      { title: "Quality Carriers & Products", blurb: "A leading Tellus/Crump firm with full access to 30+ top-rated carriers, nationwide." },
    ],
    solMore: "Learn more",
    appKicker: "Our approach",
    appTitle: "A family of firms, one standard.",
    appItems: [
      { k: "Mission", t: "To provide agents with superior service, personalized sales support and tailored business solutions that build long-term relationships." },
      { k: "Vision", t: "To be the brokerage partner of record for advisors serving domestic and international clients — pioneering custom solutions that reflect each client's values." },
      { k: "Experience", t: "Five decades placing complex cases from the same Coral Gables office — alongside our sister firm, Brandon Latam, serving families across the Americas." },
    ],
    spcKicker: "Signature specialty",
    spcTitle1: "We place the cases",
    spcTitle2: "others turn away.",
    spcBody: "With over 50 years of experience, we are an industry leader in the foreign national market. Customized sales strategies and wealth-management solutions for your international clients — always within carrier, state and federal guidelines.",
    spcCta: "Partner with us",
    insKicker: "Insights",
    insTitle: "Ideas for the cases ahead.",
    insights: [
      { date: "April 2026", title: "Life insurance for foreign nationals: what to know in 2026", excerpt: "Carrier appetite, documentation and the questions to settle before the exam." },
      { date: "March 2026", title: "Term or permanent? Framing the choice for high-net-worth clients", excerpt: "A simple framework for positioning coverage as part of a wealth plan." },
      { date: "February 2026", title: "Hybrid long-term care is winning the conversation", excerpt: "Why advisors lead with hybrid designs — and when traditional still fits." },
      { date: "January 2026", title: "Underwriting the complex case: a producer's checklist", excerpt: "Packaging, medical records and timing — how to keep a hard case moving." },
    ],
    insMore: "Read more",
    ctaKicker: "Contact",
    ctaTitle: "Let's talk.",
    ctaBody: "Tell us about your case or your book of business. A brokerage director responds within one business day.",
    ctaBtn: "Partner with us",
    phone: "Phone",
    tollFree: "Toll-free",
    office: "Office",
    footNav: "Navigation",
    footContact: "Contact",
    disclaimer: "Brandon Brokerage Group is an insurance brokerage serving licensed agents and financial advisors. Products are subject to carrier approval and state availability. Nothing on this site constitutes legal, tax or investment advice.",
    rights: "© 1970s–2026 Brandon Brokerage Group · For licensed agents & advisors only",
  },
  es: {
    nav: { solutions: "Soluciones", firm: "La Firma", insights: "Insights", contact: "Contacto", cta: "Trabajemos juntos" },
    heroEyebrow: "Desde los años 70 · Coral Gables, Florida",
    heroLine1: "El socio silencioso detrás de",
    heroLine2: "casos extraordinarios.",
    heroSub: "Brandon Brokerage Group trabaja junto a productores y asesores financieros para entregar soluciones de negocio a medida: soporte avanzado de ventas, gestión integral de casos y acceso a más de 30 aseguradoras de primer nivel.",
    heroCta: "Trabajemos juntos",
    heroLink: "Nuestras soluciones",
    stats: [
      { num: 50, suffix: "+", label: "Años de experiencia" },
      { num: 30, suffix: "+", label: "Aseguradoras top" },
      { num: 5, suffix: "", label: "Líneas de producto" },
      { num: null, text: "FN", label: "Líder en foreign nationals" },
    ],
    solKicker: "Soluciones",
    solTitle: "Todo lo que hay detrás de cada caso.",
    solutions: [
      { title: "Soluciones para Clientes Extranjeros", blurb: "Líderes en el mercado de foreign nationals, con estrategias a medida para sus clientes internacionales." },
      { title: "Soporte Avanzado de Ventas", blurb: "Diseño de casos, conceptos de venta, conocimiento de aseguradoras y apoyo en el punto de venta." },
      { title: "Gestión Integral de Casos", blurb: "Un equipo dedicado lleva el underwriting y la documentación desde la solicitud hasta la entrega de la póliza." },
      { title: "Aseguradoras y Productos de Calidad", blurb: "Firma líder de Tellus/Crump con acceso a más de 30 aseguradoras de primer nivel en todo el país." },
    ],
    solMore: "Conocer más",
    appKicker: "Nuestro enfoque",
    appTitle: "Una familia de firmas, un mismo estándar.",
    appItems: [
      { k: "Misión", t: "Brindar a los agentes un servicio superior, soporte de ventas personalizado y soluciones a medida que construyan relaciones de largo plazo." },
      { k: "Visión", t: "Ser el socio de brokerage de referencia para asesores con clientes locales e internacionales, creando soluciones que reflejen los valores de cada cliente." },
      { k: "Experiencia", t: "Cinco décadas colocando casos complejos desde la misma oficina de Coral Gables, junto a nuestra firma hermana, Brandon Latam." },
    ],
    spcKicker: "Especialidad distintiva",
    spcTitle1: "Colocamos los casos que",
    spcTitle2: "otros rechazan.",
    spcBody: "Con más de 50 años de experiencia, somos líderes en el mercado de foreign nationals. Estrategias de venta y soluciones de wealth management a medida para sus clientes internacionales, siempre dentro de las normas de cada aseguradora, estado y regulación federal.",
    spcCta: "Trabajemos juntos",
    insKicker: "Insights",
    insTitle: "Ideas para los casos que vienen.",
    insights: [
      { date: "Abril 2026", title: "Seguros de vida para foreign nationals: claves 2026", excerpt: "Apetito de las aseguradoras, documentación y qué resolver antes del examen." },
      { date: "Marzo 2026", title: "¿Term o permanente? Cómo plantear la decisión", excerpt: "Un marco simple para posicionar la cobertura dentro del plan patrimonial." },
      { date: "Febrero 2026", title: "Long-term care híbrido: por qué lidera la conversación", excerpt: "Por qué los asesores proponen diseños híbridos, y cuándo conviene el tradicional." },
      { date: "Enero 2026", title: "Underwriting de casos complejos: checklist del productor", excerpt: "Armado del expediente, historia médica y tiempos: cómo destrabar un caso difícil." },
    ],
    insMore: "Leer más",
    ctaKicker: "Contacto",
    ctaTitle: "Conversemos.",
    ctaBody: "Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.",
    ctaBtn: "Trabajemos juntos",
    phone: "Teléfono",
    tollFree: "Línea gratuita",
    office: "Oficina",
    footNav: "Navegación",
    footContact: "Contacto",
    disclaimer: "Brandon Brokerage Group es un brokerage de seguros que atiende a agentes y asesores financieros con licencia. Los productos están sujetos a la aprobación de cada aseguradora y a la disponibilidad por estado. Nada en este sitio constituye asesoramiento legal, impositivo o de inversión.",
    rights: "© 1970s–2026 Brandon Brokerage Group · Solo para agentes y asesores con licencia",
  },
} as const;

export default function ConceptG() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useScrollReveal(pageRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serif = "var(--font-lora), serif";
  const sans = "var(--font-manrope), sans-serif";
  const kicker: React.CSSProperties = { fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD_DEEP, fontWeight: 600 };

  const NAV_LINKS = [
    { href: "#solutions", label: t.nav.solutions },
    { href: "#firm", label: t.nav.firm },
    { href: "#insights", label: t.nav.insights },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />

      {/* NAV — transparent over hero, solid navy on scroll */}
      <div
        className={styles.headerBar}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
          padding: scrolled ? "14px clamp(20px,5vw,60px)" : "22px clamp(20px,5vw,60px)",
          background: scrolled ? "rgba(20,34,74,0.96)" : "linear-gradient(180deg, rgba(16,24,40,0.45), transparent)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(194,161,91,0.25)" : "1px solid transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: scrolled ? 24 : 28, transition: "height 0.35s ease" }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
            <button type="button" onClick={() => setLang("en")} className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`}>EN</button>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>/</span>
            <button type="button" onClick={() => setLang("es")} className={`${styles.langBtn} ${lang === "es" ? styles.langActive : ""}`}>ES</button>
          </span>
          <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ padding: "11px 24px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.nav.cta}</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel={t.nav.cta}
          ctaHref="#contact"
          panelBg={NAVY}
          textColor="#ffffff"
          accentColor={GOLD}
        />
      </div>

      {/* HERO — full-screen photo, slow Ken Burns, choreographed entrance */}
      <div id="top" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "flex-end", overflow: "hidden", padding: "clamp(120px,14vw,180px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <motion.img
            src="/images/miami-palms-sunset.jpg"
            alt=""
            data-photo-slot="hero"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: [1.1, 1] }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 34, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.5), rgba(16,24,40,0.25) 40%, rgba(16,24,40,0.78) 92%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", width: "100%" }}>
          <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ width: 42, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d9c291" }}>{t.heroEyebrow}</span>
          </FadeIn>
          <h1 key={lang} style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(40px,6.2vw,84px)", lineHeight: 1.08, margin: "0 0 28px", color: "#ffffff", letterSpacing: "-0.005em", maxWidth: 900 }}>
            <MaskReveal delay={0.25}>{t.heroLine1}</MaskReveal>
            <MaskReveal delay={0.4}><span style={{ fontStyle: "italic", color: "#d9c291" }}>{t.heroLine2}</span></MaskReveal>
          </h1>
          <FadeIn delay={0.75}>
            <p style={{ fontSize: "clamp(16px,1.4vw,18.5px)", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", fontWeight: 400, maxWidth: 560, margin: "0 0 38px" }}>{t.heroSub}</p>
          </FadeIn>
          <FadeIn delay={0.9} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 36px", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.heroCta}</a>
            </Magnetic>
            <a href="#solutions" className={styles.lnk} style={{ fontSize: 13.5, letterSpacing: "0.04em", color: "rgba(255,255,255,0.9)" }}>{t.heroLink}</a>
          </FadeIn>
        </div>
        <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <span style={{ display: "block", width: 1, height: 42, background: "linear-gradient(#c2a15b, transparent)" }} />
        </div>
      </div>

      {/* STATS — drawn hairlines + count-up */}
      <div data-reveal style={{ padding: "clamp(52px,6vw,80px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {t.stats.map((s, i) => (
            <div key={s.label}>
              <GrowLine color={GOLD} delay={i * 0.12} />
              <div style={{ paddingTop: 20 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(34px,3.6vw,50px)", fontWeight: 500, color: NAVY, lineHeight: 1 }}>
                  {s.num !== null ? <CountUp to={s.num} suffix={s.suffix} /> : s.text}
                </div>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: GRAY, marginTop: 12 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SOLUTIONS — photo-cards, the bblatam signature */}
      <div id="solutions" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ marginBottom: "clamp(40px,5vw,64px)", maxWidth: 660 }}>
            <div style={{ ...kicker, marginBottom: 20 }}>{t.solKicker}</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4.2vw,52px)", lineHeight: 1.12, margin: 0, color: NAVY }}>{t.solTitle}</h2>
          </div>
          <div className={styles.solGrid}>
            {OFFERINGS.map((o, i) => (
              <motion.a
                key={o.n}
                href="#contact"
                className={styles.solCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.solImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.img} alt={t.solutions[i].title} className={styles.solImg} data-photo-slot={`offer-${o.n}`} />
                </div>
                <span className={styles.solHair} aria-hidden="true" />
                <div className={styles.solBody}>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 22, margin: "0 0 10px", color: NAVY, lineHeight: 1.2 }}>{t.solutions[i].title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.66, color: GRAY, fontWeight: 400, margin: "0 0 14px" }}>{t.solutions[i].blurb}</p>
                  <span className={styles.solMore} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: NAVY, fontWeight: 600 }}>{t.solMore} →</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* OUR APPROACH — side photo + mission/vision/experience columns */}
      <div id="firm" style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#f9fafb", borderTop: HAIR, borderBottom: HAIR }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div data-reveal>
            <ParallaxImg
              src="/images/handshake-clean.jpg"
              alt="Brandon Brokerage Group"
              range={30}
              photoSlot="approach"
              style={{ height: "clamp(320px,44vw,540px)" }}
              imgStyle={{ filter: "saturate(0.75)" }}
            />
          </div>
          <div>
            <div data-reveal style={{ ...kicker, marginBottom: 20 }}>{t.appKicker}</div>
            <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,3.6vw,44px)", lineHeight: 1.15, margin: "0 0 clamp(28px,3vw,40px)", color: NAVY }}>{t.appTitle}</h2>
            {t.appItems.map((it) => (
              <div key={it.k} data-reveal style={{ borderTop: "1px solid rgba(194,161,91,0.45)", padding: "22px 0" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD_DEEP, fontWeight: 700, marginBottom: 10 }}>{it.k}</div>
                <p style={{ fontSize: 15, lineHeight: 1.72, color: GRAY, margin: 0 }}>{it.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPECIALTY — navy band, /h copy */}
      <div style={{ position: "relative", padding: "clamp(90px,12vw,160px) clamp(20px,5vw,60px)", background: NAVY, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
          <ParallaxImg src="/images/miami-night.jpg" alt="" range={44} settle={false} photoSlot="specialty" style={{ position: "absolute", inset: 0 }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d9c291", fontWeight: 600, marginBottom: 28 }}>{t.spcKicker}</div>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px,5vw,66px)", lineHeight: 1.1, margin: "0 0 30px", color: "#fff", maxWidth: 760 }}>
            <MaskReveal inView delay={0.1}>{t.spcTitle1}</MaskReveal>
            <MaskReveal inView delay={0.25}><span style={{ fontStyle: "italic", color: "#d9c291" }}>{t.spcTitle2}</span></MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: "clamp(15.5px,1.4vw,18px)", lineHeight: 1.75, color: "rgba(255,255,255,0.82)", margin: "0 0 36px", maxWidth: 580 }}>{t.spcBody}</p>
          <a data-reveal href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.spcCta}</a>
        </div>
      </div>

      {/* INSIGHTS — four article cards */}
      <div id="insights" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: "clamp(36px,4vw,56px)" }}>
            <div>
              <div style={{ ...kicker, marginBottom: 20 }}>{t.insKicker}</div>
              <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,3.8vw,46px)", margin: 0, color: NAVY }}>{t.insTitle}</h2>
            </div>
          </div>
          <div className={styles.insGrid}>
            {t.insights.map((a, i) => (
              <motion.a
                key={a.title}
                href="#contact"
                className={styles.insCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD_DEEP, fontWeight: 700, marginBottom: 14 }}>{a.date}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 20, lineHeight: 1.3, margin: "0 0 12px", color: NAVY }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: GRAY, margin: "0 0 16px" }}>{a.excerpt}</p>
                <span className={styles.insMore} style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY, fontWeight: 600 }}>{t.insMore} →</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BAND + CONTACT */}
      <div id="contact" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: NAVY }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#d9c291", fontWeight: 600, marginBottom: 26 }}>{t.ctaKicker}</div>
            <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(40px,6vw,80px)", lineHeight: 1.02, margin: "0 0 24px", color: "#fff" }}>{t.ctaTitle}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.78)", margin: "0 0 34px", maxWidth: 440 }}>{t.ctaBody}</p>
            <Magnetic>
              <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 36px", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.ctaBtn}</a>
            </Magnetic>
          </div>
          <div data-reveal style={{ borderTop: "1px solid rgba(194,161,91,0.5)" }}>
            {[[t.phone, "305-444-7401", "tel:+13054447401"], [t.tollFree, "1-888-776-4678", "tel:+18887764678"]].map(([l, v, href]) => (
              <a key={l} href={href} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}>
                <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>{l}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(20px,2.2vw,26px)" }}>{v}</span>
              </a>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
              <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>{t.office}</span>
              <span style={{ fontFamily: serif, fontSize: "clamp(16px,1.7vw,20px)", color: "#fff", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER — dark, with legal disclaimer */}
      <footer style={{ background: "#0e1833", padding: "clamp(44px,6vw,64px) clamp(20px,5vw,60px) 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(28px,4vw,56px)", paddingBottom: "clamp(32px,4vw,48px)" }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: 24, marginBottom: 18, opacity: 0.9 }} />
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: 300 }}>{t.disclaimer}</p>
            </div>
            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c2a15b", fontWeight: 700, marginBottom: 16 }}>{t.footNav}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c2a15b", fontWeight: 700, marginBottom: 16 }}>{t.footContact}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>
                <a href="tel:+13054447401" style={{ color: "rgba(255,255,255,0.75)" }}>305-444-7401</a>
                <a href="tel:+18887764678" style={{ color: "rgba(255,255,255,0.75)" }}>1-888-776-4678</a>
                <span style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{t.rights}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>brandonbrokerage.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
