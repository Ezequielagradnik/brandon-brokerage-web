// Boutique Latam , the /g concept's palette, type stack and its own bilingual
// copy. Everything about the firm itself (who we serve, the capabilities, the
// case flow, the forms desk, the team) comes from lib/deep, shared with the
// other concepts and re-exported here as EXTRA.

import type { CSSProperties } from "react";

// Palette shared with Brandon Latam Network (sister firm)
export const NAVY = "#14224a";
export const NAVY_DEEP = "#0e1833";
export const GRAY = "#475467";
export const GOLD = "#c2a15b";
export const GOLD_LIGHT = "#d9c291";
export const GOLD_DEEP = "#7d6425";
export const OFFWHITE = "#f9fafb";
export const WARM = "#f4f1e9";
export const HAIR = "1px solid rgba(20,34,74,0.14)";
export const HAIR_LINE = "rgba(20,34,74,0.14)";
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const serif = "var(--font-lora), serif";
export const sans = "var(--font-manrope), sans-serif";
export const mono = "var(--font-plex-mono), monospace";

// Editorial masthead scale , the page's typographic peaks
export const MASTHEAD: CSSProperties = {
  fontFamily: serif,
  fontWeight: 500,
  fontSize: "clamp(52px,7.5vw,120px)",
  lineHeight: 0.98,
  letterSpacing: "-0.03em",
};

// Mono/caps eyebrow with subtle gold accent
export const monoEyebrow = (dark?: boolean): CSSProperties => ({
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: dark ? GOLD_LIGHT : GOLD_DEEP,
});

export const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

export const G = {
  en: {
    nav: { assistant: "AI Assistant", cta: "Partner with us" },
    heroEyebrow: "Est. the 1960s · Coral Gables, Florida",
    heroLines: ["The quiet partner", "behind", "extraordinary cases."],
    heroSub: "Advanced sales support, full case management and 30+ top-rated carriers, for producers and financial advisors.",
    heroCta: "Partner with us",
    heroLink: "Our solutions",
    trust: "A Tellus / Crump firm · Serving agents in 50 states · Coral Gables since the 1960s",
    heads: { solutions: "Solutions", mission: "Mission", firm: "The Firm", specialty: "Specialty", insights: "Insights", contact: "Contact" },
    stats: [
      { num: 60, suffix: "+", label: "Years of expertise" },
      { num: 30, suffix: "+", label: "Top-rated carriers" },
      { num: 5, suffix: "", label: "Product lines" },
      { num: 50, suffix: "", label: "States licensed" },
    ],
    deck: {
      lines: ["Four", "pillars", "behind", "every case."],
      seeAll: "Discuss a case with us",
      hint: "SCROLL TO REVEAL",
      cards: [
        { cat: "Specialty", title: "Foreign National", desc: "Industry leadership placing international clients, within every guideline." },
        { cat: "Support", title: "Advanced Sales Support", desc: "Case design, sales concepts and point-of-sale backup on every line." },
        { cat: "Operations", title: "Full Case Management", desc: "Underwriting and paperwork, from application to policy delivery." },
        { cat: "Network", title: "Carriers & Products", desc: "A leading Tellus/Crump firm with 30+ top-rated carriers nationwide." },
      ],
    },
    // the firm page masthead, the same sentence as appTitle, split in two lines
    firmTitleA: "A family of firms,",
    firmTitleB: "one standard.",
    appItems: [
      { k: "Vision", t: "To be the brokerage partner of record for advisors serving domestic and international clients, pioneering custom solutions that reflect each client's values." },
      { k: "Experience", t: "Six decades placing complex cases from the same Coral Gables office, alongside our sister firm, Brandon Latam, serving families across the Americas." },
    ],
    spcCta: "Partner with us",
    carriersLabel: "Our carriers, a leading Tellus / Crump firm",
    insTitle: "Ideas for the cases ahead.",
    insights: [
      { date: "April 2026", title: "Life insurance for foreign nationals: what to know in 2026", excerpt: "Carrier appetite, documentation and the questions to settle before the exam." },
      { date: "March 2026", title: "Term or permanent? Framing the choice for high-net-worth clients", excerpt: "A simple framework for positioning coverage as part of a wealth plan." },
      { date: "February 2026", title: "Hybrid long-term care is winning the conversation", excerpt: "Why advisors lead with hybrid designs, and when traditional still fits." },
      { date: "January 2026", title: "Underwriting the complex case: a producer's checklist", excerpt: "Packaging, medical records and timing: how to keep a hard case moving." },
    ],
    insMore: "Discuss this with us",
    ctaBtn: "Partner with us",
    footNav: "Navigation",
    footContact: "Contact",
    disclaimer: "Brandon Brokerage Group is an insurance brokerage serving licensed agents and financial advisors. Products are subject to carrier approval and state availability. Nothing on this site constitutes legal, tax or investment advice.",
    rights: "© 1960s-2026 Brandon Brokerage Group · For licensed agents & advisors only",
  },
  es: {
    nav: { assistant: "Asistente IA", cta: "Trabajemos juntos" },
    heroEyebrow: "Desde los años 60 · Coral Gables, Florida",
    heroLines: ["El socio silencioso", "detrás de", "casos extraordinarios."],
    heroSub: "Soporte avanzado de ventas, gestión integral de casos y más de 30 aseguradoras top, para productores y asesores financieros.",
    heroCta: "Trabajemos juntos",
    heroLink: "Nuestras soluciones",
    trust: "Firma Tellus / Crump · Agentes en 50 estados · Coral Gables desde los años 60",
    heads: { solutions: "Soluciones", mission: "Misión", firm: "La Firma", specialty: "Especialidad", insights: "Insights", contact: "Contacto" },
    stats: [
      { num: 60, suffix: "+", label: "Años de experiencia" },
      { num: 30, suffix: "+", label: "Aseguradoras top" },
      { num: 5, suffix: "", label: "Líneas de producto" },
      { num: 50, suffix: "", label: "Estados con licencia" },
    ],
    deck: {
      lines: ["Cuatro", "pilares", "detrás de", "cada caso."],
      seeAll: "Consulte su caso con nosotros",
      hint: "DESLICE PARA REVELAR",
      cards: [
        { cat: "Especialidad", title: "Foreign National", desc: "Liderazgo colocando clientes internacionales, dentro de cada norma." },
        { cat: "Soporte", title: "Soporte Avanzado de Ventas", desc: "Diseño de casos, conceptos de venta y apoyo en el punto de venta." },
        { cat: "Operaciones", title: "Gestión Integral de Casos", desc: "Underwriting y documentación, de la solicitud a la entrega de la póliza." },
        { cat: "Red", title: "Aseguradoras y Productos", desc: "Firma líder de Tellus/Crump con más de 30 aseguradoras top." },
      ],
    },
    firmTitleA: "Una familia de firmas,",
    firmTitleB: "un mismo estándar.",
    appItems: [
      { k: "Visión", t: "Ser el socio de brokerage de referencia para asesores con clientes locales e internacionales, creando soluciones que reflejen los valores de cada cliente." },
      { k: "Experiencia", t: "Seis décadas colocando casos complejos desde la misma oficina de Coral Gables, junto a nuestra firma hermana, Brandon Latam." },
    ],
    spcCta: "Trabajemos juntos",
    carriersLabel: "Nuestras aseguradoras, firma líder de Tellus / Crump",
    insTitle: "Ideas para los casos que vienen.",
    insights: [
      { date: "Abril 2026", title: "Seguros de vida para foreign nationals: claves 2026", excerpt: "Apetito de las aseguradoras, documentación y qué resolver antes del examen." },
      { date: "Marzo 2026", title: "¿Term o permanente? Cómo plantear la decisión", excerpt: "Un marco simple para posicionar la cobertura dentro del plan patrimonial." },
      { date: "Febrero 2026", title: "Long-term care híbrido: por qué lidera la conversación", excerpt: "Por qué los asesores proponen diseños híbridos, y cuándo conviene el tradicional." },
      { date: "Enero 2026", title: "Underwriting de casos complejos: checklist del productor", excerpt: "Armado del expediente, historia médica y tiempos: cómo destrabar un caso difícil." },
    ],
    insMore: "Consúltenos",
    ctaBtn: "Trabajemos juntos",
    footNav: "Navegación",
    footContact: "Contacto",
    disclaimer: "Brandon Brokerage Group es un brokerage de seguros que atiende a agentes y asesores financieros con licencia. Los productos están sujetos a la aprobación de cada aseguradora y a la disponibilidad por estado. Nada en este sitio constituye asesoramiento legal, impositivo o de inversión.",
    rights: "© 1960s-2026 Brandon Brokerage Group · Solo para agentes y asesores con licencia",
  },
} as const;

export { CONTACT, DEEP as EXTRA, DIRECTORY, OFFICE, PRODUCT_DETAIL, deepLinks, deepNav } from "@/lib/deep";
