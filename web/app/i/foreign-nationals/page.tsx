"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useReveals";
import { ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import CaseJourney from "@/components/CaseJourney";
import { ChapterHead, IFooter, IHeader, PageHero, useLang } from "../chrome";
import { EXTRA, INK, LABEL, MUTED, SERIF, numeral } from "../copy";
import styles from "../page.module.css";

// Foreign Nationals , the signature specialty in full: the argument, the case
// travelling to Coral Gables, and the five stages it moves through.
export default function ForeignNationalsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const no = numeral(lang);
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />
      <IHeader lang={lang} setLang={setLang} />

      <PageHero kicker={x.fnKicker} title={x.fnTitle1} italic={x.fnTitle2} note={x.nav.foreign} />

      {/* ----- the argument, in two columns ----- */}
      <div className={styles.wrap} style={{ paddingTop: "clamp(40px,5vw,70px)", paddingBottom: "clamp(56px,7vw,100px)" }}>
        <div className={styles.twoCol}>
          <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: MUTED, margin: 0 }}>{x.fnBody1}</p>
          <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: MUTED, margin: 0 }}>{x.fnBody2}</p>
        </div>
      </div>

      {/* ----- the case, travelling ----- */}
      <CaseJourney
        id="journey"
        lang={lang}
        num={`${no} 01`}
        variant="editorial"
        serif={SERIF}
        cta={
          <Link href="/i/contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaInverse} ${styles.ctaLarge}`}>
            {x.fnTeaserCta}
          </Link>
        }
      />

      {/* ----- the five stages ----- */}
      <div className={styles.wrap} style={{ paddingTop: "clamp(70px,9vw,120px)", paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 02`} title={x.fnFlowTitle} note={lang === "es" ? "Cinco etapas" : "Five stages"} />
        <div className={styles.stageList}>
          {x.fnSteps.map((s) => (
            <div key={s.n} data-reveal className={styles.stageRow}>
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(22px,2.4vw,32px)", color: MUTED, lineHeight: 1 }}>{s.n}</span>
              <div>
                <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(24px,2.8vw,38px)", lineHeight: 1.12, margin: "0 0 12px", color: INK }}>{s.title}</h2>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUTED, margin: 0, maxWidth: 620 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p data-reveal style={{ ...LABEL, marginTop: "clamp(34px,4vw,52px)", lineHeight: 2 }}>{x.fnNote}</p>
      </div>

      <IFooter lang={lang} />
    </div>
  );
}
