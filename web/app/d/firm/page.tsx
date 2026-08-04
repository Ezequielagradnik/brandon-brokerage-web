"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { GrowLine, ScrollProgress, Tilt } from "@/components/motion";
import { DFooter, DHeader, PageHero, SectionHead, useLang } from "../chrome";
import { BODY, EASE, GOLD, GOLD_DIM, GOLD_SOFT, HAIR, MONO_K, MUTED, NAVY, SERIF, EXTRA } from "../copy";
import styles from "../page.module.css";

// Our Firm: the mission, who we serve, what the desk does, the two networks
// behind it and the people who answer the phone. The org chart is the reason
// this page exists.
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
      <DHeader lang={lang} setLang={setLang} solid />

      <PageHero
        index="01"
        kicker={t.missionKicker}
        title={t.missionText.trim()}
        italic={`${t.missionHighlight}.`}
      />

      {/* ----- our approach ----- */}
      <div style={{ padding: "clamp(30px,4vw,54px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)", background: "#f3efe6" }}>
        <div className={styles.wrapD} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,5vw,80px)", alignItems: "start" }}>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>{t.approachKicker}</div>
            <GrowLine color={HAIR} style={{ marginBottom: 24 }} />
            <p style={{ fontSize: 16, lineHeight: 1.75, color: BODY, margin: 0 }}>{t.approachText}</p>
          </div>
          <div data-reveal>
            <div style={{ ...MONO_K, marginBottom: 14 }}>{x.serveKicker}</div>
            <GrowLine color={HAIR} delay={0.12} style={{ marginBottom: 24 }} />
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(21px,2.2vw,28px)", lineHeight: 1.4, margin: "0 0 14px", color: NAVY }}>{x.serveTitle}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: BODY, margin: 0 }}>{x.serveBody}</p>
          </div>
        </div>
      </div>

      {/* ----- who we serve ----- */}
      <div style={{ padding: "0 clamp(20px,5vw,60px) clamp(70px,9vw,120px)", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
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
                <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.2em", color: GOLD_DIM }}>0{i + 1}</span>
                <span style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.8vw,23px)", color: NAVY }}>{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ----- capabilities ----- */}
      <div style={{ padding: "clamp(70px,9vw,120px) clamp(20px,5vw,60px)", background: "#ece7db", borderTop: "1px solid rgba(18,41,74,0.12)", borderBottom: "1px solid rgba(18,41,74,0.12)" }}>
        <div className={styles.wrapD}>
          <SectionHead index="02" kicker={x.svcKicker} style={{ marginBottom: 34 }} />
          <div className={styles.svcGrid}>
            <div>
              <h2 data-reveal className={styles.displayD} style={{ fontSize: "clamp(26px,3.2vw,44px)", margin: "0 0 30px" }}>{x.svcTitle}</h2>
              <ul data-reveal className={styles.svcList}>
                {x.svc.map((sv) => (
                  <li key={sv} className={styles.svcItem}>
                    <span className={styles.svcMark} />
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: NAVY }}>{sv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className={styles.svcShow}>
              <div style={{ ...MONO_K, color: GOLD_SOFT, marginBottom: 18 }}>{x.svcShowTitle}</div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {x.svcShow.map((sv, i) => (
                  <li key={sv} className={styles.svcShowItem}>
                    <span style={{ fontFamily: SERIF, fontSize: 22, color: GOLD_SOFT, lineHeight: 1 }}>0{i + 1}</span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(243,239,230,0.82)" }}>{sv}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* the networks behind the desk */}
          <div className={styles.netGrid}>
            <Tilt max={2.4} style={{ display: "block" }}>
              <div data-reveal className={styles.netCard}>
                <div style={{ ...MONO_K, fontSize: 10, marginBottom: 14 }}>Tellus · Crump</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(20px,2.1vw,27px)", lineHeight: 1.2, margin: "0 0 14px", color: NAVY }}>{x.tellusTitle}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: BODY, margin: 0 }}>{x.tellusBody}</p>
              </div>
            </Tilt>
            <Tilt max={2.4} style={{ display: "block" }}>
              <div data-reveal className={styles.netCard}>
                <div style={{ ...MONO_K, fontSize: 10, marginBottom: 14 }}>Joint venture</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(20px,2.1vw,27px)", lineHeight: 1.2, margin: "0 0 14px", color: NAVY }}>{x.icsTitle}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: BODY, margin: 0 }}>{x.icsBody}</p>
              </div>
            </Tilt>
          </div>
        </div>
      </div>

      {/* ----- the quiet beat ----- */}
      <div style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: "#f3efe6", textAlign: "center" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <GrowLine color={GOLD} origin="center" style={{ width: 44, margin: "0 auto 36px" }} />
          <p data-reveal style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.4, margin: 0, color: NAVY }}>{t.quote}</p>
          <div data-reveal style={{ fontSize: 11.5, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, marginTop: 32 }}>{t.quoteAttrib}</div>
        </div>
      </div>

      {/* ----- the org chart ----- */}
      <div id="team" style={{ padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: NAVY, color: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <div data-reveal style={{ marginBottom: 30 }}>
            <div style={{ ...MONO_K, color: GOLD_SOFT, marginBottom: 14 }}>03 / {x.teamKicker}</div>
            <GrowLine color="rgba(169,129,47,0.6)" />
          </div>
          <h2 data-reveal style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.2vw,60px)", lineHeight: 1.04, letterSpacing: "-0.01em", margin: "0 0 22px", color: "#f3efe6", maxWidth: 760 }}>{x.teamTitle}</h2>
          <p data-reveal style={{ fontSize: 16, lineHeight: 1.72, color: "rgba(243,239,230,0.72)", margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 640 }}>{x.teamBody}</p>

          <div className={styles.masthead}>
            {x.teamGroups.map((g) => (
              <div key={g.label} data-reveal className={styles.teamGroup}>
                <div className={styles.teamGroupLabel} style={{ ...MONO_K, fontSize: 9.5, color: GOLD_SOFT }}>{g.label}</div>
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
      </div>

      {/* the org chart already sits on sapphire, so the closing band runs flush into it */}
      <DFooter lang={lang} flush />
    </div>
  );
}
