'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { lockScroll, unlockScroll } from '@/lib/lenis';
import { markSplashDone } from '@/lib/splash';

export const LOADING_DURATION = 2000;

// Curtain exit: the dark screen wipes upward, trailed by a thin lime layer that follows a beat later.
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const CURTAIN_OPEN = 'inset(0% 0% 0% 0%)';
const CURTAIN_CLOSED = 'inset(0% 0% 100% 0%)';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export default function LoadingScreen() {
  const [spread, setSpread] = useState(0);
  const [visible, setVisible] = useState(true);
  const progress = Math.round(spread * 100);

  useEffect(() => {
    let frameId = 0;
    const startedAt = performance.now();

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
      setVisible(false);
      unlockScroll('splash');
      markSplashDone();
    }, LOADING_DURATION);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimer);
      unlockScroll('splash');
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain-accent"
          className="loading-curtain-accent"
          initial={{ clipPath: CURTAIN_OPEN }}
          exit={{ clipPath: CURTAIN_CLOSED, transition: { duration: 0.9, delay: 0.14, ease: CURTAIN_EASE } }}
          aria-hidden="true"
        />
      )}
      {visible && (
        <motion.div
          key="curtain"
          initial={{ clipPath: CURTAIN_OPEN }}
          exit={{ clipPath: CURTAIN_CLOSED, transition: { duration: 0.9, ease: CURTAIN_EASE } }}
          className="loading-screen"
          role="status"
          aria-label={`Loading portfolio ${progress}%`}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
