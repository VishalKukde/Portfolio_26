'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Layers3, MoveRight } from 'lucide-react';
import { CONTACT_EMAIL } from '@/constants';
import { scrollToSection } from '@/lib/scroll';

const systemLayers = [
  { label: 'Interface', detail: 'React / Next.js', tone: 'lime' },
  { label: 'Logic', detail: 'Node / APIs', tone: 'coral' },
  { label: 'Data', detail: 'Mongo / SQL', tone: 'teal' },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroV2() {
  return (
    <section id="home" className="hero-v2 relative flex min-h-screen items-center overflow-hidden pb-16 pt-32 md:pt-40">
      <div className="hero-v2-ruler" aria-hidden="true">
        <span>02</span>
        <span>VK / FULL STACK</span>
      </div>

      <div className="site-container relative grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.12 }}
          className="relative z-10"
        >
          <motion.span variants={reveal} transition={{ duration: 0.65 }} className="kicker">
            02 / Product-minded engineering
          </motion.span>

          <motion.h1 variants={reveal} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="display-font mt-7 max-w-3xl text-6xl font-medium leading-[0.84] tracking-[-0.11em] text-ink sm:text-8xl lg:text-[7.8rem]">
            Less friction.
            <br />
            <span className="outline-text">More</span> momentum.
          </motion.h1>

          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="mt-8 flex items-center gap-3">
            <span className="h-px w-10 bg-coral" />
            <span className="mono-font text-[0.7rem] uppercase tracking-[0.13em] text-moss">Full Stack Developer / Vishal Kukde</span>
          </motion.div>

          <motion.p variants={reveal} transition={{ duration: 0.65 }} className="body-copy mt-6 max-w-lg text-[1rem]">
            I turn complex product ideas into calm, capable software: considered interfaces, dependable APIs, and foundations that leave room for what comes next.
          </motion.p>

          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#work" onClick={(event) => scrollToSection(event, '#work')} className="button-primary">
              Explore the work <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Resume request`} className="button-secondary">
              Request resume <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          </motion.div>

          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="mt-14 flex flex-wrap gap-x-7 gap-y-3 mono-font text-[0.62rem] uppercase tracking-[0.12em] text-moss">
            <span>3.8 years building</span>
            <span>10+ shipped projects</span>
            <span className="flex items-center gap-2 text-ink"><Check size={13} className="text-coral" /> India / Remote</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="hero-v2-panel">
            <div className="flex items-center justify-between border-b border-paper/20 pb-4">
              <span className="mono-font text-[0.62rem] uppercase tracking-[0.13em] text-paper/55">System map / 2026</span>
              <span className="flex items-center gap-2 mono-font text-[0.58rem] uppercase tracking-[0.1em] text-lime"><span className="h-2 w-2 rounded-full bg-lime" /> online</span>
            </div>

            <div className="hero-v2-visual">
              <div className="hero-v2-orbit hero-v2-orbit-one" aria-hidden="true" />
              <div className="hero-v2-orbit hero-v2-orbit-two" aria-hidden="true" />
              <div className="hero-v2-seal" aria-hidden="true">VK</div>
              <div className="hero-v2-layers">
                {systemLayers.map((layer, index) => (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.65 + index * 0.16 }}
                    className={`hero-v2-layer hero-v2-layer-${layer.tone}`}
                  >
                    <span className="mono-font text-[0.58rem] uppercase tracking-[0.12em] text-paper/45">0{index + 1}</span>
                    <div>
                      <p className="display-font text-2xl font-medium tracking-[-0.07em] text-paper">{layer.label}</p>
                      <p className="mono-font mt-1 text-[0.58rem] uppercase tracking-[0.09em] text-paper/45">{layer.detail}</p>
                    </div>
                    <Layers3 size={18} strokeWidth={1.2} className="ml-auto text-paper/55" />
                  </motion.div>
                ))}
              </div>
              <div className="hero-v2-flow" aria-hidden="true"><MoveRight size={18} /><MoveRight size={18} /></div>
            </div>

            <div className="flex items-end justify-between gap-5 border-t border-paper/20 pt-5">
              <div>
                <span className="mono-font text-[0.58rem] uppercase tracking-[0.12em] text-paper/40">Working principle</span>
                <p className="display-font mt-2 max-w-xs text-xl leading-tight tracking-[-0.06em] text-paper">Make the hard parts feel simple.</p>
              </div>
              <MoveRight size={20} className="text-coral" strokeWidth={1.5} />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="mono-font text-[0.6rem] uppercase tracking-[0.1em] text-moss">Curious by default</span>
            <a href="#about" onClick={(event) => scrollToSection(event, '#about')} aria-label="Scroll to about section" className="group flex items-center gap-2 mono-font text-[0.62rem] uppercase tracking-[0.1em] text-ink">
              See the thinking <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" strokeWidth={1.6} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
