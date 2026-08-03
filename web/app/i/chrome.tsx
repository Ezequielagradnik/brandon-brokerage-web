"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";
import LangToggle from "@/components/LangToggle";
import { FadeIn, MaskReveal, ctaFillFromCursor } from "@/components/motion";
import { COPY, type Lang } from "@/lib/copy";
import { NETWORK_URL } from "@/lib/contact";
import { useLang } from "@/hooks/useLang";

export { useLang };
import { EXTRA, INK, LABEL, MUTED, PAPER, SERIF, deepNav } from "./copy";
import styles from "./page.module.css";

/* The paper bar. Same on the landing and on the four inner pages: logo, the
   real site's nav, the assistant, the language and the one CTA. The assistant
   is the group's own platform, so the entry leaves the site. */
export function IHeader({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = COPY[lang];
  const pathname = usePathname();
  const links = deepNav("/i", lang);

  return (
    <div className={styles.headerBar}>
      <Link href="/i" className={styles.headerLogo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" width={135} height={27} fetchPriority="high" style={{ height: 27, width: "auto" }} />
      </Link>

      <div className={styles.headerNav}>
        {links.map((l) => {
          const on = l.href.startsWith("/i/") && pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`${styles.nl} ${styles.lnk} ${on ? styles.navOn : ""}`} aria-current={on ? "page" : undefined}>
              {l.label}
            </Link>
          );
        })}

        <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.nl} ${styles.navTool}`}>
          <span className={styles.navToolDot} aria-hidden="true" />
          {t.nav.assistant}
        </a>

        <LangToggle lang={lang} setLang={setLang} color="rgba(26,24,20,0.5)" activeColor={INK} />

        <Link href="/i#contact" onPointerEnter={ctaFillFromCursor} className={`${styles.cta} ${styles.headerCta}`}>
          {t.cta.partner}
        </Link>
      </div>

      <MobileMenu
        links={[{ href: NETWORK_URL, label: t.nav.assistant }, ...links]}
        ctaLabel={t.cta.partner}
        ctaHref="/i#contact"
        panelBg={PAPER}
        textColor={INK}
        accentColor={INK}
      />
    </div>
  );
}

/* The masthead of an inner page: the running heads, the rule, the Cormorant
   title, the standfirst. Same scale as the landing's, one notch quieter. */
export function PageHero({
  kicker,
  title,
  italic,
  body,
  note,
  /* "display" for a headline of a few words, "text" when the title is a whole
     sentence and 104px would run off the page */
  size = "display",
}: {
  kicker: string;
  title: string;
  italic?: string;
  body?: string;
  note?: string;
  size?: "display" | "text";
}) {
  return (
    <header className={styles.pageHero}>
      <div className={styles.wrap}>
        <FadeIn delay={0.05} y={12} className={styles.runningHeads}>
          <span style={LABEL}>Brandon Brokerage Group</span>
          <span style={LABEL}>{kicker}</span>
          <span style={LABEL}>{note ?? "Coral Gables, Florida"}</span>
        </FadeIn>
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ height: 1, background: INK, transformOrigin: "0 50%" }}
        />
        <h1 className={`${styles.pageTitle} ${size === "text" ? styles.pageTitleText : ""}`}>
          <MaskReveal delay={0.22}>{title}</MaskReveal>
          {italic && (
            <MaskReveal delay={0.42}>
              <span style={{ fontStyle: "italic" }}>{italic}</span>
            </MaskReveal>
          )}
        </h1>
        {body && (
          <FadeIn delay={0.7}>
            <p className={styles.standfirst}>{body}</p>
          </FadeIn>
        )}
      </div>
    </header>
  );
}

/* The structural device of the whole concept: a rule, a chapter numeral, a
   note set at the far edge. */
export function ChapterHead({ num, title, note }: { num: string; title: string; note?: ReactNode }) {
  return (
    <div data-reveal className={styles.chapHead}>
      <span style={LABEL}>
        {num} / {title}
      </span>
      {note && <span style={LABEL}>{note}</span>}
    </div>
  );
}

/* Closing band of an inner page: the phone, the desk, the way back. */
export function IFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const x = EXTRA[lang];
  return (
    <>
      <section id="contact" className={styles.innerFoot}>
        <div className={styles.wrap}>
          <div className={styles.innerFootInner}>
            <h2 className={styles.innerFootTitle}>
              <MaskReveal inView duration={1.1}>{t.contactTitle}</MaskReveal>
            </h2>
            <div data-reveal className={styles.footGrid}>
              <div>
                <div style={{ ...LABEL, marginBottom: 14 }}>{t.phone}</div>
                <a href="tel:+13054447401" className={styles.lnk} style={{ fontFamily: SERIF, fontSize: "clamp(24px,2.8vw,36px)", color: INK }}>
                  305-444-7401
                </a>
                <div style={{ fontSize: 13.5, color: MUTED, marginTop: 8 }}>
                  {t.tollFree} 1-888-776-4678
                </div>
              </div>
              <div>
                <div style={{ ...LABEL, marginBottom: 14 }}>{t.office}</div>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.8vw,23px)", color: INK, lineHeight: 1.4 }}>
                  75 Valencia Avenue, Suite 200
                  <br />
                  Coral Gables, FL 33134
                </div>
              </div>
              <div>
                <div style={{ ...LABEL, marginBottom: 14 }}>{t.response}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED, margin: "0 0 18px" }}>{t.responseText}</p>
                <Link href="/i" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.06em", color: INK }}>
                  ← {x.back}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FootBar lang={lang} />
    </>
  );
}

/* The thin colophon at the very bottom of every page. */
export function FootBar({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <div className={styles.footBar}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" width={105} height={21} style={{ height: 21, width: "auto" }} />
      <div style={{ fontSize: 12, color: MUTED }}>
        {t.rights} · {t.licensed}
      </div>
    </div>
  );
}
