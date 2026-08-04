// Ivory & Sapphire , the /d concept's own palette. Cream canvas, sapphire navy,
// antique gold, Bodoni display over a mono kicker. Every word of content comes
// from lib/deep, shared with the other concepts.

import type { CSSProperties } from "react";

export const CREAM = "#f3efe6";
export const CREAM_DEEP = "#ece7db";
export const NAVY = "#12294a";
export const INK = "#1a2536";
export const GOLD = "#a9812f";
export const GOLD_DIM = "#9a7526";
export const GOLD_SOFT = "#d3ab5c";
export const MUTED = "#6b7482";
export const BODY = "#4a5568";
export const HAIR = "rgba(169,129,47,0.45)";
export const HAIR_INK = "rgba(18,41,74,0.14)";
export const EASE = [0.16, 1, 0.3, 1] as const;

export const SERIF = "var(--font-bodoni), serif";
export const MONO = "var(--font-plex-mono), monospace";

// The numbered mono section head used across every page of the concept.
export const MONO_K: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: GOLD_DIM,
};

// The concept's own carrier list, shorter than the shared one so the marquee
// keeps its cadence at 40s.
export const CARRIERS = ["Lincoln", "John Hancock", "AIG", "Nationwide", "Principal", "MassMutual", "Mutual of Omaha", "Protective", "Prudential", "Pacific Life", "Transamerica", "Symetra", "Global Atlantic", "Allianz"];

export { CONTACT, DEEP as EXTRA, DIRECTORY, OFFICE, PRODUCT_DETAIL, deepLinks, deepNav } from "@/lib/deep";

// The directory arrives from lib/deep frozen with `as const`, so DIRECTORY[lang]
// is a union of two readonly tuples whose people differ , some carry an
// extension, some a direct line, one carries both. Reading it back through this
// shape is what lets the contact page map over it.
export type DirPerson = {
  name: string;
  role: string;
  ext?: string;
  direct?: string;
  directHref?: string;
  email: string;
};
export type DirGroup = { label: string; people: readonly DirPerson[] };
