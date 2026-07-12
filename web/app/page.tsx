import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page} style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ background: "rgba(245,240,230,0.94)", borderRadius: 999, padding: "8px 18px", display: "inline-flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 24 }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 8 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a24b" }}>Website redesign · Three directions</div>
        </div>
        <h1 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: "clamp(34px,5.2vw,64px)", lineHeight: 1.02, margin: "0 0 18px", color: "#fff" }}>Pick a direction.</h1>
        <p style={{ fontSize: "clamp(15px,1.4vw,18px)", color: "#9aa6b8", fontWeight: 300, maxWidth: 640, margin: "0 0 clamp(40px,5vw,64px)", lineHeight: 1.6 }}>Same content and structure across all three — one shared editorial language (Bodoni + hairline gold), each with its own palette and a distinct three.js signature. Open any one to see the full, scrollable homepage.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>

          <Link href="/a" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", background: "#0d1b32" }}>
            <div style={{ position: "relative", height: 220, background: "radial-gradient(120% 120% at 75% 35%,#12233f,#0a1626)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(201,162,75,0.5)", boxShadow: "inset 0 0 40px rgba(201,162,75,0.15)" }} />
              <div style={{ position: "absolute", width: 120, height: 180, borderRadius: "50%", border: "1px solid rgba(201,162,75,0.28)" }} />
              <div style={{ position: "absolute", width: 180, height: 1, background: "rgba(201,162,75,0.4)" }} />
            </div>
            <div style={{ padding: "28px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontStyle: "italic", color: "#c9a24b", fontSize: 20 }}>A</span>
                <span style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#0a1626", border: "1px solid rgba(255,255,255,0.2)" }} />
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#c9a24b" }} />
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 26, margin: "0 0 8px", color: "#fff" }}>Midnight &amp; Gold</h2>
              <p style={{ fontSize: 14, color: "#9aa6b8", fontWeight: 300, lineHeight: 1.6, margin: "0 0 18px" }}>Deep navy, gold hairlines. Signature: a rotating <strong style={{ color: "#e2c072", fontWeight: 500 }}>wireframe globe</strong> — a nod to the logo and the foreign national market.</p>
              <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e2c072" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/b" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", background: "#f3efe6" }}>
            <div style={{ position: "relative", height: 220, background: "radial-gradient(90% 90% at 72% 40%, rgba(169,129,47,0.5), rgba(243,239,230,0) 60%), radial-gradient(80% 80% at 55% 72%, rgba(18,41,74,0.35), rgba(243,239,230,0) 60%), #f3efe6" }} />
            <div style={{ padding: "28px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontStyle: "italic", color: "#a9812f", fontSize: 20 }}>B</span>
                <span style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#f3efe6", border: "1px solid rgba(18,41,74,0.25)" }} />
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#12294a" }} />
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#a9812f" }} />
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 26, margin: "0 0 8px", color: "#12294a" }}>Ivory &amp; Sapphire</h2>
              <p style={{ fontSize: 14, color: "#5c6675", fontWeight: 400, lineHeight: 1.6, margin: "0 0 18px" }}>Light, airy and premium. Signature: a soft animated <strong style={{ color: "#a9812f", fontWeight: 600 }}>silk gradient</strong> shader flowing navy and gold across ivory.</p>
              <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a9812f" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/c" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", background: "#111015" }}>
            <div style={{ position: "relative", height: 220, background: "radial-gradient(120% 120% at 72% 40%,#1b1a20,#0c0c0f)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 120, height: 120, background: "linear-gradient(135deg,#efe4c8,#b99a5f 55%,#6f5c33)", clipPath: "polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)", boxShadow: "0 20px 50px rgba(216,199,160,0.25)" }} />
            </div>
            <div style={{ padding: "28px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-bodoni), serif", fontStyle: "italic", color: "#d8c7a0", fontSize: 20 }}>C</span>
                <span style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#0c0c0f", border: "1px solid rgba(255,255,255,0.2)" }} />
                  <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#d8c7a0" }} />
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 26, margin: "0 0 8px", color: "#fff" }}>Obsidian &amp; Champagne</h2>
              <p style={{ fontSize: 14, color: "#9a9384", fontWeight: 300, lineHeight: 1.6, margin: "0 0 18px" }}>High-end, near-black minimal. Signature: a faceted <strong style={{ color: "#efe4c8", fontWeight: 500 }}>gold gem</strong> slowly turning in the light.</p>
              <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d8c7a0" }}>Open homepage →</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "clamp(40px,5vw,64px)", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "#6f7d92" }}>Brandon Brokerage Group · 75 Valencia Avenue, Suite 200, Coral Gables, FL · 305-444-7401</div>
      </div>
    </div>
  );
}
