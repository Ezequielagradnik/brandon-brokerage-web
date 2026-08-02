"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { GrowLine, ParallaxImg, ScrollProgress, Tilt } from "@/components/motion";
import { NFooter, NHeader, PageHero, SectionMark, useLang } from "../chrome";
import { EASE, GOLD, GOLD_DEEP, GOLD_SOFT, HAIR, INK_MUTED, NAVY, EXTRA } from "../copy";
import styles from "../page.module.css";

// Our Firm: who we serve, what the desk does, the networks behind it and the
// people who answer the phone. The org chart is the reason this page exists.
export default function FirmPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <NHeader lang={lang} setLang={setLang} solid />

      <PageHero
        kicker={x.serveKicker}
        title={t.missionText.trim()}
        italic={`${t.missionHighlight}.`}
        body={t.approachText}
      />

      {/* ----- who we serve ----- */}
      <section style={{ position: "relative", padding: "clamp(40px,5vw,70px) 0", overflow: "hidden" }}>
        <SectionMark n="01" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(36px,5vw,70px)", alignItems: "center" }}>
            <div>
              <h2 data-reveal className={styles.display} style={{ fontSize: "clamp(26px,3vw,42px)", margin: "0 0 16px" }}>{x.serveTitle}</h2>
              <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.75, color: INK_MUTED, margin: "0 0 28px", maxWidth: 520 }}>{x.serveBody}</p>
              <div className={styles.serveGrid}>
                {x.serve.map((s, i) => (
                  <motion.div
                    key={s}
                    className={styles.serveItem}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                  >
                    <span className={styles.kicker} style={{ fontSize: 9.5, color: GOLD_DEEP }}>0{i + 1}</span>
                    <span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(17px,1.7vw,22px)", color: NAVY }}>{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div data-reveal className={styles.photo} style={{ height: "clamp(300px,38vw,460px)" }}>
              <ParallaxImg
                src="/images/miami-aerial-day.jpg"
                alt="Brickell and Biscayne Bay, the skyline the firm works from"
                range={28}
                photoSlot="firm"
                style={{ height: "100%" }}
                imgClassName={styles.photoImg}
              />
              <span className={styles.photoEdge} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ----- capabilities ----- */}
      <section style={{ position: "relative", padding: "clamp(50px,6vw,88px) 0", borderTop: `1px solid ${HAIR}`, overflow: "hidden" }}>
        <SectionMark n="02" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color={HAIR} />
          <div data-reveal className={styles.kicker} style={{ color: INK_MUTED, margin: "clamp(26px,3vw,40px) 0 14px", fontSize: 10.5 }}>{x.svcKicker}</div>
          <div className={styles.svcGrid}>
            <div>
              <h2 data-reveal className={styles.display} style={{ fontSize: "clamp(24px,2.8vw,38px)", margin: "0 0 24px" }}>{x.svcTitle}</h2>
              <ul data-reveal className={styles.svcList}>
                {x.svc.map((sv) => (
                  <li key={sv} className={styles.svcItem}>
                    <span className={styles.svcMark} />
                    <span style={{ fontSize: 15, lineHeight: 1.55, color: NAVY }}>{sv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className={styles.svcShow}>
              <div className={styles.grain} aria-hidden="true" />
              <div className={styles.kicker} style={{ color: GOLD_SOFT, marginBottom: 20, fontSize: 10.5, position: "relative", zIndex: 2 }}>{x.svcShowTitle}</div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", zIndex: 2 }}>
                {x.svcShow.map((sv, i) => (
                  <li key={sv} className={styles.svcShowItem}>
                    <span style={{ fontFamily: "var(--font-bodoni), serif", fontSize: 22, color: GOLD_SOFT, lineHeight: 1 }}>0{i + 1}</span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(245,241,232,0.82)" }}>{sv}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* the networks behind the desk */}
          <div className={styles.netGrid}>
            <Tilt max={2.4} style={{ display: "block" }}>
              <div data-reveal className={styles.netCard}>
                <div className={styles.kicker} style={{ color: GOLD_DEEP, marginBottom: 14, fontSize: 10 }}>Tellus · Crump</div>
                <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.2, margin: "0 0 14px", color: NAVY }}>{x.tellusTitle}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.tellusBody}</p>
              </div>
            </Tilt>
            <Tilt max={2.4} style={{ display: "block" }}>
              <div data-reveal className={styles.netCard}>
                <div className={styles.kicker} style={{ color: GOLD_DEEP, marginBottom: 14, fontSize: 10 }}>Joint venture</div>
                <h3 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.2, margin: "0 0 14px", color: NAVY }}>{x.icsTitle}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.icsBody}</p>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* ----- the org chart ----- */}
      <section id="team" style={{ position: "relative", padding: "clamp(70px,9vw,120px) 0", background: NAVY, color: "#f5f1e8", overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <SectionMark n="03" dark />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color="rgba(194,161,91,0.4)" />
          <div data-reveal className={styles.kicker} style={{ color: GOLD_SOFT, margin: "clamp(26px,3vw,40px) 0 16px", fontSize: 10.5 }}>{x.teamKicker}</div>
          <h2 data-reveal className={styles.display} style={{ color: "#fbfaf7", fontSize: "clamp(30px,4vw,60px)", margin: "0 0 22px", maxWidth: 760 }}>{x.teamTitle}</h2>
          <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.7, color: "rgba(245,241,232,0.72)", margin: "0 0 clamp(38px,5vw,60px)", maxWidth: 620 }}>{x.teamBody}</p>

          <div className={styles.masthead}>
            {x.teamGroups.map((g) => (
              <div key={g.label} data-reveal className={styles.teamGroup}>
                <div className={`${styles.kicker} ${styles.teamGroupLabel}`} style={{ color: GOLD_SOFT, fontSize: 9.5 }}>{g.label}</div>
                {g.members.map((m) => (
                  <div key={`${g.label}-${m.name}-${m.role}`} className={styles.teamCard}>
                    <div className={styles.teamName}>{m.name}</div>
                    <div className={styles.teamRole}>{m.role}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <NFooter lang={lang} />
    </div>
  );
}
