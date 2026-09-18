import type { MouseEvent } from 'react';
import { getLenis } from '@/lib/lenis';

const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);

// Stuck sections report their pinned position, so measure with stacking briefly disabled.
export function getNaturalTop(target: HTMLElement) {
  const stack = target.closest('.stack-main.is-stacking');
  stack?.classList.remove('is-stacking');
  const top = target.getBoundingClientRect().top + window.scrollY;
  stack?.classList.add('is-stacking');
  return top;
}

export function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) {
    return;
  }

  const target = document.getElementById(href.slice(1));

  if (!target) {
    return;
  }

  event.preventDefault();
  const top = getNaturalTop(target);
  const lenis = getLenis();

  // Let Lenis drive the jump when it exists, so it doesn't fight the browser's own smooth scroll.
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.4, easing: easeInOutQuart, force: true });
  } else {
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}
