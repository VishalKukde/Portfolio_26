import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Served as /manifest.webmanifest: name, colors and icons used when the site is saved to a
// home screen or shown by the browser as an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: SITE.shortTitle,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: SITE.colors.paper,
    theme_color: SITE.colors.ink,
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
