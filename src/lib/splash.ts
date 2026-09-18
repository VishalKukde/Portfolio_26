// Lets components wait for the splash screen to lift before they start anything the visitor
// should actually see (the splash covers the page, so "in view" checks fire too early).
let done = false;
const EVENT = 'splash:done';

export function markSplashDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onSplashDone(callback: () => void) {
  if (done) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
