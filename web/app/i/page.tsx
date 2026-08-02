"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import MobileMenu from "@/components/MobileMenu";
import { COPY, OFFERINGS_I18N, type Lang } from "@/lib/copy";
import LangToggle from "@/components/LangToggle";
import AgentTools, { type ToolId } from "@/components/AgentTools";
import { ScrollProgress, MaskReveal, LettersReveal, FadeIn, CountUp, ParallaxImg, ClipReveal, GrowLine, Magnetic, ctaFillFromCursor } from "@/components/motion";
import CaseJourney from "@/components/CaseJourney";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CTA_HREF, WHATSAPP_ENABLED } from "@/lib/contact";
import styles from "./page.module.css";

const navLinks = (t: (typeof COPY)[Lang]) => [
  { href: "#firm", label: t.nav.firm },
  { href: "#foreign", label: t.nav.foreign },
  { href: "#products", label: t.nav.products },
  { href: "#contact", label: t.nav.contact },
];

const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];



const INK = "#1a1814";
const PAPER = "#f7f4ee";
const MUTED = "#6a6357";
const HAIR = "1px solid rgba(26,24,20,0.16)";

export default function ConceptI() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const NAV_LINKS = navLinks(t);
  const no = lang === "es" ? "N.º" : "No.";
  const [tool, setTool] = useState<ToolId | null>(null);
  const [toolOrigin, setToolOrigin] = useState({ x: 50, y: 8 });
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  // ----- Signature scroll moment: the chapter index marks itself -----
  const [activeCh, setActiveCh] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indY, setIndY] = useState(0);

  useEffect(() => {
    const els = chapterRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveCh(idx);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = indexItemRefs.current[activeCh];
    if (el) setIndY(el.offsetTop + el.offsetHeight / 2);
  }, [activeCh]);

  const serif = "var(--font-cormorant), serif";
  const label: React.CSSProperties = { fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED };

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />

      {/* HEADER */}
      <div className={styles.headerBar} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: "18px clamp(20px,5vw,60px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#top" style={{ display: "inline-flex" }}><img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 27 }} /></a>
        <div className={styles.headerNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.nl}>{l.label}</a>
          ))}
          <button
            type="button"
            className={`${styles.nl} ${styles.navTool}`}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setToolOrigin({ x: ((r.left + r.width / 2) / window.innerWidth) * 100, y: ((r.top + r.height / 2) / window.innerHeight) * 100 });
              setTool("assistant");
            }}
          >
            <span className={styles.navToolDot} aria-hidden="true" />
            {t.nav.assistant}
          </button>
          <LangToggle lang={lang} setLang={setLang} color="rgba(26,24,20,0.5)" activeColor={INK} />
          <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ padding: "10px 22px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.cta.partner}</a>
        </div>
        <MobileMenu
          links={[{ href: "#tools", label: t.nav.assistant }, ...NAV_LINKS]}
          ctaLabel={t.cta.partner}
          ctaHref="#contact"
          panelBg={PAPER}
          textColor={INK}
          accentColor={INK}
        />
      </div>

      {/* HERO , oversized editorial masthead */}
      <div id="top" style={{ padding: "clamp(140px,18vh,200px) clamp(20px,5vw,60px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(30px,4vw,52px)" }}>
            <FadeIn delay={0.1} y={14} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingBottom: 18 }}>
              <span style={label}>Brandon Brokerage Group</span>
              <span style={label}>Coral Gables, Florida</span>
              <span style={label}>{t.heroKicker.split(" · ")[1] ?? t.heroKicker}</span>
            </FadeIn>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }} style={{ height: 1, background: INK, transformOrigin: "0 50%" }} />
          </div>
          <div className={styles.mastGrid} style={{ paddingBottom: "clamp(40px,6vw,80px)" }}>
            <div className={styles.mastText}>
              <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(50px,8.2vw,124px)", lineHeight: 0.98, margin: "0 0 clamp(34px,4.5vw,60px)", color: INK, letterSpacing: "-0.015em" }}>
                <span style={{ display: "block" }}><LettersReveal text={lang === "es" ? "Ejecución" : "Seamless"} delay={0.3} /></span>
                <span style={{ display: "block", fontStyle: "italic" }}><LettersReveal text={lang === "es" ? "impecable," : "execution,"} delay={0.62} /></span>
                <span style={{ display: "block" }}><LettersReveal text={lang === "es" ? "desde los años 60." : "since the ’60s."} delay={0.98} /></span>
              </h1>
              <FadeIn delay={1.15}>
                <p style={{ maxWidth: 460, fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 30px" }}>{t.heroSub}</p>
              </FadeIn>
              <FadeIn delay={1.35} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <Magnetic>
                  <a href="#contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.cta.partner}</a>
                </Magnetic>
                <a href="#firm" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.06em", color: INK }}>{lang === "es" ? "La firma, en breve" : "The firm, in brief"}</a>
              </FadeIn>
            </div>
            <div className={styles.mastFig}>
              <ClipReveal delay={0.75} style={{ height: "clamp(340px,42vw,560px)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/miami-palms-day.jpg" alt="Coral Gables, Florida" data-photo-slot="hero" className={styles.bw} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </ClipReveal>
              <FadeIn delay={1.5} y={10} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "12px 2px 0", flexWrap: "wrap" }}>
                <span style={label}>Fig. 01</span>
                <span style={label}>Coral Gables, FL</span>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* HERO IMAGE , b&w full width with caption */}
      <div data-reveal style={{ padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ParallaxImg
            src="/images/handshake-moody.jpg"
            alt="Un apretón de manos"
            range={44}
            photoSlot="firm"
            style={{ height: "clamp(300px,52vh,600px)" }}
            imgClassName={styles.bw}
          />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "14px 2px 0", flexWrap: "wrap" }}>
            <span style={label}>{lang === "es" ? "Fig. 02 / La sociedad" : "Fig. 02 / The partnership"}</span>
            <span style={label}>{lang === "es" ? "60+ años · 30+ aseguradoras · 5 líneas de producto" : "60+ years · 30+ carriers · 5 product lines"}</span>
          </div>
        </div>
      </div>

      {/* AGENT TOOLS , the AI assistant and its two companions */}
      <AgentTools lang={lang} id="tools" tone="editorial" open={tool} origin={toolOrigin} onOpenChange={setTool} />

      {/* STATS , editorial ledger row */}
      <div data-reveal style={{ padding: "clamp(56px,7vw,90px) clamp(20px,5vw,60px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "28px clamp(24px,4vw,64px)" }}>
          {[
            { num: 60, suffix: "+", label: t.stats.years },
            { num: 30, suffix: "+", label: t.stats.carriers },
            { num: 5, suffix: "", label: t.stats.lines },
            { num: 1, suffix: "", label: lang === "es" ? "Día hábil de respuesta" : "Business-day response" },
          ].map((s, i) => (
            <div key={s.label}>
              <GrowLine color={INK} delay={i * 0.12} />
              <div style={{ paddingTop: 18 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(38px,4.4vw,64px)", fontWeight: 400, color: INK, lineHeight: 1, letterSpacing: "-0.01em" }}>
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div style={{ ...label, marginTop: 12 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION , indented editorial pull quote */}
      <div style={{ padding: "clamp(90px,13vw,170px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", gap: "clamp(16px,2.4vw,36px)" }}>
          <div data-reveal style={{ gridColumn: "1 / span 2", ...label, paddingTop: 10 }}>{no} 01<br />{t.missionKicker.replace(/^(Our|Nuestra) /, "")}</div>
          <p data-reveal style={{ gridColumn: "4 / span 9", fontFamily: serif, fontWeight: 400, fontSize: "clamp(26px,3.6vw,46px)", lineHeight: 1.32, margin: 0, color: INK }}>{t.missionText}<span style={{ fontStyle: "italic" }}>{t.missionHighlight}</span>.</p>
        </div>
      </div>

      {/* THE FIRM , signature scroll moment: the chapter index marks itself */}
      <div id="firm" style={{ padding: "0 clamp(20px,5vw,60px) clamp(60px,8vw,110px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ borderTop: `1px solid ${INK}`, paddingTop: 18, marginBottom: "clamp(44px,6vw,80px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={label}>{no} 02 / {lang === "es" ? "Capítulos" : "Chapters"}</span>
            <span style={label}>{t.offerNote}</span>
          </div>

          <div className={styles.tocGrid}>
            {/* sticky table of contents , marks itself as you read */}
            <div className={styles.tocLeft}>
              <div style={{ position: "relative", paddingLeft: 58 }}>
                <motion.span
                  aria-hidden="true"
                  animate={{ top: indY }}
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  style={{ position: "absolute", left: 0, top: 0, width: 40, height: 1, background: INK }}
                />
                {OFFERINGS.map((o, i) => (
                  <div
                    key={o.n}
                    ref={(el) => { indexItemRefs.current[i] = el; }}
                    style={{ padding: "16px 0", cursor: "pointer" }}
                    onClick={() => chapterRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  >
                    <div style={{
                      fontFamily: serif,
                      fontWeight: 500,
                      fontSize: "clamp(24px,2.4vw,38px)",
                      lineHeight: 1.1,
                      transition: "color 0.5s ease, -webkit-text-stroke-color 0.5s ease",
                      color: activeCh === i ? INK : "transparent",
                      WebkitTextStroke: activeCh === i ? "0px" : "1px rgba(26,24,20,0.3)",
                    }}>
                      {lang === "es" ? "Capítulo" : "Chapter"} 0{i + 1}
                    </div>
                    <div style={{ ...label, fontSize: 10, marginTop: 6, color: activeCh === i ? INK : "rgba(26,24,20,0.35)", transition: "color 0.5s ease" }}>{o.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* chapters */}
            <div style={{ display: "grid", gap: "clamp(70px,9vw,130px)" }}>
              {OFFERINGS.map((o, i) => (
                <div key={o.n} ref={(el) => { chapterRefs.current[i] = el; }} data-reveal>
                  <ParallaxImg src={o.img} alt={o.title} range={28} photoSlot={`offer-${o.n}`} style={{ height: "clamp(260px,36vw,460px)", marginBottom: 26 }} imgClassName={styles.bw} />
                  <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20, color: MUTED, marginBottom: 12 }}>({lang === "es" ? "Capítulo" : "Chapter"} 0{i + 1})</div>
                  <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(26px,2.8vw,38px)", margin: "0 0 14px", color: INK, lineHeight: 1.12 }}>{o.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 16px", maxWidth: 560 }}>{o.blurb}</p>
                  <a href="#contact" className={styles.lnk} style={{ fontSize: 11.5, letterSpacing: "0.24em", textTransform: "uppercase", color: INK }}>{t.cta.learnMore}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONAL , the journey of a case (pinned scene, maison register) */}
      <CaseJourney
        id="foreign"
        lang={lang}
        num={`${no} 03`}
        variant="editorial"
        serif={serif}
        cta={
          <a href="#contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaInverse}`} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.cta.partner}</a>
        }
      />

      {/* PRODUCTS , catalogue index */}
      <div id="products" style={{ padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ borderTop: `1px solid ${INK}`, paddingTop: 18, marginBottom: "clamp(40px,5vw,64px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={label}>{no} 04 / {t.productsKicker}</span>
            <span style={label}>{t.productsBacked}</span>
          </div>
          <div data-reveal>
            {t.products.map((p, i) => (
              <motion.a
                key={p.name}
                href="#contact"
                className={styles.prod}
                whileHover={{ x: 14 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{ display: "grid", gridTemplateColumns: "clamp(64px,8vw,110px) 1fr auto", gap: "clamp(14px,3vw,40px)", alignItems: "baseline", padding: "26px 2px", borderBottom: HAIR }}
              >
                <span style={{ fontFamily: serif, fontStyle: "italic", color: MUTED, fontSize: 17 }}>{no} {i + 1}</span>
                <span style={{ fontFamily: serif, fontSize: "clamp(26px,3.6vw,48px)", fontWeight: 400, color: INK, letterSpacing: "-0.01em" }}>{p.name}</span>
                <span style={{ fontSize: 13, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </motion.a>
            ))}
          </div>
          <div data-reveal style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "10px clamp(20px,2.6vw,36px)" }}>
            <span style={label}>{lang === "es" ? "Aseguradoras" : "Carriers"}</span>
            {CARRIERS.map((c) => (
              <span key={c} style={{ fontSize: 13, color: "#8d8577", letterSpacing: "0.02em" }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT , oversized sign-off */}
      <div id="contact" style={{ padding: "0 clamp(20px,5vw,60px) clamp(80px,11vw,150px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: `1px solid ${INK}`, paddingTop: "clamp(44px,6vw,80px)" }}>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(44px,8vw,120px)", lineHeight: 1.04, margin: "0 0 clamp(36px,5vw,60px)", color: INK, letterSpacing: "-0.015em" }}>
            <MaskReveal inView duration={1.2}>{lang === "es" ? "Escribamos más " : "Let’s write more "}<span style={{ fontStyle: "italic" }}>{lang === "es" ? "negocio." : "business."}</span></MaskReveal>
          </h2>
          <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(24px,4vw,56px)", alignItems: "start" }}>
            <div>
              <div style={{ ...label, marginBottom: 14 }}>{t.phone}</div>
              <a href="tel:+13054447401" className={styles.lnk} style={{ fontFamily: serif, fontSize: "clamp(22px,2.4vw,30px)", color: INK }}>305-444-7401</a>
              <div style={{ fontSize: 13.5, color: MUTED, marginTop: 8 }}>{t.tollFree} 1-888-776-4678</div>
            </div>
            <div>
              <div style={{ ...label, marginBottom: 14 }}>{t.office}</div>
              <div style={{ fontFamily: serif, fontSize: "clamp(19px,1.9vw,24px)", color: INK, lineHeight: 1.4 }}>75 Valencia Avenue, Suite 200<br />Coral Gables, FL 33134</div>
            </div>
            <div>
              <div style={{ ...label, marginBottom: 14 }}>{t.response}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED, margin: "0 0 22px" }}>{t.responseText}</p>
              <a href={CTA_HREF} {...(WHATSAPP_ENABLED ? { target: "_blank", rel: "noopener noreferrer" } : {})} onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{WHATSAPP_ENABLED && <WhatsAppIcon />}{t.cta.partner}</a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "32px clamp(20px,5vw,60px)", borderTop: HAIR, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 21 }} />
        <div style={{ fontSize: 12, color: MUTED }}>{t.rights} · {t.licensed}</div>
      </div>

    </div>
  );
}
