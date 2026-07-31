import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page} style={{ padding: "clamp(48px,7vw,96px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>

        <div style={{ textAlign: "center", margin: "0 auto clamp(40px,5vw,64px)", maxWidth: 760 }}>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 40px", display: "inline-flex", marginBottom: 32 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 52 }} />
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a8aa8", marginBottom: 14, fontWeight: 700 }}>Website redesign · Nine directions</div>
          <h1 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.08, margin: "0 0 18px", color: "#fff", letterSpacing: "-0.01em" }}>Pick a <span style={{ color: "#e2c072" }}>direction</span>.</h1>
          <p style={{ fontSize: "clamp(15px,1.2vw,17px)", color: "#9aa6b8", fontWeight: 500, margin: "0 auto", lineHeight: 1.6 }}>Nine genuinely different design languages — grounded in how real insurance brokerages and modern B2B financial firms present themselves — sharing the same real homepage copy. Concepts 07–09 explore a boutique register: quieter, more elegant, more sophisticated. Open any one to see the full, scrollable homepage.</p>
        </div>

        <div className={styles.grid}>

          <Link href="/a" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ position: "relative", height: 190, background: "#f7f8fa", padding: 18 }}>
              <div style={{ position: "absolute", top: 18, right: 18, width: "66%", background: "#fff", border: "1px solid #e6e9ef", borderRadius: 10, padding: "12px 14px", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: "#12294a", fontFamily: "var(--font-manrope), sans-serif" }}>50<span style={{ color: "#d97706" }}>+</span></div>
                <div style={{ display: "flex", gap: 4, marginTop: 8, height: 20, alignItems: "flex-end" }}>
                  {[30, 55, 40, 70, 50].map((h, i) => (<div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? "#d97706" : "#e7ecf3", borderRadius: 2 }} />))}
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 18, left: 18, background: "#12294a", color: "#fff", borderRadius: 10, padding: "8px 14px", fontSize: 11, fontWeight: 700 }}>Foreign National Desk</div>
            </div>
            <div style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "#d97706", marginBottom: 8 }}>01 — Corporate Modern</div>
              <h2 style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 800, fontSize: 19, margin: "0 0 8px", color: "#12294a" }}>Trust, built like software.</h2>
              <p style={{ fontSize: 13, color: "#5c6675", fontWeight: 500, lineHeight: 1.55, margin: "0 0 14px" }}>Clean sans-serif, navy &amp; amber, dashboard-style stat cards — a modern B2B brokerage platform (Highland Capital, Crump).</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#12294a" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/b" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#f5efe0" }}>
            <div style={{ position: "relative", height: 190, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="80" height="80" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="57" fill="none" stroke="#1f3d2f" strokeWidth="1" />
                <circle cx="60" cy="60" r="40" fill="none" stroke="#a67c3d" strokeWidth="1.4" />
                <text x="60" y="55" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#1f3d2f">50</text>
                <text x="60" y="72" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="1" fill="#1f3d2f">YEARS</text>
              </svg>
            </div>
            <div style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#a67c3d", marginBottom: 8, fontFamily: "monospace" }}>02 — Heritage Engraved</div>
              <h2 style={{ fontFamily: "serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: "#1f3d2f" }}>Fifty years, on paper.</h2>
              <p style={{ fontSize: 13, color: "#3f5245", fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Ivory paper, engraved guilloche linework, a wax-seal emblem — a stock certificate, nodding to currency design (Plaid&apos;s 2025 refresh).</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#1f3d2f", fontFamily: "monospace" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/c" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ position: "relative", height: 190, background: "#0a0a0a", display: "flex", alignItems: "center", padding: "0 18px" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: 900, fontSize: 36, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em" }}>NO<br />BORDERS.</div>
              <div style={{ position: "absolute", bottom: 16, left: 18, width: 34, height: 5, background: "#1a56ff" }} />
            </div>
            <div style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "#1a56ff", marginBottom: 8 }}>03 — Bold Editorial</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 900, fontSize: 19, margin: "0 0 8px", color: "#0a0a0a", letterSpacing: "-0.01em" }}>Black, white, one blue.</h2>
              <p style={{ fontSize: 13, color: "#3a3a3a", fontWeight: 500, lineHeight: 1.55, margin: "0 0 14px" }}>Oversized type, sharp edges, zero gradients — the high-contrast, no-gloss 2026 fintech register (Coinbase Sans, Mercury).</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#0a0a0a" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/d" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#f3efe6" }}>
            <div style={{ position: "relative", height: 190, background: "radial-gradient(90% 90% at 72% 40%, rgba(169,129,47,0.5), rgba(243,239,230,0) 60%), radial-gradient(80% 80% at 55% 72%, rgba(18,41,74,0.35), rgba(243,239,230,0) 60%), #f3efe6" }} />
            <div style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#a9812f", marginBottom: 8 }}>04 — Ivory &amp; Sapphire</div>
              <h2 style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: "#12294a" }}>Light, animated, premium.</h2>
              <p style={{ fontSize: 13, color: "#5c6675", fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>The original direction — Bodoni serif over an animated silk-gradient shader flowing gold and navy across ivory.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#a9812f" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/e" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ position: "relative", height: 190, background: "radial-gradient(120% 100% at 50% 0%, #0a1226, #05070d 70%)", overflow: "hidden" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 190" style={{ position: "absolute", inset: 0 }}>
                <g stroke="#2563eb" strokeWidth="1" opacity="0.55">
                  <line x1="40" y1="60" x2="120" y2="40" /><line x1="120" y1="40" x2="190" y2="90" /><line x1="190" y1="90" x2="260" y2="55" />
                  <line x1="40" y1="60" x2="90" y2="130" /><line x1="90" y1="130" x2="190" y2="90" /><line x1="90" y1="130" x2="180" y2="155" />
                  <line x1="180" y1="155" x2="260" y2="120" /><line x1="260" y1="55" x2="260" y2="120" /><line x1="120" y1="40" x2="40" y2="60" />
                </g>
                <g fill="#5c8dff">
                  <circle cx="40" cy="60" r="3.4" /><circle cx="120" cy="40" r="3.4" /><circle cx="190" cy="90" r="3.4" />
                  <circle cx="260" cy="55" r="3.4" /><circle cx="90" cy="130" r="3.4" /><circle cx="180" cy="155" r="3.4" /><circle cx="260" cy="120" r="3.4" />
                </g>
              </svg>
            </div>
            <div style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "#2563eb", marginBottom: 8 }}>05 — Corporate Tech</div>
              <h2 style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 800, fontSize: 19, margin: "0 0 8px", color: "#0a0f1c", letterSpacing: "-0.01em" }}>Formal, wired in blue.</h2>
              <p style={{ fontSize: 13, color: "#3a4358", fontWeight: 500, lineHeight: 1.55, margin: "0 0 14px" }}>Black &amp; electric blue, mono labels, blueprint grid — with a live Three.js particle network behind the hero.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#2563eb" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/f" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#f6f2ea" }}>
            <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-palms-sunset.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,9,6,0.35), rgba(12,9,6,0.6))" }} />
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, fontFamily: "var(--font-fraunces), serif", fontStyle: "italic", fontSize: 21, color: "#fdfaf4", lineHeight: 1.2 }}>seamless execution.</div>
            </div>
            <div style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#a87f4a", marginBottom: 8 }}>06 — Photo Luxe</div>
              <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: "#191613" }}>Photography does the talking.</h2>
              <p style={{ fontSize: 13, color: "#544c40", fontWeight: 500, lineHeight: 1.55, margin: "0 0 14px" }}>Full-bleed Miami photography, cream &amp; bronze, Fraunces serif — private-bank calm, boutique-hotel warmth.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#a87f4a" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/g" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#fdfdfb" }}>
            <div style={{ position: "relative", height: 190, background: "#fdfdfb", padding: "26px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ width: 26, height: 1, background: "#9d7c3a" }} />
                <span style={{ fontSize: 8.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5a6779" }}>Coral Gables · Florida</span>
              </div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, fontSize: 27, lineHeight: 1.05, color: "#14263f" }}>Five decades of placing business, <span style={{ fontStyle: "italic", color: "#9d7c3a" }}>seamlessly</span>.</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-aerial-day.jpg" alt="" style={{ position: "absolute", left: 22, right: 22, bottom: 0, width: "calc(100% - 44px)", height: 44, objectFit: "cover", filter: "saturate(0.6)" }} />
            </div>
            <div style={{ padding: "20px 18px", borderTop: "1px solid rgba(20,38,63,0.1)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#9d7c3a", marginBottom: 8 }}>07 — Boutique Latam</div>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: "#14263f" }}>White space, quiet confidence.</h2>
              <p style={{ fontSize: 13, color: "#5c6675", fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Modeled on bblatam.com — white &amp; navy, muted photo cards, hairline rules, generous air. Understated wealth-advisory calm.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#14263f" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/h" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#0b1420" }}>
            <div style={{ position: "relative", height: 190, background: "#0b1420", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/miami-night.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.32 }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 22, height: 1, background: "#c3a15f" }} />
                <span style={{ fontSize: 8.5, letterSpacing: "0.34em", textTransform: "uppercase", color: "#e0c489" }}>Est. the 1970s</span>
                <span style={{ width: 22, height: 1, background: "#c3a15f" }} />
              </div>
              <div style={{ position: "relative", fontFamily: "var(--font-cormorant), serif", fontWeight: 500, fontSize: 25, lineHeight: 1.1, color: "#e9dfc8" }}>The quiet partner behind <span style={{ fontStyle: "italic", color: "#e0c489" }}>extraordinary</span> cases.</div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: "1px solid rgba(195,161,95,0.25)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#c3a15f", marginBottom: 8 }}>08 — Private Reserve</div>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: "#e9dfc8" }}>Dark, hushed, members-only.</h2>
              <p style={{ fontSize: 13, color: "#9aa5b4", fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Deep navy &amp; champagne, roman numerals, moody Miami nightscapes — the register of a private bank after hours.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#e0c489" }}>Open homepage →</span>
            </div>
          </Link>

          <Link href="/i" className={styles.card} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#f7f4ee" }}>
            <div style={{ position: "relative", height: 190, background: "#f7f4ee", padding: "22px 22px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1a1814", paddingBottom: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357" }}>Brandon Brokerage</span>
                <span style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6a6357" }}>Since the 1970s</span>
              </div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, fontSize: 38, lineHeight: 0.98, color: "#1a1814", letterSpacing: "-0.015em" }}>Seamless<br /><span style={{ fontStyle: "italic", marginLeft: 34 }}>execution,</span><br />since the &rsquo;70s.</div>
            </div>
            <div style={{ padding: "20px 18px", borderTop: "1px solid rgba(26,24,20,0.16)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#6a6357", marginBottom: 8 }}>09 — Maison Editorial</div>
              <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 20, margin: "0 0 8px", color: "#1a1814" }}>Paper, ink, oversized type.</h2>
              <p style={{ fontSize: 13, color: "#6a6357", fontWeight: 400, lineHeight: 1.55, margin: "0 0 14px" }}>Warm paper &amp; near-black ink, giant Cormorant masthead, black &amp; white photography, numbered chapters — a fashion-maison lookbook.</p>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#1a1814" }}>Open homepage →</span>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "clamp(40px,5vw,64px)", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 13, color: "#6f7d92" }}>Brandon Brokerage Group · 75 Valencia Avenue, Suite 200, Coral Gables, FL · 305-444-7401</div>
      </div>
    </div>
  );
}
