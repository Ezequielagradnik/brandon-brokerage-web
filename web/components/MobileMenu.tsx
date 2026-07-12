"use client";

import { useEffect, useState } from "react";
import styles from "./MobileMenu.module.css";

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  panelBg: string;
  textColor: string;
  accentColor: string;
};

export default function MobileMenu({ links, ctaLabel, ctaHref, panelBg, textColor, accentColor }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={styles.toggle}
        style={{ color: textColor }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 2l18 18M20 2L2 20" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 5h18M2 11h18M2 17h18" />
          </svg>
        )}
      </button>

      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}

      <div
        className={`${styles.panel} ${open ? styles.panelOpen : styles.panelClosed}`}
        style={{ background: panelBg }}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={styles.close}
          style={{ color: textColor }}
        >
          <svg width="24" height="24" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 2l18 18M20 2L2 20" />
          </svg>
        </button>
        <nav className={styles.nav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={styles.link} style={{ color: textColor }}>
              {l.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className={styles.cta}
            style={{ borderColor: accentColor, color: textColor }}
          >
            {ctaLabel}
          </a>
        </nav>
      </div>
    </>
  );
}
