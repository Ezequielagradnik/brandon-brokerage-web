"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useHeroReveal, useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { OFFERINGS } from "@/lib/offerings";
import GlobeArcs, { BLUE_ARCS } from "@/components/GlobeArcs";
import { GrowLine } from "@/components/motion";
import styles from "./page.module.css";

// ————— Signature scroll moment: the blueprint assembles along a spine —————
const E_CATS = ["ESPECIALIDAD", "SOPORTE", "OPERACIONES", "RED"];

// mono label that types itself in when it appears
function TypeMono({ text, delay = 0, color = "#5c8dff" }: { text: string; delay?: number; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={text} style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, letterSpacing: "0.14em", color, display: "inline-block" }}>
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
      <div style={{ marginBottom: 10 }}><TypeMono text={`[0${i + 1}] ${E_CATS[i]}`} delay={0.25} /></div>
      <h3 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.2vw,30px)", margin: "0 0 10px", color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.15 }}>{o.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#8b99b5", margin: 0, maxWidth: 380, marginLeft: left ? "auto" : 0 }}>{o.blurb}</p>
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
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 9, height: 9, background: "#05070d", border: "2px solid #3b82f6", borderRadius: "50%", zIndex: 2 }}
        />
        <GrowLine color="#2563eb" origin={left ? "left" : "left"} style={{ position: "absolute", top: "50%", [left ? "right" : "left"]: "50%", width: "clamp(30px,4vw,70px)", transformOrigin: left ? "100% 50%" : "0 50%" }} />
      </div>
      <div className={styles.spineCellR}>{!left && content}</div>
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

  return (
    <div ref={pageRef} className={styles.page}>

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "sticky", top: 0, zIndex: 60, padding: scrolled ? "13px clamp(20px,5vw,60px)" : "20px clamp(20px,5vw,60px)", background: "rgba(5,7,13,0.82)", backdropFilter: "blur(12px)", borderBottom: scrolled ? "1px solid #1b2842" : "1px solid #10192c", boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.55)" : "none", transition: "padding 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease" }}>
        <a href="#top" style={{ display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: scrolled ? 24 : 28, transition: "height 0.28s ease" }} />
        </a>
        <div className={styles.headerNav}>
          <a href="#why" className={styles.nl}>La Firma</a>
          <a href="#foreign" className={styles.nl}>Clientes Extranjeros</a>
          <a href="#products" className={styles.nl}>Productos</a>
          <a href="#contact" className={styles.nl}>Contacto</a>
          <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ padding: "11px 22px", borderRadius: 4, fontSize: 13, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Trabajemos Juntos</a>
        </div>
        <MobileMenu
          links={NAV_LINKS}
          ctaLabel="Trabajemos Juntos"
          ctaHref="#contact"
          panelBg="#0a0f1c"
          textColor="#eef2f8"
          accentColor="#3b82f6"
        />
      </div>

      {/* HERO — blueprint grid, no globe (it belongs to Foreign National) */}
      <div id="top" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", padding: "clamp(90px,10vw,140px) clamp(20px,5vw,60px) clamp(70px,8vw,110px)", background: "radial-gradient(130% 100% at 50% 0%, #0a1226 0%, #05070d 62%)", overflow: "hidden" }}>
        <div className={styles.gridOverlay} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,7,13,0.25), transparent 30%, transparent 68%, #05070d)" }} />
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 860 }}>
            <div ref={heroKicker} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
              <span style={{ width: 34, height: 1, background: "#3b82f6" }} />
              <span className={styles.tag}>Coral Gables — Desde los años 70</span>
            </div>
            <h1 ref={heroTitle} style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 26px", color: "#fff" }}>
              Trabajamos junto a productores y asesores financieros para entregar soluciones de negocio a medida, con <span style={{ color: "#5c8dff" }}>una ejecución impecable</span>.
            </h1>
            <p ref={heroSub} style={{ fontSize: "clamp(16px,1.3vw,18.5px)", lineHeight: 1.65, color: "#9fb0cc", fontWeight: 400, maxWidth: 580, margin: "0 0 40px" }}>
              Desde hace más de cincuenta años, Brandon Brokerage Group combina soporte avanzado de ventas y gestión integral de casos con acceso a más de 30 aseguradoras de primer nivel, y un dominio poco común del mercado de clientes extranjeros.
            </p>
            <div ref={heroCta} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ padding: "16px 32px", borderRadius: 4, fontSize: 13.5, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Trabajemos Juntos</a>
              <a href="#products" className={`${styles.cta} ${styles.ctaOutline}`} style={{ padding: "16px 32px", borderRadius: 4, fontSize: 13.5, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Ver Productos</a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span className={styles.mono} style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#54647f" }}>Scroll</span>
          <span style={{ width: 1, height: 34, background: "linear-gradient(#3b82f6, transparent)" }} />
        </div>
      </div>

      {/* STATS */}
      <div data-reveal style={{ borderTop: "1px solid #10192c", borderBottom: "1px solid #10192c", background: "#05070d" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {[["50+", "Años de experiencia"], ["30+", "Aseguradoras top"], ["05", "Líneas de producto"], ["No.1", "Mercado de extranjeros"]].map(([n, l], i) => (
            <div key={l} style={{ padding: "40px clamp(20px,4vw,48px)", borderLeft: i > 0 ? "1px solid #10192c" : undefined }}>
              <div style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: "clamp(34px,4.4vw,50px)", fontWeight: 800, color: n === "No.1" ? "#5c8dff" : "#fff", lineHeight: 0.95 }}>{n}</div>
              <div className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7c9c", marginTop: 12 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION */}
      <div style={{ padding: "clamp(76px,10vw,140px) clamp(20px,5vw,60px)", background: "#05070d" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div data-reveal className={styles.tag} style={{ marginBottom: 30 }}>Nuestra Misión</div>
          <p data-reveal style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600, fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.34, margin: 0, color: "#dbe4f5" }}>
            Brindar a los agentes un servicio superior, soporte de ventas personalizado y soluciones a medida que <span style={{ color: "#5c8dff" }}>construyan relaciones de largo plazo</span>.
          </p>
        </div>
      </div>

      {/* WHAT WE OFFER — signature scroll moment: the blueprint assembles */}
      <div id="why" ref={spineRef} style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px) 0", background: "#070b14", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: "clamp(44px,6vw,80px)" }}>
            <div>
              <div className={styles.tag} style={{ marginBottom: 14 }}>Qué Ofrecemos</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.6vw,44px)", margin: 0, color: "#fff", letterSpacing: "-0.01em" }}>El blueprint, ensamblado.</h2>
            </div>
            <span className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7c9c" }}>Cuatro disciplinas / un equipo</span>
          </div>

          <div className={styles.spineWrap}>
            {/* the spine draws itself with scroll */}
            <motion.div className={styles.spineLine} style={{ scaleY: spineScale }} aria-hidden="true" />
            {OFFERINGS.map((_, i) => (
              <SpineNode key={i} i={i} />
            ))}
            {/* terminal: the spine connects to the global network */}
            <div className={styles.spineEnd}>
              <span style={{ width: 11, height: 11, background: "#3b82f6", borderRadius: "50%", boxShadow: "0 0 18px rgba(59,130,246,0.8)" }} />
              <a href="#foreign" className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5c8dff", marginTop: 14 }}>↓ Red de clientes extranjeros</a>
            </div>
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL — the globe lands here, where the spine points */}
      <div id="foreign" style={{ position: "relative", padding: "clamp(76px,10vw,130px) clamp(20px,5vw,60px)", background: "linear-gradient(180deg,#070b14,#0a1226)", overflow: "hidden", borderTop: "1px solid #10192c" }}>
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <div data-reveal className={styles.tag} style={{ marginBottom: 24 }}>Especialidad Distintiva</div>
            <h2 data-reveal style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,72px)", lineHeight: 1.02, margin: "0 0 40px", color: "#fff", letterSpacing: "-0.02em" }}>
              Colocamos los casos que <span style={{ color: "#5c8dff" }}>otros rechazan</span>.
            </h2>
            <div data-reveal style={{ display: "grid", gap: 24, borderTop: "1px solid #1b2842", paddingTop: 34 }}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9fb0cc", margin: 0 }}>Con más de 50 años de experiencia, somos líderes del mercado de clientes extranjeros. Ayudamos a los agentes a diseñar estrategias de venta y soluciones de wealth management a medida para sus clientes internacionales.</p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#9fb0cc", margin: 0 }}>Nuestro enfoque de arquitectura abierta ofrece una variedad de productos y servicios para cubrir las necesidades de sus clientes, siempre dentro de las normas de cada aseguradora, estado y regulación federal. <a href="#contact" style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 14 }}>Trabajemos juntos →</a></p>
            </div>
          </div>
          <div data-reveal style={{ position: "relative", width: "min(100%, 520px)", margin: "0 auto", aspectRatio: "1 / 1", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 40% 30%, #0b1c3c, #04070f 75%)", boxShadow: "0 0 140px rgba(37,99,235,0.22)" }}>
            <GlobeArcs palette={BLUE_ARCS} />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px)", background: "#05070d", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
            <div>
              <div className={styles.tag} style={{ marginBottom: 14 }}>Productos</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.6vw,44px)", margin: 0, color: "#fff", letterSpacing: "-0.01em" }}>Cinco líneas, una relación.</h2>
            </div>
            <span className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7c9c" }}>Con el respaldo de más de 30 aseguradoras</span>
          </div>
          <div data-reveal style={{ borderTop: "1px solid #16223a" }}>
            {PRODUCTS.map((p) => (
              <a key={p.n} href="#contact" className={styles.prodRow}>
                <span className={styles.mono} style={{ fontSize: 12.5, color: "#3b82f6" }}>{p.n}</span>
                <span className={styles.prodName} style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.6vw,30px)", color: "#eef2f8", letterSpacing: "-0.01em" }}>{p.name}</span>
                <span className={styles.mono} style={{ fontSize: 12, color: "#6b7c9c", textAlign: "right" }}>{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CARRIERS */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px)", background: "#05070d", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className={styles.mono} style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6b7c9c", marginBottom: 30 }}>Nuestras aseguradoras — firma líder de Tellus / Crump</div>
          <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}>
            <div className={styles.marquee}>
              {[0, 1].map((rep) => (
                <div key={rep} style={{ display: "flex", alignItems: "center", gap: "clamp(26px,3.4vw,52px)", paddingRight: "clamp(26px,3.4vw,52px)" }} aria-hidden={rep === 1}>
                  {CARRIERS.map((c) => (
                    <span key={c} style={{ display: "flex", alignItems: "center", gap: "clamp(26px,3.4vw,52px)", whiteSpace: "nowrap" }}>
                      <span style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(17px,1.8vw,24px)", color: "#41506b" }}>{c}</span>
                      <span style={{ width: 5, height: 5, background: "#2563eb" }} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ position: "relative", padding: "clamp(76px,10vw,130px) clamp(20px,5vw,60px)", background: "radial-gradient(110% 120% at 20% 0%, #10254d 0%, #070b14 60%)", overflow: "hidden", borderTop: "1px solid #10192c" }}>
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,90px)", alignItems: "center" }}>
          <div data-reveal>
            <div className={styles.tag} style={{ marginBottom: 24 }}>Contacto</div>
            <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,58px)", lineHeight: 1.05, margin: "0 0 24px", color: "#fff", letterSpacing: "-0.02em" }}>Escribamos más negocio, juntos.</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "#9fb0cc", margin: 0, maxWidth: 460 }}>Cuéntenos sobre su caso o su cartera. Un director de brokerage responde dentro de un día hábil.</p>
          </div>
          <div data-reveal style={{ border: "1px solid #1b2842", background: "rgba(7,11,20,0.7)", backdropFilter: "blur(6px)" }}>
            <a href="tel:+13054447401" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 24px", borderBottom: "1px solid #1b2842" }}><span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6b7c9c" }}>TELÉFONO</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 21, fontWeight: 700, color: "#fff" }}>305-444-7401</span></a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 24px", borderBottom: "1px solid #1b2842" }}><span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6b7c9c" }}>LÍNEA GRATUITA</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 21, fontWeight: 700, color: "#fff" }}>1-888-776-4678</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 24px" }}><span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6b7c9c" }}>OFICINA</span><span style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 15.5, fontWeight: 700, color: "#fff", textAlign: "right" }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#03050a", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,60px) 0", borderTop: "1px solid #10192c" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div className={styles.footerGrid}>
            <div>
              <div style={{ display: "inline-flex", marginBottom: 18 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brandon-logo-white.png" alt="Brandon Brokerage Group" style={{ height: 26 }} />
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#6b7c9c", margin: 0, maxWidth: 280 }}>Firma líder de Tellus / Crump al servicio de productores y asesores financieros desde los años 70.</p>
            </div>

            <div>
              <div className={styles.tag} style={{ marginBottom: 16 }}>Compañía</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className={styles.footLink} style={{ fontSize: 14, color: "#9fb0cc" }}>{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.tag} style={{ marginBottom: 16 }}>Contacto</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#9fb0cc" }}>
                <a href="tel:+13054447401" className={styles.footLink} style={{ color: "#9fb0cc" }}>305-444-7401</a>
                <a href="tel:+18887764678" className={styles.footLink} style={{ color: "#9fb0cc" }}>1-888-776-4678</a>
                <span style={{ color: "#6b7c9c", lineHeight: 1.5 }}>75 Valencia Ave, Suite 200<br />Coral Gables, FL 33134</span>
              </div>
            </div>

            <div>
              <div className={styles.tag} style={{ marginBottom: 16 }}>Trabajemos juntos</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#6b7c9c", margin: "0 0 16px" }}>Un director de brokerage responde dentro de un día hábil.</p>
              <a href="#contact" className={`${styles.cta} ${styles.ctaBlue}`} style={{ display: "inline-block", padding: "11px 22px", borderRadius: 4, fontSize: 12, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>Trabajemos Juntos</a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #10192c", marginTop: "clamp(40px,5vw,56px)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div className={styles.mono} style={{ fontSize: 11.5, color: "#54647f" }}>© 1970s–2026 BRANDON BROKERAGE GROUP. TODOS LOS DERECHOS RESERVADOS.</div>
            <div className={styles.mono} style={{ fontSize: 11.5, color: "#54647f" }}>SOLO PARA AGENTES Y ASESORES CON LICENCIA</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
