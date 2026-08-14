"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { PRODUCT_DETAIL, OFFICE } from "@/lib/deep";
import { MHeader, MFooter, MClosing, MPageHero, useLang } from "../chrome";
import styles from "../page.module.css";

const EASE = [0.32, 0.72, 0, 1] as const;

// Products: five lines, each opening into the real sub-products the carrier
// shelf actually sells. One row open at a time keeps the ledger short.
export default function ProductsPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const detail = PRODUCT_DETAIL[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const reduce = !!useReducedMotion();

  useScrollReveal(pageRef);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <div ref={pageRef} className={styles.page}>
      <MHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      <div className={styles.stack}>
        <MPageHero glyph="shield" kicker={t.nav.products} title={t.productsTitle} body={t.productsBacked} />

        <section data-reveal className={`${styles.card} ${styles.cardCream} ${styles.blockPad}`} style={{ marginTop: "var(--gutter)" }}>
          <div className={styles.acShell}>
            {t.products.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.name}>
                  <button type="button" className={styles.acRow} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                    <span className={styles.acNum}>0{i + 1}</span>
                    <span className={styles.acName}>{p.name}</span>
                    <span className={styles.acDesc}>{p.desc}</span>
                    <span className={styles.acPlus} aria-hidden="true">
                      <span />
                      <motion.span animate={{ scaleY: isOpen ? 0 : 1 }} transition={{ duration: 0.3, ease: EASE }} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <ul className={styles.acPanel}>
                          {detail[i].map((item) => (
                            <li key={item} className={styles.chip}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div data-reveal style={{ marginTop: "clamp(28px,3.4vw,40px)" }}>
            <a href={OFFICE.phoneHref} className={`${styles.pill} ${styles.pillDark}`}>
              {t.cta.partner} <span className={styles.pillDisc} aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colFull}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bb-family-mountain.jpg" alt="" className={styles.cardImg} loading="lazy" />
          </article>
        </section>

        <MClosing lang={lang} />
        <MFooter lang={lang} />
      </div>
    </div>
  );
}
