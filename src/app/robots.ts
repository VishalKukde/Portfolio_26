import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Served as /robots.txt: everything may be crawled, and crawlers are pointed at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
