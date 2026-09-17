"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectStack({ children }: { children: ReactNode }) {
  const stackRef = useRef<HTMLDivElement>(null);
  // Which card is showing while the stage is pinned; total is 0 when not stacked.
  const [progress, setProgress] = useState({
    active: 0,
    total: 0,
    pinned: false,
  });

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
      setProgress({ active: 0, total: cards.length, pinned: false });
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
          // The indicator is fixed to the screen, so it only shows while the cards are pinned.
          onToggle: (self) => {
            setProgress((current) => ({ ...current, pinned: self.isActive }));
          },
          onUpdate: (self) => {
            const active = Math.round(self.progress * (cards.length - 1));
            setProgress((current) =>
              current.active === active ? current : { ...current, active },
            );
          },
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
        setProgress({ active: 0, total: 0, pinned: false });
        gsap.set(cards, { clearProps: "transform,opacity,visibility" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <>
      <div ref={stackRef} className="project-stack" data-project-stack>
        {children}
      </div>
      {progress.total > 0 && (
        <div
          className={`project-progress ${progress.pinned ? "is-visible" : ""}`}
          aria-hidden="true"
        >
          <span className="project-progress-count">
            {String(progress.active + 1).padStart(2, "0")}
            <span> / {String(progress.total).padStart(2, "0")}</span>
          </span>
          <span className="project-progress-track">
            {Array.from({ length: progress.total }, (_, index) => (
              <span
                key={index}
                className={`project-progress-step ${index === progress.active ? "is-active" : ""} ${index < progress.active ? "is-done" : ""}`}
              />
            ))}
          </span>
        </div>
      )}
    </>
  );
}
