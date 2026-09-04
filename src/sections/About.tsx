'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Gauge, Layers3 } from 'lucide-react';
import { CONTACT_EMAIL } from '@/constants';

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

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
          <div>
            <span className="kicker">A little context</span>
            <p className="mono-font mt-6 max-w-[13rem] text-[0.68rem] uppercase leading-[1.8] tracking-[0.09em] text-moss">
              01 / about the person behind the pixels
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="display-font max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.08em] text-ink sm:text-6xl lg:text-7xl">
              Engineering is a craft. The interface is where people feel it.
            </h2>
            <div className="mt-8 grid gap-7 md:grid-cols-[1fr_0.78fr]">
              <div className="body-copy space-y-5 text-[1rem]">
                <p>
                  I&apos;m Vishal, a full stack developer who likes the work behind the work: the decisions that make a product calm, quick, and ready for its next chapter.
                </p>
                <p>
                  My home base is React, Next.js, Node.js, and TypeScript. I&apos;ve used them to build booking engines, commerce platforms, logistics tools, and AI-assisted dashboards.
                </p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 border-b border-ink pb-1 mono-font text-[0.68rem] uppercase tracking-[0.1em] text-ink transition-colors hover:border-coral hover:text-coral">
                  Start a conversation <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
              </div>

              <div className="border-l border-ink/20 pl-6">
                <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-moss">What I bring</span>
                <ul className="mt-5 space-y-4">
                  {['Product-minded decisions', 'Full-stack ownership', 'Motion with purpose', 'Kind, direct collaboration'].map((item) => (
                    <li key={item} className="display-font flex items-center gap-3 text-lg font-medium tracking-[-0.04em]">
                      <span className="h-2 w-2 rounded-full bg-coral" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-ink/20 pt-8 md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.article
                key={principle.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-font skill-index">{principle.number}</span>
                  <Icon size={20} strokeWidth={1.3} className="text-coral transition-transform group-hover:rotate-12" />
                </div>
                <h3 className="display-font mt-8 text-2xl font-medium tracking-[-0.06em]">{principle.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-moss">{principle.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
