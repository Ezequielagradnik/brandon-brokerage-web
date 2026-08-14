"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { ScrollProgress } from "@/components/motion";
import { GFooter, GHeader, PageHero, Plate, SectionHead, useLang } from "../chrome";
import { EASE, EXTRA, GOLD, GOLD_DEEP, NAVY, PRODUCT_DETAIL, mono, sans } from "../copy";
import styles from "../page.module.css";

// Products: the five lines as a ledger. Each row opens into the real
// sub-products from the carrier shelf; one row open at a time keeps the page
// short enough to read standing up.
export default function ProductsPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const detail = PRODUCT_DETAIL[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />
      <GHeader lang={lang} setLang={setLang} />

      <PageHero
        kicker={x.nav.products}
        title={t.productsTitle}
        body={t.approachText}
        image="/images/bb-family-mountain.jpg"
        imageAlt="A family looking out over a valley"
        imageCaption="Five lines, one relationship"
      />

      <div style={{ padding: "clamp(30px,4vw,60px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <SectionHead num="01" label={t.productsBacked} />
          <div data-reveal style={{ borderTop: `1px solid ${NAVY}` }}>
            {t.products.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.name} className={styles.prodBlock}>
                  <button
                    type="button"
                    className={`${styles.prodRow} ${isOpen ? styles.prodRowOpen : ""}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: GOLD_DEEP }}>0{i + 1}</span>
                    <span className={styles.prodName}>{p.name}</span>
                    <span className={styles.prodDesc}>{p.desc}</span>
                    <span className={styles.prodPlus} aria-hidden="true">
                      <span />
                      <motion.span animate={{ scaleY: isOpen ? 0 : 1 }} transition={{ duration: 0.35, ease: EASE }} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <ul className={styles.prodPanel}>
                          {detail[i].map((d) => (
                            <li key={d}>
                              <span className={styles.svcMark} aria-hidden="true" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className={styles.photoPair}>
            <Plate src="/images/bb-family-hands.jpg" alt="A family holding hands in a circle" caption="Protection & legacy" />
            <Plate src="/images/wwo-growth.jpg" alt="A rising line on a chart" caption="Accumulation & income" />
          </div>
        </div>
      </div>

      <GFooter lang={lang} />
    </div>
  );
}
