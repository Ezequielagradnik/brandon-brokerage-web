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
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 14, fontWeight: 700 }}>Website redesign · Five directions</div>
          <h1 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.08, margin: "0 0 18px", color: NAVY, letterSpacing: "-0.01em" }}>Pick a <span style={{ color: GOLD }}>direction</span>.</h1>
          <p style={{ fontSize: "clamp(15px,1.2vw,17px)", color: "#4a5568", fontWeight: 500, margin: "0 auto", lineHeight: 1.6 }}>Five design languages sharing the same real homepage copy. Direction 04 is modeled on bblatam.com — Brandon&apos;s sister firm — so brandonbrokerage.com feels like part of the same visual family. Open any one to see the full, scrollable homepage.</p>
        </div>

        <div className={styles.grid}>

          <Link href="/g" className={styles.card} style={{ position: "relative", border: "2px solid #9a7b32", borderRadius: 12, overflow: "hidden", background: CARD_BG, boxShadow: "0 14px 40px rgba(154,123,50,0.3)" }}>
            <div style={{ position: "absolute", top: 12, right: 12, zIndex: 3, background: NAVY, color: "#d9c291", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 10px", borderRadius: 999 }}>Recommended</div>
            <div style={{ position: "relative", height: 190, background: "#101828", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-palms-sunset.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,40,0.4), rgba(16,24,40,0.85))" }} />
              <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 22, height: 1, background: "#c2a15b" }} />
                  <span style={{ fontSize: 8.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d9c291" }}>Coral Gables · Est. 1970s</span>
                </div>
                <div style={{ fontFamily: "var(--font-lora), serif", fontWeight: 500, fontSize: 22, lineHeight: 1.15, color: "#fff" }}>The quiet partner behind <span style={{ fontStyle: "italic", color: "#d9c291" }}>extraordinary cases.</span></div>
              </div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>01 — Boutique Latam</div>
              <h2 style={{ fontFamily: "var(--font-lora), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: NAVY }}>Aligned with Brandon Latam.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Modeled closely on bblatam.com — the sister firm. 3D globe with LatAm→Miami arcs, pinned card deck, insights, EN/ES toggle, Lora serif.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/b" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#f5efe0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="80" height="80" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="57" fill="none" stroke="#1f3d2f" strokeWidth="1" />
                <circle cx="60" cy="60" r="40" fill="none" stroke="#a67c3d" strokeWidth="1.4" />
                <text x="60" y="55" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#1f3d2f">50</text>
                <text x="60" y="72" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="1" fill="#1f3d2f">YEARS</text>
              </svg>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8, fontFamily: "monospace" }}>02 — Heritage Engraved</div>
              <h2 style={{ fontFamily: "serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: NAVY }}>Fifty years, on paper.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Ivory paper, engraved guilloche linework, a wax-seal emblem — a stock certificate, nodding to currency design.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY, fontFamily: "monospace" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/d" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "radial-gradient(90% 90% at 72% 40%, rgba(169,129,47,0.5), rgba(243,239,230,0) 60%), radial-gradient(80% 80% at 55% 72%, rgba(18,41,74,0.35), rgba(243,239,230,0) 60%), #f3efe6" }} />
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>03 — Ivory &amp; Sapphire</div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: NAVY }}>Light, animated, premium.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Bodoni serif over a slow silk-gradient shader that follows the cursor — gold and navy flowing across ivory.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/e" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "radial-gradient(120% 100% at 50% 0%, #0a1226, #05070d 70%)", overflow: "hidden" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 190" style={{ position: "absolute", inset: 0 }}>
                <circle cx="150" cy="95" r="64" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.6" />
                <ellipse cx="150" cy="95" rx="64" ry="22" fill="none" stroke="#5c8dff" strokeWidth="1" opacity="0.55" />
                <ellipse cx="150" cy="95" rx="64" ry="46" fill="none" stroke="#2563eb" strokeWidth="0.8" opacity="0.4" />
                <ellipse cx="150" cy="95" rx="88" ry="30" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.45" transform="rotate(-18 150 95)" />
                <g fill="#9fb8ff">
                  <circle cx="118" cy="72" r="2.6" /><circle cx="176" cy="60" r="2.6" /><circle cx="196" cy="108" r="2.6" />
                  <circle cx="140" cy="128" r="2.6" /><circle cx="104" cy="106" r="2.6" /><circle cx="222" cy="76" r="2.2" />
                </g>
              </svg>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>04 — Corporate Tech</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: 19, margin: "0 0 8px", color: NAVY, letterSpacing: "-0.01em" }}>Formal, wired in blue.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 500, lineHeight: 1.55, margin: "0 0 14px" }}>Black &amp; electric blue, mono labels, blueprint grid — with a wireframe globe and flight arcs behind the hero.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/i" className={styles.card} style={{ border: CARD_BORDER, borderRadius: 12, overflow: "hidden", background: CARD_BG }}>
            <div style={{ position: "relative", height: 190, background: "#f7f4ee", padding: "22px 22px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1a1814", paddingBottom: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357" }}>Brandon Brokerage</span>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357" }}>Since the 1970s</span>
              </div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, fontSize: 38, lineHeight: 0.98, color: "#1a1814", letterSpacing: "-0.015em" }}>Seamless<br /><span style={{ fontStyle: "italic", marginLeft: 34 }}>execution,</span><br />since the &rsquo;70s.</div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: CARD_DIVIDER }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: GOLD_DEEP, marginBottom: 8 }}>05 — Maison Editorial</div>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: NAVY }}>Paper, ink, oversized type.</h2>
              <p style={{ fontSize: 13, color: CARD_TEXT, fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Warm paper &amp; near-black ink, giant Cormorant masthead, black &amp; white photography, numbered chapters — a fashion-maison lookbook.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: NAVY }}>Open homepage →</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "clamp(40px,5vw,64px)", paddingTop: 28, borderTop: "1px solid rgba(20,34,74,0.12)", fontSize: 13, color: "#6b7482" }}>Brandon Brokerage Group · 75 Valencia Avenue, Suite 200, Coral Gables, FL · 305-444-7401</div>
      </div>
    </div>
  );
}
