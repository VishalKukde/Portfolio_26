'use client';

import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MotionGlobalConfig } from 'framer-motion';
import { setLenis } from '@/lib/lenis';
import { isLiteMode, prefersReducedMotion } from '@/lib/lite-mode';

// In lite mode every Framer animation jumps straight to its end state. This runs when the module
// loads, before any motion component mounts, so the hero entrance never waits on the splash.
if (isLiteMode()) {
  MotionGlobalConfig.skipAnimations = true;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const initialHash = window.location.hash;

    if (initialHash) {
      const target = document.getElementById(initialHash.slice(1));

      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ block: 'start' });
          window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        });
      }
    }

    if (prefersReducedMotion()) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.3,
    });

    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
