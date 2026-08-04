// Maison Editorial , the /i concept's own palette and type furniture. Warm
// paper, near-black ink, a Cormorant masthead and small-caps captions. Every
// word of content comes from lib/copy and lib/deep, shared with the other
// concepts, so the org chart and the case flow exist once.

import type { CSSProperties } from "react";
import type { Lang } from "@/lib/copy";

/* Two near-whites, and only two: the paper every page is printed on, and one
   recessed tone for anything set into it (the map plate, the platform card).
   A third shade reads as an accident rather than as a change of subject, so
   nothing else in the concept is allowed to be almost-white. */
export const INK = "#1a1814";
export const PAPER = "#f7f4ee";
export const RECESS = "#ece9e3";
export const MUTED = "#6a6357";
export const FAINT = "#8d8577";
export const RULE = "rgba(26,24,20,0.16)";
export const HAIR = `1px solid ${RULE}`;
export const SERIF = "var(--font-cormorant), serif";
export const EASE = [0.16, 1, 0.3, 1] as const;

/* Small-caps furniture: figure captions, chapter numbers, column heads. */
export const LABEL: CSSProperties = { fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED };

/* The numeral prefix on every chapter head. */
export const numeral = (lang: Lang) => (lang === "es" ? "N.º" : "No.");

export { CARRIERS, CONTACT, DEEP as EXTRA, DIRECTORY, OFFICE, PRODUCT_DETAIL, deepNav } from "@/lib/deep";
