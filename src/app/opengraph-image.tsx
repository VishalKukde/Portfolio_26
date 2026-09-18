import { ImageResponse } from 'next/og';
import { SITE, SITE_URL } from '@/lib/site';

// Link preview card for LinkedIn, WhatsApp, Slack, X and others (rendered on request, then cached).
export const alt = `${SITE.name}, ${SITE.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Edge runtime: Next 14's Node image renderer fails to resolve its files on Windows builds.
export const runtime = 'edge';

const { ink, paper, lime, coral, teal } = SITE.colors;

export default function OpenGraphImage() {
  const host = SITE_URL.replace(/^https?:\/\//, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          padding: '72px 80px',
          background: ink,
          color: paper,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Soft brand glows, echoing the site's hero. */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${lime}55, transparent 65%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${coral}33, transparent 65%)`,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {/* The site icon as a raised tile, so it reads as the logo against the dark card. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 104,
                height: 104,
                borderRadius: 26,
                border: `2px solid ${lime}59`,
                background: 'linear-gradient(160deg, #2a3d36, #16241f)',
                boxShadow: `0 0 0 8px ${lime}14, 0 24px 48px rgba(0, 0, 0, 0.45)`,
              }}
            >
              <svg width="78" height="78" viewBox="0 0 64 64">
                <path d="M7 15h7.4l4.6 21.4L23.7 15h7.4L22.9 49h-7.8L7 15Z" fill={lime} />
                <path d="M33.4 15h6.8v13.2L47 15h7.6l-8.7 14.7L55.2 49h-7.7l-7.3-14.3V49h-6.8V15Z" fill={lime} />
              </svg>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 20px',
                borderRadius: 9999,
                border: `1px solid ${paper}26`,
                fontSize: 22,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: `${paper}cc`,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 9999, background: lime }} />
              Available for remote work
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>{SITE.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, fontSize: 44, color: `${paper}d9` }}>
              <div style={{ width: 8, height: 44, borderRadius: 4, background: coral, transform: 'rotate(22deg)' }} />
              {SITE.jobTitle}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {['React', 'Next.js', 'Node.js', 'TypeScript'].map((skill, index) => (
                <div
                  key={skill}
                  style={{
                    display: 'flex',
                    padding: '10px 20px',
                    borderRadius: 9999,
                    fontSize: 24,
                    color: ink,
                    background: [lime, teal, paper, lime][index],
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: `${paper}99` }}>{host}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
