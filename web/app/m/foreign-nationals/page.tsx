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

        <section data-reveal className={`${styles.card} ${styles.cardBone} ${styles.blockPad}`} style={{ marginTop: "var(--gutter)" }}>
          <div className={styles.kicker} style={{ marginBottom: "clamp(18px,2vw,26px)" }}>{d.fnFlowTitle}</div>
          <div className={styles.stepShell}>
            <div className={styles.stepCore}>
              {d.fnSteps.map((s, i) => (
                <div
                  key={s.n}
                  style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: "18px 0", borderBottom: i === d.fnSteps.length - 1 ? "none" : "1px solid var(--hair)" }}
                >
                  <span className={styles.stepNum} style={{ paddingTop: 4 }}>{s.n}</span>
                  <div>
                    <div className={styles.stepName} style={{ marginBottom: 6 }}>{s.title}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.62, color: "var(--body)", margin: 0, maxWidth: "58ch" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.kicker} style={{ color: "var(--gold-deep)", marginTop: "clamp(20px,2.4vw,30px)" }}>{d.fnNote}</div>

          <div className={styles.cardFoot}>
            <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillDark}`}>
              {t.cta.partner} <span className={styles.pillDisc} aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <MClosing lang={lang} />
        <MFooter lang={lang} />
      </div>
    </div>
  );
}
