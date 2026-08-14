"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { DEEP } from "@/lib/deep";
import { MHeader, MFooter, MClosing, MPageHero, Breath, Tag, useLang } from "../chrome";
import styles from "../page.module.css";

// Our Firm: the mission, who Brandon serves, what the desk does, the two
// networks behind it, and the team who answers. Same content lib/deep carries
// for every direction, in Meridian's own bento grammar.
export default function FirmPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const d = DEEP[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal(pageRef);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <div ref={pageRef} className={styles.page}>
      <MHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      <div className={styles.stack}>
        <MPageHero
          glyph="compass"
          kicker={t.missionKicker}
          title={t.missionText.trim()}
          clause={`${t.missionHighlight}.`}
          image="/images/bb-family-dune.jpg"
          imageAlt="A family together outdoors"
          imagePosition="50% 38%"
        />

        {/* approach + who we serve */}
        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardCream} ${styles.colHalf}`}>
            <Tag glyph="layers">{t.approachKicker}</Tag>
            <p style={{ fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.72, color: "var(--body)", margin: 0 }}>{t.approachText}</p>
          </article>
          <article data-reveal className={`${styles.card} ${styles.cardBone} ${styles.colHalf}`}>
            <Tag glyph="globe">{d.serveKicker}</Tag>
            <h2 className={styles.serifTitle} style={{ fontSize: "clamp(20px,2vw,26px)", color: "var(--navy)", marginBottom: 12 }}>{d.serveTitle}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "var(--body)", margin: "0 0 20px" }}>{d.serveBody}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {d.serve.map((s) => (
                <span key={s} className={styles.chip}>{s}</span>
              ))}
            </div>
          </article>
        </section>

        {/* capabilities: what Brandon does, and what it shows agents how to do */}
        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardCream} ${styles.colHalf}`}>
            <Tag glyph="shield">{d.svcKicker}</Tag>
            <h2 className={styles.serifTitle} style={{ fontSize: "clamp(20px,2vw,26px)", color: "var(--navy)", marginBottom: 18 }}>{d.svcTitle}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {d.svc.map((sv) => (
                <div key={sv} className={styles.dotRow}>
                  <span className={styles.dot} />
                  <span style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--navy)" }}>{sv}</span>
                </div>
              ))}
            </div>
          </article>
          <article data-reveal className={`${styles.card} ${styles.cardNavy} ${styles.colHalf}`}>
            <div className={styles.topo} aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div className={styles.kicker} style={{ color: "var(--gold-soft)", marginBottom: 18 }}>{d.svcShowTitle}</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {d.svcShow.map((sv, i) => (
                  <div key={sv} className={styles.prodRow} style={{ borderColor: "var(--hair-light)", alignItems: "baseline", gap: 16 }}>
                    <span style={{ fontFamily: "var(--font-lora), serif", fontSize: 20, color: "var(--gold-soft)", lineHeight: 1, flexShrink: 0 }}>0{i + 1}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.62, color: "rgba(245,241,232,0.82)", textAlign: "left" }}>{sv}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        {/* the two networks behind the desk */}
        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardBone} ${styles.colHalf}`}>
            <div className={styles.kicker} style={{ marginBottom: 14 }}>Tellus · Crump</div>
            <h3 className={styles.serifTitle} style={{ fontSize: "clamp(19px,1.7vw,23px)", color: "var(--navy)", marginBottom: 12 }}>{d.tellusTitle}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "var(--body)", margin: 0 }}>{d.tellusBody}</p>
          </article>
          <article data-reveal className={`${styles.card} ${styles.cardBone} ${styles.colHalf}`}>
            <div className={styles.kicker} style={{ marginBottom: 14 }}>Joint venture</div>
            <h3 className={styles.serifTitle} style={{ fontSize: "clamp(19px,1.7vw,23px)", color: "var(--navy)", marginBottom: 12 }}>{d.icsTitle}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "var(--body)", margin: 0 }}>{d.icsBody}</p>
          </article>
        </section>

        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colFull}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bb-family-hands.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>
        </section>

        <Breath text={t.quote} attrib={t.quoteAttrib} />

        {/* the team, by name — nested on the navy masthead the way products
            nest on the landing's shelf card */}
        <section data-reveal className={`${styles.block} ${styles.blockNavy} ${styles.blockPad}`}>
          <div className={styles.topo} aria-hidden="true" />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Tag glyph="shield" dark>{d.teamKicker}</Tag>
            <h2 className={styles.display} style={{ fontSize: "clamp(28px,3.4vw,48px)", color: "#fff", maxWidth: "20ch", marginBottom: 16 }}>{d.teamTitle}</h2>
            <p className={styles.statementBody} style={{ maxWidth: "60ch" }}>{d.teamBody}</p>

            <div className={styles.teamGrid}>
              {d.teamGroups.map((g) => (
                <div key={g.label} className={styles.teamBox}>
                  <div className={styles.teamBoxLabel}>{g.label}</div>
                  {g.members.map((mem) => (
                    <div key={`${g.label}-${mem.name}`} className={styles.prodRow} style={{ borderColor: "var(--hair-light)", flexDirection: "column", alignItems: "flex-start", gap: 2, padding: "10px 0" }}>
                      <span className={styles.prodName} style={{ fontSize: 15 }}>{mem.name}</span>
                      <span className={styles.prodDesc} style={{ textAlign: "left" }}>{mem.role}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <MClosing lang={lang} />
        <MFooter lang={lang} />
      </div>
    </div>
  );
}
