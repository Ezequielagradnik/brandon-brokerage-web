"use client";

import { useEffect, useRef, useState } from "react";
import { OFFICE } from "@/lib/deep";

// The Coral Gables office on a map. Google's embed needs no key. It renders in
// Google's own colours on purpose: a map is a tool people already know how to
// read, and tinting it to match a palette makes streets and water harder to
// tell apart. The address beside it is the real content.
//
// The iframe only loads once the block is near the viewport , a third-party
// frame is not worth paying for above the fold.

type Props = {
  /**
   * Optional CSS filter. Left undefined by default: recolouring a map costs
   * legibility and buys atmosphere the page does not need.
   */
  filter?: string;
  /** corner radius, so the map never lands as a hard square */
  radius?: number;
  className?: string;
  /** accessible title for the frame */
  title: string;
};

const SRC = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE.mapQuery)}&z=16&output=embed`;

export default function OfficeMap({ filter, radius = 14, className, title }: Props) {
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
    <div ref={ref} className={className} style={{ borderRadius: radius, overflow: "hidden" }}>
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
