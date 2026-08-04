"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useReveals";
import { COPY } from "@/lib/copy";
import { MaskReveal, ScrollProgress } from "@/components/motion";
import OfficeMap from "@/components/OfficeMap";
import DeviceCall, { type DevicePalette } from "@/components/DeviceCall";
import { ChapterHead, FootBar, IHeader, PageHero, useLang } from "../chrome";
import { CONTACT, DIRECTORY, EXTRA, INK, LABEL, MUTED, OFFICE, PAPER, numeral } from "../copy";
import styles from "../page.module.css";

// Contact , the desk itself. The office and the map, the number set large
// enough to dial from across the room, and then the directory: five groups,
// nine people, every email a mailto and every direct line a tel. The extensions
// stay plain text , they reach the switchboard, they do not dial on their own.

/* Google's map arrives in Google's colours. This pulls it onto the concept's
   paper: all colour out, a warm tint back in, contrast lifted a hair so the
   street grid still reads as ink. */

/* The phone as a photographed object: graphite body, paper screen, near-black
   ink on it, and a warm grey where a colder concept would put an accent. Module
   scope so the identity is stable across renders. */
const DEVICE: DevicePalette = {
  screen: PAPER,
  ink: INK,
  accent: MUTED,
};

const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.mapQuery)}`;

/* The directory is heterogeneous , some people have an extension, some a direct
   line, one has both , so it is read through one shape. */
type Person = {
  name: string;
  role: string;
  ext?: string;
  direct?: string;
  directHref?: string;
  email: string;
};
type Group = { label: string; people: readonly Person[] };

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const c = CONTACT[lang];
  const no = numeral(lang);
  const groups = DIRECTORY[lang] as readonly Group[];
  const headcount = groups.reduce((n, g) => n + g.people.length, 0);
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  /* The concept sets the last word of a masthead in italic. */
  const split = c.title.lastIndexOf(" ");

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={INK} />
      <IHeader lang={lang} setLang={setLang} />

      <PageHero
        kicker={c.kicker}
        title={c.title.slice(0, split + 1)}
        italic={c.title.slice(split + 1)}
        body={c.lede}
      />

      {/* ----- the office, and the map of it ----- */}
      <div className={styles.wrap} style={{ paddingTop: "clamp(40px,5vw,70px)", paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 01`} title={c.office} note={OFFICE.city} />
        <div className={styles.ctcSpread}>
          <div className={styles.ctcCard}>
            <div data-reveal className={styles.ctcField}>
              <div style={{ ...LABEL, marginBottom: 12 }}>{c.office}</div>
              <address className={styles.ctcAddress}>
                {OFFICE.street}
                <br />
                {OFFICE.city}
              </address>
              <a
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.lnk} ${styles.ctcDirections}`}
              >
                {c.directions}
                <span className={styles.netArrow} aria-hidden="true">↗</span>
              </a>
            </div>

            <div data-reveal className={styles.ctcField}>
              <div style={{ ...LABEL, marginBottom: 12 }}>{c.phone}</div>
              <a href={OFFICE.phoneHref} className={`${styles.lnk} ${styles.ctcTel}`}>{OFFICE.phone}</a>
            </div>

            <div data-reveal className={styles.ctcField}>
              <div style={{ ...LABEL, marginBottom: 12 }}>{c.tollFree}</div>
              <a href={OFFICE.tollFreeHref} className={`${styles.lnk} ${styles.ctcTel}`}>{OFFICE.tollFree}</a>
            </div>

            {/* a fax is not dialable from a browser in any useful way */}
            <div data-reveal className={styles.ctcField}>
              <div style={{ ...LABEL, marginBottom: 12 }}>{c.fax}</div>
              <span className={styles.ctcFax}>{OFFICE.fax}</span>
            </div>
          </div>

          <figure data-reveal className={styles.ctcFig}>
            <OfficeMap
              title={lang === "es" ? "Mapa de la oficina de Coral Gables" : "Map of the Coral Gables office"}
             
              className={styles.ctcMap}
            />
            <figcaption className={styles.figCap} style={{ paddingTop: 12 }}>
              <span style={LABEL}>Fig. 01</span>
              <span style={LABEL}>{OFFICE.street}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ----- the number, set to be dialled ----- */}
      <div className={styles.wrap} style={{ paddingBottom: "clamp(60px,8vw,110px)" }}>
        <ChapterHead num={`${no} 02`} title={c.callLabel} note={`${c.tollFree} · ${OFFICE.tollFree}`} />
        <div className={styles.ctcCallSpread}>
          <div>
            <div data-reveal style={{ ...LABEL, marginBottom: 18 }}>{c.tapToCall}</div>
            <a href={OFFICE.phoneHref} className={`${styles.lnk} ${styles.ctcBigTel}`}>{OFFICE.phone}</a>
            <p data-reveal className={styles.ctcCallNote}>{t.responseText}</p>
          </div>
          {/* decorative: it disappears under reduced motion and without WebGL,
              which is why the number above is the real affordance */}
          {/* no pointer lean here: every other movement in this concept is a
              one-shot reveal, so an object that keeps answering the cursor
              reads as a demo dropped into a letterpress page. The slow float
              alone reads as breath. */}
          <DeviceCall
            palette={DEVICE}
            number={OFFICE.phone}
            href={OFFICE.phoneHref}
            callLabel={c.callLabel}
            serif="var(--font-cormorant), serif"
            mono="var(--font-plex-mono), monospace"
            className={styles.ctcDevice}
            lean={false}
          />
        </div>
      </div>

      {/* ----- the desk, by name ----- */}
      <div className={styles.wrap} style={{ paddingBottom: "clamp(70px,9vw,120px)" }}>
        <ChapterHead
          num={`${no} 03`}
          title={c.directory}
          note={`${headcount} ${lang === "es" ? "personas" : "people"}`}
        />
        <p data-reveal className={styles.ctcDeskNote}>
          {lang === "es"
            ? "Cada extensión pasa por la centralita de Coral Gables. Las líneas directas y los correos llegan a la persona sin intermediarios."
            : "Every extension reaches the Coral Gables switchboard. The direct lines and the emails reach the person, with nobody in between."}
        </p>

        <div className={`${styles.credits} ${styles.deskCredits}`}>
          {groups.map((g) => (
            <div key={g.label} data-reveal className={styles.creditGroup}>
              <div className={styles.creditLabel} style={{ ...LABEL, fontSize: 10 }}>{g.label}</div>
              {g.people.map((p) => (
                <div key={p.email} className={styles.deskCard}>
                  <div className={styles.creditName}>{p.name}</div>
                  <div className={styles.creditRole}>{p.role}</div>
                  <div className={styles.deskLines}>
                    {p.ext && (
                      <div className={styles.deskLine}>
                        <a href={OFFICE.phoneHref} className={`${styles.lnk} ${styles.deskTel}`}>{OFFICE.phone}</a>
                        <span className={styles.deskExt}>{c.ext} {p.ext}</span>
                      </div>
                    )}
                    {p.direct && p.directHref && (
                      <div className={styles.deskLine}>
                        <a href={p.directHref} className={`${styles.lnk} ${styles.deskTel}`}>{p.direct}</a>
                        <span className={styles.deskExt}>{c.direct}</span>
                      </div>
                    )}
                    <a href={`mailto:${p.email}`} className={styles.deskMail}>{p.email}</a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ----- sign-off. The address and the number are the page itself now, so
              this band carries only the promise and the way back. ----- */}
      <section className={styles.innerFoot}>
        <div className={styles.wrap}>
          <div className={styles.innerFootInner}>
            <h2 className={styles.innerFootTitle}>
              <MaskReveal inView duration={1.1}>{t.contactTitle}</MaskReveal>
            </h2>
            <div data-reveal className={styles.ctcSignOff}>
              <div>
                <div style={{ ...LABEL, marginBottom: 14 }}>{t.response}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED, margin: 0, maxWidth: 440 }}>{t.responseText}</p>
              </div>
              <Link href="/i" className={styles.lnk} style={{ fontSize: 13, letterSpacing: "0.06em", color: INK }}>
                ← {x.back}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FootBar lang={lang} />
    </div>
  );
}
