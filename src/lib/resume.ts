// Any "Download resume" button can open the shared modal without prop drilling.
const EVENT = 'resume:open';

export function openResumeModal() {
  window.dispatchEvent(new Event(EVENT));
}

export function onResumeModalOpen(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}
