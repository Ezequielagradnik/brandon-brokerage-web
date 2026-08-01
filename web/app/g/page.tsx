"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { ScrollProgress, MaskReveal, FadeIn, CountUp, GrowLine, ParallaxImg, Magnetic, CursorDot, ctaFillFromCursor } from "@/components/motion";
import styles from "./page.module.css";

// Palette shared with Brandon Latam Network (sister firm)
const NAVY = "#14224a";
const GRAY = "#475467";
const GOLD = "#c2a15b";
const GOLD_DEEP = "#9a7b32";
const HAIR = "1px solid rgba(20,34,74,0.14)";

const serif = "var(--font-lora), serif";
const sans = "var(--font-manrope), sans-serif";
const mono = "var(--font-plex-mono), monospace";

// Editorial masthead scale — the page's typographic peaks
const MASTHEAD: React.CSSProperties = {
  fontFamily: serif,
  fontWeight: 500,
  fontSize: "clamp(52px,7.5vw,120px)",
  lineHeight: 0.98,
  letterSpacing: "-0.03em",
};

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

type Lang = "en" | "es";

const T = {
  en: {
    nav: { solutions: "Solutions", firm: "The Firm", insights: "Insights", contact: "Contact", cta: "Partner with us" },
    heroEyebrow: "Est. the 1970s · Coral Gables, Florida",
    heroLines: ["The quiet partner", "behind", "extraordinary cases."],
    heroSub: "Brandon Brokerage Group partners with producers and financial advisors to deliver customized business solutions — advanced sales support, full case management and access to 30+ top-rated carriers.",
    heroCta: "Partner with us",
    heroLink: "Our solutions",
    trust: "A Tellus / Crump firm · Serving agents in 50 states · Coral Gables since the 1970s",
    heads: { solutions: "Solutions", mission: "Mission", firm: "The Firm", specialty: "Specialty", insights: "Insights", contact: "Contact" },
    stats: [
      { num: 50, suffix: "+", label: "Years of expertise" },
      { num: 30, suffix: "+", label: "Top-rated carriers" },
      { num: 5, suffix: "", label: "Product lines" },
      { num: null, text: "FN", label: "Foreign national leader" },
    ],
    deck: {
      eyebrow: "What we do · Brandon Brokerage",
      lines: ["Four", "pillars", "behind", "every case."],
      seeAll: "See all solutions",
      hint: "SCROLL TO REVEAL",
      cards: [
        { cat: "Specialty", title: "Foreign National", desc: "Industry leadership placing international clients — within every guideline." },
        { cat: "Support", title: "Advanced Sales Support", desc: "Case design, sales concepts and point-of-sale backup on every line." },
        { cat: "Operations", title: "Full Case Management", desc: "Underwriting and paperwork, from application to policy delivery." },
        { cat: "Network", title: "Carriers & Products", desc: "A leading Tellus/Crump firm with 30+ top-rated carriers nationwide." },
      ],
    },
    missionText: "To provide agents with superior service, personalized sales support and tailored business solutions that build long-term relationships.",
    appTitle: "A family of firms, one standard.",
    appItems: [
      { k: "Vision", t: "To be the brokerage partner of record for advisors serving domestic and international clients — pioneering custom solutions that reflect each client's values." },
      { k: "Experience", t: "Five decades placing complex cases from the same Coral Gables office — alongside our sister firm, Brandon Latam, serving families across the Americas." },
    ],
    spcTitle1: "We place the cases",
    spcTitle2: "others turn away.",
    spcBody: "With over 50 years of experience, we are an industry leader in the foreign national market. Customized sales strategies and wealth-management solutions for your international clients — always within carrier, state and federal guidelines.",
    spcCta: "Partner with us",
    carriersLabel: "Our carriers — a leading Tellus / Crump firm",
    insTitle: "Ideas for the cases ahead.",
    insights: [
      { date: "April 2026", title: "Life insurance for foreign nationals: what to know in 2026", excerpt: "Carrier appetite, documentation and the questions to settle before the exam." },
      { date: "March 2026", title: "Term or permanent? Framing the choice for high-net-worth clients", excerpt: "A simple framework for positioning coverage as part of a wealth plan." },
      { date: "February 2026", title: "Hybrid long-term care is winning the conversation", excerpt: "Why advisors lead with hybrid designs — and when traditional still fits." },
      { date: "January 2026", title: "Underwriting the complex case: a producer's checklist", excerpt: "Packaging, medical records and timing — how to keep a hard case moving." },
    ],
    insMore: "Read more",
    ctaTitle: "Let's write more business, together.",
    ctaBody: "Tell us about your case or your book of business. A brokerage director responds within one business day.",
    ctaBtn: "Partner with us",
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
    heroLines: ["El socio silencioso", "detrás de", "casos extraordinarios."],
    heroSub: "Brandon Brokerage Group trabaja junto a productores y asesores financieros para entregar soluciones de negocio a medida: soporte avanzado de ventas, gestión integral de casos y acceso a más de 30 aseguradoras de primer nivel.",
    heroCta: "Trabajemos juntos",
    heroLink: "Nuestras soluciones",
    trust: "Firma Tellus / Crump · Agentes en 50 estados · Coral Gables desde los años 70",
    heads: { solutions: "Soluciones", mission: "Misión", firm: "La Firma", specialty: "Especialidad", insights: "Insights", contact: "Contacto" },
    stats: [
      { num: 50, suffix: "+", label: "Años de experiencia" },
      { num: 30, suffix: "+", label: "Aseguradoras top" },
      { num: 5, suffix: "", label: "Líneas de producto" },
      { num: null, text: "FN", label: "Líder en foreign nationals" },
    ],
    deck: {
      eyebrow: "Qué hacemos · Brandon Brokerage",
      lines: ["Cuatro", "pilares", "detrás de", "cada caso."],
      seeAll: "Ver todas las soluciones",
      hint: "SCROLLEÁ PARA REVELAR",
      cards: [
        { cat: "Especialidad", title: "Foreign National", desc: "Liderazgo colocando clientes internacionales, dentro de cada norma." },
        { cat: "Soporte", title: "Soporte Avanzado de Ventas", desc: "Diseño de casos, conceptos de venta y apoyo en el punto de venta." },
        { cat: "Operaciones", title: "Gestión Integral de Casos", desc: "Underwriting y documentación, de la solicitud a la entrega de la póliza." },
        { cat: "Red", title: "Aseguradoras y Productos", desc: "Firma líder de Tellus/Crump con más de 30 aseguradoras top." },
      ],
    },
    missionText: "Brindar a los agentes un servicio superior, soporte de ventas personalizado y soluciones a medida que construyan relaciones de largo plazo.",
    appTitle: "Una familia de firmas, un mismo estándar.",
    appItems: [
      { k: "Visión", t: "Ser el socio de brokerage de referencia para asesores con clientes locales e internacionales, creando soluciones que reflejen los valores de cada cliente." },
      { k: "Experiencia", t: "Cinco décadas colocando casos complejos desde la misma oficina de Coral Gables, junto a nuestra firma hermana, Brandon Latam." },
    ],
    spcTitle1: "Colocamos los casos que",
    spcTitle2: "otros rechazan.",
    spcBody: "Con más de 50 años de experiencia, somos líderes en el mercado de foreign nationals. Estrategias de venta y soluciones de wealth management a medida para sus clientes internacionales, siempre dentro de las normas de cada aseguradora, estado y regulación federal.",
    spcCta: "Trabajemos juntos",
    carriersLabel: "Nuestras aseguradoras — firma líder de Tellus / Crump",
    insTitle: "Ideas para los casos que vienen.",
    insights: [
      { date: "Abril 2026", title: "Seguros de vida para foreign nationals: claves 2026", excerpt: "Apetito de las aseguradoras, documentación y qué resolver antes del examen." },
      { date: "Marzo 2026", title: "¿Term o permanente? Cómo plantear la decisión", excerpt: "Un marco simple para posicionar la cobertura dentro del plan patrimonial." },
      { date: "Febrero 2026", title: "Long-term care híbrido: por qué lidera la conversación", excerpt: "Por qué los asesores proponen diseños híbridos, y cuándo conviene el tradicional." },
      { date: "Enero 2026", title: "Underwriting de casos complejos: checklist del productor", excerpt: "Armado del expediente, historia médica y tiempos: cómo destrabar un caso difícil." },
    ],
    insMore: "Leer más",
    ctaTitle: "Escribamos más negocio, juntos.",
    ctaBody: "Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.",
    ctaBtn: "Trabajemos juntos",
    tollFree: "Línea gratuita",
    office: "Oficina",
    footNav: "Navegación",
    footContact: "Contacto",
    disclaimer: "Brandon Brokerage Group es un brokerage de seguros que atiende a agentes y asesores financieros con licencia. Los productos están sujetos a la aprobación de cada aseguradora y a la disponibilidad por estado. Nada en este sitio constituye asesoramiento legal, impositivo o de inversión.",
    rights: "© 1970s–2026 Brandon Brokerage Group · Solo para agentes y asesores con licencia",
  },
} as const;

// Mono/caps eyebrow with subtle gold accent
const monoEyebrow = (dark?: boolean): React.CSSProperties => ({
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: dark ? "#d9c291" : GOLD_DEEP,
});

// Numbered section head: "01 — Label" in small mono + hairline drawn on entry
function SectionHead({ num, label, dark }: { num: string; label: string; dark?: boolean }) {
  return (
    <div data-reveal style={{ marginBottom: "clamp(36px,4.5vw,64px)" }}>
      <div style={{ ...monoEyebrow(dark), marginBottom: 16 }}>{num} — {label}</div>
      <GrowLine color={dark ? "rgba(217,194,145,0.4)" : "rgba(154,123,50,0.45)"} />
    </div>
  );
}

// ————— Mission: progressive ink highlight, word by word on scroll —————
function MissionWord({ progress, range, word }: { progress: MotionValue<number>; range: [number, number]; word: string }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function MissionHighlight({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const style: React.CSSProperties = { fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,3.8vw,56px)", lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0, color: NAVY };
  if (reduce) return <p style={style}>{text}</p>;
  return (
    <p ref={ref} style={style}>
      {words.map((w, i) => (
        <MissionWord key={`${i}-${w}`} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]} word={w} />
      ))}
    </p>
  );
}

// ————— Specialty: minimal line globe with LatAm → Miami arcs —————
const ARC_MIA = { x: 258, y: 96, label: "MIA" };
const ARC_CITIES = [
  { x: 128, y: 178, label: "MEX" },
  { x: 214, y: 240, label: "BOG" },
  { x: 188, y: 312, label: "LIM" },
  { x: 222, y: 408, label: "SCL" },
  { x: 290, y: 412, label: "BUE" },
  { x: 352, y: 330, label: "SAO" },
];

function LatamArcs() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 480 500" fill="none" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
      {/* thin-line globe */}
      <circle cx="240" cy="256" r="204" stroke="rgba(217,194,145,0.25)" strokeWidth="1" />
      <ellipse cx="240" cy="256" rx="204" ry="82" stroke="rgba(217,194,145,0.14)" strokeWidth="1" />
      <ellipse cx="240" cy="256" rx="150" ry="203" stroke="rgba(217,194,145,0.12)" strokeWidth="1" />
      <ellipse cx="240" cy="256" rx="78" ry="203" stroke="rgba(217,194,145,0.12)" strokeWidth="1" />
      <line x1="36" y1="256" x2="444" y2="256" stroke="rgba(217,194,145,0.14)" strokeWidth="1" />
      {/* arcs LatAm → Miami, drawn on entry */}
      {ARC_CITIES.map((c, i) => {
        const midX = (c.x + ARC_MIA.x) / 2 + (c.x < ARC_MIA.x ? -34 : 34);
        const midY = Math.min(c.y, ARC_MIA.y) - 54 - i * 5;
        return (
          <motion.path
            key={c.label}
            d={`M ${c.x} ${c.y} Q ${midX} ${midY} ${ARC_MIA.x} ${ARC_MIA.y}`}
            stroke={GOLD}
            strokeWidth="1.2"
            initial={reduce ? false : { pathLength: 0, opacity: 0.35 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.6, delay: 0.35 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
      {/* city points + mono labels */}
      {[ARC_MIA, ...ARC_CITIES].map((c, i) => (
        <motion.g
          key={c.label}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
        >
          <circle cx={c.x} cy={c.y} r={i === 0 ? 5 : 3} fill={i === 0 ? "#d9c291" : GOLD} />
          {i === 0 && <circle cx={c.x} cy={c.y} r="11" stroke="#d9c291" strokeWidth="1" opacity="0.5" />}
          <text x={c.x + 12} y={c.y + 4} fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1.5" fill={i === 0 ? "#d9c291" : "rgba(255,255,255,0.55)"}>{c.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

// ————— Card deck (pinned, scroll-driven) —————
const DECK_IMGS = ["/images/globe-gold.jpg", "/images/handshake-office.jpg", "/images/wwo-papers.jpg", "/images/miami-aerial-day.jpg"];
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
      <img src={DECK_IMGS[i]} alt={card.title} data-photo-slot={`pillar-0${i + 1}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.1) 30%, rgba(16,24,40,0.88) 82%)" }} />
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
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const [deckHovered, setDeckHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const t = T[lang];

  useScrollReveal(pageRef);

  // Hero photo: 8% parallax on scroll (on top of the slow Ken Burns)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "8%"]);

  // Deck scrub: spring-smoothed scroll progress across the 300vh section
  const { scrollYProgress: deckRaw } = useScroll({ target: deckRef, offset: ["start start", "end end"] });
  const deckProgress = useSpring(deckRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  // The giant headline bows out as the cards fan over it (desktop only)
  const deckTitleFade = useTransform(deckProgress, [0.1, 0.45], [1, 0]);
  const [deckDesktop, setDeckDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const update = () => setDeckDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = [
    { href: "#solutions", label: t.nav.solutions },
    { href: "#firm", label: t.nav.firm },
    { href: "#insights", label: t.nav.insights },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />
      <CursorDot color={GOLD} />

      {/* NAV — transparent over hero, solid navy + hairline on scroll */}
      <div
        className={styles.headerBar}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
          padding: scrolled ? "14px clamp(20px,5vw,60px)" : "22px clamp(20px,5vw,60px)",
          background: scrolled ? "rgba(20,34,74,0.96)" : "linear-gradient(180deg, rgba(16,24,40,0.78), rgba(16,24,40,0.35) 70%, transparent)",
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

      {/* HERO — full-screen photo, slow Ken Burns + parallax, 3-line masthead */}
      <div id="top" ref={heroRef} style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "flex-end", overflow: "hidden", padding: "clamp(120px,14vw,180px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <motion.img
            src="/images/miami-sunset.jpg"
            alt=""
            data-photo-slot="hero"
            style={{ width: "100%", height: "112%", objectFit: "cover", y: reduce ? 0 : heroY }}
            initial={{ opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: [1, 1.06] }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.62), rgba(16,24,40,0.32) 45%, rgba(16,24,40,0.85) 92%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(16,24,40,0.55), rgba(16,24,40,0.1) 60%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", width: "100%" }}>
          <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ width: 42, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
            <span style={{ ...monoEyebrow(true), letterSpacing: "0.3em" }}>{t.heroEyebrow}</span>
          </FadeIn>
          <h1 key={lang} style={{ ...MASTHEAD, margin: "0 0 30px", color: "#ffffff" }}>
            <MaskReveal delay={0.2}>{t.heroLines[0]}</MaskReveal>
            <MaskReveal delay={0.35}>{t.heroLines[1]}</MaskReveal>
            <MaskReveal delay={0.5}><span style={{ fontStyle: "italic", color: "#d9c291" }}>{t.heroLines[2]}</span></MaskReveal>
          </h1>
          <FadeIn delay={0.65}>
            <p style={{ fontSize: "clamp(16px,1.4vw,18.5px)", lineHeight: 1.7, color: "rgba(255,255,255,0.85)", fontWeight: 400, maxWidth: 560, margin: "0 0 38px" }}>{t.heroSub}</p>
          </FadeIn>
          <FadeIn delay={0.78} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
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

      {/* TRUST BAR — one mono line with separators */}
      <div data-reveal style={{ padding: "18px clamp(20px,5vw,60px)", background: "#fff", borderBottom: HAIR }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", fontFamily: mono, fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: GRAY, textAlign: "center" }}>
          {t.trust.split(" · ").map((part, i, arr) => (
            <span key={part}>
              {part}
              {i < arr.length - 1 && <span style={{ color: GOLD, margin: "0 14px" }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* STATS — giant numerals, drawn hairlines + count-up */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,96px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "32px clamp(24px,4vw,64px)" }}>
          {t.stats.map((s, i) => (
            <div key={s.label}>
              <GrowLine color={GOLD} delay={i * 0.12} />
              <div style={{ paddingTop: 22 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(56px,6.5vw,110px)", fontWeight: 500, color: NAVY, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                  {s.num !== null ? <CountUp to={s.num} suffix={s.suffix} /> : s.text}
                </div>
                <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.16em", textTransform: "uppercase", color: GRAY, marginTop: 14 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 01 — SOLUTIONS: pinned card deck, scroll-driven */}
      <div id="solutions" ref={deckRef} className={styles.deckSection}>
        <div className={styles.deckPin} style={{ padding: "0 clamp(20px,5vw,60px)" }}>

          {/* headline column — fades out as the deck fans over it */}
          <motion.div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", width: "100%", opacity: deckDesktop ? deckTitleFade : 1 }}>
            <div data-reveal style={{ ...monoEyebrow(), marginBottom: 26 }}>01 — {t.heads.solutions} · Brandon Brokerage</div>
            <h2 className={styles.deckHeadline} data-reveal>
              {t.deck.lines.map((l) => (
                <span key={l} style={{ display: "block" }}>{l}</span>
              ))}
            </h2>
            <a data-reveal href="#contact" className={styles.lnk} style={{ display: "inline-block", marginTop: 34, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY, fontWeight: 700 }}>{t.deck.seeAll} →</a>
          </motion.div>

          {/* the deck (desktop) */}
          <div className={styles.deckCards}>
            {t.deck.cards.map((c, i) => (
              <DeckCard key={c.title} i={i} progress={deckProgress} hovered={deckHovered} setHovered={setDeckHovered} card={c} />
            ))}
          </div>

          {/* mobile: plain column, no pin */}
          <div className={styles.deckMobile}>
            {t.deck.cards.map((c, i) => (
              <div key={c.title} data-reveal className={styles.deckCard} style={{ position: "relative", aspectRatio: "3 / 4", width: "100%" }}>
                <DeckCardInner i={i} card={c} />
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", right: "clamp(20px,5vw,60px)", bottom: 26, fontFamily: mono, fontSize: 10.5, letterSpacing: "0.3em", color: "rgba(20,34,74,0.5)" }}>{t.deck.hint}</div>
        </div>
      </div>

      {/* 02 — MISSION: progressive ink highlight on scroll */}
      <div style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead num="02" label={t.heads.mission} />
          <MissionHighlight key={`mission-${lang}`} text={t.missionText} />
        </div>
      </div>

      {/* 03 — THE FIRM: side photo + vision/experience */}
      <div id="firm" style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#f9fafb", borderTop: HAIR, borderBottom: HAIR }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <SectionHead num="03" label={t.heads.firm} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
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
              <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,3.8vw,48px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 clamp(28px,3vw,40px)", color: NAVY }}>{t.appTitle}</h2>
              {t.appItems.map((it) => (
                <div key={it.k} data-reveal style={{ borderTop: "1px solid rgba(194,161,91,0.45)", padding: "22px 0" }}>
                  <div style={{ ...monoEyebrow(), marginBottom: 10 }}>{it.k}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: GRAY, margin: 0 }}>{it.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 04 — SPECIALTY: navy band, line globe with LatAm → Miami arcs */}
      <div style={{ position: "relative", padding: "clamp(90px,12vw,160px) clamp(20px,5vw,60px)", background: NAVY, overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto" }}>
          <SectionHead num="04" label={t.heads.specialty} dark />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
            <div>
              <h2 style={{ ...MASTHEAD, margin: "0 0 30px", color: "#fff" }}>
                <MaskReveal inView delay={0.1}>{t.spcTitle1}</MaskReveal>
                <MaskReveal inView delay={0.25}><span style={{ fontStyle: "italic", color: "#d9c291" }}>{t.spcTitle2}</span></MaskReveal>
              </h2>
              <p data-reveal style={{ fontSize: "clamp(15.5px,1.4vw,18px)", lineHeight: 1.75, color: "rgba(255,255,255,0.82)", margin: "0 0 36px", maxWidth: 560 }}>{t.spcBody}</p>
              <a data-reveal href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.spcCta}</a>
            </div>
            <div data-reveal style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
              <LatamArcs />
            </div>
          </div>
        </div>
      </div>

      {/* CARRIERS — slow infinite marquee */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) 0", background: "#fff", borderBottom: HAIR }}>
        <div style={{ ...monoEyebrow(), textAlign: "center", marginBottom: 36 }}>{t.carriersLabel}</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
          <div className={styles.marquee} style={{ display: "flex", width: "max-content", alignItems: "center", columnGap: "clamp(34px,4.4vw,70px)", fontFamily: serif, fontSize: "clamp(19px,2vw,27px)", color: "#98a0ad", whiteSpace: "nowrap" }}>
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

      {/* 05 — INSIGHTS: four article cards */}
      <div id="insights" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <SectionHead num="05" label={t.heads.insights} />
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,3.8vw,48px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 clamp(36px,4vw,56px)", color: NAVY }}>{t.insTitle}</h2>
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
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 14 }}>{a.date}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 20, lineHeight: 1.3, margin: "0 0 12px", color: NAVY }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: GRAY, margin: "0 0 16px" }}>{a.excerpt}</p>
                <span className={styles.insMore} style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY, fontWeight: 600 }}>{t.insMore} →</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* 06 — CONTACT: masthead close, giant clickable phone */}
      <div id="contact" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", background: NAVY }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <SectionHead num="06" label={t.heads.contact} dark />
          <h2 style={{ ...MASTHEAD, margin: "0 0 30px", color: "#fff", maxWidth: 1050 }}>
            <MaskReveal inView delay={0.1}>{t.ctaTitle}</MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.78)", margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 480 }}>{t.ctaBody}</p>

          <div data-reveal>
            <a href="tel:+13054447401" className={styles.phoneGiant} style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(44px,7vw,112px)", lineHeight: 1, letterSpacing: "-0.02em" }}>305-444-7401</a>
          </div>

          <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(24px,4vw,56px)", marginTop: "clamp(36px,4vw,56px)", paddingTop: 28, borderTop: "1px solid rgba(194,161,91,0.4)" }}>
            <div>
              <div style={{ ...monoEyebrow(true), marginBottom: 8 }}>{t.tollFree}</div>
              <a href="tel:+18887764678" style={{ fontFamily: serif, fontSize: "clamp(18px,1.8vw,24px)", color: "#fff" }}>1-888-776-4678</a>
            </div>
            <div>
              <div style={{ ...monoEyebrow(true), marginBottom: 8 }}>{t.office}</div>
              <div style={{ fontFamily: serif, fontSize: "clamp(15px,1.4vw,18px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>75 Valencia Ave, Suite 200 · Coral Gables, FL 33134</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Magnetic>
                <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "16px 36px", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t.ctaBtn}</a>
              </Magnetic>
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
