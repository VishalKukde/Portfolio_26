import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Served as /sitemap.xml. The portfolio is a single page; add entries here for any new pages.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
