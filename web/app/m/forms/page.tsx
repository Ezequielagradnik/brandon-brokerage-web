"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { DEEP, OFFICE } from "@/lib/deep";
import { MHeader, MFooter, MClosing, MPageHero, useLang } from "../chrome";
import styles from "../page.module.css";

// Forms: the agent desk. Carriers change their paperwork constantly, so every
// item points at the phone rather than pretending to be a stale download.
export default function FormsPage() {
  const [lang, setLang] = useLang();
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
        <MPageHero glyph="layers" kicker={d.resKicker} title={d.resTitle} body={d.resBody} />

        <div data-reveal style={{ marginTop: "var(--gutter)" }}>
          <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillDark}`}>
            {d.resCta} · {OFFICE.phone} <span className={styles.pillDisc} aria-hidden="true">→</span>
          </a>
        </div>

        <section className={styles.bento} style={{ marginTop: "clamp(20px,2.6vw,32px)" }}>
          {d.resGroups.map((g, i) => (
            <article key={g.label} data-reveal className={`${styles.card} ${i % 2 === 0 ? styles.cardCream : styles.cardBone} ${styles.colThird}`}>
              <div className={styles.kicker} style={{ marginBottom: 16 }}>{g.label}</div>
              <div>
                {g.items.map((it) => (
                  <a key={it} href={OFFICE.phoneHref} className={styles.linkRow}>
                    <span style={{ fontSize: 14.5, color: "var(--navy)" }}>{it}</span>
                    <span className={styles.linkArrow} aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colFull}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bb-meeting-advisors.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>
        </section>

        <MClosing lang={lang} />
        <MFooter lang={lang} />
      </div>
    </div>
  );
}
