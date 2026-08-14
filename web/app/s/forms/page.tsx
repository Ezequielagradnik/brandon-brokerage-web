"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { Magnetic, ParallaxImg, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { NFooter, NHeader, PageHero, useLang } from "../../n/chrome";
import { GOLD, GOLD_DEEP } from "../../n/copy";
import { EXTRA } from "../../n/copy";
import styles from "../page.module.css";

// Forms: the agent desk. Every group is a call away from the current version,
// so each item points at the desk rather than pretending to be a download.
export default function SFormsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <NHeader lang={lang} setLang={setLang} solid home="/s" />

      <PageHero kicker={x.resKicker} title={x.resTitle} body={x.resBody} />

      <section style={{ padding: "clamp(20px,3vw,40px) 0 clamp(40px,5vw,70px)" }}>
        <div className={styles.wrap}>
          <div data-reveal style={{ marginBottom: "clamp(32px,4vw,52px)" }}>
            <Magnetic>
              <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={styles.cta}>{x.resCta}</a>
            </Magnetic>
          </div>
          <div className={styles.resGrid}>
            {x.resGroups.map((g) => (
              <div key={g.label} data-reveal className={styles.resCol}>
                <div className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10, marginBottom: 18 }}>{g.label}</div>
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
      </section>

      <NFooter lang={lang} home="/s" />
    </div>
  );
}
