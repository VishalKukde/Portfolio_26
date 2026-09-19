'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '@/data/experience';
import { trackSpotlight } from '@/lib/spotlight';

const luxEase = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // The scroll-drawn timeline rail stays on in lite mode; it is a single light scroll effect.
  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      // The fill is revealed with a clip instead of scaled, so its green-to-red gradient stays
      // pinned to the full rail and the leading edge shifts color as you scroll.
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      });

      timeline
        .fromTo(lineRef.current, { clipPath: 'inset(0% -20px 100% -20px)' }, { clipPath: 'inset(0% -20px 0% -20px)' }, 0)
        .fromTo(
          headRef.current,
          { top: '0%', backgroundColor: '#c8f169', boxShadow: '0 0 0 4px rgba(200, 241, 105, 0.25), 0 0 16px rgba(200, 241, 105, 0.9)' },
          { top: '100%', backgroundColor: '#ff765f', boxShadow: '0 0 0 4px rgba(255, 118, 95, 0.25), 0 0 16px rgba(255, 118, 95, 0.9)' },
          0,
        );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-pad">
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura exp-aura-lime" />
        <span className="lux-aura exp-aura-teal" />
        <span className="lux-grain" />
      </div>

      <div className="site-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: luxEase }}
            className="self-start lg:sticky lg:top-28"
          >
            <span className="lux-pill">
              <span className="lux-pill-dot" aria-hidden="true" />
              The path so far
            </span>
            <h2 data-split className="display-title exp-title text-5xl sm:text-6xl lg:text-7xl">
              A track record of making things <span className="lux-accent">work.</span>
            </h2>
            <p className="body-copy mt-6 max-w-sm text-[0.98rem]">
              Different teams, different constraints, the same instinct: leave the product and the people around it better than I found them.
            </p>
          </motion.div>

          <div ref={timelineRef} className="exp-timeline">
            <div className="exp-rail" aria-hidden="true">
              <div ref={lineRef} className="exp-rail-fill" />
              <div ref={headRef} className="exp-rail-head" />
            </div>

            <div className="space-y-10">
              {EXPERIENCE.map((entry, index) => (
                <motion.article
                  key={`${entry.company}-${entry.period}`}
                  initial={{ opacity: 0, y: 36, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, delay: index * 0.1, ease: luxEase }}
                  className="relative"
                >
                  <span className={`exp-node ${entry.current ? 'is-current' : ''}`} aria-hidden="true" />

                  <div className="exp-card" onPointerMove={trackSpotlight}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="exp-chip">{entry.period}</span>
                      {entry.current && (
                        <span className="exp-chip exp-chip-current">
                          <span className="hero-online-dot" aria-hidden="true" /> Current
                        </span>
                      )}
                      <span className="exp-chip">
                        <MapPin size={11} strokeWidth={1.8} aria-hidden="true" /> {entry.location}
                      </span>
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="display-font text-3xl font-medium leading-none tracking-[-0.06em] text-ink sm:text-4xl">{entry.role}</h3>
                        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-ink/75">
                          <span className="h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
                          {entry.company}
                        </p>
                      </div>
                      <span className="exp-card-icon" aria-hidden="true">
                        <ArrowUpRight size={17} strokeWidth={1.7} />
                      </span>
                    </div>

                    <p className="mt-6 max-w-2xl text-[0.95rem] leading-7 text-moss">{entry.summary}</p>

                    <motion.ul
                      className="exp-highlights"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delayChildren: 0.25, staggerChildren: 0.08 }}
                    >
                      {entry.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                          key={highlight}
                          variants={{
                            hidden: { opacity: 0, y: 12 },
                            show: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.7, ease: luxEase }}
                          className="exp-highlight"
                        >
                          <span className="exp-highlight-index">{String(highlightIndex + 1).padStart(2, '0')}</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
