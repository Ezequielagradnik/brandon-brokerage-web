"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { Magnetic, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { DFooter, DHeader, PageHero, useLang } from "../chrome";
import { GOLD, GOLD_DIM, MONO_K, EXTRA } from "../copy";
import styles from "../page.module.css";

// Forms: the agent desk. Carriers change their paperwork constantly, so every
// item points at the desk rather than pretending to be a download.
export default function FormsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <DHeader lang={lang} setLang={setLang} solid />

      <PageHero index="01" kicker={x.resKicker} title={x.resTitle} body={x.resBody} />

      <div style={{ padding: "clamp(30px,4vw,54px) clamp(20px,5vw,60px) clamp(50px,7vw,90px)", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <div data-reveal style={{ marginBottom: "clamp(34px,4.5vw,56px)" }}>
            <Magnetic>
              <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`}>{x.resCta} · 305-444-7401</a>
            </Magnetic>
          </div>

          <div className={styles.resGrid}>
            {x.resGroups.map((g) => (
              <div key={g.label} data-reveal className={styles.resCol}>
                <div style={{ ...MONO_K, fontSize: 10, color: GOLD_DIM, marginBottom: 18 }}>{g.label}</div>
                {g.items.map((it) => (
                  <a key={it} href="tel:+13054447401" className={styles.resItem}>
                    <span>{it}</span>
                    <span className={styles.resArrow}>→</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DFooter lang={lang} />
    </div>
  );
}
