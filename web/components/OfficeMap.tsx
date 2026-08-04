"use client";

import { useEffect, useRef, useState } from "react";
import { OFFICE } from "@/lib/deep";

// The Coral Gables office on a map. Google's embed needs no key, but it lands
// on the page with its own colours, so each concept passes a CSS filter that
// pulls it into its palette. The address underneath is the real content: the
// map is an aid, not the answer.
//
// The iframe only loads once the block is near the viewport , a third-party
// frame is not worth paying for above the fold.

type Props = {
  /** CSS filter that tunes Google's colours to the concept, e.g. "grayscale(1) contrast(1.05)" */
  filter?: string;
  className?: string;
  /** accessible title for the frame */
  title: string;
};

const SRC = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE.mapQuery)}&z=16&output=embed`;

export default function OfficeMap({ filter, className, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {load && (
        <iframe
          src={SRC}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ width: "100%", height: "100%", border: 0, display: "block", filter }}
        />
      )}
    </div>
  );
}
