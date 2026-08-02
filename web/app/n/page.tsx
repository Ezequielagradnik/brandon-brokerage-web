"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import LangToggle from "@/components/LangToggle";
import { COPY, OFFERINGS_I18N, type Lang } from "@/lib/copy";
import { CountUp, GrowLine, MaskReveal, FadeIn, Magnetic, ParallaxImg, ScrollProgress, Tilt, ctaFillFromCursor } from "@/components/motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CTA_HREF, WHATSAPP_ENABLED, NETWORK_URL } from "@/lib/contact";
import styles from "./page.module.css";

// Network , beige canvas, navy depth, Brandon gold. Floating glass header, the
// four pillars travelling sideways while pinned, and the depth of the real
// brandonbrokerage.com: who we serve, the foreign-national case flow, the full
// product shelf, the team by name and the agent resource desk.

const NAVY = "#14224a";
const BEIGE = "#f5f1e8";
const GOLD = "#c2a15b";
const GOLD_SOFT = "#c8a76a";
const GOLD_DEEP = "#9a7b32";
const INK_MUTED = "#4a5568";
const HAIR = "rgba(20,34,74,0.16)";
const EASE = [0.16, 1, 0.3, 1] as const;

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "Global Atlantic", "Protective", "American National", "North American", "Penn Mutual", "Mutual of Omaha", "MassMutual", "Equitable", "Allianz", "Minnesota Life", "Symetra", "Transamerica", "Banner", "Sagicor", "Brighthouse", "National Life", "Athene", "Assurity", "Guardian", "OneAmerica", "The Standard", "New York Life", "Forethought", "Pacific Life"];

const SECTION_IDS = ["firm", "pillars", "foreign", "products", "team", "contact"];

const EXTRA = {
  en: {
    sections: ["The Firm", "Pillars", "Specialty", "Products", "Team", "Contact"],
    heroLine1: "Sixty years placing the cases",
    heroLine2: "others turn away.",
    heroSub: "Advanced sales support, full case management and 30+ top-rated carriers, from one Coral Gables desk.",
    statement: "Every case is built, presented and placed by the same desk that answers your call.",
    states: "States licensed",

    aiNav: "AI Assistant",
    aiKicker: "Brandon Latam Network",
    aiTitle: "Your AI assistant.",
    aiBody: "Answers on US finance, tax and legal matters. IRS, W-8BEN, trusts and structures, with sources cited, in English, Spanish or Portuguese. Built by the group, open to our advisors.",
    aiCta: "Open the platform",

    // who we serve
    serveKicker: "Who we serve",
    serveTitle: "A business-to-business brokerage.",
    serveBody: "Our customers are other businesses looking to expand their book by offering life insurance alongside their core line.",
    serve: ["P&C agencies", "Law firms", "Banks", "Financial advisors", "Accountants", "Independent agents"],
    tellusTitle: "A leading Tellus firm under Crump Insurance Services.",
    tellusBody: "Crump Life Insurance Services is a prominent independent wholesaler of life insurance. Tellus Brokerage Connections is a Crump network of select life brokerage general agencies that keep their brand and own their business while using the resources Tellus makes available.",
    icsTitle: "ICS Advisors Ltd. (BVI)",
    icsBody: "A member of the ICS Global Companies led by Michael M. Matluck, with over 35 years in the global life insurance marketplace, who selected Brandon Brokerage Group as joint venture partner for U.S. based business.",

    pillarsKicker: "Four pillars",
    pillarsTitle: "Everything behind the case you write.",
    pillarsHint: "SCROLL →",

    // foreign nationals
    fnKicker: "Signature specialty",
    fnTitle1: "High-net-worth",
    fnTitle2: "foreign nationals.",
    fnBody1: "Brandon Brokerage Group specializes in high-net-worth foreign national sales and takes pride in being an industry leader in this unique market. Comprehensive sales and underwriting support, full case management and unusual expertise in handling these cases.",
    fnBody2: "The underwriting process can seem overwhelming to agents and clients alike if they are not familiar with federal, state and carrier requirements. We take the guesswork out of foreign national business.",
    fnFlowTitle: "How a case moves",
    fnSteps: [
      { n: "01", title: "Case design", body: "Illustrations, sales concepts and strategy for the structure the client actually needs, across an open architecture of carriers." },
      { n: "02", title: "Application packaging", body: "Carriers update their forms constantly. The new business team confirms the correct application and required forms for the carrier and product before anything is submitted." },
      { n: "03", title: "Requirements & medical records", body: "Federal, state and carrier requirements, exams, HIPAA and medical records management, handled by the same people from start to finish." },
      { n: "04", title: "Impaired risk negotiation", body: "Cases others decline get shopped and argued. Point-of-sale support when the conversation needs a second voice." },
      { n: "05", title: "Policy delivery", body: "Processing through issue and delivery, then in-force policy service for the life of the case." },
    ],
    fnNote: "Highest standards of integrity, compliance and confidentiality in every process.",

    // services
    svcKicker: "Capabilities",
    svcTitle: "What the desk does.",
    svc: [
      "Access to top-rated carriers for life, annuities, long-term care and disability",
      "Illustrations, sales concepts and strategies",
      "Point of sale support",
      "Full underwriting support and case management",
      "Negotiation of impaired risks",
      "Expertise in high-net-worth foreign national cases",
    ],
    svcShowTitle: "Let us show you how to",
    svcShow: [
      "Use life insurance to increase existing client assets and open new sources of income",
      "Protect and preserve client assets through advanced market case design",
      "Plan the distribution of wealth in the most tax-advantageous way during the client's lifetime",
      "Plan the distribution of wealth to beneficiaries in the most tax-advantageous way after death",
    ],


    // team
    teamKicker: "The team",
    teamTitle: "The people who answer.",
    teamBody: "A diverse team of highly trained professionals with extensive experience in life insurance. From sales support and case positioning to appointments, underwriting and customer service.",
    teamGroups: [
      { label: "Managing Partners", members: [{ name: "Onel Garcia", role: "Managing Partner" }, { name: "Garry Brandon", role: "Managing Partner" }] },
      { label: "Sales support & relationship management", members: [
        { name: "Saul Zitner", role: "Regional Vice President, Domestic Sales" },
        { name: "Claritza Encarnacion", role: "Regional Vice President, International & Institutional Sales" },
        { name: "Santiago Romero", role: "Director" },
        { name: "Enrique Venturino", role: "Regional Director, Risk Assessment LATAM" },
        { name: "Juan Enrique Venturino", role: "Assistant Director, Risk Assessment LATAM" },
        { name: "Pedro Riveros Valdés", role: "Director of Business Development LATAM" },
      ] },
      { label: "Marketing", members: [{ name: "Peder Knoth", role: "Senior Case Designer, Domestic Life, Annuity, LTC & DI" }] },
      { label: "New business", members: [
        { name: "Elvira Ash", role: "New Business Case Manager; Licensing & Contracting Coordinator" },
        { name: "Grace Vera", role: "New Business Underwriting Manager" },
      ] },
      { label: "Commissions & service", members: [
        { name: "Garry Brandon", role: "Commissions" },
        { name: "Cary Diaz", role: "Customer Service; In-Force Policy Services" },
      ] },
    ],

    // resources
    resKicker: "Agent desk",
    resTitle: "Everything you need to submit.",
    resBody: "Forms, questionnaires and contracting paperwork, in one place. Call the desk and a new business team member will confirm the current version for the carrier and product.",
    resGroups: [
      { label: "New business", items: ["Carrier forms", "Term quotes", "HIPAA authorization"] },
      { label: "Underwriting", items: ["Guidelines & requirements", "Smoker / non-smoker guidelines", "Medical pre-screening questionnaires", "Cancer, diabetes, cardiac & gastric bypass"] },
      { label: "Licensing & contracting", items: ["New agent registration form", "LIMRA AML guide for producers", "Form W-9"] },
    ],
    resCta: "Call the desk",
  },

  es: {
    sections: ["La Firma", "Pilares", "Especialidad", "Productos", "Equipo", "Contacto"],
    heroLine1: "Sesenta años colocando los casos",
    heroLine2: "que otros rechazan.",
    heroSub: "Soporte avanzado de ventas, gestión integral de casos y más de 30 aseguradoras top, desde una sola oficina en Coral Gables.",
    statement: "Cada caso se arma, se presenta y se coloca en la misma mesa que atiende su llamado.",
    states: "Estados con licencia",

    aiNav: "Asistente IA",
    aiKicker: "Brandon Latam Network",
    aiTitle: "Tu asistente de IA.",
    aiBody: "Respuestas sobre finanzas, impuestos y temas legales de EE.UU. IRS, W-8BEN, trusts y estructuras, con fuentes citadas, en español, inglés o portugués. Desarrollado por el grupo, abierto a nuestros asesores.",
    aiCta: "Abrir la plataforma",

    serveKicker: "A quién servimos",
    serveTitle: "Una brokerage business-to-business.",
    serveBody: "Nuestros clientes son otras empresas que buscan ampliar su cartera ofreciendo seguros de vida junto a su línea principal de negocio.",
    serve: ["Agencias P&C", "Estudios jurídicos", "Bancos", "Asesores financieros", "Contadores", "Agentes independientes"],
    tellusTitle: "Firma líder de Tellus dentro de Crump Insurance Services.",
    tellusBody: "Crump Life Insurance Services es un mayorista independiente de referencia en seguros de vida. Tellus Brokerage Connections es la red de Crump que reúne agencias generales seleccionadas, que conservan su marca y la propiedad de su negocio mientras usan los recursos que Tellus pone a disposición.",
    icsTitle: "ICS Advisors Ltd. (BVI)",
    icsBody: "Miembro de ICS Global Companies, liderada por Michael M. Matluck, con más de 35 años en el mercado global de seguros de vida, que eligió a Brandon Brokerage Group como socio para el negocio radicado en EE.UU.",

    pillarsKicker: "Cuatro pilares",
    pillarsTitle: "Todo lo que hay detrás de cada caso.",
    pillarsHint: "SCROLL →",

    fnKicker: "Especialidad distintiva",
    fnTitle1: "Clientes extranjeros",
    fnTitle2: "de alto patrimonio.",
    fnBody1: "Brandon Brokerage Group se especializa en ventas a clientes extranjeros de alto patrimonio y es referente de la industria en este mercado. Soporte integral de ventas y underwriting, gestión completa del caso y una experiencia poco común en este tipo de operaciones.",
    fnBody2: "El proceso de underwriting puede resultar abrumador para agentes y clientes que no conocen los requisitos federales, estatales y de cada aseguradora. Nosotros sacamos la incertidumbre del negocio con extranjeros.",
    fnFlowTitle: "Cómo avanza un caso",
    fnSteps: [
      { n: "01", title: "Diseño del caso", body: "Ilustraciones, conceptos de venta y estrategia para la estructura que el cliente realmente necesita, con arquitectura abierta de aseguradoras." },
      { n: "02", title: "Armado de la solicitud", body: "Las aseguradoras actualizan sus formularios constantemente. El equipo de new business confirma la solicitud correcta y los formularios requeridos para esa aseguradora y ese producto antes de presentar nada." },
      { n: "03", title: "Requisitos y récords médicos", body: "Requisitos federales, estatales y de aseguradora, exámenes, HIPAA y gestión de récords médicos, en manos de las mismas personas de principio a fin." },
      { n: "04", title: "Negociación de riesgos agravados", body: "Los casos que otros rechazan se recorren y se defienden. Soporte en el punto de venta cuando la conversación necesita una segunda voz." },
      { n: "05", title: "Entrega de la póliza", body: "Procesamiento hasta la emisión y la entrega, y después servicio de póliza vigente durante toda la vida del caso." },
    ],
    fnNote: "Los más altos estándares de integridad, cumplimiento y confidencialidad en cada proceso.",

    svcKicker: "Capacidades",
    svcTitle: "Qué hace la mesa.",
    svc: [
      "Acceso a aseguradoras top para vida, anualidades, long-term care y disability",
      "Ilustraciones, conceptos y estrategias de venta",
      "Soporte en el punto de venta",
      "Soporte completo de underwriting y gestión del caso",
      "Negociación de riesgos agravados",
      "Experiencia en casos de extranjeros de alto patrimonio",
    ],
    svcShowTitle: "Le mostramos cómo",
    svcShow: [
      "Usar seguros de vida para incrementar los activos del cliente y abrir nuevas fuentes de ingreso",
      "Proteger y preservar activos con diseño de casos de mercado avanzado",
      "Planificar la distribución del patrimonio de la forma más eficiente en impuestos durante la vida del cliente",
      "Planificar la distribución a los beneficiarios de la forma más eficiente en impuestos después del fallecimiento",
    ],


    teamKicker: "El equipo",
    teamTitle: "Las personas que atienden.",
    teamBody: "Un equipo diverso de profesionales con amplia experiencia en la industria del seguro de vida. Desde soporte de ventas y posicionamiento del caso hasta nombramientos, underwriting y atención al cliente.",
    teamGroups: [
      { label: "Socios directores", members: [{ name: "Onel Garcia", role: "Socio director" }, { name: "Garry Brandon", role: "Socio director" }] },
      { label: "Soporte de ventas y relaciones", members: [
        { name: "Saul Zitner", role: "Vicepresidente regional, ventas domésticas" },
        { name: "Claritza Encarnacion", role: "Vicepresidenta regional, ventas internacionales e institucionales" },
        { name: "Santiago Romero", role: "Director" },
        { name: "Enrique Venturino", role: "Director regional, evaluación de riesgo LATAM" },
        { name: "Juan Enrique Venturino", role: "Subdirector, evaluación de riesgo LATAM" },
        { name: "Pedro Riveros Valdés", role: "Director de desarrollo de negocio LATAM" },
      ] },
      { label: "Marketing", members: [{ name: "Peder Knoth", role: "Case designer senior de vida doméstica, anualidades, LTC y DI" }] },
      { label: "New business", members: [
        { name: "Elvira Ash", role: "Case manager de new business; coordinadora de licencias y contratos" },
        { name: "Grace Vera", role: "Gerenta de underwriting de new business" },
      ] },
      { label: "Comisiones y servicio", members: [
        { name: "Garry Brandon", role: "Comisiones" },
        { name: "Cary Diaz", role: "Atención al cliente; servicio de pólizas vigentes" },
      ] },
    ],

    resKicker: "Mesa del agente",
    resTitle: "Todo lo que necesita para presentar.",
    resBody: "Formularios, cuestionarios y papelería de contratación, en un solo lugar. Llame a la mesa y alguien de new business le confirma la versión vigente para esa aseguradora y ese producto.",
    resGroups: [
      { label: "New business", items: ["Formularios de aseguradoras", "Cotizaciones de term", "Autorización HIPAA"] },
      { label: "Underwriting", items: ["Guías y requisitos", "Guías fumador / no fumador", "Cuestionarios médicos previos", "Cáncer, diabetes, cardíacas y bypass gástrico"] },
      { label: "Licencias y contratos", items: ["Formulario de registro de agente", "Guía LIMRA AML para productores", "Formulario W-9"] },
    ],
    resCta: "Llamar a la mesa",
  },
} as const;

// Real sub-products, lifted from each product page on brandonbrokerage.com
const PRODUCT_DETAIL = {
  en: [
    ["Family protection", "Mortgage protection", "Educational expenses", "Final expenses", "Key-person insurance", "Buy-sell agreements & business succession"],
    ["UL and SUL: flexibility, security, tax-deferred growth", "Indexed Universal Life: returns credited to a market index, with guaranteed minimum crediting rates", "Whole Life: consistent premiums, guaranteed cash value accumulation, dividends"],
    ["Deferred: indexed, MYGA, renewal-rate, bonus, lifetime income", "Single Premium Immediate Annuity (SPIA)", "Withdrawals before age 59½ may carry a 10% federal penalty tax"],
    ["Traditional LTC: a known benefit for a specified period, generally received income tax free", "Life insurance with an LTC or chronic illness rider", "Life-LTC hybrids with a cash-value bucket", "Annuity-LTC hybrids"],
    ["Carrier financial strength", "How the carrier defines disability", "Elimination period", "Benefit period", "Inflation protection", "Riders"],
  ],
  es: [
    ["Protección familiar", "Protección hipotecaria", "Gastos educativos", "Gastos finales", "Seguro de persona clave", "Acuerdos buy-sell y sucesión del negocio"],
    ["UL y SUL: flexibilidad, seguridad, crecimiento con impuestos diferidos", "Indexed Universal Life: rendimientos acreditados según un índice de mercado, con tasas mínimas garantizadas", "Whole Life: primas constantes, acumulación garantizada de valor efectivo, dividendos"],
    ["Diferidas: indexadas, MYGA, renewal-rate, bonus, ingreso vitalicio", "Anualidad inmediata de prima única (SPIA)", "Los retiros antes de los 59½ años pueden tener un impuesto federal de penalidad del 10%"],
    ["LTC tradicional: beneficio conocido por un período determinado, en general libre de impuesto a las ganancias", "Seguro de vida con rider de LTC o enfermedad crónica", "Híbridos vida-LTC con un fondo de valor efectivo", "Híbridos anualidad-LTC"],
    ["Solidez financiera de la aseguradora", "Cómo define la aseguradora la discapacidad", "Período de eliminación", "Período de beneficio", "Protección contra inflación", "Riders"],
  ],
} as const;

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
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];
  const x = EXTRA[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const detail = PRODUCT_DETAIL[lang];

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [galSpan, setGalSpan] = useState(0);
  const [openProd, setOpenProd] = useState<number | null>(0);

  useScrollReveal(pageRef);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // the header pill follows the section you are reading
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = els.indexOf(entry.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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

  const NAV_LINKS = SECTION_IDS.map((id, i) => ({ href: `#${id}`, label: x.sections[i] }));
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />

      {/* ----- floating glass header ----- */}
      <header className={`${styles.header} ${scrolled ? styles.headerSolid : ""}`}>
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }}
          style={{ display: "inline-flex", flexShrink: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/brandon-logo.png"
            alt="Brandon Brokerage Group"
            width={132}
            height={26}
            fetchPriority="high"
            style={{ height: 26, width: "auto" }}
          />
        </a>

        <nav className={styles.headerNav}>
          {SECTION_IDS.map((id, i) => (
            <button
              key={id}
              type="button"
              className={`${styles.navItem} ${active === i ? styles.navItemOn : ""}`}
              onClick={() => go(id)}
            >
              {active === i && !reduce && (
                <motion.span layoutId="nNavPill" className={styles.navPill} transition={{ type: "spring", stiffness: 320, damping: 30 }} />
              )}
              <span className={styles.navLabel}>{x.sections[i]}</span>
            </button>
          ))}
        </nav>

        <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.headerAi}>
          <span className={styles.aiPulse} />
          {x.aiNav}
        </a>

        <LangToggle
          lang={lang}
          setLang={setLang}
          color={scrolled ? "rgba(245,241,232,0.55)" : "rgba(20,34,74,0.5)"}
          activeColor={scrolled ? "#fff" : NAVY}
        />

        <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.headerCta}>{t.cta.partner}</a>

        <span style={{ display: "flex" }}>
          <MobileMenu
            links={[...NAV_LINKS, { href: NETWORK_URL, label: x.aiNav }]}
            ctaLabel={t.cta.partner}
            ctaHref="#contact"
            panelBg={NAVY}
            textColor={BEIGE}
            accentColor={GOLD}
          />
        </span>
      </header>

      {/* ----- hero ----- */}
      <section id="top" ref={heroRef} className={styles.hero}>
        <motion.div className={styles.heroGlow} style={{ y: reduce ? 0 : glowY }} aria-hidden="true" />
        <motion.div className={styles.heroGlow2} style={{ y: reduce ? 0 : glowY2 }} aria-hidden="true" />
        <motion.div className={styles.wrap} style={{ position: "relative", width: "100%", opacity: reduce ? 1 : heroFade }}>
          <FadeIn delay={0.1} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} style={{ width: 40, height: 1, background: GOLD, transformOrigin: "0 50%" }} />
            <span className={styles.kicker}>{t.heroKicker}</span>
          </FadeIn>

          {/* the three lines drift apart on scroll , cheap depth, no extra paint */}
          <h1 key={lang} className={styles.display} style={{ marginBottom: 32, maxWidth: 940 }}>
            <motion.span style={{ display: "block", y: reduce ? 0 : lineY1 }}><MaskReveal delay={0.2}>{x.heroLine1}</MaskReveal></motion.span>
            <motion.span style={{ display: "block", y: reduce ? 0 : lineY2 }}><MaskReveal delay={0.35}><span className={styles.displayItalic}>{x.heroLine2}</span></MaskReveal></motion.span>
          </h1>

          <FadeIn delay={0.7}>
            <p style={{ fontSize: "clamp(16px,1.25vw,18.5px)", lineHeight: 1.7, color: INK_MUTED, maxWidth: 560, margin: "0 0 38px" }}>{x.heroSub}</p>
          </FadeIn>

          <FadeIn delay={0.85} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta}>{t.cta.partner}</a>
            </Magnetic>
            <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaGhost}`}>
              {x.aiNav} ↗
            </a>
          </FadeIn>
        </motion.div>
      </section>

      {/* ----- trust line ----- */}
      <div data-reveal style={{ borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`, padding: "16px 0" }}>
        <div className={styles.wrap}>
          <div className={styles.kicker} style={{ color: INK_MUTED, textAlign: "center", fontSize: 10.5 }}>
            {t.footAbout.replace(/\.$/, "")}
          </div>
        </div>
      </div>

      {/* ----- the platform: hands off to the real assistant ----- */}
      <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.aiBand}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.aiGlow} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.aiRow}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className={styles.kicker} style={{ color: GOLD_SOFT, marginBottom: 16 }}>{x.aiKicker}</div>
              <div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(28px,3.6vw,52px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "#fbfaf7", marginBottom: 16 }}>
                {x.aiTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className={styles.displayItalic}>{x.aiTitle.split(" ").slice(-1)}</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(245,241,232,0.72)", margin: 0, maxWidth: 640 }}>{x.aiBody}</p>
            </div>
            <span className={styles.aiCta}>
              {x.aiCta} <span className={styles.aiArrow}>↗</span>
            </span>
          </div>
        </div>
      </a>

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

      {/* ----- 01 the firm ----- */}
      <section id="firm" style={{ position: "relative", padding: "clamp(60px,8vw,110px) 0", borderTop: `1px solid ${HAIR}`, overflow: "hidden" }}>
        <SectionMark n="01" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color={HAIR} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(36px,5vw,70px)", alignItems: "center", marginTop: "clamp(34px,4vw,54px)" }}>
            <div>
              <h2 data-reveal className={styles.display} style={{ fontSize: "clamp(30px,3.6vw,52px)", marginBottom: 26 }}>
                {t.missionText}<span className={styles.displayItalic}>{t.missionHighlight}</span>.
              </h2>
              <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.75, color: INK_MUTED, margin: 0, maxWidth: 520 }}>{t.approachText}</p>
            </div>
            <div data-reveal className={styles.photo} style={{ height: "clamp(300px,38vw,460px)" }}>
              <ParallaxImg
                src="/images/miami-aerial-day.jpg"
                alt="Brickell and Biscayne Bay, the skyline the firm works from"
                range={28}
                photoSlot="firm"
                style={{ height: "100%" }}
                imgClassName={styles.photoImg}
              />
              <span className={styles.photoEdge} aria-hidden="true" />
            </div>
          </div>

          {/* who we serve */}
          <div data-reveal style={{ marginTop: "clamp(50px,6vw,88px)" }}>
            <div className={styles.kicker} style={{ color: INK_MUTED, marginBottom: 14, fontSize: 10.5 }}>{x.serveKicker}</div>
            <h3 className={styles.display} style={{ fontSize: "clamp(24px,2.8vw,38px)", marginBottom: 14 }}>{x.serveTitle}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: INK_MUTED, margin: "0 0 28px", maxWidth: 620 }}>{x.serveBody}</p>
            <div className={styles.serveGrid}>
              {x.serve.map((s, i) => (
                <motion.div
                  key={s}
                  className={styles.serveItem}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                >
                  <span className={styles.kicker} style={{ fontSize: 9.5, color: GOLD_DEEP }}>0{i + 1}</span>
                  <span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(17px,1.7vw,22px)", color: NAVY }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* capabilities */}
          <div style={{ marginTop: "clamp(50px,6vw,88px)" }}>
            <div data-reveal className={styles.kicker} style={{ color: INK_MUTED, marginBottom: 14, fontSize: 10.5 }}>{x.svcKicker}</div>
            <div className={styles.svcGrid}>
              <div>
                <h3 data-reveal className={styles.display} style={{ fontSize: "clamp(24px,2.8vw,38px)", margin: "0 0 24px" }}>{x.svcTitle}</h3>
                <ul data-reveal className={styles.svcList}>
                  {x.svc.map((sv) => (
                    <li key={sv} className={styles.svcItem}>
                      <span className={styles.svcMark} />
                      <span style={{ fontSize: 15, lineHeight: 1.55, color: NAVY }}>{sv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal className={styles.svcShow}>
                <div className={styles.grain} aria-hidden="true" />
                <div className={styles.kicker} style={{ color: GOLD_SOFT, marginBottom: 20, fontSize: 10.5, position: "relative", zIndex: 2 }}>{x.svcShowTitle}</div>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", zIndex: 2 }}>
                  {x.svcShow.map((sv, i) => (
                    <li key={sv} className={styles.svcShowItem}>
                      <span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: 22, color: GOLD_SOFT, lineHeight: 1 }}>0{i + 1}</span>
                      <span style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(245,241,232,0.82)" }}>{sv}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Tellus / Crump + ICS */}
          <div className={styles.netGrid}>
            <Tilt max={2.4} style={{ display: "block" }}>
            <div data-reveal className={styles.netCard}>
              <div className={styles.kicker} style={{ color: GOLD_DEEP, marginBottom: 14, fontSize: 10 }}>Tellus · Crump</div>
              <h4 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.2, margin: "0 0 14px", color: NAVY }}>{x.tellusTitle}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.tellusBody}</p>
            </div>
            </Tilt>
            <Tilt max={2.4} style={{ display: "block" }}>
            <div data-reveal className={styles.netCard}>
              <div className={styles.kicker} style={{ color: GOLD_DEEP, marginBottom: 14, fontSize: 10 }}>Joint venture</div>
              <h4 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.2, margin: "0 0 14px", color: NAVY }}>{x.icsTitle}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.icsBody}</p>
            </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* ----- 02 signature: the pillars travel horizontally ----- */}
      <section id="pillars" ref={galRef} className={styles.galSection}>
        <div className={styles.galPin}>
          <div className={styles.grain} aria-hidden="true" />
          <div className={`${styles.mark} ${styles.markDark}`} aria-hidden="true">02</div>
          <div style={{ position: "relative", zIndex: 2, padding: "0 clamp(24px,6vw,90px)", marginBottom: "clamp(24px,3vh,42px)" }}>
            <h2 className={styles.display} style={{ color: BEIGE, fontSize: "clamp(28px,3.6vw,52px)", maxWidth: 700 }}>{x.pillarsTitle}</h2>
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

      {/* ----- 03 foreign nationals ----- */}
      <section id="foreign" style={{ position: "relative", padding: "clamp(70px,9vw,120px) 0", background: BEIGE, overflow: "hidden" }}>
        <SectionMark n="03" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color={HAIR} />
          <h2 className={styles.display} style={{ fontSize: "clamp(32px,4.6vw,72px)", margin: "clamp(30px,4vw,48px) 0 26px", maxWidth: 820 }}>
            <MaskReveal inView delay={0.1}>{x.fnTitle1}</MaskReveal>
            <MaskReveal inView delay={0.25}><span className={styles.displayItalic}>{x.fnTitle2}</span></MaskReveal>
          </h2>
          <div className={styles.fnIntro}>
            <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.fnBody1}</p>
            <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.fnBody2}</p>
          </div>

          <div className={styles.fnFlowHead}>
            <span className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10.5 }}>{x.fnFlowTitle}</span>
            <span style={{ flex: 1, height: 1, background: HAIR }} />
          </div>

          <CaseFlow steps={x.fnSteps} reduce={reduce} />

          <p data-reveal className={styles.kicker} style={{ color: INK_MUTED, fontSize: 10.5, marginTop: "clamp(28px,3vw,42px)", lineHeight: 1.9 }}>{x.fnNote}</p>
        </div>
      </section>

      {/* ----- 04 products ledger, each line opens ----- */}
      <section id="products" style={{ position: "relative", padding: "clamp(60px,8vw,110px) 0", borderTop: `1px solid ${HAIR}`, overflow: "hidden" }}>
        <SectionMark n="04" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color={HAIR} />
          <h2 data-reveal className={styles.display} style={{ fontSize: "clamp(28px,3.4vw,48px)", margin: "clamp(28px,3vw,44px) 0 18px" }}>{t.productsTitle}</h2>
          <div data-reveal style={{ borderTop: `1px solid ${NAVY}` }}>
            {t.products.map((p, i) => {
              const open = openProd === i;
              return (
                <div key={p.name} className={styles.prodBlock}>
                  <button
                    type="button"
                    className={`${styles.prodRow} ${open ? styles.prodRowOpen : ""}`}
                    onClick={() => setOpenProd(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10.5 }}>0{i + 1}</span>
                    <span className={styles.prodName} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(21px,2.6vw,34px)", color: NAVY }}>{p.name}</span>
                    <span className={styles.prodDesc}>{p.desc}</span>
                    <span className={styles.prodPlus} aria-hidden="true">
                      <span />
                      <motion.span animate={{ scaleY: open ? 0 : 1 }} transition={{ duration: 0.35, ease: EASE }} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="panel"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <ul className={styles.prodPanel}>
                          {detail[i].map((d) => (
                            <li key={d}>
                              <span className={styles.svcMark} />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* the agent desk lives with the products it serves */}
          <div style={{ marginTop: "clamp(52px,6vw,88px)" }}>
            <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: "clamp(28px,3vw,44px)" }}>
              <div>
                <h3 className={styles.display} style={{ fontSize: "clamp(24px,2.8vw,38px)", marginBottom: 16 }}>{x.resTitle}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: INK_MUTED, margin: 0, maxWidth: 560 }}>{x.resBody}</p>
              </div>
              <Magnetic>
                <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={styles.cta}>{x.resCta}</a>
              </Magnetic>
            </div>
            <div className={styles.resGrid}>
              {x.resGroups.map((g) => (
                <div key={g.label} data-reveal className={styles.resCol}>
                  <div className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10, marginBottom: 18 }}>{g.label}</div>
                  {g.items.map((it) => (
                    <a key={it} href="#contact" className={styles.resItem}>
                      <span>{it}</span>
                      <span className={styles.resArrow}>→</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----- 05 the team ----- */}
      <section id="team" style={{ position: "relative", padding: "clamp(70px,9vw,120px) 0", background: NAVY, color: BEIGE, overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <SectionMark n="05" dark />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color="rgba(194,161,91,0.4)" />
          <h2 className={styles.display} style={{ color: "#fbfaf7", fontSize: "clamp(30px,4vw,60px)", margin: "clamp(30px,4vw,48px) 0 22px", maxWidth: 760 }}>
            <MaskReveal inView delay={0.1}>{x.teamTitle}</MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.7, color: "rgba(245,241,232,0.72)", margin: "0 0 clamp(38px,5vw,60px)", maxWidth: 620 }}>{x.teamBody}</p>

          <div className={styles.masthead}>
            {x.teamGroups.map((g) => (
              <div key={g.label} data-reveal className={styles.teamGroup}>
                <div className={`${styles.kicker} ${styles.teamGroupLabel}`} style={{ color: GOLD_SOFT, fontSize: 9.5 }}>{g.label}</div>
                {g.members.map((m) => (
                  <div key={`${g.label}-${m.name}-${m.role}`} className={styles.teamCard}>
                    <div className={styles.teamName}>{m.name}</div>
                    <div className={styles.teamRole}>{m.role}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----- carriers ----- */}
      <div data-reveal style={{ padding: "clamp(46px,6vw,76px) 0", borderTop: `1px solid ${HAIR}`, background: "#f0ece1" }}>
        <div className={styles.kicker} style={{ color: INK_MUTED, textAlign: "center", marginBottom: 30, fontSize: 10.5 }}>{t.carriersLabel}</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
          <VelocityMarquee reduce={reduce}>
            {[0, 1].map((rep) => (
              <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(28px,3.4vw,56px)", paddingRight: "clamp(28px,3.4vw,56px)" }} aria-hidden={rep === 1}>
                {CARRIERS.map((c) => (
                  <span key={c} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(18px,2vw,26px)", color: "rgba(20,34,74,0.42)", whiteSpace: "nowrap" }}>{c}</span>
                ))}
              </div>
            ))}
          </VelocityMarquee>
        </div>
      </div>

      {/* ----- 06 contact ----- */}
      <section id="contact" style={{ position: "relative", padding: "clamp(70px,9vw,130px) 0 clamp(50px,6vw,80px)", background: NAVY, color: BEIGE, overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <SectionMark n="06" dark />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color="rgba(194,161,91,0.4)" />
          <h2 className={styles.display} style={{ color: "#fbfaf7", fontSize: "clamp(34px,5vw,74px)", margin: "clamp(30px,4vw,48px) 0 26px", maxWidth: 900 }}>
            <MaskReveal inView delay={0.1}>{t.contactTitle}</MaskReveal>
          </h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,241,232,0.75)", margin: "0 0 clamp(36px,5vw,56px)", maxWidth: 460 }}>{t.contactBody}</p>

          <div data-reveal>
            <a href="tel:+13054447401" className={styles.phoneGiant} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(40px,6.4vw,104px)", lineHeight: 1, letterSpacing: "-0.02em" }}>305-444-7401</a>
          </div>

          <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,4vw,56px)", alignItems: "center", marginTop: "clamp(34px,4vw,52px)", paddingTop: 26, borderTop: "1px solid rgba(194,161,91,0.35)" }}>
            <div>
              <div className={styles.kicker} style={{ color: GOLD_SOFT, fontSize: 9.5, marginBottom: 8 }}>{t.tollFree}</div>
              <a href="tel:+18887764678" style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(18px,1.9vw,24px)", color: "#fbfaf7" }}>1-888-776-4678</a>
            </div>
            <div>
              <div className={styles.kicker} style={{ color: GOLD_SOFT, fontSize: 9.5, marginBottom: 8 }}>{t.office}</div>
              <div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(15px,1.5vw,19px)", color: "rgba(245,241,232,0.9)" }}>75 Valencia Ave, Suite 200 · Coral Gables, FL 33134</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Magnetic>
                <a
                  href={CTA_HREF}
                  {...(WHATSAPP_ENABLED ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onPointerEnter={ctaFillFromCursor}
                  className={styles.cta}
                  style={{ background: GOLD, borderColor: GOLD, color: NAVY }}
                >
                  {WHATSAPP_ENABLED && <WhatsAppIcon />}
                  {t.cta.partner}
                </a>
              </Magnetic>
            </div>
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

/* The case flow: a gold spine fills as you scroll and each step lights up as
   the fill reaches it. */
type Step = { readonly n: string; readonly title: string; readonly body: string };

function CaseFlow({ steps, reduce }: { steps: readonly Step[]; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.85"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  return (
    <div ref={ref} className={styles.flow}>
      <div className={styles.flowSpine} aria-hidden="true">
        <motion.div className={styles.flowSpineFill} style={{ scaleY: reduce ? 1 : p }} />
      </div>
      {steps.map((s, i) => (
        <FlowStep key={s.n} i={i} total={steps.length} progress={p} step={s} reduce={reduce} />
      ))}
    </div>
  );
}

function FlowStep({ i, total, progress, step, reduce }: { i: number; total: number; progress: MotionValue<number>; step: Step; reduce: boolean }) {
  const at = i / total;
  const range: [number, number] = [at, at + 0.1];
  const opacity = useTransform(progress, range, [0.34, 1]);
  const border = useTransform(progress, range, ["rgba(20,34,74,0.18)", "#c2a15b"]);
  const numColor = useTransform(progress, range, ["rgba(20,34,74,0.45)", "#9a7b32"]);
  return (
    <motion.div className={styles.flowStep} style={{ opacity: reduce ? 1 : opacity }}>
      <motion.span className={styles.flowNum} style={{ borderColor: reduce ? GOLD : border, color: reduce ? GOLD_DEEP : numColor }}>
        {step.n}
      </motion.span>
      <div>
        <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(19px,2.1vw,28px)", lineHeight: 1.2, margin: "0 0 10px", color: NAVY, textWrap: "balance" }}>{step.title}</h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: INK_MUTED, margin: 0, maxWidth: 640 }}>{step.body}</p>
      </div>
    </motion.div>
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

/* An oversized outlined numeral drifts behind each numbered section. */
function SectionMark({ n, dark = false }: { n: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} aria-hidden="true" className={`${styles.mark} ${dark ? styles.markDark : ""}`} style={{ y, opacity }}>
      {n}
    </motion.div>
  );
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
