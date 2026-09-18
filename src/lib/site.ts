import { CONTACT_EMAIL, PREVIOUS_VERSIONS, SOCIAL_LINKS } from '@/constants';

// Absolute site URL for canonical links, social previews, robots.txt and the sitemap.
// Set NEXT_PUBLIC_SITE_URL for a custom domain; on Vercel the production domain is used
// automatically, and local development falls back to localhost.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE = {
  name: 'Vishal Kukde',
  title: 'Vishal Kukde | Senior Full Stack Developer',
  shortTitle: 'Vishal Kukde',
  jobTitle: 'Senior Full Stack Developer',
  description:
    "I'm Vishal Kukde, a senior full stack developer in India building fast, accessible web products with React, Next.js, Node.js and TypeScript. Open to remote work.",
  locale: 'en_US',
  location: 'India',
  email: CONTACT_EMAIL,
  keywords: [
    'Vishal Kukde',
    'Senior Full Stack Developer',
    'Full Stack Developer India',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'Frontend Engineer',
    'Remote Developer',
    'Portfolio',
  ],
  skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'GSAP'],
  sameAs: [...SOCIAL_LINKS.map((link) => link.href), ...PREVIOUS_VERSIONS.map((version) => version.href)],
  colors: { ink: '#14201d', paper: '#f1eee6', lime: '#c8f169', coral: '#ff765f', teal: '#8ce5d1' },
} as const;
