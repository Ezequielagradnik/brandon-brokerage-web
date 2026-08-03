"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import LangToggle from "@/components/LangToggle";
import { COPY, type Lang } from "@/lib/copy";
import { GrowLine, MaskReveal, ctaFillFromCursor } from "@/components/motion";
import { NETWORK_URL } from "@/lib/contact";
import { useLang } from "@/hooks/useLang";

export { useLang };
import { BODY, CREAM, GOLD_SOFT, HAIR, MONO_K, NAVY, SERIF, EXTRA, deepNav } from "./copy";
import styles from "./page.module.css";

/* The header runs the length of the page: transparent over the silk hero, cream
   glass once you scroll, always solid on an inner page where there is no hero.
   The assistant entry hands off to the group's real platform on every page,
   landing included , nothing about it is simulated here. */
export function DHeader({
  lang,
  setLang,
  solid = false,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  solid?: boolean;
}) {
  const t = COPY[lang];
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  const firm = solid || scrolled;

  const links = deepNav("/d", lang);

  return (
    <header className={`${styles.headerBar} ${styles.headerFixed} ${firm ? styles.headerSolid : ""}`}>
      <Link href="/d" className={styles.headerLogo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" width={150} height={30} fetchPriority="high" style={{ height: 30, width: "auto" }} />
      </Link>

      <nav className={styles.headerNav}>
        {links.map((l) => {
          const on = l.href.startsWith("/d/") && pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`${styles.nl} ${styles.navLink} ${on ? styles.nlOn : ""}`}>
              {l.label}
              {on &&
                (reduce ? (
                  <span className={styles.navRule} />
                ) : (
                  <motion.span layoutId="dNavRule" className={styles.navRule} transition={{ type: "spring", stiffness: 320, damping: 30 }} />
                ))}
            </Link>
          );
        })}

        <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.nl} ${styles.navTool}`}>
          <span className={styles.navToolDot} aria-hidden="true" />
          {t.nav.assistant}
        </a>

        <LangToggle lang={lang} setLang={setLang} color="rgba(18,41,74,0.55)" activeColor={NAVY} />

        <Link href="/d#contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.ctaGold} ${styles.ctaLineSm}`}>
          {t.cta.partnerCaps}
        </Link>
      </nav>

      <MobileMenu
        links={[{ href: NETWORK_URL, label: t.nav.assistant }, ...links]}
        ctaLabel={t.cta.partnerCaps}
        ctaHref="/d#contact"
        panelBg={CREAM}
        textColor={NAVY}
        accentColor={NAVY}
      />
    </header>
  );
}

/* Masthead for an inner page: numbered mono kicker, drawn hairline, Bodoni
   display with an italic gold clause, standfirst. */
export function PageHero({
  index,
  kicker,
  title,
  italic,
  body,
  note,
}: {
  index?: string;
  kicker: string;
  title: string;
  italic?: string;
  body?: string;
  note?: string;
}) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.wrapD}>
        <div style={{ ...MONO_K, marginBottom: 14 }}>
          {index ? `${index} / ` : ""}
          {kicker}
        </div>
        <GrowLine color={HAIR} />
        <h1 className={`${styles.displayD} ${styles.displayHero}`}>
          <MaskReveal delay={0.05}>{title}</MaskReveal>
          {italic && (
            <MaskReveal delay={0.2}>
              <span className={styles.displayItalicD}>{italic}</span>
            </MaskReveal>
          )}
        </h1>
        {body && (
          <p data-reveal style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, color: BODY, margin: "26px 0 0", maxWidth: 640 }}>
            {body}
          </p>
        )}
        {note && (
          <div data-reveal style={{ ...MONO_K, fontSize: 11.5, marginTop: 26 }}>
            {note}
          </div>
        )}
      </div>
    </section>
  );
}

/* Closing band for an inner page: the phone, the desk, the way back. Sapphire
   ground so the inner pages end where the landing ends. */
export function DFooter({ lang, flush = false }: { lang: Lang; flush?: boolean }) {
  const t = COPY[lang];
  const x = EXTRA[lang];
  return (
    <footer id="contact" className={`${styles.innerFoot} ${flush ? styles.innerFootFlush : ""}`}>
      <div className={styles.wrapD}>
        <div style={{ ...MONO_K, color: GOLD_SOFT, marginBottom: 14 }}>{t.contactKicker}</div>
        <GrowLine color="rgba(169,129,47,0.6)" style={{ marginBottom: 26 }} />
        <h2 className={styles.displayFoot}>
          <MaskReveal inView delay={0.05}>
            {t.contactTitle}
          </MaskReveal>
        </h2>

        <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,4vw,60px)", alignItems: "flex-end", marginTop: "clamp(28px,4vw,44px)" }}>
          <a href="tel:+13054447401" className={styles.phoneGiantD}>
            305-444-7401
          </a>
          <div>
            <div style={{ ...MONO_K, color: GOLD_SOFT, fontSize: 10, marginBottom: 8 }}>{t.office}</div>
            <div style={{ fontFamily: SERIF, fontSize: "clamp(16px,1.6vw,20px)", color: "rgba(243,239,230,0.9)", lineHeight: 1.4 }}>
              75 Valencia Ave, Suite 200
              <br />
              Coral Gables, FL 33134
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/d" className={styles.backLinkD}>
              ← {x.back}
            </Link>
          </div>
        </div>

        <div className={styles.footRule}>
          <div style={{ background: "rgba(243,239,230,0.94)", borderRadius: 999, padding: "8px 18px", display: "inline-flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" width={110} height={22} style={{ height: 22, width: "auto" }} />
          </div>
          <div style={{ fontSize: 12, color: "#8ea3c4" }}>
            {t.rights} · {t.licensed}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* A numbered mono head with its drawn hairline: the section furniture the whole
   concept is built on. */
export function SectionHead({ index, kicker, style }: { index?: string; kicker: string; style?: React.CSSProperties }) {
  return (
    <div data-reveal style={{ marginBottom: 24, ...style }}>
      <div style={{ ...MONO_K, marginBottom: 14 }}>
        {index ? `${index} / ` : ""}
        {kicker}
      </div>
      <GrowLine color={HAIR} />
    </div>
  );
}
