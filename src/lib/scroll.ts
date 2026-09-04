import type { MouseEvent } from 'react';

export function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) {
    return;
  }

  const target = document.getElementById(href.slice(1));

  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}
