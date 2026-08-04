"use client";

import { useRef, type CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useReveals";
import { GrowLine, ScrollProgress } from "@/components/motion";
import DeviceCall, { type DevicePalette } from "@/components/DeviceCall";
import OfficeMap from "@/components/OfficeMap";
import { DFooter, DHeader, PageHero, useLang } from "../chrome";
import { GOLD, HAIR, MONO_K, CONTACT, DIRECTORY, OFFICE, type DirGroup } from "../copy";
import styles from "../page.module.css";

// Contact: the office, the map, the number set large, and the desk by name.
// Everything on this page comes from lib/deep, which mirrors what
// brandonbrokerage.com/contact publishes , the extensions, the two direct lines
// and the nine mailboxes. It is the first written channel the site has, so the
// mailto: and tel: links are the point; the phone in the middle is decoration
// wrapped around a number that is also there as text.

// Google's embed lands with its own colours. Grey it out, then push it back
// through sepia into the concept's cream-and-gold: parchment ground, warm roads,
// nothing that fights the page.

// Sapphire shell, cream screen, navy digits, gold call pill , the palette the
// rest of the concept is cut from. `ground` is the band it lies on.
const PHONE_PALETTE: DevicePalette = {
  screen: "#f7f3ea",
  ink: "#12294a",
  accent: "#a9812f",
};

const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.mapQuery)}`;

// The concept's numbered mono head, as a real heading so the page outlines.
function Head({ index, kicker, style }: { index: string; kicker: string; style?: CSSProperties }) {
  return (
    <div data-reveal style={{ marginBottom: 26, ...style }}>
      <h2 style={{ ...MONO_K, margin: "0 0 14px", fontWeight: 400 }}>
        {index} / {kicker}
      </h2>
      <GrowLine color={HAIR} />
    </div>
  );
}

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const c = CONTACT[lang];
  const groups = DIRECTORY[lang] as readonly DirGroup[];
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  return (
    <div ref={pageRef} className={styles.page}>
      <ScrollProgress color={GOLD} />
      <DHeader lang={lang} setLang={setLang} solid />

      <PageHero index="01" kicker={c.kicker} title={c.title} body={c.lede} />

      {/* ----- 02 the office, and where it is ----- */}
      <div style={{ padding: "clamp(30px,4vw,54px) clamp(20px,5vw,60px) clamp(64px,8vw,110px)", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <Head index="02" kicker={c.office} style={{ marginBottom: 34 }} />

          <div className={styles.contactGrid}>
            <div>
              <p data-reveal className={styles.contactAddress}>
                {OFFICE.street}
                <br />
                {OFFICE.city}
              </p>

              <dl data-reveal className={styles.contactRows}>
                <div className={styles.contactRow}>
                  <dt className={styles.contactKey}>{c.phone}</dt>
                  <dd className={styles.contactVal}>
                    <a href={OFFICE.phoneHref} className={styles.contactTel}>
                      {OFFICE.phone}
                    </a>
                  </dd>
                </div>
                <div className={styles.contactRow}>
                  <dt className={styles.contactKey}>{c.tollFree}</dt>
                  <dd className={styles.contactVal}>
                    <a href={OFFICE.tollFreeHref} className={styles.contactTel}>
                      {OFFICE.tollFree}
                    </a>
                  </dd>
                </div>
                {/* the fax stays text: no browser dials one usefully */}
                <div className={styles.contactRow}>
                  <dt className={styles.contactKey}>{c.fax}</dt>
                  <dd className={`${styles.contactVal} ${styles.contactValPlain}`}>{OFFICE.fax}</dd>
                </div>
              </dl>

              <a
                data-reveal
                href={DIRECTIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.lnk} ${styles.contactMapLink}`}
              >
                {c.directions}
                <span className={styles.contactMapArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <div data-reveal>
              <OfficeMap title={`${OFFICE.street}, ${OFFICE.city}`} className={styles.contactMap} />
            </div>
          </div>
        </div>
      </div>

      {/* ----- 03 the number, set large; the phone beside it is decoration ----- */}
      <div className={styles.callBand}>
        <div className={styles.wrapD}>
          <div className={styles.callInner}>
            <div className={styles.callCopy}>
              <Head index="03" kicker={c.callLabel} style={{ marginBottom: "clamp(26px,3.4vw,44px)" }} />
              {/* the number is text and a tel: link whether or not the phone
                  beside it ever renders */}
              <a data-reveal href={OFFICE.phoneHref} className={styles.phoneGiantInk}>
                {OFFICE.phone}
              </a>
              <p data-reveal className={styles.callNote}>
                {c.tapToCall}
              </p>
            </div>
            <DeviceCall palette={PHONE_PALETTE} number={OFFICE.phone} href={OFFICE.phoneHref} callLabel={c.callLabel} serif="var(--font-bodoni), serif" mono="var(--font-plex-mono), monospace" className={styles.callDevice} />
          </div>
        </div>
      </div>

      {/* ----- 04 the desk, by name ----- */}
      <div style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,60px)", background: "#f3efe6" }}>
        <div className={styles.wrapD}>
          <Head index="04" kicker={c.directory} style={{ marginBottom: "clamp(20px,2.6vw,34px)" }} />

          <div className={styles.dirList}>
            {groups.map((g) => (
              <section key={g.label} data-reveal className={styles.dirGroup}>
                <h3 className={styles.dirLabel}>{g.label}</h3>
                <div className={styles.dirPeople}>
                  {g.people.map((p) => (
                    <div key={p.email} className={styles.dirCard}>
                      <p className={styles.dirName}>{p.name}</p>
                      <p className={styles.dirRole}>{p.role}</p>
                      <div className={styles.dirLines}>
                        {p.ext && (
                          <>
                            <span className={styles.dirKey}>{c.phone}</span>
                            <span className={styles.dirVal}>
                              <a href={OFFICE.phoneHref} className={styles.dirTel}>
                                {OFFICE.phone}
                              </a>
                              {/* an extension is not dialable on its own, so it is text */}
                              <span className={styles.dirExt}>
                                {c.ext} {p.ext}
                              </span>
                            </span>
                          </>
                        )}
                        {p.direct && p.directHref && (
                          <>
                            <span className={styles.dirKey}>{c.direct}</span>
                            <span className={styles.dirVal}>
                              <a href={p.directHref} className={styles.dirTel}>
                                {p.direct}
                              </a>
                            </span>
                          </>
                        )}
                        <span className={styles.dirKey}>{c.email}</span>
                        <span className={styles.dirVal}>
                          <a href={`mailto:${p.email}`} className={styles.dirMail}>
                            {p.email}
                          </a>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <DFooter lang={lang} />
    </div>
  );
}
