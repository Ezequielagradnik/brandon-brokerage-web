"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { DEEP, OFFICE } from "@/lib/deep";
import { MHeader, MFooter, MClosing, MPageHero, useLang } from "../chrome";
import styles from "../page.module.css";

// Foreign nationals: the signature specialty, in full, and the five stages a
// case actually moves through — nested on the same shell/core the landing's
// teaser card uses, with room here for what each stage does.
export default function ForeignNationalsPage() {
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
        <MPageHero glyph="globe" kicker={d.fnKicker} title={d.fnTitle1} clause={d.fnTitle2} />

        <section data-reveal className={`${styles.card} ${styles.cardCream} ${styles.blockPad}`} style={{ marginTop: "var(--gutter)", display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: "clamp(15px,1.3vw,17.5px)", lineHeight: 1.72, color: "var(--body)", margin: 0, maxWidth: "68ch" }}>{d.fnBody1}</p>
          <p style={{ fontSize: "clamp(15px,1.3vw,17.5px)", lineHeight: 1.72, color: "var(--body)", margin: 0, maxWidth: "68ch" }}>{d.fnBody2}</p>
        </section>

        <div data-reveal style={{ marginTop: "var(--gutter)" }}>
          <div className={styles.kicker} style={{ marginBottom: "clamp(18px,2.2vw,28px)" }}>{d.fnFlowTitle}</div>
          <div className={styles.bento} style={{ marginTop: 0 }}>
            {d.fnSteps.map((s, i) => (
              <article key={s.n} data-reveal className={`${styles.card} ${i % 2 === 0 ? styles.cardCream : styles.cardBone} ${styles.colThird}`}>
                <div className={styles.pillarNum}>{s.n}</div>
                <h3 className={`${styles.serifTitle} ${styles.pillarTitle}`}>{s.title}</h3>
                <p className={styles.pillarBody}>{s.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.kicker} style={{ color: "var(--gold-deep)", marginTop: "clamp(26px,3.2vw,38px)" }}>{d.fnNote}</div>

          <div style={{ marginTop: "clamp(26px,3.2vw,38px)" }}>
            <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillDark}`}>
              {t.cta.partner} <span className={styles.pillDisc} aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colFull}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/miami-night.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>
        </section>

        <MClosing lang={lang} />
        <MFooter lang={lang} />
      </div>
    </div>
  );
}
