"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectStack({ children }: { children: ReactNode }) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !stackRef.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-stack-card]",
        stackRef.current,
      );

      cards.forEach((card, index) => {
        if (index === cards.length - 1) {
          return;
        }

        // Each card pins as the next card arrives. Scrubbing its scale and opacity
        // makes the incoming card feel like it is taking the top of the stack.
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=104",
          end: `+=${Math.round(card.offsetHeight * 0.82)}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: 1 - self.progress * 0.055,
              opacity: 1 - self.progress * 0.28,
            });
          },
        });
      });

      return () => {
        gsap.set(cards, { clearProps: "transform,opacity" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={stackRef} className="space-y-8 md:space-y-20" data-project-stack>
      {children}
    </div>
  );
}
