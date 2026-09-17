import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vishal Kukde | Senior Full Stack Developer',
  description:
    'Portfolio of Vishal Kukde, a senior full stack developer building thoughtful, high-performance digital products.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
