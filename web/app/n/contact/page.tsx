"use client";

import { useRef } from "react";
import Link from "next/link";
import { COPY } from "@/lib/copy";
import { useScrollReveal } from "@/hooks/useReveals";
import { ctaFillFromCursor, GrowLine, Magnetic, ScrollProgress } from "@/components/motion";
import OfficeMap from "@/components/OfficeMap";
import DeviceCall, { type DevicePalette } from "@/components/DeviceCall";
import { NHeader, PageHero, SectionMark, useLang } from "../chrome";
import { CONTACT, DIRECTORY, EXTRA, GOLD, GOLD_DEEP, GOLD_SOFT, HAIR, INK_MUTED, NAVY, OFFICE } from "../copy";
import styles from "../page.module.css";

// Contact , the real page behind every "Partner with us" in the concept.
// The office and the map, then the desk's number as the page's one flourish,
// then the directory: nine people, their extensions, their direct lines and ,
// for the first time on this site , an address you can actually write to.

/* Google's embed arrives in Google's colours. Grey it out, then warm it back
   with sepia and a nudge towards gold, so the map sits on the beige canvas as
   part of the page rather than as a window into another site. */
const MAP_FILTER =
  "grayscale(1) sepia(0.44) saturate(1.45) hue-rotate(-12deg) brightness(1.03) contrast(1.05)";

/* The phone lies on the navy band, so the shell is the warm silver of the
   beige canvas and the screen is the band it lies on: navy, beige ink, gold
   call pill. Module-level, so its identity is stable across renders. */
const DEVICE: DevicePalette = {
  shell: "#e7e0d0",
  screen: "#14224a",
  ink: "#f5f1e8",
  accent: "#c2a15b",
  ground: "#14224a",
};

const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.mapQuery)}`;

/* The directory is `as const` in lib/deep, so every person is a different
   literal type and only some carry an extension or a direct line. Widening it
   once here keeps the render honest about which fields are optional. */
type Person = {
  readonly name: string;
  readonly role: string;
  readonly ext?: string;
  readonly direct?: string;
  readonly directHref?: string;
  readonly email: string;
};
type Group = { readonly label: string; readonly people: readonly Person[] };

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const t = COPY[lang];
  const x = EXTRA[lang];
  const c = CONTACT[lang];
  const groups: readonly Group[] = DIRECTORY[lang];
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  // "Talk to the desk." / "Hable con la mesa." , the last word goes gold italic.
  const words = c.title.split(" ");
  const titleHead = words.slice(0, -1).join(" ");
  const titleTail = words.slice(-1).join(" ");

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <NHeader lang={lang} setLang={setLang} solid />

      <PageHero kicker={c.kicker} title={titleHead} italic={titleTail} body={c.lede} />

      {/* ----- 01 the office, and where it is ----- */}
      <section style={{ position: "relative", padding: "clamp(40px,5vw,70px) 0", overflow: "hidden" }}>
        <SectionMark n="01" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <div className={styles.officeGrid}>
            <div>
              <GrowLine color={HAIR} />
              <div data-reveal className={styles.kicker} style={{ color: GOLD_DEEP, margin: "clamp(24px,3vw,36px) 0 14px", fontSize: 10.5 }}>{c.office}</div>
              <p data-reveal className={styles.officeAddress}>
                {OFFICE.street}
                <br />
                {OFFICE.city}
              </p>

              <dl data-reveal className={styles.officeLines}>
                <div className={styles.officeLine}>
                  <dt className={styles.officeLabel}>{c.phone}</dt>
                  <dd className={styles.officeValue}>
                    <a href={OFFICE.phoneHref} className={styles.officeLink}>{OFFICE.phone}</a>
                  </dd>
                </div>
                <div className={styles.officeLine}>
                  <dt className={styles.officeLabel}>{c.tollFree}</dt>
                  <dd className={styles.officeValue}>
                    <a href={OFFICE.tollFreeHref} className={styles.officeLink}>{OFFICE.tollFree}</a>
                  </dd>
                </div>
                {/* the fax is not dialable from a browser: plain text, on purpose */}
                <div className={styles.officeLine}>
                  <dt className={styles.officeLabel}>{c.fax}</dt>
                  <dd className={`${styles.officeValue} ${styles.officeFax}`}>{OFFICE.fax}</dd>
                </div>
              </dl>

              <a
                data-reveal
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapCta}
              >
                {c.directions} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div data-reveal className={styles.mapFrame}>
              <OfficeMap
                title={`${c.office} — ${OFFICE.street}, ${OFFICE.city}`}
                filter={MAP_FILTER}
                className={styles.mapInner}
              />
              <span className={styles.photoEdge} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ----- 02 the phone moment: the desk's number, and the desk's phone ----- */}
      <section className={styles.callBand}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.callGlow} aria-hidden="true" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <div className={styles.callGrid}>
            <div className={styles.callText}>
              <div data-reveal className={styles.kicker} style={{ color: GOLD_SOFT, fontSize: 10.5, marginBottom: 20 }}>{c.callLabel}</div>
              {/* the 3D phone is decorative; this link is the affordance */}
              <div data-reveal>
                <a
                  href={OFFICE.phoneHref}
                  className={styles.phoneGiant}
                  style={{ fontFamily: "var(--font-bodoni), serif", fontSize: "clamp(38px,6.2vw,96px)", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {OFFICE.phone}
                </a>
              </div>
              <div data-reveal className={styles.callCap}>{c.tapToCall}</div>
            </div>

            <DeviceCall palette={DEVICE} number={OFFICE.phone} caption={c.tapToCall} className={styles.callCanvas} />
          </div>
        </div>
      </section>

      {/* ----- 03 the directory ----- */}
      <section style={{ position: "relative", padding: "clamp(56px,7vw,96px) 0 clamp(20px,3vw,40px)", overflow: "hidden" }}>
        <SectionMark n="03" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <GrowLine color={HAIR} />
          <div data-reveal className={styles.kicker} style={{ color: GOLD_DEEP, margin: "clamp(24px,3vw,36px) 0 16px", fontSize: 10.5 }}>{x.teamKicker}</div>
          <h2 data-reveal className={styles.display} style={{ fontSize: "clamp(28px,3.8vw,56px)", margin: "0 0 20px", maxWidth: 760 }}>{c.directory}</h2>
          <p data-reveal style={{ fontSize: 15.5, lineHeight: 1.7, color: INK_MUTED, margin: "0 0 clamp(28px,4vw,46px)", maxWidth: 620 }}>{x.teamBody}</p>

          <div className={styles.dirList}>
            {groups.map((g) => (
              <div key={g.label} className={styles.dirGroup}>
                <div data-reveal className={`${styles.kicker} ${styles.dirGroupLabel}`} style={{ color: GOLD_DEEP, fontSize: 9.5 }}>{g.label}</div>
                <div className={styles.dirPeople}>
                  {g.people.map((p) => (
                    <div key={p.email} data-reveal className={styles.dirPerson}>
                      <h3 className={styles.dirName}>{p.name}</h3>
                      <p className={styles.dirRole}>{p.role}</p>
                      <div className={styles.dirLines}>
                        {p.ext && (
                          <div className={styles.dirRow}>
                            <span className={styles.dirLabel}>{c.phone}</span>
                            <span className={styles.dirValue}>
                              {/* an extension is not dialable on its own: it sits beside the main number */}
                              <a href={OFFICE.phoneHref} className={styles.dirLink}>{OFFICE.phone}</a>{" "}
                              <span className={styles.dirExt}>{c.ext} {p.ext}</span>
                            </span>
                          </div>
                        )}
                        {p.direct && p.directHref && (
                          <div className={styles.dirRow}>
                            <span className={styles.dirLabel}>{c.direct}</span>
                            <span className={styles.dirValue}>
                              <a href={p.directHref} className={styles.dirLink}>{p.direct}</a>
                            </span>
                          </div>
                        )}
                        <div className={styles.dirRow}>
                          <span className={styles.dirLabel}>{c.email}</span>
                          <span className={styles.dirValue}>
                            <a href={`mailto:${p.email}`} className={`${styles.dirLink} ${styles.dirMail}`}>{p.email}</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----- closing band: the address, the way out, the legal line ----- */}
      <footer className={styles.innerFoot}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <div className={styles.contactFootRow}>
            <div>
              <div className={styles.kicker} style={{ color: GOLD_SOFT, fontSize: 9.5, marginBottom: 10 }}>{c.office}</div>
              <div className={styles.contactFootAddr}>{OFFICE.street} · {OFFICE.city}</div>
            </div>
            <div className={styles.contactFootActions}>
              <Magnetic>
                <a
                  href={DIRECTIONS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerEnter={ctaFillFromCursor}
                  className={styles.cta}
                  style={{ background: GOLD, borderColor: GOLD, color: NAVY }}
                >
                  {c.directions} <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
              <Link href="/n" className={styles.backLink}>← {x.back}</Link>
            </div>
          </div>
          <div style={{ marginTop: "clamp(34px,4vw,56px)", paddingTop: 20, borderTop: "1px solid rgba(245,241,232,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span className={styles.kicker} style={{ color: "rgba(245,241,232,0.45)", fontSize: 9.5 }}>{t.rights}</span>
            <span className={styles.kicker} style={{ color: "rgba(245,241,232,0.45)", fontSize: 9.5 }}>{t.licensed}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
