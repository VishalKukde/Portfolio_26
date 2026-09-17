"use client";

import { useEffect, useRef } from "react";
import { sectionAt, themeOf } from "@/lib/sections";

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

// A soft ball that trails the pointer, recolors per section, and swells over interactive elements.
export default function CursorBall() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const updateContext = () => {
      ball.dataset.theme = themeOf(sectionAt(target.x, target.y));
      const hovered = document.elementFromPoint(target.x, target.y)?.closest(INTERACTIVE);
      ball.classList.toggle("is-hovering", Boolean(hovered));
    };

    const render = () => {
      // Easing toward the pointer gives the ball its smooth trailing motion.
      const ease = reduceMotion ? 1 : 0.18;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      ball.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
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
      ball.classList.remove("is-visible");
    };

    const handleDown = () => ball.classList.add("is-pressed");
    const handleUp = () => ball.classList.remove("is-pressed");
    // Sections slide under a still pointer while scrolling, so refresh the color then too.
    const handleScroll = () => visible && updateContext();

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
