export type SectionTheme = 'light' | 'dark' | 'coral';

// Sections stack on top of each other, so hit-test the painted one rather than comparing rects.
export function sectionAt(x: number, y: number, ignore?: Element | null) {
  return document
    .elementsFromPoint(x, y)
    .filter((element) => !ignore?.contains(element))
    .map((element) => element.closest<HTMLElement>('.stack-main > section, footer, .loading-screen'))
    .find(Boolean);
}

export function themeOf(element?: HTMLElement | null): SectionTheme {
  if (element?.classList.contains('loading-screen')) return 'dark';
  return (element?.dataset.navTheme as SectionTheme | undefined) ?? 'light';
}
