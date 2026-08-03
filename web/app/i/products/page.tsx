"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { ParallaxImg, ScrollProgress } from "@/components/motion";
import { ChapterHead, IFooter, IHeader, PageHero, useLang } from "../chrome";
import { CARRIERS, EXTRA, FAINT, INK, LABEL, MUTED, PRODUCT_DETAIL, SERIF, numeral } from "../copy";
import styles from "../page.module.css";

// Products , the catalogue in full: five lines, each one opening onto the real
// sub-products from the carrier shelf. No accordions; a catalogue is read.
export default function ProductsPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const detail = PRODUCT_DETAIL[lang];
  const no = numeral(lang);
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />
      <IHeader lang={lang} setLang={setLang} />

      <PageHero
        kicker={x.nav.products}
        title={t.productsTitle}
        body={t.approachText}
        note={t.productsBacked}
      />

      <div className={styles.wrap} style={{ paddingTop: "clamp(50px,7vw,100px)", paddingBottom: "clamp(50px,7vw,90px)" }}>
        {t.products.map((p, i) => (
          <section key={p.name} className={styles.prodEntry}>
            <ChapterHead num={`${no} 0${i + 1}`} title={p.desc} note={`${detail[i].length} ${lang === "es" ? "subproductos" : "sub-products"}`} />
            <div className={styles.prodSpread}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px,5vw,72px)", lineHeight: 1.02, letterSpacing: "-0.015em", margin: 0, color: INK }} data-reveal>
                {p.name}
              </h2>
              <ul className={styles.prodSub}>
                {detail[i].map((d) => (
                  <li key={d} data-reveal>
                    <span style={{ ...LABEL, fontSize: 9.5, color: FAINT }}>—</span>
                    <span style={{ fontSize: 15, lineHeight: 1.75, color: MUTED }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* ----- the shelf, as a credits list ----- */}
        <div data-reveal style={{ marginTop: "clamp(40px,5vw,70px)" }}>
          <div style={{ ...LABEL, marginBottom: 20 }}>{t.carriersLabel}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px clamp(20px,2.6vw,36px)" }}>
            {CARRIERS.map((c) => (
              <span key={c} style={{ fontFamily: SERIF, fontSize: "clamp(17px,1.8vw,23px)", color: FAINT, letterSpacing: "0.01em" }}>{c}</span>
            ))}
          </div>
        </div>

        <div data-reveal style={{ marginTop: "clamp(50px,6vw,80px)" }}>
          <ParallaxImg
            src="/images/handshake-clean.jpg"
            alt={lang === "es" ? "La mesa de trabajo" : "The desk"}
            range={34}
            photoSlot="products"
            style={{ height: "clamp(260px,36vh,420px)" }}
            imgClassName={styles.bw}
          />
          <div className={styles.figCap} style={{ paddingTop: 12 }}>
            <span style={LABEL}>Fig. 01 / {t.productsKicker}</span>
            <span style={LABEL}>{t.offerNote}</span>
          </div>
        </div>
      </div>

      <IFooter lang={lang} />
    </div>
  );
}
