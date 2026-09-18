import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

// Branded 404 for any address that doesn't exist.
export default function NotFound() {
  return (
    <main className="not-found">
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura hero-aura-lime" />
        <span className="lux-aura hero-aura-coral" />
        <span className="lux-grain" />
      </div>

      <div className="site-container relative">
        <span className="lux-pill">
          <span className="lux-pill-dot" aria-hidden="true" />
          Error 404
        </span>
        <h1 className="display-title not-found-title">
          This page took a <span className="lux-accent">detour.</span>
        </h1>
        <p className="body-copy mt-6 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          on track.
        </p>
        <Link href="/" className="lux-cta mt-10">
          <span>Back to home</span>
          <span className="lux-cta-icon" aria-hidden="true">
            ←
          </span>
        </Link>
      </div>
    </main>
  );
}
