"use client";

import { useEffect } from "react";
import gsap from "gsap";

const PULL = 0.3;

// Any element marked data-magnetic drifts toward the pointer while hovered and eases back on
// leave. It moves through the CSS `translate` property, so the element's own hover transforms
// (lifts, rotations) keep working alongside it.
export default function MagneticEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;

    const movers = new WeakMap<HTMLElement, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>();
    let current: HTMLElement | null = null;

    const moverFor = (element: HTMLElement) => {
      let mover = movers.get(element);
      if (!mover) {
        const offset = { x: 0, y: 0 };
        const apply = () => {
          element.style.translate = `${offset.x}px ${offset.y}px`;
        };
        mover = {
          x: gsap.quickTo(offset, "x", { duration: 0.6, ease: "power3.out", onUpdate: apply }),
          y: gsap.quickTo(offset, "y", { duration: 0.6, ease: "power3.out", onUpdate: apply }),
        };
        movers.set(element, mover);
      }
      return mover;
    };

    const release = (element: HTMLElement) => {
      const mover = moverFor(element);
      mover.x(0);
      mover.y(0);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;

      if (current && current !== target) release(current);
      current = target;
      if (!target) return;

      // Measure without the current offset so the pull doesn't feed back into itself.
      const rect = target.getBoundingClientRect();
      const [offsetX = 0, offsetY = 0] = (target.style.translate || "0px 0px")
        .split(" ")
        .map((part) => parseFloat(part) || 0);
      const centerX = rect.left - offsetX + rect.width / 2;
      const centerY = rect.top - offsetY + rect.height / 2;
      const strength = Number(target.dataset.magnetic) || PULL;

      const mover = moverFor(target);
      mover.x((event.clientX - centerX) * strength);
      mover.y((event.clientY - centerY) * strength);
    };

    const handleLeave = () => {
      if (current) release(current);
      current = null;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return null;
}
