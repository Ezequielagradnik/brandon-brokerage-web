"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY, OFFERINGS_I18N } from "@/lib/copy";
import { ScrollProgress, MaskReveal, LettersReveal, FadeIn, CountUp, ParallaxImg, ClipReveal, GrowLine, Magnetic, ctaFillFromCursor } from "@/components/motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CTA_HREF, NETWORK_URL, WHATSAPP_ENABLED } from "@/lib/contact";
import { ChapterHead, FootBar, IHeader, useLang } from "./chrome";
import { CARRIERS, EXTRA, FAINT, INK, LABEL, MUTED, SERIF, deepLinks, numeral } from "./copy";
import styles from "./page.module.css";

// Maison Editorial. The landing carries the argument and nothing else: the
// masthead, the platform, the ledger of numbers, the mission, the four
// numbered chapters, the specialty in brief and the catalogue index. Our Firm,
// Products, Foreign Nationals and Forms each open onto their own page, the way
// brandonbrokerage.com splits it.

/* Each chapter cross-references the page where it is treated in full. */
const CHAPTER_HREF = ["/i/foreign-nationals", "/i/firm", "/i/firm", "/i/products"];

/* The masthead titles set the last word in italic, the way the hero does. */
function titleItalicTail(title: string) {
  const at = title.lastIndexOf(" ");
  if (at < 0) return { head: "", tail: title };
  return { head: title.slice(0, at + 1), tail: title.slice(at + 1) };
}

export default function ConceptI() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const OFFERINGS = OFFERINGS_I18N[lang];
  const no = numeral(lang);
  const ai = titleItalicTail(x.aiTitle);
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

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />
      <IHeader lang={lang} setLang={setLang} />

      {/* HERO , oversized editorial masthead */}
      <div id="top" className={styles.wrap} style={{ paddingTop: "clamp(140px,18vh,200px)" }}>
        <div style={{ marginBottom: "clamp(30px,4vw,52px)" }}>
          <FadeIn delay={0.1} y={14} className={styles.runningHeads}>
            <span style={LABEL}>Brandon Brokerage Group</span>
            <span style={LABEL}>Coral Gables, Florida</span>
            <span style={LABEL}>{t.heroKicker.split(" · ")[1] ?? t.heroKicker}</span>
          </FadeIn>
          <motion.div aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }} style={{ height: 1, background: INK, transformOrigin: "0 50%" }} />
        </div>
        <div className={styles.mastGrid} style={{ paddingBottom: "clamp(40px,6vw,80px)" }}>
          <div className={styles.mastText}>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(50px,8.2vw,124px)", lineHeight: 0.98, margin: "0 0 clamp(34px,4.5vw,60px)", color: INK, letterSpacing: "-0.015em" }}>
              <span style={{ display: "block" }}><LettersReveal text={lang === "es" ? "Ejecución" : "Seamless"} delay={0.3} /></span>
              <span style={{ display: "block", fontStyle: "italic" }}><LettersReveal text={lang === "es" ? "impecable," : "execution,"} delay={0.62} /></span>
              <span style={{ display: "block" }}><LettersReveal text={lang === "es" ? "desde los años 60." : "since the ’60s."} delay={0.98} /></span>
            </h1>
            <FadeIn delay={1.15}>
              <p style={{ maxWidth: 460, fontSize: 16, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 30px" }}>{t.heroSub}</p>
            </FadeIn>
            <FadeIn delay={1.35} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <Magnetic>
                <a href="#contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLarge}`}>{t.cta.partner}</a>
              </Magnetic>
              <Link href="/i/firm" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.06em", color: INK }}>{lang === "es" ? "La firma, en detalle" : "The firm, in full"}</Link>
            </FadeIn>
          </div>
          <div className={styles.mastFig}>
            <ClipReveal delay={0.75} style={{ height: "clamp(340px,42vw,560px)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-palms-day.jpg" alt="Coral Gables, Florida" data-photo-slot="hero" className={styles.bw} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </ClipReveal>
            <FadeIn delay={1.5} y={10} className={styles.figCap} style={{ paddingTop: 12 }}>
              <span style={LABEL}>Fig. 01</span>
              <span style={LABEL}>Coral Gables, FL</span>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* HERO IMAGE , b&w full width with caption */}
      <div data-reveal className={styles.wrap}>
        <ParallaxImg
          src="/images/handshake-moody.jpg"
          alt={lang === "es" ? "Un apretón de manos" : "A handshake"}
          range={44}
          photoSlot="firm"
          style={{ height: "clamp(300px,52vh,600px)" }}
          imgClassName={styles.bw}
        />
        <div className={styles.figCap} style={{ paddingTop: 14 }}>
          <span style={LABEL}>{lang === "es" ? "Fig. 02 / La sociedad" : "Fig. 02 / The partnership"}</span>
          <span style={LABEL}>{lang === "es" ? "60+ años · 30+ aseguradoras · 5 líneas de producto" : "60+ years · 30+ carriers · 5 product lines"}</span>
        </div>
      </div>

      {/* THE PLATFORM , the group's own network; the whole block leaves the site */}
      <div id="network" className={styles.wrap} style={{ paddingTop: "clamp(70px,9vw,120px)" }}>
        <ChapterHead num={`${no} 01`} title={x.aiKicker} note="brandonlatamnetwork.com" />
        <a
          data-reveal
          href={NETWORK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.netRow}
        >
          <span className={styles.netTitle} style={{ fontFamily: SERIF }}>
            {ai.head}
            <span style={{ fontStyle: "italic" }}>{ai.tail}</span>
          </span>
          <span className={styles.netAside}>
            <span className={styles.netBody}>{x.aiBody}</span>
            <span className={styles.netCta}>
              {x.aiCta}
              <span className={styles.netArrow} aria-hidden="true">↗</span>
            </span>
          </span>
        </a>
      </div>

      {/* STATS , editorial ledger row */}
      <div data-reveal className={styles.wrap} style={{ paddingTop: "clamp(56px,7vw,90px)" }}>
        <div className={styles.ledger}>
          {[
            { num: 60, suffix: "+", label: t.stats.years },
            { num: 30, suffix: "+", label: t.stats.carriers },
            { num: 5, suffix: "", label: t.stats.lines },
            { num: 50, suffix: "", label: x.states },
          ].map((s, i) => (
            <div key={s.label}>
              <GrowLine color={INK} delay={i * 0.12} />
              <div style={{ paddingTop: 18 }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(38px,4.4vw,64px)", fontWeight: 400, color: INK, lineHeight: 1, letterSpacing: "-0.01em" }}>
                  <CountUp to={s.num} suffix={s.suffix} />
                </div>
                <div style={{ ...LABEL, marginTop: 12 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION , indented editorial pull quote */}
      <div className={styles.wrap} style={{ paddingTop: "clamp(90px,13vw,170px)", paddingBottom: "clamp(90px,13vw,170px)" }}>
        <div className={styles.quoteGrid}>
          <div data-reveal className={styles.quoteMark} style={LABEL}>{no} 02<br />{t.missionKicker.replace(/^(Our|Nuestra) /, "")}</div>
          <p data-reveal className={styles.quoteText} style={{ fontFamily: SERIF }}>{t.missionText}<span style={{ fontStyle: "italic" }}>{t.missionHighlight}</span>.</p>
        </div>
      </div>

      {/* THE FIRM , signature scroll moment: the chapter index marks itself */}
      <div id="firm" className={styles.wrap} style={{ paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 03`} title={lang === "es" ? "Capítulos" : "Chapters"} note={t.offerNote} />

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
                    fontFamily: SERIF,
                    fontWeight: 500,
                    fontSize: "clamp(24px,2.4vw,38px)",
                    lineHeight: 1.1,
                    transition: "color 0.5s ease, -webkit-text-stroke-color 0.5s ease",
                    color: activeCh === i ? INK : "transparent",
                    WebkitTextStroke: activeCh === i ? "0px" : "1px rgba(26,24,20,0.3)",
                  }}>
                    {lang === "es" ? "Capítulo" : "Chapter"} 0{i + 1}
                  </div>
                  <div style={{ ...LABEL, fontSize: 10, marginTop: 6, color: activeCh === i ? INK : "rgba(26,24,20,0.35)", transition: "color 0.5s ease" }}>{o.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* chapters */}
          <div style={{ display: "grid", gap: "clamp(70px,9vw,130px)" }}>
            {OFFERINGS.map((o, i) => (
              <div key={o.n} ref={(el) => { chapterRefs.current[i] = el; }} data-reveal>
                <ParallaxImg src={o.img} alt={o.title} range={28} photoSlot={`offer-${o.n}`} style={{ height: "clamp(260px,36vw,460px)", marginBottom: 26 }} imgClassName={styles.bw} />
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: MUTED, marginBottom: 12 }}>({lang === "es" ? "Capítulo" : "Chapter"} 0{i + 1})</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,2.8vw,38px)", margin: "0 0 14px", color: INK, lineHeight: 1.12 }}>{o.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: MUTED, fontWeight: 400, margin: "0 0 16px", maxWidth: 560 }}>{o.blurb}</p>
                <Link href={CHAPTER_HREF[i]} className={styles.lnk} style={{ fontSize: 11.5, letterSpacing: "0.24em", textTransform: "uppercase", color: INK }}>{t.cta.learnMore}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREIGN NATIONALS , the specialty in brief; the case flow has its own page */}
      <div id="foreign" className={styles.wrap} style={{ paddingBottom: "clamp(70px,9vw,130px)" }}>
        <ChapterHead num={`${no} 04`} title={x.fnKicker} note={x.fnFlowTitle} />
        <div className={styles.fnSpread}>
          <div className={styles.fnText}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px,5.4vw,76px)", lineHeight: 1.02, letterSpacing: "-0.015em", margin: "0 0 clamp(24px,3vw,36px)", color: INK }}>
              <MaskReveal inView delay={0.05}>{x.fnTitle1}</MaskReveal>
              <MaskReveal inView delay={0.2}><span style={{ fontStyle: "italic" }}>{x.fnTitle2}</span></MaskReveal>
            </h2>
            <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.8, color: MUTED, margin: "0 0 28px", maxWidth: 560 }}>{x.fnTeaser}</p>
            <div data-reveal>
              <Magnetic>
                <Link href="/i/foreign-nationals" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLarge}`}>{x.fnTeaserCta}</Link>
              </Magnetic>
            </div>
          </div>
          <div className={styles.fnFig}>
            <ParallaxImg
              src="/images/globe-gold.jpg"
              alt={lang === "es" ? "El mundo desde Coral Gables" : "The world, from Coral Gables"}
              range={30}
              photoSlot="foreign"
              style={{ height: "clamp(280px,34vw,440px)" }}
              imgClassName={styles.bw}
            />
            <div className={styles.figCap} style={{ paddingTop: 12 }}>
              <span style={LABEL}>Fig. 03</span>
              <span style={LABEL}>{x.fnKicker}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS , the catalogue index; every line opens on its own page */}
      <div id="products" className={styles.wrap} style={{ paddingBottom: "clamp(70px,9vw,130px)" }}>
        <ChapterHead num={`${no} 05`} title={t.productsKicker} note={t.productsBacked} />
        <div data-reveal>
          {t.products.map((p, i) => (
            <motion.div
              key={p.name}
              whileHover={{ x: 14 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Link href="/i/products" className={`${styles.prod} ${styles.prodRow}`}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", color: MUTED, fontSize: 17 }}>{no} {i + 1}</span>
                <span style={{ fontFamily: SERIF, fontSize: "clamp(26px,3.6vw,48px)", fontWeight: 400, color: INK, letterSpacing: "-0.01em" }}>{p.name}</span>
                <span style={{ fontSize: 13, color: MUTED, textAlign: "right" }}>{p.desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div data-reveal style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: "10px clamp(20px,2.6vw,36px)" }}>
          <span style={LABEL}>{lang === "es" ? "Aseguradoras" : "Carriers"}</span>
          {CARRIERS.map((c) => (
            <span key={c} style={{ fontSize: 13, color: FAINT, letterSpacing: "0.02em" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* CONTENTS , the four pages this landing hands off to */}
      <div className={styles.wrap} style={{ paddingBottom: "clamp(70px,9vw,120px)" }}>
        <ChapterHead num={`${no} 06`} title={x.moreKicker} note={lang === "es" ? "Tres páginas" : "Three pages"} />
        <div>
          {deepLinks("/i", lang).map((m, i) => (
            <Link key={m.href} data-reveal href={m.href} className={styles.idxRow}>
              <span style={{ ...LABEL, fontSize: 10 }}>0{i + 1}</span>
              <span>
                <span style={{ display: "block", fontFamily: SERIF, fontSize: "clamp(24px,2.8vw,36px)", fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 8 }}>{m.title}</span>
                <span style={{ display: "block", fontSize: 14, lineHeight: 1.7, color: MUTED, maxWidth: 560 }}>{m.body}</span>
              </span>
              <span className={styles.idxArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* CONTACT , oversized sign-off */}
      <div id="contact" className={styles.wrap} style={{ paddingBottom: "clamp(80px,11vw,150px)" }}>
        <div style={{ borderTop: `1px solid ${INK}`, paddingTop: "clamp(44px,6vw,80px)" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(44px,8vw,120px)", lineHeight: 1.04, margin: "0 0 clamp(36px,5vw,60px)", color: INK, letterSpacing: "-0.015em" }}>
            <MaskReveal inView duration={1.2}>{lang === "es" ? "Escribamos más " : "Let’s write more "}<span style={{ fontStyle: "italic" }}>{lang === "es" ? "negocio." : "business."}</span></MaskReveal>
          </h2>
          <div data-reveal className={styles.footGrid}>
            <div>
              <div style={{ ...LABEL, marginBottom: 14 }}>{t.phone}</div>
              <a href="tel:+13054447401" className={styles.lnk} style={{ fontFamily: SERIF, fontSize: "clamp(22px,2.4vw,30px)", color: INK }}>305-444-7401</a>
              <div style={{ fontSize: 13.5, color: MUTED, marginTop: 8 }}>{t.tollFree} 1-888-776-4678</div>
            </div>
            <div>
              <div style={{ ...LABEL, marginBottom: 14 }}>{t.office}</div>
              <div style={{ fontFamily: SERIF, fontSize: "clamp(19px,1.9vw,24px)", color: INK, lineHeight: 1.4 }}>75 Valencia Avenue, Suite 200<br />Coral Gables, FL 33134</div>
            </div>
            <div>
              <div style={{ ...LABEL, marginBottom: 14 }}>{t.response}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED, margin: "0 0 22px" }}>{t.responseText}</p>
              <a href={CTA_HREF} {...(WHATSAPP_ENABLED ? { target: "_blank", rel: "noopener noreferrer" } : {})} onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLarge}`} style={{ display: "inline-flex", alignItems: "center" }}>{WHATSAPP_ENABLED && <WhatsAppIcon />}{t.cta.partner}</a>
            </div>
          </div>
        </div>
      </div>

      <FootBar lang={lang} />
    </div>
  );
}
