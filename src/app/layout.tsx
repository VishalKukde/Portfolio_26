import type { Metadata, Viewport } from 'next';
import { DM_Mono, Instrument_Serif, Manrope, Space_Grotesk } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import { EXPERIENCE } from '@/data/experience';
import { LITE_MODE_SCRIPT } from '@/lib/lite-mode';
import { SITE, SITE_URL } from '@/lib/site';
import './globals.css';

// Fonts are self-hosted by Next at build time: no render-blocking request to Google, and
// size-matched fallbacks stop the text from shifting when the real fonts arrive.
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-body' });
const display = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });

// Favicon, Apple icon, share images, robots.txt, sitemap.xml and the manifest come from the
// matching files in this folder (icon.svg, apple-icon.tsx, opengraph-image.tsx, ...).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
    firstName: 'Vishal',
    lastName: 'Kukde',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE.colors.paper },
    { media: '(prefers-color-scheme: dark)', color: SITE.colors.ink },
  ],
  colorScheme: 'light',
};

// Structured data so search engines understand who the site is about (name, role, links).
const currentRole = EXPERIENCE.find((entry) => entry.current);
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE.name,
      jobTitle: SITE.jobTitle,
      url: SITE_URL,
      email: `mailto:${SITE.email}`,
      image: `${SITE_URL}/opengraph-image`,
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      knowsAbout: [...SITE.skills],
      sameAs: [...SITE.sameAs],
      ...(currentRole && { worksFor: { '@type': 'Organization', name: currentRole.company } }),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.title,
      description: SITE.description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script adds the lite-mode class before first paint, which is why <html> ignores
    // the class mismatch during hydration.
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LITE_MODE_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
