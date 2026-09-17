"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/constants";
import { getNaturalTop } from "@/lib/scroll";
import { sectionAt, themeOf, type SectionTheme } from "@/lib/sections";

const STOPS = ["#home", ...NAV_LINKS.map((link) => link.href)];

// Progress line along the top edge of the screen, filling as you move through the sections.
export default function PageTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [theme, setTheme] = useState<SectionTheme>("light");

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return undefined;

    // Natural section tops are costly to read (stacking is toggled off), so cache them.
    let tops: number[] | null = null;
    const readTops = () =>
      (tops ??= STOPS.map((href) => {
        const section = document.getElementById(href.slice(1));
        return section ? getNaturalTop(section) : 0;
      }));

    let frame = 0;
    const update = () => {
      frame = 0;
      const sectionTops = readTops();
      const probe = window.scrollY + window.innerHeight / 2;

      // Fill smoothly between sections: whole sections passed plus the fraction toward the next.
      let position = 0;
      for (let index = 0; index < sectionTops.length - 1; index += 1) {
        const start = sectionTops[index];
        const end = sectionTops[index + 1];
        if (probe >= end) {
          position = index + 1;
          continue;
        }
        if (probe > start) position = index + (probe - start) / (end - start);
        break;
      }
      fill.style.transform = `scaleX(${position / (STOPS.length - 1)})`;

      setTheme(themeOf(sectionAt(window.innerWidth / 2, 2)));
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const invalidate = () => {
      tops = null;
      requestUpdate();
    };

    const observer = new ResizeObserver(invalidate);
    observer.observe(document.body);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  return (
    <div ref={rootRef} className="page-timeline" data-theme={theme} aria-hidden="true">
      <span ref={fillRef} className="page-timeline-fill" />
    </div>
  );
}
