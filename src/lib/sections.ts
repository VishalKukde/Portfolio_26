export type SectionTheme = 'light' | 'dark' | 'coral';

// Sections stack on top of each other, so hit-test the painted one rather than comparing rects.
// Overlays such as the splash screen are skipped, so the page underneath is always what counts.
export function sectionAt(x: number, y: number, ignore?: Element | null) {
  return document
    .elementsFromPoint(x, y)
    .filter((element) => !ignore?.contains(element))
    .map((element) => element.closest<HTMLElement>('.stack-main > section, footer'))
    .find(Boolean);
}

export function themeOf(element?: HTMLElement | null): SectionTheme {
  return (element?.dataset.navTheme as SectionTheme | undefined) ?? 'light';
}
