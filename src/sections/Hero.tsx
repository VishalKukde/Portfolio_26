"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Code2, Download } from "lucide-react";
import { isLiteMode } from "@/lib/lite-mode";
import { openResumeModal } from "@/lib/resume";
import { scrollToSection } from "@/lib/scroll";
import { LOADING_DURATION } from "@/components/LoadingScreen";
import CountUp from "@/components/CountUp";
import { CAREER_START } from "@/constants";
import { formatYearsMonths, monthsBetween } from "@/lib/experience";

// Everything waits for the splash screen, otherwise the entrance plays unseen behind it.
const intro = LOADING_DURATION / 1000 + 0.1;
const luxEase = [0.16, 1, 0.3, 1] as const;

// The slash fades in, pauses, sweeps right, and tilts from "\" to "/" as it settles.
const slashTilt = 22;
const slashFadeIn = intro + 0.55;
const roleReveal = {
  duration: 1.5,
  delay: slashFadeIn + 0.45,
  ease: [0.65, 0, 0.35, 1] as const,
};
const slashRotate = {
  duration: 1.1,
  delay: roleReveal.delay + 0.7,
  ease: [0.45, 0, 0.2, 1] as const,
};

const fadeUp = (delay: number, distance = 18) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: luxEase },
});

const codeLines: { indent?: string; content: ReactNode }[] = [
  {
    content: (
      <>
        <i className="text-coral not-italic">const</i> developer = {"{"}
      </>
    ),
  },
  {
    indent: "pl-4",
    content: (
      <>
        name: <b className="font-normal text-lime">&quot;Vishal Kukde&quot;</b>,
      </>
    ),
  },
  {
    indent: "pl-4",
    content: (
      <>
        role:{" "}
        <b className="font-normal text-lime">
          &quot;Senior Full Stack Developer&quot;
        </b>
        ,
      </>
    ),
  },
  {
    indent: "pl-4",
    content: (
      <>
        focus:{" "}
        <b className="font-normal text-coral">&quot;useful complexity&quot;</b>,
      </>
    ),
  },
  { indent: "pl-4", content: "stack: [" },
  {
    indent: "pl-8 text-teal",
    content: <>&quot;React&quot;, &quot;Next.js&quot;, &quot;Node.js&quot;,</>,
  },
  {
    indent: "pl-8 text-teal",
    content: <>&quot;Express.js&quot;, &quot;MongoDB&quot;</>,
  },
  { indent: "pl-4", content: "]," },
  {
    indent: "pl-4",
    content: (
      <>
        status:{" "}
        <b className="font-normal text-lime">&quot;open to good work&quot;</b>
      </>
    ),
  },
  { content: <>{"}"};</> },
];

const headingLines: ReactNode[] = [
  "I build",
  <>
    <span className="hero-accent">digital</span> products.
  </>,
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 140, damping: 20 });

  // A gentle 3D tilt and a spotlight that follow the pointer across the card.
  const handleCardMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || isLiteMode() || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - y) * 7);
    tiltY.set((x - 0.5) * 9);
    event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    event.currentTarget.style.setProperty("--my", `${y * 100}%`);
  };

  const resetCard = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-out parallax: while the hero holds and About slides over it, its layers drift at
  // different speeds and the card recedes. Plain wrapper elements are used so these transforms
  // never collide with the Framer entrance animations inside them.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isLiteMode()) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(section);

    // Desktop and tablet only; phones skip this heavier scroll effect.
    media.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            endTrigger: "#about",
            end: "top top",
            scrub: 0.6,
          },
        });

        timeline
          .to("[data-hero-layer=ambient]", { yPercent: 18 }, 0)
          .to("[data-hero-layer=mark]", { yPercent: -30 }, 0)
          .to("[data-hero-layer=copy]", { yPercent: -12, autoAlpha: 0.35 }, 0)
          .to(
            "[data-hero-layer=card]",
            { yPercent: -22, scale: 0.9, autoAlpha: 0.5 },
            0,
          );
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24 md:pb-20 md:pt-28"
    >
      <div
        className="hero-ambient"
        data-hero-layer="ambient"
        aria-hidden="true"
      >
        <span className="hero-aura hero-aura-lime" />
        <span className="hero-aura hero-aura-coral" />
        <span className="hero-aura hero-aura-teal" />
        <span className="hero-orbit" />
        <span className="hero-orbit hero-orbit-inner" />
        <span className="hero-grain" />
      </div>
      <div className="hero-mark" data-hero-layer="mark" aria-hidden="true">
        VK
      </div>

      <div className="site-container relative grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="relative z-10" data-hero-layer="copy">
          <motion.div {...fadeUp(intro, 12)} className="hero-pill">
            <span className="hero-pill-dot" aria-hidden="true" />
            Available for meaningful problems
          </motion.div>

          <h1 className="display-title hero-title max-w-4xl text-[clamp(3.6rem,10vw,9.4rem)]">
            {headingLines.map((line, index) => (
              <span key={index} className="hero-title-mask">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: intro + 0.08 + index * 0.12,
                    ease: luxEase,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* The slash sweeps left to right and the role is uncovered right behind it. */}
          <div className="display-font mt-8 pr-8 text-xl font-medium tracking-[-0.07em] text-ink sm:text-3xl">
            <span className="relative inline-block whitespace-nowrap">
              <motion.span
                className="inline-block"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={roleReveal}
              >
                Senior Full Stack Developer
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={roleReveal}
              >
                {/* Drawn as a bar so it can tilt precisely from "\" to "/". */}
                <motion.span
                  className="absolute left-3 top-1/2 h-[0.95em] w-[0.1em] rounded-[1px] bg-coral"
                  style={{ y: "-50%" }}
                  initial={{ opacity: 0, rotate: -slashTilt }}
                  animate={{ opacity: 1, rotate: slashTilt }}
                  transition={{
                    opacity: { duration: 0.35, delay: slashFadeIn },
                    rotate: slashRotate,
                  }}
                />
              </motion.span>
            </span>
          </div>

          <motion.p
            {...fadeUp(intro + 0.45)}
            className="body-copy mt-5 max-w-xl"
          >
            I design and ship scalable web applications from front to back, with
            a soft spot for interfaces that make complex systems feel human.
          </motion.p>

          <motion.div
            {...fadeUp(intro + 0.6)}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <a
              href="#work"
              onClick={(event) => scrollToSection(event, "#work")}
              className="lux-cta"
              data-magnetic="0.25"
            >
              <span>View selected work</span>
              <span className="lux-cta-icon" aria-hidden="true">
                <ArrowUpRight size={17} strokeWidth={1.8} />
              </span>
            </a>
            <button
              type="button"
              onClick={openResumeModal}
              className="lux-link"
              data-magnetic="0.25"
            >
              Download resume
              <span className="lux-link-icon" aria-hidden="true">
                <Download size={14} strokeWidth={1.8} />
              </span>
            </button>
          </motion.div>

          <motion.div
            {...fadeUp(intro + 0.75, 12)}
            className="hero-stats mt-10"
          >
            <div className="hero-stat">
              {/* Counts up month by month to the experience since CAREER_START. */}
              <CountUp
                value={monthsBetween(CAREER_START)}
                format={formatYearsMonths}
                delay={0.85}
                className="hero-stat-value"
              />
              <span className="hero-stat-label">years building</span>
            </div>
            <div className="hero-stat">
              <CountUp
                value={10}
                suffix="+"
                delay={0.95}
                className="hero-stat-value"
              />
              <span className="hero-stat-label">shipped projects</span>
            </div>
            <div className="hero-stat hero-stat-location">
              <span className="hero-location-dot" aria-hidden="true" />
              <span className="hero-stat-label text-ink">India / Remote</span>
            </div>
          </motion.div>
        </div>

        <div
          data-hero-layer="card"
          className="relative z-10 mx-auto w-full max-w-[31rem] lg:ml-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: intro + 0.25, ease: luxEase }}
            className="relative"
          >
            <div className="hero-card-glow" aria-hidden="true" />
            <motion.div
              onPointerMove={handleCardMove}
              onPointerLeave={resetCard}
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 1200,
              }}
              className="hero-card"
            >
              <div className="hero-card-header">
                <div className="flex items-center gap-3">
                  <span className="hero-window-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="flex items-center gap-2 mono-font text-[0.66rem] tracking-[0.12em] text-paper/70">
                    <Code2 size={14} className="text-lime" strokeWidth={1.6} />
                    developer.config.ts
                  </span>
                </div>
                <span className="hero-online">
                  <span className="hero-online-dot" aria-hidden="true" /> online
                </span>
              </div>

              <motion.div
                className="relative z-10 py-6"
                initial="hidden"
                animate="show"
                transition={{
                  delayChildren: intro + 0.6,
                  staggerChildren: 0.06,
                }}
              >
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className="console-line"
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.5, ease: luxEase }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className={line.indent}>{line.content}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="hero-card-footer">
                <span>ships with care</span>
                <span className="text-coral">v.01</span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(intro + 0.9, 10)}
              className="mt-7 flex items-center justify-between gap-5"
            >
              <p className="mono-font max-w-[14rem] text-[0.62rem] uppercase leading-relaxed tracking-[0.1em] text-moss">
                The best work lives between engineering discipline and a little
                curiosity.
              </p>
              <a
                href="#about"
                onClick={(event) => scrollToSection(event, "#about")}
                aria-label="Scroll to about section"
                className="hero-scroll"
                data-magnetic="0.4"
              >
                <span className="hero-scroll-dot" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
