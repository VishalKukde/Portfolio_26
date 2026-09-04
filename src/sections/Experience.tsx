'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '@/data/experience';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 58%',
          end: 'bottom 72%',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-pad">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-20">
          <div>
            <span className="kicker">The path so far</span>
            <h2 className="display-title text-5xl sm:text-6xl lg:text-7xl">A track record of making things work.</h2>
            <p className="body-copy mt-6 max-w-sm text-[0.98rem]">
              Different teams, different constraints, the same instinct: leave the product and the people around it better than I found them.
            </p>
          </div>

          <div className="relative pl-8 md:pl-12">
            <div ref={lineRef} className="timeline-line" />
            <div className="space-y-14">
              {EXPERIENCE.map((entry, index) => (
                <motion.article
                  key={`${entry.company}-${entry.period}`}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="relative"
                >
                  <div className="timeline-node" />
                  <div className="flex flex-col justify-between gap-2 border-b border-ink/20 pb-5 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="display-font text-2xl font-medium tracking-[-0.07em] sm:text-3xl">{entry.role}</h3>
                      <p className="mt-1 text-sm text-coral">{entry.company}</p>
                    </div>
                    <span className="mono-font text-[0.62rem] uppercase tracking-[0.1em] text-moss">{entry.period}</span>
                  </div>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-moss">{entry.summary}</p>
                  <ul className="mt-5 space-y-3">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-6 text-ink/80">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
