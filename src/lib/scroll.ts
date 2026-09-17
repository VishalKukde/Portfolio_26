import type { MouseEvent } from 'react';

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
  window.scrollTo({
    top: getNaturalTop(target),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}
