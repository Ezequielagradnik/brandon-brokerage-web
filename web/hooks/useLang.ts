"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/copy";

const LANG_KEY = "bbg-lang";

// One language per visitor, shared by every concept: it survives navigation
// between a landing and its inner pages, and drives <html lang> so screen
// readers switch phonetics with the copy.
export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === "es" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return [lang, setLang];
}
