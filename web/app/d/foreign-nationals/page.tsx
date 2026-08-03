"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { Magnetic, ScrollProgress, ctaFillFromCursor } from "@/components/motion";
import { DFooter, DHeader, PageHero, useLang } from "../chrome";
import { BODY, GOLD, GOLD_DIM, HAIR_INK, MONO_K, NAVY, SERIF, EXTRA } from "../copy";
import { COPY } from "@/lib/copy";
import styles from "../page.module.css";

// Foreign nationals: the signature specialty, and the five stages a case moves
// through. The gold spine fills as you read down it.
export default function ForeignNationalsPage() {
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

      <PageHero index="01" kicker={x.fnKicker} title={x.fnTitle1} italic={x.fnTitle2} />

      <div style={{ padding: "clamp(30px,4vw,54px) clamp(20px,5vw,60px) clamp(50px,7vw,100px)", background: "#f3efe6" }}>
        <div className={styles.wrapNarrow}>
          <div className={styles.fnIntro}>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.72, color: BODY, margin: 0 }}>{x.fnBody1}</p>
            <p data-reveal style={{ fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.72, color: BODY, margin: 0 }}>{x.fnBody2}</p>
          </div>

          <div className={styles.fnFlowHead}>
            <span style={{ ...MONO_K, whiteSpace: "nowrap" }}>02 / {x.fnFlowTitle}</span>
            <span style={{ flex: 1, height: 1, background: HAIR_INK }} />
          </div>

          <CaseFlow steps={x.fnSteps} reduce={reduce} />

          <p data-reveal style={{ ...MONO_K, color: GOLD_DIM, fontSize: 11, lineHeight: 1.9, marginTop: "clamp(30px,4vw,48px)" }}>{x.fnNote}</p>

          <div data-reveal style={{ marginTop: "clamp(34px,4vw,54px)", paddingTop: "clamp(30px,4vw,44px)", borderTop: `1px solid ${HAIR_INK}` }}>
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(20px,2.3vw,30px)", lineHeight: 1.4, color: NAVY, margin: "0 0 26px", maxWidth: 620 }}>{t.contactTitle}</p>
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

/* The case flow: a gold spine fills as you scroll and each step lights up as the
   fill reaches it. */
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
  const border = useTransform(progress, range, ["rgba(18,41,74,0.18)", "#a9812f"]);
  const numColor = useTransform(progress, range, ["rgba(18,41,74,0.45)", "#9a7526"]);
  return (
    <motion.div className={styles.flowStep} style={{ opacity: reduce ? 1 : opacity }}>
      <motion.span className={styles.flowNum} style={{ borderColor: reduce ? GOLD : border, color: reduce ? GOLD_DIM : numColor }}>
        {step.n}
      </motion.span>
      <div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(20px,2.2vw,29px)", lineHeight: 1.2, margin: "0 0 10px", color: NAVY, textWrap: "balance" }}>{step.title}</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.72, color: BODY, margin: 0, maxWidth: 640 }}>{step.body}</p>
      </div>
    </motion.div>
  );
}
