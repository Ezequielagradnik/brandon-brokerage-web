"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/MobileMenu";
import { GrowLine, MaskReveal, ctaFillFromCursor } from "@/components/motion";
import { NETWORK_URL } from "@/lib/contact";
import { COPY, type Lang } from "@/lib/copy";
import { useLang } from "@/hooks/useLang";

export { useLang };
import { EXTRA, G, GOLD, NAVY, deepNav, mono, monoEyebrow, serif } from "./copy";
import styles from "./page.module.css";

// Chrome shared by the /g landing and its four inner pages: the floating white
// pill, the inner-page masthead and the closing band. The nav is the real
// site's , Our Firm / Products / Foreign Nationals / Forms / Contact , with the
// AI Assistant sitting beside it. That entry hands off to the group's platform
// at Brandon Latam Network, on every page.

export function GHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = COPY[lang];
  const g = G[lang];
  const pathname = usePathname();
  const links = deepNav("/g", lang);

  return (
    <div className={styles.headerBar}>
      <Link href="/g" className={styles.headerLogo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brandon-logo.png"
          alt="Brandon Brokerage Group"
          width={132}
          height={26}
          fetchPriority="high"
          style={{ height: 26, width: "auto" }}
        />
      </Link>

      <div className={styles.headerNav}>
        {links.map((l) => {
          const on = l.href.startsWith("/g/") && pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`${styles.nl} ${on ? styles.nlOn : ""}`} aria-current={on ? "page" : undefined}>
              {l.label}
            </Link>
          );
        })}

        <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.nl} ${styles.navTool}`}>
          <span className={styles.navToolDot} aria-hidden="true" />
          {g.nav.assistant}
        </a>
      </div>

      {/* the toggle sits outside the nav, so language stays switchable on mobile */}
      <span className={styles.langWrap}>
        <button type="button" onClick={() => setLang("en")} className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`} aria-pressed={lang === "en"}>EN</button>
        <span className={styles.langSlash} style={{ fontSize: 10 }}>/</span>
        <button type="button" onClick={() => setLang("es")} className={`${styles.langBtn} ${lang === "es" ? styles.langActive : ""}`} aria-pressed={lang === "es"}>ES</button>
      </span>

      <Link
        href="/g#contact"
        onPointerEnter={ctaFillFromCursor}
        className={`${styles.cta} ${styles.ctaDark} ${styles.headerCta}`}
      >
        {t.cta.partner}
      </Link>

      <MobileMenu
        links={[...links, { href: NETWORK_URL, label: g.nav.assistant }]}
        ctaLabel={t.cta.partner}
        ctaHref="/g#contact"
        panelBg={NAVY}
        textColor="#ffffff"
        accentColor={GOLD}
        toggleColor={NAVY}
      />
    </div>
  );
}

// Numbered section head: "01 / Label" in small mono + hairline drawn on entry
export function SectionHead({ num, label, dark }: { num: string; label: string; dark?: boolean }) {
  return (
    <div data-reveal style={{ marginBottom: "clamp(36px,4.5vw,64px)" }}>
      <div style={{ ...monoEyebrow(dark), marginBottom: 16 }}>{num} / {label}</div>
      <GrowLine color={dark ? "rgba(217,194,145,0.4)" : "rgba(154,123,50,0.45)"} />
    </div>
  );
}

// Masthead for an inner page: mono eyebrow, hairline, Lora display title with
// an optional italic gold second line, standfirst.
export function PageHero({ kicker, title, italic, body }: { kicker: string; title: string; italic?: string; body?: string }) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.wrap}>
        <div data-reveal style={{ ...monoEyebrow(), marginBottom: 16 }}>{kicker}</div>
        <GrowLine color="rgba(154,123,50,0.45)" />
        <h1 className={styles.pageTitle}>
          <MaskReveal delay={0.05}>{title}</MaskReveal>
          {italic && <MaskReveal delay={0.18}><span className={styles.titleItalic}>{italic}</span></MaskReveal>}
        </h1>
        {body && <p data-reveal className={styles.lede}>{body}</p>}
      </div>
    </section>
  );
}

// Closing band for an inner page: the phone, the desk, the way back.
export function GFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const x = EXTRA[lang];
  const g = G[lang];
  return (
    <footer id="contact" className={styles.innerFoot}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
        <div data-reveal style={{ ...monoEyebrow(true), marginBottom: 18 }}>{g.heads.contact}</div>
        <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(28px,3.8vw,56px)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 clamp(26px,3vw,40px)", maxWidth: 860 }}>
          <MaskReveal inView delay={0.05}>{t.contactTitle}</MaskReveal>
        </h2>

        <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(24px,4vw,56px)" }}>
          <a href="tel:+13054447401" className={styles.phoneGiant} style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(34px,4.8vw,68px)", lineHeight: 1, letterSpacing: "-0.02em" }}>305-444-7401</a>
          <div>
            <div style={{ ...monoEyebrow(true), marginBottom: 8 }}>{t.office}</div>
            <div style={{ fontFamily: serif, fontSize: "clamp(15px,1.4vw,18px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>75 Valencia Ave, Suite 200 · Coral Gables, FL 33134</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/g" className={styles.backLink}>← {x.back}</Link>
          </div>
        </div>

        <div style={{ marginTop: "clamp(34px,4vw,56px)", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{g.rights}</span>
          <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{t.licensed}</span>
        </div>
      </div>
    </footer>
  );
}
