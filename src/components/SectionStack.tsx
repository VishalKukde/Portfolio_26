"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLiteMode } from "@/lib/lite-mode";

const STACKING_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export default function SectionStack({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || isLiteMode()) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    // Stacking is a heavy scroll effect, so phones (and reduced motion) get a normal page.
    media.add(STACKING_QUERY, () => {
      const sections = Array.from(main.children).filter(
        (element): element is HTMLElement => element.tagName === "SECTION",
      );

      // Sticky offsets need each section's natural height: a section taller than
      // the viewport sticks once its bottom edge reaches the bottom of the screen.
      const heights = new Map<HTMLElement, number>();
      let refreshTimer: number | undefined;
      const measure = (entries?: ResizeObserverEntry[]) => {
        let changed = false;
        (
          entries?.map((entry) => entry.target as HTMLElement) ?? sections
        ).forEach((section) => {
          const height = section.offsetHeight;
          if (heights.get(section) === height) return;
          heights.set(section, height);
          section.style.setProperty("--stack-h", `${height}px`);
          changed = true;
        });
        if (changed && entries) {
          window.clearTimeout(refreshTimer);
          refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
        }
      };
      // Adds the scroll "hold" after each section. Unlike is-stacking it stays on during
      // refreshes, because it changes layout and triggers must measure it.
      main.classList.add("stack-ready");
      measure();
      const observer = new ResizeObserver((entries) => measure(entries));
      sections.forEach((section) => observer.observe(section));

      // ScrollTrigger must measure the unstuck layout, otherwise triggers inside a
      // stuck section (project cards, experience timeline) get shifted positions.
      const unstick = () => main.classList.remove("is-stacking");
      const restick = () => main.classList.add("is-stacking");
      ScrollTrigger.addEventListener("refreshInit", unstick);
      ScrollTrigger.addEventListener("refresh", restick);
      restick();

      sections.slice(1).forEach((section, index) => {
        gsap.fromTo(
          sections[index],
          { "--stack-dim": 0 },
          {
            "--stack-dim": 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();

      return () => {
        window.clearTimeout(refreshTimer);
        observer.disconnect();
        ScrollTrigger.removeEventListener("refreshInit", unstick);
        ScrollTrigger.removeEventListener("refresh", restick);
        unstick();
        main.classList.remove("stack-ready");
        sections.forEach((section) =>
          section.style.removeProperty("--stack-h"),
        );
        // Layout changes when stacking switches off (e.g. resizing to phone width).
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };
    });

    return () => media.revert();
  }, []);

  return (
    <main ref={mainRef} className="stack-main">
      {children}
    </main>
  );
}
