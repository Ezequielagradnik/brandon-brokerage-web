"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { MaskReveal, ParallaxImg, ScrollProgress } from "@/components/motion";
import { ChapterHead, IFooter, IHeader, PageHero, useLang } from "../chrome";
import { EXTRA, INK, LABEL, MUTED, SERIF, numeral } from "../copy";
import styles from "../page.module.css";

// Our Firm , the credits page of the concept: who we serve, what the desk does,
// the networks behind it and, at the end, the masthead of everyone who answers.
export default function FirmPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const no = numeral(lang);
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />
      <IHeader lang={lang} setLang={setLang} />

      <PageHero
        kicker={x.nav.firm}
        title={t.missionText.trim()}
        italic={`${t.missionHighlight}.`}
        body={t.approachText}
        note={t.missionKicker}
        size="text"
      />

      {/* ----- who we serve ----- */}
      <div className={styles.wrap} style={{ paddingTop: "clamp(60px,8vw,110px)", paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 01`} title={x.serveKicker} note={t.offerNote} />
        <div className={styles.fnSpread}>
          <div className={styles.fnText}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,4.2vw,58px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: "0 0 22px", color: INK }}>
              <MaskReveal inView delay={0.05}>{x.serveTitle}</MaskReveal>
            </h2>
            <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.8, color: MUTED, margin: "0 0 clamp(30px,4vw,44px)", maxWidth: 540 }}>{x.serveBody}</p>
            <div className={styles.serveList}>
              {x.serve.map((s, i) => (
                <div key={s} data-reveal className={styles.serveRow}>
                  <span style={{ ...LABEL, fontSize: 10 }}>0{i + 1}</span>
                  <span style={{ fontFamily: SERIF, fontSize: "clamp(19px,2vw,26px)", color: INK, lineHeight: 1.2 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.fnFig}>
            <ParallaxImg
              src="/images/miami-aerial-day.jpg"
              alt={lang === "es" ? "Coral Gables y la bahía de Biscayne" : "Coral Gables and Biscayne Bay"}
              range={30}
              photoSlot="firm"
              style={{ height: "clamp(300px,38vw,480px)" }}
              imgClassName={styles.bw}
            />
            <div className={styles.figCap} style={{ paddingTop: 12 }}>
              <span style={LABEL}>Fig. 01</span>
              <span style={LABEL}>Coral Gables, FL</span>
            </div>
          </div>
        </div>
      </div>

      {/* ----- capabilities ----- */}
      <div className={styles.wrap} style={{ paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 02`} title={x.svcKicker} note={t.approachKicker} />
        <h2 data-reveal style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,4.2vw,58px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: "0 0 clamp(32px,4vw,52px)", color: INK }}>{x.svcTitle}</h2>

        <div className={styles.svcCols}>
          {x.svc.map((sv, i) => (
            <div key={sv} data-reveal className={styles.svcRow}>
              <span style={{ ...LABEL, fontSize: 10 }}>0{i + 1}</span>
              <span style={{ fontSize: 15, lineHeight: 1.7, color: INK }}>{sv}</span>
            </div>
          ))}
        </div>

        <div className={styles.showBlock}>
          <div data-reveal style={{ ...LABEL, marginBottom: "clamp(20px,2.6vw,30px)" }}>{x.svcShowTitle}</div>
          <ol className={styles.showList}>
            {x.svcShow.map((sv, i) => (
              <li key={sv} data-reveal className={styles.showItem}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: MUTED }}>{no} {i + 1}</span>
                <span style={{ fontFamily: SERIF, fontSize: "clamp(19px,2.2vw,29px)", lineHeight: 1.3, color: INK }}>{sv}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ----- the networks behind the desk ----- */}
      <div className={styles.wrap} style={{ paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 03`} title={lang === "es" ? "Las redes" : "The networks"} note="Tellus · Crump · ICS" />
        <div className={styles.netCols}>
          <div data-reveal>
            <div style={{ ...LABEL, fontSize: 10, marginBottom: 16 }}>Tellus · Crump</div>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(23px,2.6vw,34px)", lineHeight: 1.18, margin: "0 0 16px", color: INK }}>{x.tellusTitle}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUTED, margin: 0 }}>{x.tellusBody}</p>
          </div>
          <div data-reveal>
            <div style={{ ...LABEL, fontSize: 10, marginBottom: 16 }}>{lang === "es" ? "Joint venture" : "Joint venture"}</div>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(23px,2.6vw,34px)", lineHeight: 1.18, margin: "0 0 16px", color: INK }}>{x.icsTitle}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: MUTED, margin: 0 }}>{x.icsBody}</p>
          </div>
        </div>
      </div>

      {/* ----- the masthead: everyone who answers, by name ----- */}
      <div id="team" className={styles.wrap} style={{ paddingBottom: "clamp(70px,9vw,120px)" }}>
        <ChapterHead num={`${no} 04`} title={x.teamKicker} note={lang === "es" ? "Trece personas" : "Thirteen people"} />
        <h2 data-reveal style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,4.2vw,58px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: "0 0 20px", color: INK, maxWidth: 760 }}>{x.teamTitle}</h2>
        <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.8, color: MUTED, margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 620 }}>{x.teamBody}</p>

        <div className={styles.credits}>
          {x.teamGroups.map((g) => (
            <div key={g.label} data-reveal className={styles.creditGroup}>
              <div className={styles.creditLabel} style={{ ...LABEL, fontSize: 10 }}>{g.label}</div>
              {g.members.map((m) => (
                <div key={`${g.label}-${m.name}-${m.role}`} className={styles.creditCard}>
                  <div className={styles.creditName}>{m.name}</div>
                  <div className={styles.creditRole}>{m.role}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <IFooter lang={lang} />
    </div>
  );
}
