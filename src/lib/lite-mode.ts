import { lockScroll } from '@/lib/lenis';

// Lite mode: a visitor switch that turns off every heavy animation (smooth scrolling, scroll-linked
// GSAP effects, Framer entrances, CSS loops and blurs) so low-end devices stay fast.
// The choice is saved in localStorage and applied as a class on <html> by an inline script in
// <head>, before anything renders, so every component can read it synchronously on its first run.
const STORAGE_KEY = 'lite-mode';
const CLASS_NAME = 'lite-mode';
// Set just before the switch reloads the page, so the new page opens behind the mode curtain.
const SWITCH_KEY = 'mode-switch';

export const LITE_MODE_SCRIPT = `try{var d=document.documentElement;if(localStorage.getItem('${STORAGE_KEY}')==='1')d.classList.add('${CLASS_NAME}');var s=sessionStorage.getItem('${SWITCH_KEY}');if(s==='light'||s==='heavy')d.dataset.modeSwitch=s;sessionStorage.removeItem('${SWITCH_KEY}')}catch(e){}`;

// The curtain is driven with the Web Animations API, which lite mode's CSS overrides don't touch.
export const CURTAIN_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
export const CURTAIN_OPEN = 'inset(0% 0% 0% 0%)';
export const CURTAIN_CLOSED = 'inset(0% 0% 100% 0%)';

export function isLiteMode() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains(CLASS_NAME);
}

// True when motion should be skipped, either by the visitor's OS setting or by lite mode.
export function prefersReducedMotion() {
  return isLiteMode() || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Saves the choice, drops the curtain over the page, then reloads without any #hash behind it
// so the page starts fresh from the top in the new mode.
export async function setLiteMode(enabled: boolean) {
  const root = document.documentElement;
  if (root.dataset.modeSwitch) return;

  try {
    if (enabled) localStorage.setItem(STORAGE_KEY, '1');
    else localStorage.removeItem(STORAGE_KEY);
    sessionStorage.setItem(SWITCH_KEY, enabled ? 'light' : 'heavy');
  } catch {
    return;
  }

  root.dataset.modeSwitch = enabled ? 'light' : 'heavy';
  lockScroll('mode-switch');

  // The lime layer leads and the dark curtain follows, mirroring the splash lifting.
  const frames = [{ clipPath: CURTAIN_CLOSED }, { clipPath: CURTAIN_OPEN }];
  const options = { duration: 800, easing: CURTAIN_EASE, fill: 'forwards' } as const;
  document.querySelector('.mode-curtain-accent')?.animate(frames, options);
  const curtain = document.querySelector('.mode-curtain')?.animate(frames, { ...options, delay: 140 });
  await curtain?.finished.catch(() => undefined);

  window.history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.location.replace(`${window.location.pathname}${window.location.search}`);
}
