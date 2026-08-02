"use client";

import type { Lang } from "@/lib/copy";
import styles from "./LangToggle.module.css";

// EN / ES switch for the nav. Colors come from each concept's palette.
export default function LangToggle({
  lang,
  setLang,
  color,
  activeColor,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  color: string;
  activeColor: string;
}) {
  return (
    <span className={styles.wrap}>
      {(["en", "es"] as const).map((l, i) => (
        <span key={l} style={{ display: "inline-flex", alignItems: "center" }}>
          {i === 1 && <span className={styles.sep} style={{ color }}>/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            className={styles.btn}
            style={{ color: lang === l ? activeColor : color, fontWeight: lang === l ? 700 : 400 }}
            aria-pressed={lang === l}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </span>
  );
}
