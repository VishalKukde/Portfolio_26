"use client";

import { useEffect, useRef } from "react";
import { sectionAt, themeOf } from "@/lib/sections";
import { isLiteMode, prefersReducedMotion } from "@/lib/lite-mode";

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

// A soft ball that trails the pointer, recolors per section, and swells over interactive elements.
export default function CursorBall() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball || isLiteMode() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return undefined;
    }

    const reduceMotion = prefersReducedMotion();
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    // A hovered magnetic element the ball locks onto.
    let magnet: HTMLElement | null = null;

    const updateContext = () => {
      const underPointer = document.elementFromPoint(target.x, target.y);
      // Over the splash the ball uses the dark palette; elsewhere it follows the section below.
      ball.dataset.theme = underPointer?.closest(".loading-screen")
        ? "dark"
        : themeOf(sectionAt(target.x, target.y));
      ball.classList.toggle("is-hovering", Boolean(underPointer?.closest(INTERACTIVE)));

      magnet = underPointer?.closest<HTMLElement>("[data-magnetic]") ?? null;
      ball.classList.toggle("is-snapped", Boolean(magnet));
      if (magnet) {
        // Round buttons get a ring sized to them; pill buttons keep the standard ring.
        const { width, height } = magnet.getBoundingClientRect();
        const round = Math.abs(width - height) < 6;
        ball.style.setProperty("--snap-size", round ? `${width + 14}px` : "");
      }
    };

    const render = () => {
      // While locked to a magnetic element the ball aims at its center, nudged slightly toward the
      // pointer; otherwise easing toward the pointer gives it the smooth trailing motion.
      let aimX = target.x;
      let aimY = target.y;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        aimX = centerX + (target.x - centerX) * 0.2;
        aimY = centerY + (target.y - centerY) * 0.2;
      }

      const ease = reduceMotion ? 1 : 0.18;
      current.x += (aimX - current.x) * ease;
      current.y += (aimY - current.y) * ease;
      ball.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      // Keep rendering while locked, since the magnetic element itself is still moving.
      if (magnet || Math.abs(aimX - current.x) > 0.1 || Math.abs(aimY - current.y) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        // Jump straight to the first position instead of sliding in from the corner.
        current.x = target.x;
        current.y = target.y;
        visible = true;
        ball.classList.add("is-visible");
      }

      updateContext();
      requestRender();
    };

    const handleLeave = () => {
      visible = false;
      magnet = null;
      ball.classList.remove("is-snapped");
      ball.classList.remove("is-visible");
    };

    const handleDown = () => ball.classList.add("is-pressed");
    const handleUp = () => ball.classList.remove("is-pressed");
    // Sections slide under a still pointer while scrolling, so refresh the color then too.
    const handleScroll = () => {
      if (!visible) return;
      updateContext();
      requestRender();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ballRef} className="cursor-ball" data-theme="light" aria-hidden="true">
      <span className="cursor-ball-dot" />
    </div>
  );
}
