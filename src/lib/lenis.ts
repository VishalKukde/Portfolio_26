import type Lenis from 'lenis';

// Shared handle to the page's Lenis instance, plus a scroll lock that works whether or not
// Lenis exists yet (the splash screen locks scrolling before SmoothScroll has created it).
let instance: Lenis | null = null;
const locks = new Set<string>();

const applyLock = () => {
  const locked = locks.size > 0;
  document.documentElement.classList.toggle('scroll-locked', locked);
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
};

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
  applyLock();
}

export function getLenis() {
  return instance;
}

export function lockScroll(reason: string) {
  locks.add(reason);
  applyLock();
}

export function unlockScroll(reason: string) {
  locks.delete(reason);
  applyLock();
}
