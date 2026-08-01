import Link from "next/link";
import styles from "./page.module.css";

// Brandon Latam Network palette: navy #14224a, gold #c2a15b / #d9c291 / #9a7b32
const NAVY = "#14224a";
const GOLD = "#c2a15b";
const GOLD_DEEP = "#9a7b32";
const CARD_BG = "linear-gradient(165deg, #d9c291 0%, #c2a15b 100%)";
const CARD_BORDER = "1px solid rgba(154,123,50,0.5)";
const CARD_TEXT = "rgba(20,34,74,0.82)";
const CARD_DIVIDER = "1px solid rgba(20,34,74,0.18)";

export default function Home() {
  return (
    <div className={styles.page} style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>

        <div style={{ textAlign: "center", margin: "0 auto clamp(40px,5vw,64px)", maxWidth: 760 }}>
          <div style={{ display: "inline-flex", marginBottom: 32 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 56 }} />
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 14, fontWeight: 700 }}>Rediseño del sitio · Cinco direcciones</div>
          <h1 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.08, margin: "0 0 18px", color: NAVY, letterSpacing: "-0.01em" }}>Elegí una <span style={{ color: GOLD }}>dirección</span>.</h1>
          <p style={{ fontSize: "clamp(15px,1.2vw,17px)", color: "#4a5568", fontWeight: 500, margin: "0 auto", lineHeight: 1.6 }}>Cinco lenguajes de diseño distintos con el mismo copy real de la home. La dirección 01 está modelada sobre bblatam.com — la firma hermana — para que brandonbrokerage.com se sienta parte de la misma familia visual. Abrí cualquiera para ver la home completa.</p>
        </div>

        <div className={styles.grid}>

          <Link href="/g" className={styles.card} style={{ position: "relative", border: "2px solid #9a7b32", borderRadius: 12, overflow: "hidden", background: CARD_BG, boxShadow: "0 14px 40px rgba(154,123,50,0.3)" }}>
            <div style={{ position: "relative", height: 190, background: "#101828", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-palms-sunset.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.4), rgba(16,24,40,0.85))" }} />
              <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 22, height: 1, background: "#c2a15b" }} />
                  <span style={{ fontSize: 8.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d9c291" }}>Coral Gables · Desde los años 70</span>
                </div>
                <div style={{ fontFamily: "var(--font-lora), serif", fontWeight: 500, fontSize: 22, lineHeight: 1.15, color: "#fff" }}>El socio silencioso detrás de <span style={{ fontStyle: "italic", color: "#d9c291" }}>casos extraordinarios.</span></div>
              </div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>01 — Boutique Latam</div>
              <h2 style={{ fontFamily: "var(--font-lora), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: NAVY }}>Alineada con Brandon Latam.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Modelada sobre bblatam.com, la firma hermana. Globo 3D con arcos LatAm→Miami, mazo de cartas pinneado, insights, toggle EN/ES y serif Lora.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Abrir home →</span>
            </div>
          </Link>

          <Link href="/b" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#f5efe0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="80" height="80" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="57" fill="none" stroke="#1f3d2f" strokeWidth="1" />
                <circle cx="60" cy="60" r="40" fill="none" stroke="#a67c3d" strokeWidth="1.4" />
                <text x="60" y="55" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#1f3d2f">50</text>
                <text x="60" y="72" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="1" fill="#1f3d2f">AÑOS</text>
              </svg>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8, fontFamily: "monospace" }}>02 — Heritage Engraved</div>
              <h2 style={{ fontFamily: "serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: NAVY }}>Cincuenta años, en papel.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Papel marfil, guilloche grabado y sello de lacre: un certificado de acciones que guiña al diseño de billetes.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY, fontFamily: "monospace" }}>Abrir home →</span>
            </div>
          </Link>

          <Link href="/d" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "radial-gradient(90% 90% at 72% 40%, rgba(169,129,47,0.5), rgba(243,239,230,0) 60%), radial-gradient(80% 80% at 55% 72%, rgba(18,41,74,0.35), rgba(243,239,230,0) 60%), #f3efe6" }} />
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>03 — Ivory &amp; Sapphire</div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: NAVY }}>Liviana, animada, premium.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Serif Bodoni sobre un shader de seda lento que sigue al cursor: dorado y navy fluyendo sobre marfil.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Abrir home →</span>
            </div>
          </Link>

          <Link href="/e" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#ffffff", overflow: "hidden", padding: "22px 20px" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 190" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
                {[38, 76, 114, 152, 190, 228, 266].map((x) => (<line key={x} x1={x} y1="0" x2={x} y2="190" stroke="#e5e7eb" strokeWidth="1" />))}
                {[38, 76, 114, 152].map((y) => (<line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#e5e7eb" strokeWidth="1" />))}
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 8, letterSpacing: "0.18em", color: "#6b7280", marginBottom: 12 }}>25.7213° N, 80.2683° W</div>
                <div style={{ fontFamily: "'Helvetica Neue', var(--font-inter-tight), sans-serif", fontWeight: 600, fontSize: 25, lineHeight: 1.04, letterSpacing: "-0.035em", color: "#0d0f12" }}>Ejecución<br />impecable, <span style={{ color: "#1f4fd8" }}>medida</span><br />al milímetro.</div>
              </div>
              <div style={{ position: "absolute", left: 20, right: 20, bottom: 18 }}>
                <div style={{ height: 1, background: "#0d0f12" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontFamily: "var(--font-plex-mono), monospace", fontSize: 7.5, letterSpacing: "0.12em", color: "#9aa0a8" }}>
                  <span>MEX</span><span>BOG</span><span>LIM</span><span>SCL</span><span>BUE</span><span>SAO</span><span style={{ color: "#1f4fd8" }}>MIA</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>04 — Swiss Precision</div>
              <h2 style={{ fontFamily: "'Helvetica Neue', var(--font-inter-tight), sans-serif", fontWeight: 700, fontSize: 19, margin: "0 0 8px", color: NAVY, letterSpacing: "-0.03em" }}>Blanco, tinta y un cobalto.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 500, lineHeight: 1.55, margin: "0 0 14px" }}>Helvetica sobre blanco, grilla de hairlines grises y un único acento cobalto. Spine de blueprint y banda de códigos de ciudad.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Abrir home →</span>
            </div>
          </Link>

          <Link href="/i" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#f7f4ee", padding: "20px 22px 0", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, borderBottom: "1px solid #1a1814", paddingBottom: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357" }}>Brandon Brokerage</span>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357", whiteSpace: "nowrap" }}>Desde los años 70</span>
              </div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, fontSize: 29, lineHeight: 1.02, color: "#1a1814", letterSpacing: "-0.015em" }}>Ejecución<br /><span style={{ fontStyle: "italic" }}>impecable,</span><br />desde los<br />años 70.</div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>05 — Maison Editorial</div>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: NAVY }}>Papel, tinta y tipografía gigante.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Papel cálido y tinta casi negra, masthead Cormorant gigante, fotografía en blanco y negro y capítulos numerados: un lookbook de maison.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Abrir home →</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "clamp(40px,5vw,64px)", paddingTop: 28, borderTop: "1px solid rgba(20,34,74,0.12)", fontSize: 13, color: "#6b7482" }}>Brandon Brokerage Group · 75 Valencia Avenue, Suite 200, Coral Gables, FL · 305-444-7401</div>
      </div>
    </div>
  );
}
