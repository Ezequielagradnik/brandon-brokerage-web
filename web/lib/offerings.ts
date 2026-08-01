export type Offering = {
  n: string;
  title: string;
  desc: string;
  // Resumen de dos líneas para las cards; `desc` conserva el copy completo del sitio.
  blurb: string;
  img: string;
};

// Copy real de "What We Offer" de brandonbrokerage.com, traducido
export const OFFERINGS: Offering[] = [
  {
    n: "01",
    title: "Soluciones para Clientes Extranjeros",
    desc: "Con más de 50 años de experiencia, somos líderes del mercado de clientes extranjeros. Ayudamos a nuestros agentes a diseñar estrategias de venta y soluciones de wealth management a medida para sus clientes internacionales. Nuestro enfoque de arquitectura abierta nos permite ofrecer una variedad de productos y servicios para cubrir las necesidades de cada cliente, siempre dentro de las normas de cada aseguradora, estado y regulación federal.",
    blurb: "Líderes del mercado de clientes extranjeros, con estrategias a medida para sus clientes internacionales.",
    img: "/images/wwo-compass.jpg",
  },
  {
    n: "02",
    title: "Soporte Avanzado de Ventas",
    desc: "Brandon Brokerage Group brinda soporte de ventas integral y experiencia tanto en casos de vida locales como de clientes extranjeros, además de ventas de disability, anualidades y long-term care. Desde la planificación y el diseño del caso hasta los conceptos y estrategias de venta, el conocimiento de cada aseguradora y el apoyo en el punto de venta, nuestro equipo altamente capacitado lo ayuda a brindar una experiencia superior a sus clientes y a desarrollar todas las facetas de su negocio.",
    blurb: "Diseño de casos, conceptos de venta, conocimiento de aseguradoras y apoyo en el punto de venta.",
    img: "/images/wwo-growth.jpg",
  },
  {
    n: "03",
    title: "Gestión Integral de Casos",
    desc: "Nuestro equipo dedicado de nuevos negocios brinda soporte completo de underwriting, experiencia y gestión de casos para todas las solicitudes de clientes nuevos. Desde el armado y procesamiento de las solicitudes hasta el pedido y la revisión de la historia médica, aseguramos una experiencia ágil y profesional desde la gestión inicial hasta la entrega de la póliza, para nuestros agentes y sus clientes.",
    blurb: "Un equipo dedicado lleva el underwriting y la documentación desde la solicitud hasta la entrega de la póliza.",
    img: "/images/wwo-papers.jpg",
  },
  {
    n: "04",
    title: "Aseguradoras y Productos de Calidad",
    desc: "Brandon Brokerage Group es una firma líder de Tellus/Crump que ofrece servicios en todo el país y acceso completo a más de treinta aseguradoras de vida de primer nivel. Ampliamos el valor y el alcance de los servicios que nuestros agentes pueden ofrecer, forjando alianzas profesionales con las principales aseguradoras de la industria y brindando soporte individualizado y productos de calidad.",
    blurb: "Firma líder de Tellus/Crump con acceso a más de 30 aseguradoras de primer nivel en todo el país.",
    img: "/images/wwo-gears.jpg",
  },
];
