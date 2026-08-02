"use client";

import Link from "next/link";
import { useState } from "react";
import LangToggle from "@/components/LangToggle";
import type { Lang } from "@/lib/copy";
import styles from "./page.module.css";

// Picker copy , the landings themselves carry their own bilingual dictionaries.
const T = {
  en: {
    kicker: "Website redesign · Four directions",
    titleA: "Pick a ",
    titleB: "direction",
    intro: "Four design languages sharing the same real homepage copy. Direction 01 is modeled on bblatam.com, the sister firm, so brandonbrokerage.com feels part of the same visual family. Every landing ships in English with an ES toggle. Open any one to see the full homepage.",
    open: "Open homepage →",
    cards: {
      g: { title: "Aligned with Brandon Latam.", desc: "Modeled on bblatam.com, the sister firm. Pinned card deck, the case-journey map, agent tools, insights, EN/ES toggle, Lora serif." },
      d: { title: "Light, animated, premium.", desc: "Bodoni serif over a slow silk shader that follows the cursor, plus the 3D globe with LatAm→Miami arcs." },
      i: { title: "Paper, ink, oversized type.", desc: "Warm paper and near-black ink, giant Cormorant masthead, black & white photography and numbered chapters. A maison lookbook." },
      n: { title: "The site as the platform.", desc: "Beige canvas, navy depth and Brandon gold, the Latam Network palette. Floating glass header, four pillars travelling sideways, the foreign-national case flow, the full product shelf and the team by name. Deepest of the four." },
    },
  },
  es: {
    kicker: "Rediseño del sitio · Cuatro direcciones",
    titleA: "Elegí una ",
    titleB: "dirección",
    intro: "Cuatro lenguajes de diseño con el mismo copy real de la home. La dirección 01 está modelada sobre bblatam.com, la firma hermana, para que brandonbrokerage.com se sienta parte de la misma familia visual. Todas abren en inglés y tienen toggle ES. Abrí cualquiera para ver la home completa.",
    open: "Abrir home →",
    cards: {
      g: { title: "Alineada con Brandon Latam.", desc: "Modelada sobre bblatam.com, la firma hermana. Mazo de cartas pinneado, el mapa del viaje del caso, herramientas para agentes, insights, toggle EN/ES y serif Lora." },
      d: { title: "Liviana, animada, premium.", desc: "Serif Bodoni sobre un shader de seda lento que sigue al cursor, más el globo 3D con arcos LatAm→Miami." },
      i: { title: "Papel, tinta y tipografía gigante.", desc: "Papel cálido y tinta casi negra, masthead Cormorant gigante, fotografía en blanco y negro y capítulos numerados: un lookbook de maison." },
      n: { title: "El sitio como la plataforma.", desc: "Canvas beige, profundidad navy y dorado Brandon: la paleta de Latam Network. Header flotante de vidrio, cuatro pilares que viajan de costado, el flujo del caso extranjero, todo el catálogo de productos y el equipo con nombre y apellido. La más completa de las cuatro." },
    },
  },
} as const;

// Brandon Latam Network palette: navy #14224a, gold #c2a15b / #d9c291 / #9a7b32
const NAVY = "#14224a";
const GOLD = "#c2a15b";
const GOLD_DEEP = "#9a7b32";
const CARD_BG = "linear-gradient(165deg, #d9c291 0%, #c2a15b 100%)";
const CARD_BORDER = "1px solid rgba(154,123,50,0.5)";
const CARD_TEXT = "rgba(20,34,74,0.82)";
const CARD_DIVIDER = "1px solid rgba(20,34,74,0.18)";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  return (
    <div className={styles.page} style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <LangToggle lang={lang} setLang={setLang} color="rgba(20,34,74,0.5)" activeColor={NAVY} />
        </div>

        <div style={{ textAlign: "center", margin: "0 auto clamp(40px,5vw,64px)", maxWidth: 760 }}>
          <div style={{ display: "inline-flex", marginBottom: 32 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 56 }} />
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 14, fontWeight: 700 }}>{t.kicker}</div>
          <h1 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.08, margin: "0 0 18px", color: NAVY, letterSpacing: "-0.01em" }}>{t.titleA}<span style={{ color: GOLD }}>{t.titleB}</span>.</h1>
          <p style={{ fontSize: "clamp(15px,1.2vw,17px)", color: "#4a5568", fontWeight: 500, margin: "0 auto", lineHeight: 1.6 }}>{t.intro}</p>
        </div>

        <div className={styles.grid}>

          <Link href="/n" className={styles.card} style={{ position: "relative", border: "2px solid #9a7b32", borderRadius: 12, overflow: "hidden", background: CARD_BG, boxShadow: "0 14px 40px rgba(154,123,50,0.3)" }}>
            <div style={{ position: "relative", height: 190, overflow: "hidden", background: "#f5f1e8", padding: "44px 20px 0" }}>
              <div style={{ position: "absolute", right: -34, top: -44, width: 170, height: 170, borderRadius: "50%", background: "radial-gradient(circle, rgba(194,161,91,0.42), transparent 65%)" }} />
              <div style={{ position: "absolute", left: -40, bottom: -60, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,34,74,0.14), transparent 66%)" }} />
              {/* floating glass header */}
              <div style={{ position: "absolute", top: 12, left: 14, right: 14, display: "flex", alignItems: "center", gap: 8, padding: "6px 6px 6px 10px", borderRadius: 999, border: "1px solid rgba(194,161,91,0.4)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(6px)", boxShadow: "0 6px 18px rgba(20,34,74,0.1)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brandon-logo.png" alt="" style={{ height: 13, width: "auto" }} />
                <span style={{ display: "flex", gap: 5, marginLeft: 4 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} style={{ height: 5, width: i === 1 ? 22 : 15, borderRadius: 999, background: i === 1 ? "rgba(194,161,91,0.72)" : "rgba(20,34,74,0.18)" }} />
                  ))}
                </span>
                <span style={{ marginLeft: "auto", height: 15, width: 40, borderRadius: 999, background: "#14224a" }} />
              </div>
              <div style={{ position: "relative", fontFamily: "var(--font-bodoni), serif", fontSize: 26, lineHeight: 1.04, color: "#14224a", letterSpacing: "-0.02em" }}>
                Sixty years placing<br /><span style={{ fontStyle: "italic", color: "#b89a5e" }}>the cases others<br />turn away.</span>
              </div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>01 Network</div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 20, margin: "0 0 8px", color: NAVY }}>{t.cards.n.title}</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>{t.cards.n.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>{t.open}</span>
            </div>
          </Link>

          <Link href="/g" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#101828", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-palms-sunset.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.4), rgba(16,24,40,0.85))" }} />
              <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 22, height: 1, background: "#c2a15b" }} />
                  <span style={{ fontSize: 8.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d9c291" }}>Coral Gables · Est. 1960s</span>
                </div>
                <div style={{ fontFamily: "var(--font-lora), serif", fontWeight: 500, fontSize: 22, lineHeight: 1.15, color: "#fff" }}>The quiet partner behind <span style={{ fontStyle: "italic", color: "#d9c291" }}>extraordinary cases.</span></div>
              </div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>02 Boutique Latam</div>
              <h2 style={{ fontFamily: "var(--font-lora), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: NAVY }}>{t.cards.g.title}</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>{t.cards.g.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>{t.open}</span>
            </div>
          </Link>


          <Link href="/d" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "radial-gradient(90% 90% at 72% 40%, rgba(169,129,47,0.5), rgba(243,239,230,0) 60%), radial-gradient(80% 80% at 55% 72%, rgba(18,41,74,0.35), rgba(243,239,230,0) 60%), #f3efe6" }} />
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>03 Ivory &amp; Sapphire</div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: NAVY }}>{t.cards.d.title}</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>{t.cards.d.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>{t.open}</span>
            </div>
          </Link>


          <Link href="/i" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#f7f4ee", padding: "20px 22px 0", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, borderBottom: "1px solid #1a1814", paddingBottom: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357" }}>Brandon Brokerage</span>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357", whiteSpace: "nowrap" }}>Since the 1960s</span>
              </div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, fontSize: 29, lineHeight: 1.02, color: "#1a1814", letterSpacing: "-0.015em" }}>Seamless<br /><span style={{ fontStyle: "italic" }}>execution,</span><br />since the<br />&rsquo;70s.</div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>04 Maison Editorial</div>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: NAVY }}>{t.cards.i.title}</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>{t.cards.i.desc}</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>{t.open}</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "clamp(40px,5vw,64px)", paddingTop: 28, borderTop: "1px solid rgba(20,34,74,0.12)", fontSize: 13, color: "#6b7482" }}>Brandon Brokerage Group · 75 Valencia Avenue, Suite 200, Coral Gables, FL · 305-444-7401</div>
      </div>
    </div>
  );
}
