"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { CountUp, MaskReveal } from "./motion";
import styles from "./CaseJourney.module.css";

// "The journey of a case": a pinned, scroll-driven scene where a case travels
// from LatAm to Miami. Same scene across /g, /d and /i , different skins.
// SVG only (no WebGL); the scrub is a spring over the section's scroll progress.

type Lang = "en" | "es";
export type JourneyVariant = "gold" | "sapphire" | "editorial";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ----- map geometry -----
   Equirectangular-ish projection of the Americas:
   x = (lon + 130) * 10 , y = (60 - lat) * 5  →  viewBox 1000 × 600          */
const MAP_W = 1000;
const MAP_H = 600;

const NORTH_AMERICA =
  "M20 0 L48 62 L62 104 L132 142 L205 188 L300 218 L392 230 L452 250 L508 264 L470 242 L428 212 L392 186 L440 176 L478 158 L500 152 L506 176 L512 150 L545 130 L600 95 L645 78 L702 68 L732 44 L662 0 Z";

const SOUTH_AMERICA =
  "M530 262 L580 248 L660 252 L700 272 L780 282 L860 312 L925 338 L950 345 L905 378 L870 418 L825 428 L775 470 L735 492 L690 505 L655 528 L625 562 L585 572 L572 528 L590 468 L590 392 L535 362 L492 326 L520 296 Z";

type City = { code: string; x: number; y: number; coord: string; hub?: boolean };

const CITIES: City[] = [
  { code: "MEX", x: 308.7, y: 202.9, coord: "19.4°N 99.1°W" },
  { code: "MIA", x: 498.1, y: 171.2, coord: "25.8°N 80.2°W", hub: true },
  { code: "BOG", x: 559.3, y: 276.5, coord: "4.7°N 74.1°W" },
  { code: "LIM", x: 529.6, y: 360.3, coord: "12.0°S 77.0°W" },
  { code: "SCL", x: 593.3, y: 467.3, coord: "33.4°S 70.7°W" },
  { code: "BUE", x: 716.2, y: 473.0, coord: "34.6°S 58.4°W" },
  { code: "SAO", x: 833.7, y: 417.8, coord: "23.5°S 46.6°W" },
];

const MIA = CITIES[1];
const ORIGIN = CITIES[6]; // São Paulo , the longest, most legible arc

// quadratic bezier bowed toward the top of the map
const ctrl = (a: City, b: City, lift: number) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - lift });
const arcPath = (a: City, b: City, lift: number) => {
  const c = ctrl(a, b, lift);
  return `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`;
};
const arcPoint = (a: City, b: City, lift: number, t: number) => {
  const c = ctrl(a, b, lift);
  const m = 1 - t;
  return {
    x: m * m * a.x + 2 * m * t * c.x + t * t * b.x,
    y: m * m * a.y + 2 * m * t * c.y + t * t * b.y,
  };
};

const HERO_LIFT = 190;

/* ----- skins ----- */
type Theme = {
  bg: string;
  land: string;        // dot / line color for the continents
  landOpacity: number;
  arc: string;
  arcFaint: string;
  city: string;
  hub: string;
  text: string;
  muted: string;
  kicker: string;
  chipBorder: string;
  chipText: string;
  dots: boolean;       // dot-map vs line-map
};

const THEMES: Record<JourneyVariant, Theme> = {
  gold: {
    bg: "#14224a", land: "#c2a15b", landOpacity: 0.55, arc: "#d9c291", arcFaint: "rgba(217,194,145,0.2)",
    city: "#d9c291", hub: "#ffffff", text: "#ffffff", muted: "rgba(255,255,255,0.72)",
    kicker: "#d9c291", chipBorder: "rgba(217,194,145,0.5)", chipText: "#d9c291", dots: true,
  },
  sapphire: {
    bg: "#ece7db", land: "#12294a", landOpacity: 0.4, arc: "#1b4fa0", arcFaint: "rgba(27,79,160,0.22)",
    city: "#12294a", hub: "#1b4fa0", text: "#12294a", muted: "#4a5568",
    kicker: "#9a7526", chipBorder: "rgba(18,41,74,0.3)", chipText: "#12294a", dots: true,
  },
  editorial: {
    bg: "#1a1814", land: "rgba(247,244,238,0.34)", landOpacity: 1, arc: "#f7f4ee", arcFaint: "rgba(247,244,238,0.16)",
    city: "#f7f4ee", hub: "#f7f4ee", text: "#f7f4ee", muted: "#b6ad9e",
    kicker: "#948c7c", chipBorder: "rgba(247,244,238,0.3)", chipText: "#f7f4ee", dots: false,
  },
};

/* ----- copy ----- */
const T = {
  en: {
    kicker: "Signature specialty",
    lines: ["We place the cases", "others turn away."],
    intro: "With over 60 years of experience, we are an industry leader in the foreign national market. Every case is built, presented and placed from Coral Gables.",
    outro: "Customized sales strategies and wealth-management solutions for your international clients, always within carrier, state and federal guidelines.",
    caseId: "CASE No. 2847 · $5M UL",
    transit: "IN TRANSIT",
    placed: "PLACED",
    milestones: ["Underwriting", "Placed with an A+ carrier", "Policy issued"],
    counter: "cases placed this year",
  },
  es: {
    kicker: "Especialidad distintiva",
    lines: ["Colocamos los casos que", "otros rechazan."],
    intro: "Con más de 60 años de experiencia, somos líderes del mercado de clientes extranjeros: cada caso se arma, se presenta y se coloca desde Coral Gables.",
    outro: "Estrategias de venta y soluciones de wealth management a medida para sus clientes internacionales, siempre dentro de las normas de cada aseguradora, estado y regulación federal.",
    caseId: "CASO Nº 2847 · US$5M UL",
    transit: "EN TRÁNSITO",
    placed: "COLOCADO",
    milestones: ["Underwriting", "Colocado con carrier A+", "Póliza emitida"],
    counter: "casos colocados este año",
  },
} as const;

/* ----- the travelling case label (rides the arc) ----- */
function CaseLabel({ p, theme, t, frozen, serif }: { p: MotionValue<number>; theme: Theme; t: (typeof T)[Lang]; frozen: boolean; serif: string }) {
  const tt = useTransform(p, [0.3, 0.72], [0, 1], { clamp: true });
  const x = useTransform(tt, (v) => arcPoint(ORIGIN, MIA, HERO_LIFT, v).x);
  const y = useTransform(tt, (v) => arcPoint(ORIGIN, MIA, HERO_LIFT, v).y - 16);
  const op = useTransform(p, [0.28, 0.34, 0.9, 0.96], [0, 1, 1, 0]);
  // the status flips from "in transit" to "placed" as it reaches Miami
  const transitOp = useTransform(p, [0.62, 0.7], [1, 0]);
  const placedOp = useTransform(p, [0.68, 0.76], [0, 1]);
  const landed = arcPoint(ORIGIN, MIA, HERO_LIFT, 1);

  if (frozen) {
    return (
      <g transform={`translate(${landed.x} ${landed.y - 16})`}>
        <text textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="12.5" letterSpacing="1.2" fill={theme.arc}>{t.caseId}</text>
        <text textAnchor="middle" y="15" fontFamily={serif} fontStyle="italic" fontSize="13" fill={theme.muted}>{t.placed}</text>
      </g>
    );
  }

  return (
    <motion.g style={{ x, y, opacity: op }}>
      <text textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="12.5" letterSpacing="1.2" fill={theme.arc}>
        {t.caseId}
      </text>
      <motion.text textAnchor="middle" y="15" fontFamily={serif} fontStyle="italic" fontSize="13" fill={theme.muted} style={{ opacity: transitOp }}>
        {t.transit}
      </motion.text>
      <motion.text textAnchor="middle" y="15" fontFamily={serif} fontStyle="italic" fontSize="13" fill={theme.arc} style={{ opacity: placedOp }}>
        {t.placed}
      </motion.text>
    </motion.g>
  );
}

export default function CaseJourney({
  id,
  num,
  lang = "es",
  variant,
  cta,
  serif = "var(--font-lora), serif",
  casesThisYear = 412,
}: {
  id?: string;
  num?: string;
  lang?: Lang;
  variant: JourneyVariant;
  cta?: ReactNode;
  serif?: string;
  casesThisYear?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const t = T[lang];
  const th = THEMES[variant];

  // below 900px there is no pin , the scene renders in its landed state
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const frozen = reduce || compact;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  // phase 1 , the dot map washes in
  const maskW = useTransform(p, [0.02, 0.26], [0, MAP_W * 1.15]);
  // phase 1b , the quiet network of routes
  const faintOp = useTransform(p, [0.2, 0.34], [0, 1]);
  // phase 2 , the hero arc draws
  const arcLen = useTransform(p, [0.3, 0.72], [0, 1]);
  // phase 3 , Miami pulses, milestones chain in
  const hubScale = useTransform(p, [0.7, 0.78, 0.86], [1, 2.6, 1.6]);
  const hubOp = useTransform(p, [0.7, 0.78, 0.9], [0, 0.55, 0]);
  // two parallax layers: the map drifts 4%, the arc + label 8%
  const mapY = useTransform(p, [0, 1], [MAP_H * 0.04, -MAP_H * 0.04]);
  const arcY = useTransform(p, [0, 1], [MAP_H * 0.08, -MAP_H * 0.08]);

  const st = frozen ? { maskW: MAP_W * 1.15, faintOp: 1, arcLen: 1, mapY: 0, arcY: 0 } : null;

  const mono: React.CSSProperties = { fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" };

  return (
    <>
    <div id={id} ref={ref} className={styles.section} style={{ background: th.bg }}>
      <div className={styles.pin}>

        {/* entry , the headline, revealed line by line */}
        <div className={styles.head}>
          <div style={{ ...mono, color: th.kicker, marginBottom: 16 }}>{num ? `${num} / ${t.kicker}` : t.kicker}</div>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,4vw,58px)", lineHeight: 1.06, letterSpacing: "-0.02em", margin: "0 0 18px", color: th.text }}>
            {t.lines.map((line, i) => (
              <MaskReveal key={line} inView delay={0.1 + i * 0.14}>
                {i === 1 ? <em style={{ fontStyle: "italic", color: th.kicker }}>{line}</em> : line}
              </MaskReveal>
            ))}
          </h2>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            style={{ fontSize: "clamp(14px,1.25vw,16.5px)", lineHeight: 1.65, color: th.muted, margin: 0, maxWidth: 560 }}
          >
            {t.intro}
          </motion.p>
        </div>

        {/* the map */}
        <div className={styles.mapWrap}>
          <svg className={styles.map} viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <pattern id={`cjDots-${variant}`} width="11" height="11" patternUnits="userSpaceOnUse">
                <circle cx="2.4" cy="2.4" r="1.5" fill={th.land} opacity={th.landOpacity} />
              </pattern>
              <linearGradient id={`cjGrad-${variant}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" />
                <stop offset="0.8" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
              <mask id={`cjMask-${variant}`}>
                <motion.rect x="0" y="0" height={MAP_H} fill={`url(#cjGrad-${variant})`} style={st ? { width: st.maskW } : { width: maskW }} />
              </mask>
            </defs>

            {/* layer 1 , continents (4% parallax) */}
            <motion.g style={st ? { y: st.mapY } : { y: mapY }} mask={`url(#cjMask-${variant})`}>
              {th.dots ? (
                <>
                  <path d={NORTH_AMERICA} fill={`url(#cjDots-${variant})`} />
                  <path d={SOUTH_AMERICA} fill={`url(#cjDots-${variant})`} />
                </>
              ) : (
                <>
                  <path d={NORTH_AMERICA} fill="none" stroke={th.land} strokeWidth="1" />
                  <path d={SOUTH_AMERICA} fill="none" stroke={th.land} strokeWidth="1" />
                </>
              )}

              {/* the quiet network , every desk routes into Miami */}
              <motion.g style={st ? { opacity: st.faintOp } : { opacity: faintOp }}>
                {CITIES.filter((c) => !c.hub && c.code !== ORIGIN.code).map((c) => (
                  <path key={c.code} d={arcPath(c, MIA, 90)} fill="none" stroke={th.arcFaint} strokeWidth="1" />
                ))}
              </motion.g>

              {/* cities + mono coordinates */}
              {CITIES.map((c) => (
                <g key={c.code}>
                  <circle cx={c.x} cy={c.y} r={c.hub ? 5 : 3.4} fill={c.hub ? th.hub : th.city} />
                  <text x={c.x + 11} y={c.y - 1} fontFamily="var(--font-plex-mono), monospace" fontSize="12.5" letterSpacing="1.4" fill={c.hub ? th.hub : th.city}>{c.code}</text>
                  <text x={c.x + 11} y={c.y + 12} fontFamily="var(--font-plex-mono), monospace" fontSize="8.5" letterSpacing="0.8" fill={th.muted} opacity="0.75">{c.coord}</text>
                </g>
              ))}

              {/* Miami pulse on arrival */}
              <motion.circle cx={MIA.x} cy={MIA.y} r="9" fill="none" stroke={th.arc} strokeWidth="1.4"
                style={st ? { opacity: 0 } : { scale: hubScale, opacity: hubOp, originX: `${MIA.x}px`, originY: `${MIA.y}px` }} />
            </motion.g>

            {/* layer 2 , the case in transit (8% parallax) */}
            <motion.g style={st ? { y: st.arcY } : { y: arcY }}>
              <motion.path
                d={arcPath(ORIGIN, MIA, HERO_LIFT)}
                fill="none"
                stroke={th.arc}
                strokeWidth="1.8"
                strokeLinecap="round"
                style={st ? { pathLength: st.arcLen } : { pathLength: arcLen }}
              />
              <CaseLabel p={p} theme={th} t={t} frozen={frozen} serif={serif} />
            </motion.g>
          </svg>
        </div>

        {/* landing , milestones + the year's counter */}
        <div className={styles.foot}>
          {variant === "editorial" ? (
            <div style={{ display: "grid", gap: 8 }}>
              {t.milestones.map((m, i) => (
                <motion.div
                  key={m}
                  className={styles.milestoneRow}
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.16 }}
                  style={{ fontFamily: serif, fontSize: "clamp(16px,1.6vw,21px)", color: th.text }}
                >
                  {m}
                  <motion.span
                    className={styles.strike}
                    style={{ background: th.arc }}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, delay: 0.45 + i * 0.16, ease: EASE }}
                  />
                  <span style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: th.kicker }}>✓</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.chips}>
              {t.milestones.map((m, i) => (
                <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(8px,1.2vw,16px)" }}>
                  <motion.span
                    className={styles.chip}
                    style={{ border: `1px solid ${th.chipBorder}`, color: th.chipText }}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease: EASE }}
                  >
                    {m} <span style={{ opacity: 0.85 }}>✓</span>
                  </motion.span>
                  {i < t.milestones.length - 1 && <span className={styles.chipArrow} style={{ color: th.muted }}>→</span>}
                </span>
              ))}
            </div>
          )}

          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: serif, fontSize: "clamp(26px,3vw,42px)", lineHeight: 1, color: th.kicker, letterSpacing: "-0.02em" }}>
              <CountUp to={casesThisYear} />
            </div>
            <div style={{ ...mono, fontSize: 10, color: th.muted, marginTop: 8 }}>{t.counter}</div>
          </div>
        </div>
      </div>

    </div>

    {/* close , the second paragraph + CTA, a sibling so the pin never overlaps it */}
    <div style={{ position: "relative", background: th.bg, padding: "clamp(30px,4vw,60px) clamp(20px,5vw,60px) clamp(70px,9vw,120px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(24px,4vw,60px)", alignItems: "end" }}>
        <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: th.muted, margin: 0, maxWidth: 620 }}>{t.outro}</p>
        {cta && <div data-reveal style={{ justifySelf: "start" }}>{cta}</div>}
      </div>
    </div>
    </>
  );
}
