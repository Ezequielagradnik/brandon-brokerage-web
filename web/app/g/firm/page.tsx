"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { ParallaxImg, ScrollProgress } from "@/components/motion";
import { GFooter, GHeader, PageHero, Plate, SectionHead, useLang } from "../chrome";
import { EASE, EXTRA, G, GOLD, GOLD_DEEP, GOLD_LIGHT, GRAY, HAIR, NAVY, OFFWHITE, mono, monoEyebrow, sans, serif } from "../copy";
import styles from "../page.module.css";

// Our Firm: the mission inked in on scroll, who we serve, what the desk does,
// the two networks behind it and the people who answer. The org chart is the
// reason this page exists.

// One thumbnail per insight, in the order g.insights lists them.
const INSIGHT_THUMBS = [
  "/images/bb-family-hands.jpg",
  "/images/wwo-growth.jpg",
  "/images/handshake-clean.jpg",
  "/images/wwo-papers.jpg",
];

// ----- Mission: progressive ink highlight, word by word on scroll -----
function MissionWord({ progress, range, word }: { progress: MotionValue<number>; range: [number, number]; word: string }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function MissionHighlight({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const style: React.CSSProperties = { fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,3.8vw,56px)", lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0, color: NAVY };
  if (reduce) return <p style={style}>{text}</p>;
  return (
    <p ref={ref} style={style}>
      {words.map((w, i) => (
        <MissionWord key={`${i}-${w}`} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]} word={w} />
      ))}
    </p>
  );
}

export default function FirmPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const g = G[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />
      <GHeader lang={lang} setLang={setLang} />

      <PageHero
        kicker={x.nav.firm}
        title={g.firmTitleA}
        italic={g.firmTitleB}
        body={t.approachText}
        image="/images/bb-meeting-advisors.jpg"
        imageAlt="Advisors working a case around a table"
        imageCaption="Coral Gables · the desk"
      />

      {/* 01 , MISSION: the sentence inks in, then vision and experience */}
      <div style={{ padding: "clamp(50px,7vw,110px) clamp(20px,5vw,60px) clamp(70px,9vw,130px)", background: "#fff" }}>
        <div className={styles.wrap} style={{ maxWidth: 1100 }}>
          <SectionHead num="01" label={g.heads.mission} />
          <MissionHighlight text={`${t.missionText}${t.missionHighlight}.`} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(24px,4vw,56px)", marginTop: "clamp(40px,5vw,72px)" }}>
            {g.appItems.map((it) => (
              <div key={it.k} data-reveal style={{ borderTop: "1px solid rgba(194,161,91,0.45)", paddingTop: 22 }}>
                <div style={{ ...monoEyebrow(), marginBottom: 10 }}>{it.k}</div>
                <p style={{ fontSize: 15, lineHeight: 1.72, color: GRAY, margin: 0 }}>{it.t}</p>
              </div>
            ))}
          </div>

          <Plate
            src="/images/bb-family-dune.jpg"
            alt="A family together on a beach path"
            caption="Why the case matters"
            className={styles.photoBand}
            focal="50% 38%"
          />
        </div>
      </div>

      {/* 02 , WHO WE SERVE: a business-to-business brokerage */}
      <div style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: OFFWHITE, borderTop: HAIR, borderBottom: HAIR }}>
        <div className={styles.wrap}>
          <SectionHead num="02" label={x.serveKicker} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
            <div>
              <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(27px,3.4vw,44px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: NAVY, margin: "0 0 18px" }}>{x.serveTitle}</h2>
              <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.72, color: GRAY, margin: "0 0 clamp(26px,3vw,38px)", maxWidth: 520 }}>{x.serveBody}</p>
              <div className={styles.serveGrid}>
                {x.serve.map((s, i) => (
                  <motion.div
                    key={s}
                    className={styles.serveItem}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  >
                    <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: GOLD_DEEP }}>0{i + 1}</span>
                    <span style={{ fontFamily: serif, fontSize: "clamp(17px,1.7vw,22px)", lineHeight: 1.2, color: NAVY }}>{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div data-reveal>
              <ParallaxImg
                src="/images/miami-aerial-day.jpg"
                alt="Brickell and Biscayne Bay, the skyline the firm works from"
                range={28}
                photoSlot="firm"
                style={{ height: "clamp(320px,42vw,520px)" }}
                imgClassName={styles.deckPhoto}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 03 , CAPABILITIES: what the desk does, and the networks behind it */}
      <div style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <SectionHead num="03" label={x.svcKicker} />
          <div className={styles.svcGrid}>
            <div>
              <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(26px,3.2vw,42px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: NAVY, margin: "0 0 clamp(24px,3vw,36px)" }}>{x.svcTitle}</h2>
              <ul data-reveal className={styles.svcList}>
                {x.svc.map((sv) => (
                  <li key={sv} className={styles.svcItem}>
                    <span className={styles.svcMark} aria-hidden="true" />
                    <span style={{ fontSize: 14.5, lineHeight: 1.6, color: NAVY }}>{sv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className={styles.svcShow}>
              <div className={styles.grain} aria-hidden="true" />
              <div style={{ ...monoEyebrow(true), marginBottom: 20, position: "relative", zIndex: 2 }}>{x.svcShowTitle}</div>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", zIndex: 2 }}>
                {x.svcShow.map((sv, i) => (
                  <li key={sv} className={styles.svcShowItem}>
                    <span style={{ fontFamily: serif, fontSize: 22, color: GOLD_LIGHT, lineHeight: 1 }}>0{i + 1}</span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(255,255,255,0.82)" }}>{sv}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className={styles.netGrid}>
            <div data-reveal className={styles.netCard}>
              <div style={{ ...monoEyebrow(), fontSize: 10, marginBottom: 14 }}>Tellus · Crump</div>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.22, margin: "0 0 14px", color: NAVY }}>{x.tellusTitle}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: GRAY, margin: 0 }}>{x.tellusBody}</p>
            </div>
            <div data-reveal className={styles.netCard}>
              <div style={{ ...monoEyebrow(), fontSize: 10, marginBottom: 14 }}>Joint venture</div>
              <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.22, margin: "0 0 14px", color: NAVY }}>{x.icsTitle}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: GRAY, margin: 0 }}>{x.icsBody}</p>
            </div>
          </div>

          <Plate
            src="/images/globe-gold.jpg"
            alt="A globe turned to the Americas"
            caption="Tellus · Crump · ICS Advisors"
            className={styles.photoBand}
          />
        </div>
      </div>

      {/* 04 , THE TEAM: the org chart, set as a masthead */}
      <div id="team" style={{ position: "relative", padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: NAVY, overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <SectionHead num="04" label={x.teamKicker} dark />
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(30px,4vw,58px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 22px", maxWidth: 760 }}>{x.teamTitle}</h2>
          <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 620 }}>{x.teamBody}</p>

          <div className={styles.masthead}>
            {x.teamGroups.map((grp) => (
              <div key={grp.label} data-reveal className={styles.teamGroup}>
                <div className={styles.teamGroupLabel} style={{ ...monoEyebrow(true), fontSize: 10 }}>{grp.label}</div>
                {grp.members.map((m) => (
                  <div key={`${grp.label}-${m.name}-${m.role}`} className={styles.teamCard}>
                    <div className={styles.teamName}>{m.name}</div>
                    <div className={styles.teamRole}>{m.role}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 05 , INSIGHTS: four notes, each one a reason to call */}
      <div id="insights" style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <SectionHead num="05" label={g.heads.insights} />
          <h2 data-reveal style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 clamp(36px,4vw,56px)", color: NAVY }}>{g.insTitle}</h2>
          <div className={styles.insGrid}>
            {g.insights.map((a, i) => (
              <motion.a
                key={a.title}
                href="#contact"
                className={styles.insCard}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              >
                <Plate src={INSIGHT_THUMBS[i]} alt="" className={styles.insThumb} />
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 14 }}>{a.date}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 20, lineHeight: 1.3, margin: "0 0 12px", color: NAVY }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: GRAY, margin: "0 0 16px" }}>{a.excerpt}</p>
                <span className={styles.insMore} style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY, fontWeight: 600 }}>{g.insMore} →</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <GFooter lang={lang} />
    </div>
  );
}
