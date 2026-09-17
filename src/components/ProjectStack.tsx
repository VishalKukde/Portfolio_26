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
    const stack = stackRef.current;

    if (reduceMotion || !stack) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", stack);

      if (cards.length < 2) {
        return undefined;
      }

      // All cards share one grid cell, so only the active card is visible while
      // the stage is pinned and each scroll step hands off to the next card.
      stack.classList.add("is-stacked");
      gsap.set(cards.slice(1), { autoAlpha: 0, y: 120 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: stack,
          start: "center center+=36",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.35, max: 0.9 },
            delay: 0.08,
            ease: "power2.inOut",
          },
        },
      });

      timeline.addLabel("card-0", 0);

      cards.slice(1).forEach((card, step) => {
        timeline
          .to(
            cards[step],
            {
              autoAlpha: 0,
              scale: 0.94,
              y: -60,
              duration: 0.6,
              ease: "power2.in",
            },
            step,
          )
          .to(card, { autoAlpha: 1, y: 0, duration: 0.65 }, step + 0.35)
          .addLabel(`card-${step + 1}`, step + 1);
      });

      return () => {
        stack.classList.remove("is-stacked");
        gsap.set(cards, { clearProps: "transform,opacity,visibility" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={stackRef} className="project-stack" data-project-stack>
      {children}
    </div>
  );
}
