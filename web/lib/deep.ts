// The firm's own content, shared by every concept: who we serve, what Brandon
// does, the networks behind it, the foreign-national case flow, the forms
// and the team by name. Each concept renders this in its own visual language,
// so the org chart and the case flow exist once.
//
// Split the way brandonbrokerage.com splits it: Our Firm / Products /
// Foreign Nationals / Forms / Contact.


import type { Lang } from "./copy";

export const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "Global Atlantic", "Protective", "American National", "North American", "Penn Mutual", "Mutual of Omaha", "MassMutual", "Equitable", "Allianz", "Minnesota Life", "Symetra", "Transamerica", "Banner", "Sagicor", "Brighthouse", "National Life", "Athene", "Assurity", "Guardian", "OneAmerica", "The Standard", "New York Life", "Forethought", "Pacific Life"];

export const DEEP = {
  en: {
    nav: { firm: "Our Firm", products: "Products", foreign: "Foreign Nationals", forms: "Forms", contact: "Contact" },
    heroLine1: "Sixty years placing the cases",
    heroLine2: "others turn away.",
    heroSub: "Advanced sales support, full case management and 30+ top-rated carriers, from one Coral Gables office.",
    statement: "Every case is built, presented and placed by the same team that answers your call.",
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
    fnTeaser: "An industry leader in the high-net-worth foreign national market: comprehensive sales and underwriting support, full case management, and unusual expertise where federal, state and carrier requirements meet.",
    fnTeaserCta: "How a case moves",
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
    svcTitle: "What Brandon does.",
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
    resKicker: "Agent resources",
    resTitle: "Everything you need to submit.",
    resBody: "Forms, questionnaires and contracting paperwork, in one place. Call Brandon and a new business team member will confirm the current version for the carrier and product.",
    resGroups: [
      { label: "New business", items: ["Carrier forms", "Term quotes", "HIPAA authorization"] },
      { label: "Underwriting", items: ["Guidelines & requirements", "Smoker / non-smoker guidelines", "Medical pre-screening questionnaires", "Cancer, diabetes, cardiac & gastric bypass"] },
      { label: "Licensing & contracting", items: ["New agent registration form", "LIMRA AML guide for producers", "Form W-9"] },
    ],
    resCta: "Call Brandon",

    back: "Back to home",
  },

  es: {
    nav: { firm: "La Firma", products: "Productos", foreign: "Clientes Extranjeros", forms: "Formularios", contact: "Contacto" },
    heroLine1: "Sesenta años colocando los casos",
    heroLine2: "que otros rechazan.",
    heroSub: "Soporte avanzado de ventas, gestión integral de casos y más de 30 aseguradoras top, desde una sola oficina en Coral Gables.",
    statement: "Cada caso se arma, se presenta y se coloca con el mismo equipo que atiende su llamado.",
    states: "Estados con licencia",

    aiNav: "Asistente IA",
    aiKicker: "Brandon Latam Network",
    aiTitle: "Su asistente de IA.",
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
    fnTeaser: "Referentes de la industria en el mercado de extranjeros de alto patrimonio: soporte integral de ventas y underwriting, gestión completa del caso y experiencia poco común donde se cruzan los requisitos federales, estatales y de cada aseguradora.",
    fnTeaserCta: "Cómo avanza un caso",
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
    svcTitle: "Qué hace Brandon.",
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
    resBody: "Formularios, cuestionarios y papelería de contratación, en un solo lugar. Llame a Brandon y alguien de new business le confirma la versión vigente para esa aseguradora y ese producto.",
    resGroups: [
      { label: "New business", items: ["Formularios de aseguradoras", "Cotizaciones de term", "Autorización HIPAA"] },
      { label: "Underwriting", items: ["Guías y requisitos", "Guías fumador / no fumador", "Cuestionarios médicos previos", "Cáncer, diabetes, cardíacas y bypass gástrico"] },
      { label: "Licencias y contratos", items: ["Formulario de registro de agente", "Guía LIMRA AML para productores", "Formulario W-9"] },
    ],
    resCta: "Llamar a Brandon",

    back: "Volver al inicio",
  },
} as const;

// Real sub-products, lifted from each product page on brandonbrokerage.com
export const PRODUCT_DETAIL = {
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

// The nav for a concept: the four routes plus its contact page.
export function deepNav(prefix: string, lang: Lang) {
  const nav = DEEP[lang].nav;
  return [
    { href: `${prefix}/firm`, label: nav.firm },
    { href: `${prefix}/products`, label: nav.products },
    { href: `${prefix}/foreign-nationals`, label: nav.foreign },
    { href: `${prefix}/forms`, label: nav.forms },
    { href: `${prefix}/contact`, label: nav.contact },
  ];
}


// ————— The team, by name —————
// Lifted from brandonbrokerage.com/contact. Extensions reach the Coral Gables
// switchboard; the two direct lines are the ones the firm publishes.
export const OFFICE = {
  street: "75 Valencia Avenue, Suite 200",
  city: "Coral Gables, FL 33134",
  phone: "305-444-7401",
  phoneHref: "tel:+13054447401",
  tollFree: "1-888-776-4678",
  tollFreeHref: "tel:+18887764678",
  fax: "305-441-2237",
  mapQuery: "75 Valencia Ave, Suite 200, Coral Gables, FL 33134",
} as const;

export const DIRECTORY = {
  en: [
    { label: "Management", people: [
      { name: "Garry M. Brandon", role: "Managing Partner", ext: "102", email: "gbrandon@brandonbrokerage.com" },
      { name: "Onel Garcia", role: "Managing Partner", ext: "101", email: "ogarcia@brandonbrokerage.com" },
    ] },
    { label: "Sales support", people: [
      { name: "Saul Zitner", role: "Regional Vice President, Domestic Sales", ext: "109", direct: "305-710-7945", directHref: "tel:+13057107945", email: "szitner@brandonbrokerage.com" },
      { name: "Claritza Encarnacion", role: "Regional Vice President, International & Institutional Sales", direct: "305-510-4059", directHref: "tel:+13055104059", email: "cencarnacion@brandonbrokerage.com" },
    ] },
    { label: "Marketing", people: [
      { name: "Peder Knoth", role: "Case Design Specialist", ext: "108", email: "pknoth@brandonbrokerage.com" },
    ] },
    { label: "New business", people: [
      { name: "Grace Vera", role: "Underwriting Manager", ext: "106", email: "gvera@brandonbrokerage.com" },
      { name: "Elvira Ash", role: "Case Manager & Licensing Coordinator", ext: "104", email: "eash@brandonbrokerage.com" },
    ] },
    { label: "Commissions & customer service", people: [
      { name: "Cary Diaz", role: "Customer Service", ext: "105", email: "cdiaz@brandonbrokerage.com" },
    ] },
  ],
  es: [
    { label: "Dirección", people: [
      { name: "Garry M. Brandon", role: "Socio director", ext: "102", email: "gbrandon@brandonbrokerage.com" },
      { name: "Onel Garcia", role: "Socio director", ext: "101", email: "ogarcia@brandonbrokerage.com" },
    ] },
    { label: "Soporte de ventas", people: [
      { name: "Saul Zitner", role: "Vicepresidente regional, ventas domésticas", ext: "109", direct: "305-710-7945", directHref: "tel:+13057107945", email: "szitner@brandonbrokerage.com" },
      { name: "Claritza Encarnacion", role: "Vicepresidenta regional, ventas internacionales e institucionales", direct: "305-510-4059", directHref: "tel:+13055104059", email: "cencarnacion@brandonbrokerage.com" },
    ] },
    { label: "Marketing", people: [
      { name: "Peder Knoth", role: "Especialista en diseño de casos", ext: "108", email: "pknoth@brandonbrokerage.com" },
    ] },
    { label: "New business", people: [
      { name: "Grace Vera", role: "Gerenta de underwriting", ext: "106", email: "gvera@brandonbrokerage.com" },
      { name: "Elvira Ash", role: "Case manager y coordinadora de licencias", ext: "104", email: "eash@brandonbrokerage.com" },
    ] },
    { label: "Comisiones y atención al cliente", people: [
      { name: "Cary Diaz", role: "Atención al cliente", ext: "105", email: "cdiaz@brandonbrokerage.com" },
    ] },
  ],
} as const;

// Page furniture for the contact route, in both languages.
export const CONTACT = {
  en: {
    kicker: "Contact",
    title: "Talk to Brandon.",
    lede: "One office, one team, and a direct line to the person who will handle your case. A brokerage director responds within one business day.",
    office: "Office",
    phone: "Phone",
    tollFree: "Toll-free",
    fax: "Fax",
    directions: "Get directions",
    directory: "The team, by name",
    ext: "Ext.",
    direct: "Direct",
    email: "Email",
    callLabel: "Call Brandon",
    tapToCall: "Tap to call",
  },
  es: {
    kicker: "Contacto",
    title: "Hable con Brandon.",
    lede: "Una oficina, un equipo y una línea directa con la persona que va a manejar su caso. Un director de brokerage responde dentro de un día hábil.",
    office: "Oficina",
    phone: "Teléfono",
    tollFree: "Línea gratuita",
    fax: "Fax",
    directions: "Cómo llegar",
    directory: "El equipo, por nombre",
    ext: "Int.",
    direct: "Directo",
    email: "Email",
    callLabel: "Llamar a Brandon",
    tapToCall: "Toque para llamar",
  },
} as const;
