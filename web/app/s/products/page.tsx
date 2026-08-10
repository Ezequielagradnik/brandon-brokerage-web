"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { ScrollProgress } from "@/components/motion";
import { NFooter, NHeader, PageHero, useLang } from "../../n/chrome";
import { EASE, GOLD, GOLD_DEEP, NAVY, PRODUCT_DETAIL, EXTRA } from "../../n/copy";
import styles from "../page.module.css";

// Products: the five lines, each one opening into the real sub-products from
// the carrier shelf. One row open at a time keeps the page short.
export default function SProductsPage() {
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
      <NHeader lang={lang} setLang={setLang} solid home="/s" />

      <PageHero kicker={x.nav.products} title={t.productsTitle} body={t.approachText} />

      <section style={{ padding: "clamp(30px,4vw,54px) 0 clamp(20px,3vw,40px)" }}>
        <div className={styles.wrap}>
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
                    <span className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10.5 }}>0{i + 1}</span>
                    <span className={styles.prodName} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(21px,2.6vw,34px)", color: NAVY }}>{p.name}</span>
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
        </div>
      </section>

      <NFooter lang={lang} home="/s" />
    </div>
  );
}
