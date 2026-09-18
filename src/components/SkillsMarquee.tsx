"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis";

interface SkillsMarqueeProps {
  rows: string[][];
}

const BASE_SPEED = 40; // px per second
const MAX_SKEW = 8;

// Endless rows of skill names. They drift on their own, speed up with scroll velocity, and lean
// slightly in the scroll direction; alternate rows travel the opposite way.
export default function SkillsMarquee({ rows }: SkillsMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    // Phones keep the rows still; the moving marquee is a desktop and tablet effect.
    const phone = window.matchMedia("(max-width: 767px)");
    const tracks = Array.from(root.querySelectorAll<HTMLElement>("[data-marquee-track]"));
    const offsets = tracks.map(() => 0);
    let skew = 0;
    let inView = false;

    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
    });
    observer.observe(root);

    const tick = (_time: number, deltaMs: number) => {
      if (!inView || phone.matches) return;
      const velocity = getLenis()?.velocity ?? 0;
      const seconds = Math.min(deltaMs, 50) / 1000;
      const boost = 1 + Math.min(Math.abs(velocity) * 0.35, 8);
      const direction = velocity < 0 ? -1 : 1;

      skew += (gsap.utils.clamp(-MAX_SKEW, MAX_SKEW, -velocity * 0.4) - skew) * 0.12;

      tracks.forEach((track, index) => {
        // Each track holds its items twice, so wrapping at half its width loops seamlessly.
        const loop = track.scrollWidth / 2;
        const rowDirection = index % 2 === 0 ? -1 : 1;
        offsets[index] += BASE_SPEED * boost * seconds * rowDirection * direction;
        offsets[index] = gsap.utils.wrap(-loop, 0, offsets[index]);
        track.style.transform = `translate3d(${offsets[index]}px, 0, 0) skewX(${skew}deg)`;
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="skills-marquee" aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="skills-marquee-row">
          <div data-marquee-track className="skills-marquee-track">
            {[...row, ...row].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className={`skills-marquee-item ${index % 2 === 1 ? "is-outline" : ""}`}
              >
                {name}
                <span className="skills-marquee-star">✦</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
