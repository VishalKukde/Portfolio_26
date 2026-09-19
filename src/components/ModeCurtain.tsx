"use client";

import { useEffect, useRef } from "react";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { CURTAIN_CLOSED, CURTAIN_EASE, CURTAIN_OPEN } from "@/lib/lite-mode";
import { markSplashDone } from "@/lib/splash";

// Curtain shown while the lite mode switch changes modes. It drops over the page before the
// reload (see setLiteMode) and lifts off the fresh page again, in either mode. It stands in for
// the splash on that load, so it also tells the page when the splash is over.
export default function ModeCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const curtain = curtainRef.current;
    const accent = accentRef.current;
    if (!root.dataset.modeSwitch || !curtain || !accent) return undefined;

    lockScroll("mode-switch");
    const lifts: Animation[] = [];
    let frame = 0;

    const lift = () => {
      const frames = [{ clipPath: CURTAIN_OPEN }, { clipPath: CURTAIN_CLOSED }];
      const options = { duration: 900, easing: CURTAIN_EASE, fill: "forwards" } as const;
      // Hold long enough to read the message before the curtain lifts.
      const hold = 900;
      lifts.push(
        curtain.animate(frames, { ...options, delay: hold }),
        accent.animate(frames, { ...options, delay: hold + 140 }),
      );
      lifts[1].finished.then(
        () => {
          delete root.dataset.modeSwitch;
          unlockScroll("mode-switch");
          markSplashDone();
        },
        () => undefined,
      );
    };

    // Start only once the fresh page has loaded and painted. Started earlier, a busy main thread
    // (hydration, scripts still loading) can swallow the whole lift and the curtain just vanishes.
    const start = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(lift);
      });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Leaves the curtain flag alone, so a re-run of this effect (React dev mode) lifts it again.
    return () => {
      window.removeEventListener("load", start);
      cancelAnimationFrame(frame);
      lifts.forEach((animation) => animation.cancel());
      unlockScroll("mode-switch");
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={accentRef} className="mode-curtain-accent" />
      <div ref={curtainRef} className="mode-curtain">
        <span className="mode-curtain-label" />
        <span className="mode-curtain-note" />
      </div>
    </div>
  );
}
