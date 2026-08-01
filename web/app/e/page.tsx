"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import { GrowLine, CountUp } from "@/components/motion";
import styles from "./page.module.css";

const INK = "#0d0f12";
const COBALT = "#1f4fd8";
const HAIR = "#e5e7eb";
const GRAY = "#4b5158";
const GRAY_LIGHT = "#6b7280";

// ————— Signature scroll moment: the blueprint assembles along a spine —————
const E_CATS = ["ESPECIALIDAD", "SOPORTE", "OPERACIONES", "RED"];

// mono label that types itself in when it appears
function TypeMono({ text, delay = 0, color = COBALT }: { text: string; delay?: number; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={text} className={styles.mono} style={{ fontSize: 11.5, color, display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.02, delay: delay + i * 0.05 }}
          style={{ whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function SpineNode({ i }: { i: number }) {
  const o = OFFERINGS[i];
  const left = i % 2 === 0;
  const reduce = useReducedMotion();
  const content = (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: left ? -22 : 22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: left ? "right" : "left" }}
    >
      <div style={{ marginBottom: 12 }}><TypeMono text={`[0${i + 1}] ${E_CATS[i]}`} delay={0.25} /></div>
      <h3 style={{ fontWeight: 600, fontSize: "clamp(20px,2.2vw,28px)", margin: "0 0 10px", color: INK, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{o.title}</h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: GRAY_LIGHT, margin: 0, maxWidth: 380, marginLeft: left ? "auto" : 0 }}>{o.blurb}</p>
    </motion.div>
  );
  return (
    <div className={styles.spineRow}>
      <div className={styles.spineCellL}>{left && content}</div>
      <div className={styles.spineCellC}>
        <motion.span
          initial={reduce ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 7, height: 7, background: INK, zIndex: 2 }}
        />
        <GrowLine color={INK} style={{ position: "absolute", top: "50%", [left ? "right" : "left"]: "50%", width: "clamp(30px,4vw,70px)", transformOrigin: left ? "100% 50%" : "0 50%" }} />
      </div>
      <div className={styles.spineCellR}>{!left && content}</div>
    </div>
  );
}

// ————— Route band: LatAm city codes strung along one line into MIA —————
const ROUTE = [
  { code: "MEX", coord: "19.4°N" },
  { code: "BOG", coord: "4.7°N" },
  { code: "LIM", coord: "12.0°S" },
  { code: "SCL", coord: "33.4°S" },
  { code: "BUE", coord: "34.6°S" },
  { code: "SAO", coord: "23.5°S" },
  { code: "MIA", coord: "25.7°N", hub: true },
];

function RouteBand() {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className={styles.routeBand}>
        {ROUTE.map((c, i) => (
          <motion.div
            key={c.code}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingBottom: 14 }}
          >
            <div className={styles.mono} style={{ fontSize: 10.5, color: GRAY_LIGHT, marginBottom: 6 }}>{c.coord}</div>
            <div style={{ fontSize: "clamp(18px,2.2vw,28px)", fontWeight: c.hub ? 700 : 500, letterSpacing: "-0.01em", color: c.hub ? COBALT : INK }}>{c.code}</div>
          </motion.div>
        ))}
      </div>
      {/* the connecting line, drawn on entry */}
      <div style={{ position: "relative" }}>
        <GrowLine color={INK} />
        <div className={styles.routeBand} style={{ position: "absolute", top: -3, left: 0, right: 0 }}>
          {ROUTE.map((c, i) => (
            <motion.span
              key={c.code}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.12 }}
              style={{ width: c.hub ? 9 : 7, height: c.hub ? 9 : 7, background: c.hub ? COBALT : INK, borderRadius: c.hub ? "50%" : 0, justifySelf: "start" }}
            />
          ))}
        </div>
      </div>
      <div className={styles.routeBand} style={{ marginTop: 12 }}>
        {ROUTE.map((c) => (
          <span key={c.code} className={styles.mono} style={{ fontSize: 9.5, color: c.hub ? COBALT : "#9aa0a8" }}>
            {c.hub ? "HUB" : "→ MIA"}
          </span>
        ))}
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "#why", label: "La Firma" },
  { href: "#foreign", label: "Clientes Extranjeros" },
  { href: "#products", label: "Productos" },
  { href: "#contact", label: "Contacto" },
];

const PRODUCTS = [
  { n: "01", name: "Term Life", desc: "Protección de ingresos e hipoteca" },
  { n: "02", name: "Vida Permanente", desc: "Whole, universal e IUL" },
  { n: "03", name: "Anualidades", desc: "Renta fija e indexada" },
  { n: "04", name: "Long-Term Care", desc: "Tradicional e híbrido" },
  { n: "05", name: "Disability Income", desc: "Proteja su capacidad de ingreso" },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

export default function ConceptE() {
  const pageRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const heroKicker = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroSub = useRef<HTMLParagraphElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useHeroReveal([heroKicker, heroTitle, heroSub, heroCta]);

  // the spine draws with scroll (soft scrub, no snap)
  const { scrollYProgress: spineRaw } = useScroll({ target: spineRef, offset: ["start 0.75", "end 0.55"] });
  const spineScale = useSpring(spineRaw, { stiffness: 90, damping: 28, mass: 0.4 });
  useScrollReveal(pageRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const kicker: React.CSSProperties = { fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GRAY_LIGHT };

  return (
    <div ref={pageRef} className={styles.page}>

      {/* NAV — white, hairline under */}
      <div className={styles.headerBar} style={{ position: "sticky", top: 0, zIndex: 60, padding: scrolled ? "13px clamp(20px,5vw,60px)" : "20px clamp(20px,5vw,60px)", transition: "padding 0.28s ease" }}>
        <a href="#top" style={{ display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: scrolled ? 24 : 28, transition: "height 0.28s ease" }} />
        </a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <a href="#contact" className={styles.cta} style={{ padding: "11px 22px", fontSize: 12.5, letterSpacing: "0.02em" }}>Trabajemos juntos</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Trabajemos juntos"
          ctaHref="#contact"
          panelBg="#ffffff"
          textColor={INK}
          accentColor={COBALT}
        />
      </div>

      {/* HERO — white, blueprint hairlines, Helvetica */}
      <div id="top" style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)", overflow: "hidden" }}>
        <div className={styles.gridOverlay} />
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 980 }}>
            <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 34 }}>
              <span style={{ width: 28, height: 1, background: INK }} />
              <span className={styles.mono} style={{ fontSize: 11, textTransform: "uppercase", color: GRAY }}>Coral Gables, FL · 25.7213° N, 80.2683° W</span>
            </div>
            <h1 ref={heroTitle} style={{ fontWeight: 600, fontSize: "clamp(38px,5.6vw,82px)", lineHeight: 1.02, letterSpacing: "-0.035em", margin: "0 0 30px", color: INK }}>
              Trabajamos junto a productores y asesores financieros para entregar soluciones de negocio a medida, con <span style={{ color: COBALT }}>una ejecución impecable</span>.
            </h1>
            <p ref={heroSub} style={{ fontSize: "clamp(16px,1.3vw,18.5px)", lineHeight: 1.6, color: GRAY_LIGHT, maxWidth: 560, margin: "0 0 40px" }}>
              Desde hace más de cincuenta años combinamos soporte avanzado de ventas y gestión integral de casos con acceso a más de 30 aseguradoras de primer nivel.
            </p>
            <div ref={heroCta} style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={styles.cta} style={{ padding: "16px 32px", fontSize: 14 }}>Trabajemos juntos</a>
              <a href="#products" className={`${styles.cta} ${styles.ctaGhost}`} style={{ padding: "16px 32px", fontSize: 14 }}>Ver productos</a>
            </div>
          </div>
        </div>
      </div>

      {/* STATS — hairline ledger, one cobalt data point */}
      <div data-reveal style={{ borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {[
            { num: 50, suffix: "+", label: "Años de experiencia" },
            { num: 30, suffix: "+", label: "Aseguradoras top" },
            { num: 5, suffix: "", label: "Líneas de producto" },
            { num: null, text: "N.º 1", label: "Mercado de extranjeros", accent: true },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: "clamp(32px,4vw,48px) clamp(20px,4vw,44px)", borderLeft: i > 0 ? `1px solid ${HAIR}` : undefined }}>
              <div style={{ fontSize: "clamp(34px,4.4vw,54px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.95, color: s.accent ? COBALT : INK }}>
                {s.num !== null ? <CountUp to={s.num} suffix={s.suffix} /> : s.text}
              </div>
              <div className={styles.mono} style={{ fontSize: 10.5, textTransform: "uppercase", color: GRAY_LIGHT, marginTop: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION + one duotone photograph */}
      <div style={{ padding: "clamp(70px,9vw,130px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
          <div data-reveal>
            <div style={{ ...kicker, marginBottom: 14 }}>Nuestra misión</div>
            <GrowLine color={HAIR} style={{ marginBottom: 28 }} />
            <p style={{ fontWeight: 500, fontSize: "clamp(22px,2.8vw,36px)", lineHeight: 1.28, letterSpacing: "-0.025em", margin: 0, color: INK }}>
              Brindar a los agentes un servicio superior, soporte de ventas personalizado y soluciones a medida que <span style={{ color: COBALT }}>construyan relaciones de largo plazo</span>.
            </p>
          </div>
          <div data-reveal className={styles.duotone} style={{ height: "clamp(280px,34vw,420px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/handshake-office.jpg" alt="Brandon Brokerage Group" data-photo-slot="firm" />
          </div>
        </div>
      </div>

      {/* WHAT WE OFFER — the blueprint assembles */}
      <div id="why" ref={spineRef} style={{ padding: "clamp(56px,7vw,96px) clamp(20px,5vw,60px) 0", borderTop: `1px solid ${HAIR}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: "clamp(44px,6vw,80px)" }}>
            <div>
              <div style={{ ...kicker, marginBottom: 14 }}>Qué ofrecemos</div>
              <h2 style={{ fontWeight: 600, fontSize: "clamp(28px,3.6vw,46px)", margin: 0, color: INK, letterSpacing: "-0.03em" }}>El blueprint, ensamblado.</h2>
            </div>
            <span className={styles.mono} style={{ fontSize: 11, textTransform: "uppercase", color: GRAY_LIGHT }}>Cuatro disciplinas / un equipo</span>
          </div>

          <div className={styles.spineWrap}>
            <motion.div className={styles.spineLine} style={{ scaleY: spineScale }} aria-hidden="true" />
            {OFFERINGS.map((_, i) => (
              <SpineNode key={i} i={i} />
            ))}
            <div className={styles.spineEnd}>
              <span style={{ width: 9, height: 9, background: COBALT }} />
              <a href="#foreign" className={`${styles.mono} ${styles.lnk}`} style={{ fontSize: 11, textTransform: "uppercase", marginTop: 16 }}>↓ Red de clientes extranjeros</a>
            </div>
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — the route band */}
      <div id="foreign" style={{ padding: "clamp(70px,9vw,130px) clamp(20px,5vw,60px)", borderTop: `1px solid ${HAIR}`, background: "#fafafa" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ maxWidth: 900, marginBottom: "clamp(44px,6vw,72px)" }}>
            <div style={{ ...kicker, marginBottom: 14 }}>Especialidad distintiva</div>
            <GrowLine color={HAIR} style={{ marginBottom: 30 }} />
            <h2 style={{ fontWeight: 600, fontSize: "clamp(30px,4.6vw,64px)", lineHeight: 1.03, margin: "0 0 28px", color: INK, letterSpacing: "-0.035em" }}>
              Colocamos los casos que <span style={{ color: COBALT }}>otros rechazan</span>.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: GRAY_LIGHT, margin: 0, maxWidth: 620 }}>
              Con más de 50 años de experiencia, somos líderes del mercado de clientes extranjeros: estrategias de venta y soluciones de wealth management a medida, siempre dentro de las normas de cada aseguradora, estado y regulación federal.
            </p>
          </div>
          <div data-reveal>
            <RouteBand />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(70px,9vw,130px) clamp(20px,5vw,60px)", borderTop: `1px solid ${HAIR}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 34 }}>
            <div>
              <div style={{ ...kicker, marginBottom: 14 }}>Productos</div>
              <h2 style={{ fontWeight: 600, fontSize: "clamp(28px,3.6vw,46px)", margin: 0, color: INK, letterSpacing: "-0.03em" }}>Cinco líneas, una relación.</h2>
            </div>
            <span className={styles.mono} style={{ fontSize: 11, textTransform: "uppercase", color: GRAY_LIGHT }}>Con el respaldo de más de 30 aseguradoras</span>
          </div>
          <div data-reveal style={{ borderTop: `1px solid ${INK}` }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prodRow}>
                <span className={styles.mono} style={{ fontSize: 11.5, color: COBALT }}>[{p.n}]</span>
                <span className={styles.prodName} style={{ fontWeight: 600, fontSize: "clamp(20px,2.4vw,30px)", color: INK, letterSpacing: "-0.025em" }}>{p.name}</span>
                <span className={styles.mono} style={{ fontSize: 11, color: GRAY_LIGHT, textAlign: "right", textTransform: "uppercase" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(50px,6vw,80px) 0", borderTop: `1px solid ${HAIR}`, background: "#fafafa" }}>
        <div style={{ ...kicker, textAlign: "center", marginBottom: 32 }}>Nuestras aseguradoras — firma líder de Tellus / Crump</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
          <div className={styles.marquee}>
            {[0, 1].map((rep) => (
              <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(26px,3.4vw,52px)", paddingRight: "clamp(26px,3.4vw,52px)" }} aria-hidden={rep === 1}>
                {CARRIERS.map((c) => (
                  <span key={c} style={{ display: "flex", alignItems: "center", gap: "clamp(26px,3.4vw,52px)", whiteSpace: "nowrap" }}>
                    <span style={{ fontWeight: 500, fontSize: "clamp(16px,1.7vw,22px)", color: "#9aa0a8", letterSpacing: "-0.02em" }}>{c}</span>
                    <span style={{ width: 4, height: 4, background: HAIR }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ padding: "clamp(70px,9vw,130px) clamp(20px,5vw,60px)", borderTop: `1px solid ${HAIR}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "start" }}>
          <div data-reveal>
            <div style={{ ...kicker, marginBottom: 14 }}>Contacto</div>
            <GrowLine color={HAIR} style={{ marginBottom: 30 }} />
            <h2 style={{ fontWeight: 600, fontSize: "clamp(30px,4.2vw,56px)", lineHeight: 1.03, margin: "0 0 24px", color: INK, letterSpacing: "-0.035em" }}>Escribamos más negocio, juntos.</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: GRAY_LIGHT, margin: "0 0 34px", maxWidth: 440 }}>Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.</p>
            <a href="tel:+13054447401" className={styles.cta} style={{ padding: "16px 32px", fontSize: 14 }}>Trabajemos juntos</a>
          </div>
          <div data-reveal style={{ borderTop: `1px solid ${INK}` }}>
            {[
              ["Teléfono", "305-444-7401", "tel:+13054447401"],
              ["Línea gratuita", "1-888-776-4678", "tel:+18887764678"],
            ].map(([l, v, href]) => (
              <a key={l} href={href} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 0", borderBottom: `1px solid ${HAIR}` }}>
                <span className={styles.mono} style={{ fontSize: 10.5, textTransform: "uppercase", color: GRAY_LIGHT }}>{l}</span>
                <span className={styles.mono} style={{ fontSize: "clamp(16px,1.7vw,21px)", color: INK, letterSpacing: "0.02em" }}>{v}</span>
              </a>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 0", borderBottom: `1px solid ${HAIR}`, gap: 20 }}>
              <span className={styles.mono} style={{ fontSize: 10.5, textTransform: "uppercase", color: GRAY_LIGHT }}>Oficina</span>
              <span style={{ fontSize: 15.5, color: INK, textAlign: "right", lineHeight: 1.45 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: "clamp(44px,5vw,64px) clamp(20px,5vw,60px) 0", borderTop: `1px solid ${HAIR}`, background: "#fafafa" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className={styles.footerGrid}>
            <div>
              <div style={{ display: "inline-flex", marginBottom: 18 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 26 }} />
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: GRAY_LIGHT, margin: 0, maxWidth: 280 }}>Firma líder de Tellus / Crump al servicio de productores y asesores financieros desde los años 70.</p>
            </div>

            <div>
              <div style={{ ...kicker, marginBottom: 16 }}>Compañía</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className={styles.footLink} style={{ fontSize: 14 }}>{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ ...kicker, marginBottom: 16 }}>Contacto</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14 }}>
                <a href="tel:+13054447401" className={`${styles.footLink} ${styles.mono}`} style={{ fontSize: 13 }}>305-444-7401</a>
                <a href="tel:+18887764678" className={`${styles.footLink} ${styles.mono}`} style={{ fontSize: 13 }}>1-888-776-4678</a>
                <span style={{ color: GRAY_LIGHT, lineHeight: 1.5 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
              </div>
            </div>

            <div>
              <div style={{ ...kicker, marginBottom: 16 }}>Trabajemos juntos</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: GRAY_LIGHT, margin: "0 0 16px" }}>Un director de brokerage responde dentro de un día hábil.</p>
              <a href="#contact" className={styles.cta} style={{ padding: "11px 22px", fontSize: 12.5 }}>Trabajemos juntos</a>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${HAIR}`, marginTop: "clamp(36px,4vw,52px)", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div className={styles.mono} style={{ fontSize: 10.5, color: "#9aa0a8", textTransform: "uppercase" }}>© 1970s–2026 Brandon Brokerage Group</div>
            <div className={styles.mono} style={{ fontSize: 10.5, color: "#9aa0a8", textTransform: "uppercase" }}>Solo para agentes y asesores con licencia</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
