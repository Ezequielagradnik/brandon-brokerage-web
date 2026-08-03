"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { Magnetic, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { ChapterHead, IFooter, IHeader, PageHero, useLang } from "../chrome";
import { EXTRA, INK, LABEL, SERIF, numeral } from "../copy";
import styles from "../page.module.css";

// Forms , the agent desk. Carriers change their paperwork constantly, so every
// line here calls the desk for the current version instead of pretending to be
// a download.
export default function FormsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const no = numeral(lang);
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />
      <IHeader lang={lang} setLang={setLang} />

      <PageHero kicker={x.resKicker} title={x.resTitle} body={x.resBody} note={x.nav.forms} />

      <div className={styles.wrap} style={{ paddingTop: "clamp(36px,5vw,60px)", paddingBottom: "clamp(60px,8vw,110px)" }}>
        <div data-reveal style={{ marginBottom: "clamp(40px,5vw,70px)" }}>
          <Magnetic>
            <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLarge}`}>{x.resCta} · 305-444-7401</a>
          </Magnetic>
        </div>

        {x.resGroups.map((g, i) => (
          <section key={g.label} className={styles.prodEntry}>
            <ChapterHead num={`${no} 0${i + 1}`} title={g.label} note={`${g.items.length} ${lang === "es" ? "documentos" : "documents"}`} />
            <div className={styles.resList}>
              {g.items.map((it) => (
                <a key={it} href="tel:+13054447401" data-reveal className={styles.resItem}>
                  <span style={{ fontFamily: SERIF, fontSize: "clamp(21px,2.4vw,32px)", fontWeight: 400, color: INK, lineHeight: 1.2 }}>{it}</span>
                  <span className={styles.resAside}>
                    <span style={{ ...LABEL, fontSize: 9.5 }}>{x.resCta}</span>
                    <span className={styles.idxArrow} aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <p data-reveal style={{ ...LABEL, marginTop: "clamp(30px,4vw,48px)", lineHeight: 2 }}>{x.fnNote}</p>
      </div>

      <IFooter lang={lang} />
    </div>
  );
}
