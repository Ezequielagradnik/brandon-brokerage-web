"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useScrollReveal } from "@/hooks/useReveals";
import DeviceCall, { type DevicePalette } from "@/components/DeviceCall";
import OfficeMap from "@/components/OfficeMap";
import { CONTACT, DIRECTORY, OFFICE } from "@/lib/deep";
import { MHeader, MFooter, MPageHero, useLang } from "../chrome";
import styles from "../page.module.css";

// Contact: the office, the map, the number set giant, and the desk by name.
// Everything here comes straight from lib/deep, which mirrors what
// brandonbrokerage.com/contact publishes: the extensions, the two direct
// lines and the nine mailboxes. No closing band after this one — the page
// itself is the destination the closing band on every other page points to.

const DEVICE_PALETTE: DevicePalette = {
  screen: "#fbfaf7",
  ink: "#14224a",
  accent: "#c2a15b",
};

const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.mapQuery)}`;

export default function ContactPage() {
  const [lang, setLang] = useLang();
  const c = CONTACT[lang];
  const groups = DIRECTORY[lang];
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal(pageRef);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <div ref={pageRef} className={styles.page}>
      <MHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      <div className={styles.stack}>
        <MPageHero glyph="pin" kicker={c.kicker} title={c.title} body={c.lede} />

        {/* the office, and where it is */}
        <section className={styles.bento}>
          <article data-reveal className={`${styles.card} ${styles.cardCream} ${styles.colHalf}`}>
            <div className={styles.kicker} style={{ marginBottom: 16 }}>{c.office}</div>
            <p style={{ fontFamily: "var(--font-lora), serif", fontSize: "clamp(19px,1.8vw,24px)", color: "var(--navy)", lineHeight: 1.35, margin: "0 0 22px" }}>
              {OFFICE.street}<br />{OFFICE.city}
            </p>
            <div>
              <a href={OFFICE.phoneHref} className={styles.linkRow}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{c.phone}</span>
                <span style={{ fontSize: 15, color: "var(--navy)", fontWeight: 600 }}>{OFFICE.phone}</span>
              </a>
              <a href={OFFICE.tollFreeHref} className={styles.linkRow}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{c.tollFree}</span>
                <span style={{ fontSize: 15, color: "var(--navy)", fontWeight: 600 }}>{OFFICE.tollFree}</span>
              </a>
              <div className={styles.linkRow}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{c.fax}</span>
                <span style={{ fontSize: 15, color: "var(--navy)" }}>{OFFICE.fax}</span>
              </div>
            </div>
            <div className={styles.cardFoot}>
              <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer" className={`${styles.pill} ${styles.pillLine}`}>
                {c.directions} <span className={styles.pillDisc} aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article data-reveal className={`${styles.card} ${styles.cardPhoto} ${styles.colHalf}`}>
            <OfficeMap title={`${OFFICE.street}, ${OFFICE.city}`} className={styles.mapCard} />
          </article>
        </section>

        {/* the number, set giant; the phone beside it is decoration wrapped
            around a number that is also there as text and a tel: link */}
        <section data-reveal className={`${styles.block} ${styles.blockBone} ${styles.blockPad}`}>
          <div className={styles.callInner}>
            <div>
              <div className={styles.kicker} style={{ marginBottom: "clamp(18px,2.2vw,28px)" }}>{c.callLabel}</div>
              <a href={OFFICE.phoneHref} className={styles.callPhoneNum}>{OFFICE.phone}</a>
              <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 14 }}>{c.tapToCall}</p>
            </div>
            <DeviceCall palette={DEVICE_PALETTE} number={OFFICE.phone} href={OFFICE.phoneHref} callLabel={c.callLabel} serif="var(--font-lora), serif" mono="var(--font-plex-mono), monospace" className={styles.callDevice} />
          </div>
        </section>

        {/* the desk, by name */}
        <section data-reveal style={{ marginTop: "var(--gutter)" }}>
          <div className={styles.kicker} style={{ marginBottom: "clamp(18px,2.2vw,28px)" }}>{c.directory}</div>
          <div className={styles.bento} style={{ marginTop: 0 }}>
            {groups.map((g) => (
              <div key={g.label} className={`${styles.card} ${styles.cardCream} ${styles.colThird}`}>
                <div className={styles.kicker} style={{ marginBottom: 16 }}>{g.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {g.people.map((p) => (
                    <div key={p.email}>
                      <div style={{ fontFamily: "var(--font-lora), serif", fontWeight: 500, fontSize: 16, color: "var(--navy)" }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>{p.role}</div>
                      {"ext" in p && p.ext && (
                        <a href={OFFICE.phoneHref} className={styles.linkRow} style={{ padding: "8px 0" }}>
                          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{c.ext} {p.ext}</span>
                          <span style={{ fontSize: 13.5, color: "var(--navy)" }}>{OFFICE.phone}</span>
                        </a>
                      )}
                      {"direct" in p && p.direct && "directHref" in p && p.directHref && (
                        <a href={p.directHref} className={styles.linkRow} style={{ padding: "8px 0" }}>
                          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{c.direct}</span>
                          <span style={{ fontSize: 13.5, color: "var(--navy)" }}>{p.direct}</span>
                        </a>
                      )}
                      <a href={`mailto:${p.email}`} className={styles.linkRow} style={{ padding: "8px 0" }}>
                        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{c.email}</span>
                        <span style={{ fontSize: 13, color: "var(--navy)" }}>{p.email}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <MFooter lang={lang} />
      </div>
    </div>
  );
}
