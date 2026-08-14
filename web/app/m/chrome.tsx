"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LangToggle from "@/components/LangToggle";
import MobileMenu from "@/components/MobileMenu";
import { COPY, type Lang } from "@/lib/copy";
import { deepNav } from "@/lib/deep";
import { NETWORK_URL } from "@/lib/contact";
import { useLang } from "@/hooks/useLang";

export { useLang };
import styles from "./page.module.css";

/* Ultra-light line glyphs, one per chapter. Drawn here rather than pulled
   from an icon set so the stroke weight matches the hairlines around them.
   Shared by the landing and every inner page. */
export type GlyphName = "compass" | "globe" | "layers" | "shield" | "quote" | "pin";

export function Glyph({ name }: { name: GlyphName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className={styles.tagGlyph} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" {...common} opacity="0.45" />
      {name === "compass" && <path d="M15.2 8.8l-2 4.4-4.4 2 2-4.4z" {...common} />}
      {name === "globe" && <><path d="M2.8 12h18.4" {...common} /><path d="M12 2.8c2.4 2.5 3.7 5.8 3.7 9.2s-1.3 6.7-3.7 9.2c-2.4-2.5-3.7-5.8-3.7-9.2S9.6 5.3 12 2.8z" {...common} /></>}
      {name === "layers" && <><path d="M12 6.6l5 2.9-5 2.9-5-2.9z" {...common} /><path d="M7 13.1l5 2.9 5-2.9" {...common} /></>}
      {name === "shield" && <path d="M12 6.2l4 1.7v3.4c0 2.6-1.6 4.6-4 5.5-2.4-.9-4-2.9-4-5.5V7.9z" {...common} />}
      {name === "quote" && <path d="M9.6 14.4c-1.2 0-2-.9-2-2.1 0-2 1.5-3.7 3.4-4.3M16 14.4c-1.2 0-2-.9-2-2.1 0-2 1.5-3.7 3.4-4.3" {...common} />}
      {name === "pin" && <><circle cx="12" cy="11" r="2.3" {...common} /><path d="M12 20c3-3.6 5-6.6 5-9.4A5 5 0 0 0 7 10.6c0 2.8 2 5.8 5 9.4z" {...common} /></>}
    </svg>
  );
}

export function Tag({ glyph, children, dark = false }: { glyph: GlyphName; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`${styles.tagRow} ${dark ? styles.tagDark : ""}`}>
      <Glyph name={glyph} />
      <span className={styles.tag}>{children}</span>
    </div>
  );
}

const NAV_LABELS = {
  en: { assistant: "AI Assistant", partner: "Partner with us" },
  es: { assistant: "Asistente IA", partner: "Trabajemos juntos" },
} as const;

/* The header: one white pill, floating over whatever sits behind it — the
   full-bleed hero on the landing, the navy masthead block on every inner
   page. It never changes palette, only tightens its shadow on scroll. */
export function MHeader({ lang, setLang, scrolled }: { lang: Lang; setLang: (l: Lang) => void; scrolled: boolean }) {
  const t = COPY[lang];
  const pathname = usePathname();
  const links = deepNav("/m", lang);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerSolid : ""}`}>
      <Link href="/m" className={styles.logoChip}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" width={140} height={28} fetchPriority="high" style={{ height: 28, width: "auto" }} />
      </Link>

      <nav className={styles.nav}>
        {links.map((l) => {
          const on = pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`${styles.navLink} ${styles.navHideMd} ${on ? styles.navLinkOn : ""}`}>
              {l.label}
            </Link>
          );
        })}
        <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={`${styles.navLink} ${styles.navTool} ${styles.navHideSm}`}>
          <span className={styles.navDot} aria-hidden="true" />
          {t.nav.assistant}
        </a>
        <span className={`${styles.navRule} ${styles.navHideSm}`} aria-hidden="true" />
        <LangToggle lang={lang} setLang={setLang} color="rgba(74,85,104,0.7)" activeColor="#14224a" />
        <Link href="/m/contact" className={`${styles.pill} ${styles.pillDark} ${styles.pillSm} ${styles.pillPlain} ${styles.navHideSm}`}>
          {t.cta.partner}
        </Link>

        <span className={styles.navBurger}>
          <MobileMenu
            links={[...links, { href: NETWORK_URL, label: t.nav.assistant }]}
            ctaLabel={t.cta.partner}
            ctaHref="/m/contact"
            panelBg="#0d1730"
            textColor="#f5f1e8"
            accentColor="#c2a15b"
            toggleColor="#14224a"
          />
        </span>
      </nav>
    </header>
  );
}

/* Masthead for an inner page: the same tag+glyph every chapter opens with,
   set inside its own navy block instead of a full-bleed photo. Only the
   landing earns full bleed; this is page furniture, not a second hero ,
   unless a chapter passes its own image, in which case the block splits the
   way the landing's photo cards do, text beside the picture, not behind it. */
export function MPageHero({ glyph, kicker, title, clause, body, image, imageAlt, imagePosition }: { glyph: GlyphName; kicker: string; title: string; clause?: string; body?: string; image?: string; imageAlt?: string; imagePosition?: string }) {
  const text = (
    <div>
      <Tag glyph={glyph} dark>{kicker}</Tag>
      <h1 className={styles.display} style={{ fontSize: image ? "clamp(28px,3.6vw,52px)" : "clamp(32px,4.6vw,64px)", color: "#fff", maxWidth: image ? undefined : "16ch", margin: 0 }}>
        {title}
        {clause && <> <span style={{ color: "var(--gold-soft)" }}>{clause}</span></>}
      </h1>
      {body && <p className={styles.statementBody} style={{ marginTop: "clamp(18px,2.2vw,28px)", maxWidth: "56ch" }}>{body}</p>}
    </div>
  );
  return (
    <section className={`${styles.block} ${styles.blockNavy} ${styles.pageHeroBlock}`}>
      <div className={styles.topo} aria-hidden="true" />
      {image ? (
        <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
          {text}
          <div style={{ position: "relative", borderRadius: "var(--r-block)", overflow: "hidden", height: "clamp(240px,26vw,360px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt ?? ""} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: imagePosition ?? "50% 50%" }} loading="eager" />
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", zIndex: 2 }}>{text}</div>
      )}
    </section>
  );
}

/* The one section with no card around it, reused wherever a short standalone
   statement earns the page's full attention: the landing's pull quote, and
   any inner page that wants the same breath. */
export function Breath({ text, attrib }: { text: string; attrib: string }) {
  return (
    <section className={styles.breath}>
      <div data-reveal className={styles.breathInner}>
        <span className={styles.breathMark} aria-hidden="true">&ldquo;</span>
        <p className={styles.breathText}>{text}</p>
        <div className={styles.breathAttrib}>
          <span className={styles.breathRule} aria-hidden="true" />
          {attrib}
        </div>
      </div>
    </section>
  );
}

/* The closing block and the footer block, in one: every inner page ends the
   same way the landing does, so "you've reached the bottom of a Meridian
   page" always looks like the same place. */
export function MClosing({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const OFFICE_PHONE = "tel:+13054447401";
  const OFFICE_TOLLFREE = "tel:+18887764678";
  return (
    <section className={`${styles.block} ${styles.closing}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/miami-sunset.jpg" alt="" className={styles.heroPhoto} loading="lazy" />
      <div className={styles.heroWash} aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 2 }}>
        <h2 data-reveal className={`${styles.display} ${styles.closingTitle}`}>{t.contactTitle}</h2>
        <p data-reveal className={styles.closingBody}>{t.contactBody}</p>
        <div data-reveal style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={OFFICE_PHONE} className={`${styles.pill} ${styles.pillLight}`}>
            305-444-7401 <span className={styles.pillDisc} aria-hidden="true">→</span>
          </a>
          <a href={OFFICE_TOLLFREE} className={`${styles.pill} ${styles.pillGhost} ${styles.pillPlain}`}>
            1-888-776-4678
          </a>
        </div>
      </div>
    </section>
  );
}

export function MFooter({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const d = COPY[lang]; // kept separate from DEEP on purpose: footer only needs top-level copy + nav labels
  const links = deepNav("/m", lang);
  const nl = NAV_LABELS[lang];
  return (
    <footer className={`${styles.block} ${styles.footer}`}>
      <div className={styles.footGrid}>
        <div>
          <div style={{ background: "rgba(245,241,232,0.94)", borderRadius: 999, padding: "8px 16px", display: "inline-flex", marginBottom: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brandon-logo.png" alt="Brandon Brokerage Group" style={{ height: 24, width: "auto" }} />
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(245,241,232,0.68)", margin: 0, maxWidth: 340 }}>{d.heroSub}</p>
        </div>

        <div>
          <div className={styles.footHead}>{lang === "es" ? "Producto" : "Product"}</div>
          {t.products.map((p) => (
            <Link key={p.name} href="/m/products" className={styles.footLink}>{p.name}</Link>
          ))}
        </div>

        <div>
          <div className={styles.footHead}>{lang === "es" ? "Firma" : "Firm"}</div>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.footLink}>{l.label}</Link>
          ))}
          <a href={NETWORK_URL} target="_blank" rel="noopener noreferrer" className={styles.footLink}>{nl.assistant} ↗</a>
        </div>

        <div>
          <div className={styles.footHead}>{lang === "es" ? "Contacto" : "Contact"}</div>
          <a href="tel:+13054447401" className={styles.footLink}>305-444-7401</a>
          <a href="tel:+18887764678" className={styles.footLink}>1-888-776-4678</a>
          <span className={styles.footLink} style={{ opacity: 0.75 }}>75 Valencia Avenue, Suite 200</span>
          <span className={styles.footLink} style={{ opacity: 0.75 }}>Coral Gables, FL 33134</span>
        </div>
      </div>

      <div className={styles.footBottom}>
        <span>{t.rights}</span>
        <span>{t.licensed}</span>
      </div>
    </footer>
  );
}
