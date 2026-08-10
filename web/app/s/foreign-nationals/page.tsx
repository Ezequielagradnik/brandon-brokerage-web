"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import { ScrollProgress } from "@/components/motion";
import { NFooter, NHeader, PageHero, useLang } from "../../n/chrome";
import { GOLD, GOLD_DEEP, HAIR, INK_MUTED, NAVY, EXTRA } from "../../n/copy";
import styles from "../page.module.css";

// Foreign nationals: the signature specialty, and the five stages a case moves
// through. The gold spine fills as you read down it.
export default function SForeignNationalsPage() {
  const [lang, setLang] = useLang();
  const x = EXTRA[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <NHeader lang={lang} setLang={setLang} solid home="/s" />

      <PageHero kicker={x.fnKicker} title={x.fnTitle1} italic={x.fnTitle2} />

      <section style={{ padding: "clamp(20px,3vw,40px) 0 clamp(50px,6vw,90px)" }}>
        <div className={styles.wrap}>
          <div className={styles.fnIntro}>
            <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.fnBody1}</p>
            <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{x.fnBody2}</p>
          </div>

          <div className={styles.fnFlowHead}>
            <span className={styles.kicker} style={{ color: GOLD_DEEP, fontSize: 10.5 }}>{x.fnFlowTitle}</span>
            <span style={{ flex: 1, height: 1, background: HAIR }} />
          </div>

          <CaseFlow steps={x.fnSteps} reduce={reduce} />

          <p data-reveal className={styles.kicker} style={{ color: INK_MUTED, fontSize: 10.5, marginTop: "clamp(28px,3vw,42px)", lineHeight: 1.9 }}>{x.fnNote}</p>
        </div>
      </section>

      <NFooter lang={lang} home="/s" />
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
  const border = useTransform(progress, range, ["rgba(20,34,74,0.18)", "#c2a15b"]);
  const numColor = useTransform(progress, range, ["rgba(20,34,74,0.45)", "#9a7b32"]);
  return (
    <motion.div className={styles.flowStep} style={{ opacity: reduce ? 1 : opacity }}>
      <motion.span className={styles.flowNum} style={{ borderColor: reduce ? GOLD : border, color: reduce ? GOLD_DEEP : numColor }}>
        {step.n}
      </motion.span>
      <div>
        <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(19px,2.1vw,28px)", lineHeight: 1.2, margin: "0 0 10px", color: NAVY, textWrap: "balance" }}>{step.title}</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: INK_MUTED, margin: 0, maxWidth: 640 }}>{step.body}</p>
      </div>
    </motion.div>
  );
}
