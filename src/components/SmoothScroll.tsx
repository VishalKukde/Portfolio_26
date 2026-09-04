'use client';

import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
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

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
