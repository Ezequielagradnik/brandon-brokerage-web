import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page} style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 18px", display: "inline-flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 24 }} />
          </div>
        </div>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a8aa8", marginBottom: 10, fontWeight: 700 }}>Website redesign · Three directions</div>
        <h1 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.08, margin: "0 0 18px", color: "#fff", letterSpacing: "-0.01em" }}>Pick a direction.</h1>
        <p style={{ fontSize: "clamp(15px,1.2vw,17px)", color: "#9aa6b8", fontWeight: 500, maxWidth: 680, margin: "0 0 clamp(40px,5vw,64px)", lineHeight: 1.6 }}>Three genuinely different design languages — grounded in how real insurance brokerages and modern B2B financial firms present themselves — sharing the same real homepage copy. Open any one to see the full, scrollable homepage.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>

          <Link href="/a" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ position: "relative", height: 220, background: "#f7f8fa", padding: 24 }}>
              <div style={{ position: "absolute", top: 24, right: 24, width: "62%", background: "#fff", border: "1px solid #e6e9ef", borderRadius: 10, padding: "14px 16px", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#12294a", fontFamily: "var(--font-manrope), sans-serif" }}>50<span style={{ color: "#d97706" }}>+</span></div>
                <div style={{ display: "flex", gap: 4, marginTop: 10, height: 24, alignItems: "flex-end" }}>
                  {[30, 55, 40, 70, 50].map((h, i) => (<div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? "#d97706" : "#e7ecf3", borderRadius: 2 }} />))}
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 24, left: 24, background: "#12294a", color: "#fff", borderRadius: 10, padding: "10px 16px", fontSize: 12, fontWeight: 700 }}>Foreign National Desk</div>
            </div>
            <div style={{ padding: "26px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d97706", marginBottom: 10 }}>01 — Corporate Modern</div>
              <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: 24, margin: "0 0 8px", color: "#12294a" }}>Trust, built like software.</h2>
              <p style={{ fontSize: 14, color: "#5c6675", fontWeight: 500, lineHeight: 1.6, margin: "0 0 16px" }}>Clean sans-serif, navy &amp; amber, dashboard-style stat cards — the register of a modern B2B brokerage platform (Highland Capital, Crump).</p>
              <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#12294a" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/b" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#f5efe0" }}>
            <div style={{ position: "relative", height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="96" height="96" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="57" fill="none" stroke="#1f3d2f" strokeWidth="1" />
                <circle cx="60" cy="60" r="40" fill="none" stroke="#a67c3d" strokeWidth="1.4" />
                <text x="60" y="55" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#1f3d2f">50</text>
                <text x="60" y="72" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="1" fill="#1f3d2f">YEARS</text>
              </svg>
            </div>
            <div style={{ padding: "26px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a67c3d", marginBottom: 10, fontFamily: "monospace" }}>02 — Heritage Engraved</div>
              <h2 style={{ fontFamily: "serif", fontWeight: 500, fontSize: 24, margin: "0 0 8px", color: "#1f3d2f" }}>Fifty years, on paper.</h2>
              <p style={{ fontSize: 14, color: "#3f5245", fontWeight: 400, lineHeight: 1.6, margin: "0 0 16px" }}>Ivory paper, engraved guilloche linework, a wax-seal emblem — the register of a stock certificate, nodding to currency and heritage design (Plaid&apos;s 2025 refresh).</p>
              <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#1f3d2f", fontFamily: "monospace" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/c" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ position: "relative", height: 220, background: "#0a0a0a", display: "flex", alignItems: "center", padding: "0 24px" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: 900, fontSize: 46, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em" }}>NO<br />BORDERS.</div>
              <div style={{ position: "absolute", bottom: 20, left: 24, width: 40, height: 6, background: "#1a56ff" }} />
            </div>
            <div style={{ padding: "26px 24px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1a56ff", marginBottom: 10 }}>03 — Bold Editorial</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: 24, margin: "0 0 8px", color: "#0a0a0a", letterSpacing: "-0.01em" }}>Black, white, and one blue.</h2>
              <p style={{ fontSize: 14, color: "#3a3a3a", fontWeight: 500, lineHeight: 1.6, margin: "0 0 16px" }}>Oversized type, sharp edges, thick rules, zero gradients — the high-contrast, no-gloss register 2026 fintech is moving toward (Coinbase Sans, Mercury).</p>
              <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "#0a0a0a" }}>Open homepage →</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "clamp(40px,5vw,64px)", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "#6f7d92" }}>Brandon Brokerage Group · 75 Valencia Avenue, Suite 200, Coral Gables, FL · 305-444-7401</div>
      </div>
    </div>
  );
}
