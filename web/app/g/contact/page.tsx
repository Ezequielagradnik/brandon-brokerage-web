"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useReveals";
import { MaskReveal, ScrollProgress } from "@/components/motion";
import DeviceCall, { type DevicePalette } from "@/components/DeviceCall";
import OfficeMap from "@/components/OfficeMap";
import { type Lang } from "@/lib/copy";
import { GHeader, PageHero, SectionHead, useLang } from "../chrome";
import { CONTACT, DIRECTORY, EXTRA, G, GOLD, NAVY, OFFICE, OFFWHITE, mono, monoEyebrow, sans, serif } from "../copy";
import styles from "../page.module.css";

// Contact: the office, the phone and the desk by name. Everything on this page
// is a real channel , every number dials, every address is a mailto. The one
// flourish is the phone lying beside the number; the rest is a ledger.

// Google's embed arrives with its own colours. /g grades every photo the same
// way, so the map takes the same grade and stops fighting the canvas.

// The device in the page's own palette: warm off-white shell on the navy band,
// navy screen, gold call pill and side button.
const DEVICE: DevicePalette = {
  screen: "#f4f1e9",
  ink: "#14224a",
  accent: "#c2a15b",
};

// The directory is `as const` in lib/deep, so each person carries only the
// fields the firm publishes for them. One shape here keeps the render honest.
type Person = {
  name: string;
  role: string;
  ext?: string;
  direct?: string;
  directHref?: string;
  email: string;
};
type Group = { label: string; people: readonly Person[] };

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.mapQuery)}`;

// Closing band: this page is the contact page, so the footer stays a sign-off
// rather than repeating the number a third time.
function ContactFoot({ lang }: { lang: Lang }) {
  const x = EXTRA[lang];
  const g = G[lang];
  const c = CONTACT[lang];
  return (
    <footer className={styles.innerFoot}>
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "clamp(20px,3vw,48px)" }}>
          <div>
            <div style={{ ...monoEyebrow(true), marginBottom: 10 }}>{c.office}</div>
            <div style={{ fontFamily: serif, fontSize: "clamp(15px,1.4vw,18px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
              {OFFICE.street} · {OFFICE.city}
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/g" className={styles.backLink}>← {x.back}</Link>
          </div>
        </div>

        <div style={{ marginTop: "clamp(34px,4vw,56px)", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{g.rights}</span>
          <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>brandonbrokerage.com</span>
        </div>
      </div>
    </footer>
  );
}

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const c = CONTACT[lang];
  const groups = DIRECTORY[lang] as readonly Group[];
  const pageRef = useRef<HTMLDivElement>(null);

  useScrollReveal(pageRef);

  // /g sets its mastheads in two beats: roman, then a gold italic tail.
  const words = c.title.split(" ");
  const titleHead = words.length > 3 ? words.slice(0, -2).join(" ") : c.title;
  const titleTail = words.length > 3 ? words.slice(-2).join(" ") : undefined;

  return (
    <div ref={pageRef} className={styles.page} style={{ fontFamily: sans }}>
      <ScrollProgress color={GOLD} />
      <GHeader lang={lang} setLang={setLang} />

      <PageHero kicker={c.kicker} title={titleHead} italic={titleTail} body={c.lede} />

      {/* 01 , THE OFFICE: the ledger on the left, Coral Gables on the right */}
      <div style={{ padding: "clamp(34px,5vw,70px) clamp(20px,5vw,60px) clamp(64px,9vw,120px)", background: "#fff" }}>
        <div className={styles.wrap}>
          <SectionHead num="01" label={c.office} />

          <div className={styles.ctcGrid}>
            <div>
              <dl className={styles.ctcList}>
                <div data-reveal className={styles.ctcRow}>
                  <dt>{c.office}</dt>
                  <dd>
                    {OFFICE.street}
                    <br />
                    {OFFICE.city}
                    <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className={`${styles.lnk} ${styles.ctcDir}`}>
                      {c.directions}
                      <span className={styles.ctcDirArrow} aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>

                <div data-reveal className={styles.ctcRow}>
                  <dt>{c.phone}</dt>
                  <dd><a href={OFFICE.phoneHref} className={styles.ctcLink}>{OFFICE.phone}</a></dd>
                </div>

                <div data-reveal className={styles.ctcRow}>
                  <dt>{c.tollFree}</dt>
                  <dd><a href={OFFICE.tollFreeHref} className={styles.ctcLink}>{OFFICE.tollFree}</a></dd>
                </div>

                {/* fax stays plain text , a browser cannot usefully dial it */}
                <div data-reveal className={styles.ctcRow}>
                  <dt>{c.fax}</dt>
                  <dd className={styles.ctcFax}>{OFFICE.fax}</dd>
                </div>
              </dl>
            </div>

            <div data-reveal>
              <OfficeMap title={`${OFFICE.street}, ${OFFICE.city}`} className={styles.ctcMap} />
            </div>
          </div>
        </div>
      </div>

      {/* 02 , THE PHONE: the number, set as the page's one flourish */}
      <div style={{ position: "relative", padding: "clamp(70px,10vw,140px) clamp(20px,5vw,60px)", background: NAVY, overflow: "hidden" }}>
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.wrap} style={{ position: "relative", zIndex: 2 }}>
          <SectionHead num="02" label={c.phone} dark />

          <div className={styles.callGrid}>
            <div>
              <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(24px,2.8vw,38px)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 clamp(22px,2.6vw,32px)", maxWidth: 460 }}>
                <MaskReveal inView delay={0.05}>{c.callLabel}</MaskReveal>
              </h2>
              <div data-reveal>
                <a href={OFFICE.phoneHref} className={`${styles.phoneGiant} ${styles.callPhone}`}>{OFFICE.phone}</a>
                <div style={{ ...monoEyebrow(true), marginTop: 18 }}>{c.tapToCall}</div>
              </div>
            </div>

            {/* decorative , the number above is the affordance */}
            <DeviceCall palette={DEVICE} number={OFFICE.phone} href={OFFICE.phoneHref} callLabel={c.callLabel} serif={serif} mono={mono} className={styles.deviceWrap} />
          </div>
        </div>
      </div>

      {/* 03 , THE DIRECTORY: nine people, every line a real channel */}
      <div style={{ padding: "clamp(64px,9vw,130px) clamp(20px,5vw,60px)", background: OFFWHITE }}>
        <div className={styles.wrap}>
          <SectionHead num="03" label={c.directory} />

          <div className={styles.dirGrid}>
            {groups.map((grp) => (
              <div key={grp.label} data-reveal className={styles.dirGroup}>
                <div className={styles.dirGroupLabel} style={{ ...monoEyebrow(), fontSize: 10 }}>{grp.label}</div>

                {grp.people.map((p) => (
                  <div key={`${grp.label}-${p.email}`} className={styles.dirPerson}>
                    <div className={styles.dirName}>{p.name}</div>
                    <div className={styles.dirRole}>{p.role}</div>

                    <div className={styles.dirLines}>
                      {p.ext && (
                        <span className={styles.dirLine}>
                          <a href={OFFICE.phoneHref} className={styles.dirLink}>{OFFICE.phone}</a>
                          <span className={styles.dirExt}>{c.ext} {p.ext}</span>
                        </span>
                      )}
                      {p.direct && p.directHref && (
                        <span className={styles.dirLine}>
                          <span className={styles.dirTag}>{c.direct}</span>
                          <a href={p.directHref} className={styles.dirLink}>{p.direct}</a>
                        </span>
                      )}
                      <span className={styles.dirLine}>
                        <a href={`mailto:${p.email}`} className={`${styles.dirLink} ${styles.dirMail}`}>{p.email}</a>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactFoot lang={lang} />
    </div>
  );
}
