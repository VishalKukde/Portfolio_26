'use client';

import { useEffect, useRef, useState } from 'react';
import { lockScroll, unlockScroll } from '@/lib/lenis';
import { CURTAIN_CLOSED, CURTAIN_EASE, CURTAIN_OPEN } from '@/lib/lite-mode';
import { markSplashDone } from '@/lib/splash';

export const LOADING_DURATION = 2000;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Plays on every full page load, in heavy and lite mode alike. Right after a lite mode switch the
// mode curtain covers the page instead (see ModeCurtain), so this one steps aside.
export default function LoadingScreen() {
  const [spread, setSpread] = useState(0);
  const [visible, setVisible] = useState(true);
  const curtainRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const progress = Math.round(spread * 100);

  useEffect(() => {
    if (document.documentElement.dataset.modeSwitch) {
      setVisible(false);
      return undefined;
    }

    let frameId = 0;
    const startedAt = performance.now();
    const lifts: Animation[] = [];

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(elapsed / LOADING_DURATION, 1);
      setSpread(easeInOutCubic(nextProgress));

      if (nextProgress < 1) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);
    // Keep the page still behind the splash so it doesn't reveal a half-scrolled page.
    lockScroll('splash');
    const hideTimer = window.setTimeout(() => {
      unlockScroll('splash');
      markSplashDone();

      // Curtain exit: the dark screen wipes upward, trailed by the lime layer a beat later. It runs
      // on the Web Animations API, which lite mode's animation overrides leave alone.
      const frames = [{ clipPath: CURTAIN_OPEN }, { clipPath: CURTAIN_CLOSED }];
      const options = { duration: 900, easing: CURTAIN_EASE, fill: 'forwards' } as const;
      const curtain = curtainRef.current?.animate(frames, options);
      const accent = accentRef.current?.animate(frames, { ...options, delay: 140 });
      [curtain, accent].forEach((animation) => animation && lifts.push(animation));
      (accent ?? curtain)?.finished.then(() => setVisible(false), () => undefined);
    }, LOADING_DURATION);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimer);
      lifts.forEach((animation) => animation.cancel());
      unlockScroll('splash');
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={accentRef} className="loading-curtain-accent" aria-hidden="true" />
      <div ref={curtainRef} className="loading-screen" role="status" aria-label={`Loading portfolio ${progress}%`}>
        <div className="loading-screen-grid" aria-hidden="true" />
        {/* The percentage sits in the middle while both halves of the line grow outward from it. */}
        <div className="loading-line relative z-10 w-full max-w-[32rem] px-6">
          <span className="loading-line-track">
            <span className="loading-line-fill loading-line-fill-left" style={{ transform: `scaleX(${spread})` }} />
          </span>
          <span className="loading-percent">{String(progress).padStart(2, '0')}%</span>
          <span className="loading-line-track">
            <span className="loading-line-fill loading-line-fill-right" style={{ transform: `scaleX(${spread})` }} />
          </span>
        </div>
      </div>
    </>
  );
}
