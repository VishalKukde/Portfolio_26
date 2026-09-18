'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Cpu, Gauge, Layers3 } from 'lucide-react';
import { CONTACT_EMAIL } from '@/constants';
import { trackSpotlight } from '@/lib/spotlight';

const luxEase = [0.16, 1, 0.3, 1] as const;

const principles = [
  {
    number: '01',
    title: 'Make it clear',
    description: 'Good software explains itself. I turn dense requirements into interfaces and APIs people can reason about.',
    icon: Layers3,
  },
  {
    number: '02',
    title: 'Make it fast',
    description: 'Performance is part of the product. I care about the first paint, the last query, and every moment between.',
    icon: Gauge,
  },
  {
    number: '03',
    title: 'Make it last',
    description: 'A clean foundation gives a team room to move. I build modular systems that can grow without losing their shape.',
    icon: Cpu,
  },
];

const strengths = ['Product-minded decisions', 'Full-stack ownership', 'Motion with purpose', 'Kind, direct collaboration'];

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura about-aura-teal" />
        <span className="lux-aura about-aura-coral" />
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
              A little context
            </span>
            <p className="mono-font mt-6 max-w-[13rem] text-[0.68rem] uppercase leading-[1.8] tracking-[0.09em] text-moss">
              01 / about the person behind the pixels
            </p>

            <div className="lux-card about-strengths mt-10" onPointerMove={trackSpotlight}>
              <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-moss">What I bring</span>
              <motion.ul
                className="mt-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delayChildren: 0.2, staggerChildren: 0.08 }}
              >
                {strengths.map((item) => (
                  <motion.li
                    key={item}
                    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.7, ease: luxEase }}
                    className="about-strength"
                  >
                    <span className="about-strength-check" aria-hidden="true">
                      <Check size={12} strokeWidth={2.4} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          <div>
            <h2
              data-split
              className="display-font max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.075em] text-ink sm:text-6xl lg:text-7xl"
            >
              Engineering is a <span className="lux-accent">craft.</span> The interface is where people feel it.
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.15, ease: luxEase }}
              className="body-copy mt-10 grid max-w-3xl gap-6 text-[1rem] md:grid-cols-2 md:gap-10"
            >
              <p>
                I&apos;m Vishal, a senior full stack developer who likes the work behind the work: the decisions that make a product calm, quick, and ready for its next chapter.
              </p>
              <p>
                My home base is React, Next.js, Node.js, and TypeScript. I&apos;ve used them to build booking engines, commerce platforms, logistics tools, and AI-assisted dashboards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.25, ease: luxEase }}
              className="mt-9"
            >
              <a href={`mailto:${CONTACT_EMAIL}`} className="lux-link" data-magnetic="0.25">
                Start a conversation
                <span className="lux-link-icon" aria-hidden="true">
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.article
                key={principle.number}
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1, delay: index * 0.1, ease: luxEase }}
                onPointerMove={trackSpotlight}
                className="lux-card about-principle group"
              >
                <div className="flex items-center justify-between">
                  <span className="about-principle-number">{principle.number}</span>
                  <span className="about-principle-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="display-font mt-10 text-2xl font-medium tracking-[-0.06em] text-ink sm:text-[1.7rem]">{principle.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-moss">{principle.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
