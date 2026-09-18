import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

// Home-screen icon for iPhone and iPad (iOS rounds the corners itself).
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
// Edge runtime: Next 14's Node image renderer fails to resolve its files on Windows builds.
export const runtime = 'edge';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: SITE.colors.ink,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
          <path d="M7 15h7.4l4.6 21.4L23.7 15h7.4L22.9 49h-7.8L7 15Z" fill={SITE.colors.lime} />
          <path
            d="M33.4 15h6.8v13.2L47 15h7.6l-8.7 14.7L55.2 49h-7.7l-7.3-14.3V49h-6.8V15Z"
            fill={SITE.colors.lime}
          />
        </svg>
      </div>
    ),
    size,
  );
}
