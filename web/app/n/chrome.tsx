"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import LangToggle from "@/components/LangToggle";
import { COPY, type Lang } from "@/lib/copy";
import { ctaFillFromCursor, GrowLine, MaskReveal } from "@/components/motion";
import { NETWORK_URL } from "@/lib/contact";
import { BEIGE, EXTRA, GOLD, GOLD_DEEP, HAIR, INK_MUTED, NAVY, deepNav } from "./copy";
import styles from "./page.module.css";

const LANG_KEY = "bbg-lang";

// One language for the whole /n family: it survives navigation between pages
// and drives <html lang> so screen readers switch phonetics with the copy.
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === "es" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return [lang, setLang];
}

/* The floating pill. On the landing it starts translucent over the hero and
   firms up on scroll; on the inner pages there is no hero, so it starts solid. */
export function NHeader({ lang, setLang, solid = false }: { lang: Lang; setLang: (l: Lang) => void; solid?: boolean }) {
  const t = COPY[lang];
  const x = EXTRA[lang];
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  const firm = solid || scrolled;

  const links = deepNav("/n", lang);

  return (
    <header className={`${styles.header} ${firm ? styles.headerSolid : ""}`}>
      <Link href="/n" className={styles.headerLogo}>
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

      <nav className={styles.headerNav}>
        {links.map((l) => {
          const on = l.href.startsWith("/n/") && pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`${styles.navItem} ${on ? styles.navItemOn : ""}`}>
              {on && !reduce && (
                <motion.span layoutId="nNavPill" className={styles.navPill} transition={{ type: "spring", stiffness: 320, damping: 30 }} />
              )}
              <span className={styles.navLabel}>{l.label}</span>
            </Link>
          );
        })}
      </nav>

      <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.headerAi}>
        <span className={styles.aiPulse} />
        {x.aiNav}
      </a>

      <LangToggle lang={lang} setLang={setLang} color="rgba(20,34,74,0.5)" activeColor={NAVY} />

      <Link href="/n#contact" onPointerEnter={ctaFillFromCursor} className={styles.headerCta}>{t.cta.partner}</Link>

      <span style={{ display: "flex" }}>
        <MobileMenu
          links={[...links, { href: NETWORK_URL, label: x.aiNav }]}
          ctaLabel={t.cta.partner}
          ctaHref="/n#contact"
          panelBg={NAVY}
          textColor={BEIGE}
          accentColor={GOLD}
          toggleColor={NAVY}
        />
      </span>
    </header>
  );
}

/* Masthead for an inner page: kicker, display title, standfirst. */
export function PageHero({ kicker, title, italic, body }: { kicker: string; title: string; italic?: string; body?: string }) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.wrap}>
        <GrowLine color={HAIR} />
        <div className={styles.kicker} style={{ color: GOLD_DEEP, marginTop: "clamp(26px,3vw,40px)", marginBottom: 18, fontSize: 10.5 }}>{kicker}</div>
        <h1 className={styles.display} style={{ fontSize: "clamp(34px,5vw,74px)", margin: 0, maxWidth: 900 }}>
          <MaskReveal delay={0.05}>{title}</MaskReveal>
          {italic && <MaskReveal delay={0.18}><span className={styles.displayItalic}>{italic}</span></MaskReveal>}
        </h1>
        {body && (
          <p data-reveal style={{ fontSize: "clamp(15px,1.35vw,17.5px)", lineHeight: 1.7, color: INK_MUTED, margin: "26px 0 0", maxWidth: 660 }}>{body}</p>
        )}
      </div>
    </section>
  );
}

/* Closing band for an inner page: the phone, the desk, the way back. */
export function NFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const x = EXTRA[lang];
  return (
    <footer id="contact" className={styles.innerFoot}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
        <h2 className={styles.display} style={{ color: "#fbfaf7", fontSize: "clamp(26px,3.4vw,48px)", margin: "0 0 22px", maxWidth: 720 }}>
          <MaskReveal inView delay={0.05}>{t.contactTitle}</MaskReveal>
        </h2>
        <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,4vw,56px)", alignItems: "center" }}>
          <a href="tel:+13054447401" className={styles.phoneGiant} style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(32px,4.4vw,64px)", lineHeight: 1, letterSpacing: "-0.02em" }}>305-444-7401</a>
          <div>
            <div className={styles.kicker} style={{ color: GOLD, fontSize: 9.5, marginBottom: 8 }}>{t.office}</div>
            <div style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(15px,1.5vw,19px)", color: "rgba(245,241,232,0.9)" }}>75 Valencia Ave, Suite 200 · Coral Gables, FL 33134</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/n" className={styles.backLink}>← {x.back}</Link>
          </div>
        </div>
        <div style={{ marginTop: "clamp(34px,4vw,56px)", paddingTop: 20, borderTop: "1px solid rgba(245,241,232,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span className={styles.kicker} style={{ color: "rgba(245,241,232,0.45)", fontSize: 9.5 }}>{t.rights}</span>
          <span className={styles.kicker} style={{ color: "rgba(245,241,232,0.45)", fontSize: 9.5 }}>{t.licensed}</span>
        </div>
      </div>
    </footer>
  );
}

/* An oversized outlined numeral drifting behind a numbered section. */
export function SectionMark({ n, dark = false }: { n: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} aria-hidden="true" className={`${styles.mark} ${dark ? styles.markDark : ""}`} style={{ y, opacity }}>
      {n}
    </motion.div>
  );
}
