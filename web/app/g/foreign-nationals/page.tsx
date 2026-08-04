"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import CaseJourney from "@/components/CaseJourney";
import { GFooter, GHeader, PageHero, SectionHead, useLang } from "../chrome";
import { EXTRA, G, GOLD, GOLD_DEEP, GRAY, HAIR_LINE, NAVY, mono, monoEyebrow, sans, serif } from "../copy";
import styles from "../page.module.css";

// Foreign nationals: the signature specialty. The case travels from LatAm to
// Coral Gables in the pinned map, and then the five stages it moves through,
// spelled out. This is where the journey belongs , it is the story.
export default function ForeignNationalsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const g = G[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />
      <GHeader lang={lang} setLang={setLang} />

      <PageHero kicker={x.fnKicker} title={x.fnTitle1} italic={x.fnTitle2} />

      <div style={{ padding: "clamp(20px,3vw,40px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <div className={styles.fnIntro}>
            <p data-reveal style={{ fontSize: "clamp(15.5px,1.35vw,18px)", lineHeight: 1.7, color: GRAY, margin: 0 }}>{x.fnBody1}</p>
            <p data-reveal style={{ fontSize: "clamp(15.5px,1.35vw,18px)", lineHeight: 1.7, color: GRAY, margin: 0 }}>{x.fnBody2}</p>
          </div>
        </div>
      </div>

      {/* 01 , the journey of a case: LatAm desks route into Coral Gables */}
      <CaseJourney
        lang={lang}
        num="01"
        variant="gold"
        cta={
          <Link href="/g/contact" onPointerEnter={ctaFillFromCursor} className={styles.cta} style={{ display: "inline-block", padding: "15px 34px", fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{g.spcCta}</Link>
        }
      />

      {/* 02 , the five stages, with a gold spine that fills as you read */}
      <div style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <SectionHead num="02" label={x.fnFlowTitle} />
          <CaseFlow steps={x.fnSteps} reduce={reduce} />
          <p data-reveal style={{ ...monoEyebrow(), color: GRAY, marginTop: "clamp(30px,4vw,48px)", lineHeight: 1.9 }}>{x.fnNote}</p>
        </div>
      </div>

      <GFooter lang={lang} />
    </div>
  );
}

/* The case flow: a gold spine fills as you scroll and each step lights up as
   the fill reaches it. */
type Step = { readonly n: string; readonly title: string; readonly body: string };

function CaseFlow({ steps, reduce }: { steps: readonly Step[]; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.85"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  return (
    <div ref={ref} className={styles.flow}>
      <div className={styles.flowSpine} aria-hidden="true">
        <motion.div className={styles.flowSpineFill} style={{ scaleY: reduce ? 1 : p }} />
      </div>
      {steps.map((s, i) => (
        <FlowStep key={s.n} i={i} total={steps.length} progress={p} step={s} reduce={reduce} />
      ))}
    </div>
  );
}

function FlowStep({ i, total, progress, step, reduce }: { i: number; total: number; progress: MotionValue<number>; step: Step; reduce: boolean }) {
  const at = i / total;
  const range: [number, number] = [at, at + 0.1];
  const opacity = useTransform(progress, range, [0.34, 1]);
  const border = useTransform(progress, range, [HAIR_LINE, GOLD]);
  const numColor = useTransform(progress, range, ["rgba(20,34,74,0.45)", GOLD_DEEP]);
  return (
    <motion.div className={styles.flowStep} style={{ opacity: reduce ? 1 : opacity }}>
      <motion.span className={styles.flowNum} style={{ fontFamily: mono, borderColor: reduce ? GOLD : border, color: reduce ? GOLD_DEEP : numColor }}>
        {step.n}
      </motion.span>
      <div>
        <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(19px,2.1vw,28px)", lineHeight: 1.2, margin: "0 0 10px", color: NAVY, textWrap: "balance" }}>{step.title}</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: GRAY, margin: 0, maxWidth: 640 }}>{step.body}</p>
      </div>
    </motion.div>
  );
}
