'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LOADING_DURATION = 2000;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frameId = 0;
    const startedAt = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(elapsed / LOADING_DURATION, 1);
      setProgress(Math.round(nextProgress * 100));

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
          <div className="relative z-10 flex w-full max-w-[26rem] flex-col gap-8 px-6">
            <div className="flex items-center justify-between border-b border-paper/20 pb-4">
              <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-paper/60">VK / portfolio</span>
              <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-lime">initializing</span>
            </div>

            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="kicker text-paper/60">Full stack developer</p>
                <p className="display-font mt-5 text-5xl font-medium leading-none tracking-[-0.1em] text-paper sm:text-6xl">Making useful things.</p>
              </div>
              <span className="display-font text-5xl font-medium leading-none tracking-[-0.1em] text-coral sm:text-6xl">{String(progress).padStart(2, '0')}</span>
            </div>

            <div>
              <div className="loading-track">
                <motion.div className="loading-progress" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex justify-between mono-font text-[0.58rem] uppercase tracking-[0.1em] text-paper/45">
                <span>Loading experience</span>
                <span>{progress === 100 ? 'Ready' : 'Please wait'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
