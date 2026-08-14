"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { Magnetic, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { GFooter, GHeader, PageHero, Plate, SectionHead, useLang } from "../chrome";
import { EXTRA, GOLD, monoEyebrow, sans } from "../copy";
import styles from "../page.module.css";

// Forms: the agent desk. Carriers change their paperwork constantly, so nothing
// here pretends to be a download , every line calls the new business team, who
// confirm the current version for that carrier and product.
export default function FormsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />
      <GHeader lang={lang} setLang={setLang} />

      <PageHero
        kicker={x.resKicker}
        title={x.resTitle}
        body={x.resBody}
        image="/images/wwo-papers.jpg"
        imageAlt="Forms and paperwork laid out on a desk"
        imageCaption="New business desk"
      />

      <div style={{ padding: "clamp(20px,3vw,40px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <div data-reveal style={{ marginBottom: "clamp(36px,4.5vw,60px)" }}>
            <Magnetic>
              <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaDark}`} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{x.resCta} · 305-444-7401</a>
            </Magnetic>
          </div>

          <SectionHead num="01" label={x.nav.forms} />

          <div className={styles.resGrid}>
            {x.resGroups.map((grp) => (
              <div key={grp.label} data-reveal className={styles.resCol}>
                <div style={{ ...monoEyebrow(), fontSize: 10, marginBottom: 18 }}>{grp.label}</div>
                {grp.items.map((it) => (
                  <a key={it} href="tel:+13054447401" className={styles.resItem} aria-label={`${it} · ${x.resCta}`}>
                    <span>{it}</span>
                    <span className={styles.resArrow} aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            ))}
          </div>

          <Plate
            src="/images/bb-meeting-advisors.jpg"
            alt="Advisors reviewing a case around a table"
            caption="Call and a team member confirms the current version"
            className={styles.photoBand}
          />
        </div>
      </div>

      <GFooter lang={lang} />
    </div>
  );
}
