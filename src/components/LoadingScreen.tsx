'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const LOADING_DURATION = 2000;

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
    const hideTimer = window.setTimeout(() => setVisible(false), LOADING_DURATION);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
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
