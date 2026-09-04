"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Code2 } from "lucide-react";
import { CONTACT_EMAIL } from "@/constants";
import { scrollToSection } from "@/lib/scroll";

const roleWords = ["Full", "Stack", "Developer"];

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32 md:pt-40"
    >
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-mark" aria-hidden="true">
        VK
      </div>

      <div className="site-container relative grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker"
          >
            Available for meaningful problems
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="display-title max-w-4xl text-[clamp(3.6rem,10vw,9.4rem)]"
          >
            I build
            <br />
            <span className="outline-text">digital</span> products.
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="show"
            transition={{ delayChildren: 0.35, staggerChildren: 0.09 }}
            className="display-font mt-8 flex flex-wrap gap-x-3 text-2xl font-medium tracking-[-0.07em] text-ink sm:text-3xl"
            aria-label="Full Stack Developer"
          >
            {roleWords.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                transition={{ duration: 0.55 }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={wordVariants}
              transition={{ duration: 0.55 }}
              className="text-coral"
            >
              /
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="body-copy mt-5 max-w-xl"
          >
            I design and ship scalable web applications from front to back, with
            a soft spot for interfaces that make complex systems feel human.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <a href="#work" onClick={(event) => scrollToSection(event, "#work")} className="button-primary">
              View selected work <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mono-font mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[0.66rem] uppercase tracking-[0.12em] text-moss"
          >
            <span>3.8 years building</span>
            <span>10+ shipped projects</span>
            <span className="flex items-center gap-2 text-ink">
              <span className="h-2 w-2 rounded-full bg-coral" /> India / Remote
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-[31rem] lg:ml-auto"
        >
          <div className="hero-console console-grid p-5 sm:p-7">
            <div className="relative z-10 flex items-center justify-between border-b border-paper/20 pb-4">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-lime" strokeWidth={1.6} />
                <span className="mono-font text-[0.66rem] tracking-[0.12em] text-paper/70">
                  developer.config.ts
                </span>
              </div>
              <span className="flex items-center gap-1.5 mono-font text-[0.58rem] uppercase tracking-[0.1em] text-lime">
                <Check size={12} /> online
              </span>
            </div>

            <div className="relative z-10 py-6">
              <div className="console-line">
                <span>01</span>
                <span>
                  <i className="text-coral not-italic">const</i> developer ={" "}
                  {"{"}
                </span>
              </div>
              <div className="console-line">
                <span>02</span>
                <span className="pl-4">
                  name:{" "}
                  <b className="font-normal text-lime">
                    &quot;Vishal Kukde&quot;
                  </b>
                  ,
                </span>
              </div>
              <div className="console-line">
                <span>03</span>
                <span className="pl-4">
                  role:{" "}
                  <b className="font-normal text-lime">
                    &quot;Full Stack Developer&quot;
                  </b>
                  ,
                </span>
              </div>
              <div className="console-line">
                <span>04</span>
                <span className="pl-4">
                  focus:{" "}
                  <b className="font-normal text-coral">
                    &quot;useful complexity&quot;
                  </b>
                  ,
                </span>
              </div>
              <div className="console-line">
                <span>05</span>
                <span className="pl-4">stack: [</span>
              </div>
              <div className="console-line">
                <span>06</span>
                <span className="pl-8 text-teal">
                  &quot;React&quot;, &quot;Next.js&quot;, &quot;Node.js&quot;,
                </span>
              </div>
              <div className="console-line">
                <span>07</span>
                <span className="pl-8 text-teal">
                  &quot;Express.js&quot;, &quot;MongoDB&quot;
                </span>
              </div>
              <div className="console-line">
                <span>08</span>
                <span className="pl-4">],</span>
              </div>
              <div className="console-line">
                <span>09</span>
                <span className="pl-4">
                  status:{" "}
                  <b className="font-normal text-lime">
                    &quot;open to good work&quot;
                  </b>
                </span>
              </div>
              <div className="console-line">
                <span>10</span>
                <span>{"}"};</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-paper/20 pt-4 mono-font text-[0.58rem] uppercase tracking-[0.1em] text-paper/50">
              <span>ships with care</span>
              <span className="text-coral">v.01</span>
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-5">
            <p className="mono-font max-w-[14rem] text-[0.62rem] uppercase leading-relaxed tracking-[0.1em] text-moss">
              The best work lives between engineering discipline and a little
              curiosity.
            </p>
            <a
              href="#about"
              onClick={(event) => scrollToSection(event, "#about")}
              aria-label="Scroll to about section"
              className="group flex items-center gap-2 mono-font text-[0.62rem] uppercase tracking-[0.1em] text-ink"
            >
              <span className="h-8 w-px bg-ink transition-transform group-hover:scale-y-150" />
              <ArrowDown
                size={15}
                className="animate-bounce"
                strokeWidth={1.6}
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
