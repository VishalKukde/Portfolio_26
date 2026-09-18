"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Every heading marked data-split reveals word by word, each word rising out of its own mask
// the first time the heading scrolls into view. Nested accents (like .lux-accent) stay intact.
export default function SplitHeadings() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const headings = gsap.utils.toArray<HTMLElement>("[data-split]");
      const splits = headings.map((heading) => {
        const split = SplitText.create(heading, {
          type: "words",
          mask: "words",
          wordsClass: "split-word",
        });
        heading.classList.add("split-ready");
        gsap.set(split.words, { yPercent: 115 });

        gsap.to(split.words, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
            onEnter: () => heading.classList.add("is-revealed"),
          },
        });

        return { heading, split };
      });

      return () => {
        splits.forEach(({ heading, split }) => {
          split.revert();
          heading.classList.remove("split-ready", "is-revealed");
        });
      };
    });

    return () => media.revert();
  }, []);

  return null;
}
