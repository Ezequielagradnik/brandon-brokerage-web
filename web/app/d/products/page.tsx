"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { Magnetic, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { DFooter, DHeader, PageHero, useLang } from "../chrome";
import { EASE, GOLD, GOLD_DIM, NAVY, PRODUCT_DETAIL, EXTRA } from "../copy";
import styles from "../page.module.css";

// Products: the five lines, each one opening into the real sub-products from the
// carrier shelf. One row open at a time keeps the ledger short.
export default function ProductsPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const detail = PRODUCT_DETAIL[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <DHeader lang={lang} setLang={setLang} solid />

      <PageHero index="01" kicker={x.nav.products} title={t.productsTitle} note={t.productsBacked} />

      <div style={{ padding: "clamp(30px,4vw,54px) clamp(20px,5vw,60px) clamp(20px,3vw,40px)", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <div data-reveal style={{ borderTop: `1px solid ${NAVY}` }}>
            {t.products.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.name} className={styles.dProdBlock}>
                  <button
                    type="button"
                    className={`${styles.dProdRow} ${isOpen ? styles.dProdRowOpen : ""}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.2em", color: GOLD_DIM }}>0{i + 1}</span>
                    <span className={styles.dProdName}>{p.name}</span>
                    <span className={styles.dProdDesc}>{p.desc}</span>
                    <span className={styles.dProdPlus} aria-hidden="true">
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
                        <ul className={styles.dProdPanel}>
                          {detail[i].map((d) => (
                            <li key={d}>
                              <span className={styles.svcMark} />
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

          <div data-reveal style={{ marginTop: "clamp(40px,5vw,70px)" }}>
            <Magnetic>
              <a href="tel:+13054447401" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaLine}`}>{x.resCta}</a>
            </Magnetic>
          </div>
        </div>
      </div>

      <DFooter lang={lang} />
    </div>
  );
}
