"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { isLiteMode } from "@/lib/lite-mode";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Atom,
  Boxes,
  Brain,
  Box,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  FileJson,
  Gauge,
  GitBranch,
  Globe,
  KeyRound,
  Layers3,
  MousePointer2,
  Network,
  Orbit,
  Palette,
  Server,
  Sparkles,
  Terminal,
  Triangle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SKILL_CATEGORIES, skillTier } from "@/data/skills";
import { trackSpotlight } from "@/lib/spotlight";
import SkillsMarquee from "@/components/SkillsMarquee";

const luxEase = [0.16, 1, 0.3, 1] as const;

// Two marquee rows drawn from the skill data, split roughly in half.
const allSkills = SKILL_CATEGORIES.flatMap((category) =>
  category.skills.map((skill) => skill.name),
);
const marqueeRows = [
  allSkills.slice(0, Math.ceil(allSkills.length / 2)),
  allSkills.slice(Math.ceil(allSkills.length / 2)),
];

const ICONS: Record<string, LucideIcon> = {
  Atom,
  Globe,
  Code: Code2,
  Palette,
  Layers: Layers3,
  FileJson,
  Server,
  Zap,
  Database,
  Cpu,
  Key: KeyRound,
  Sparkles,
  Terminal,
  Brain,
  MousePointer2,
  Orbit,
  Boxes,
  Gauge,
  Compass,
  Container: Box,
  GitBranch,
  Triangle,
  Cloud,
  Network,
  CheckCircle: CheckCircle2,
};

const DEPTH_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

// Hover tilt: the card leans toward the pointer and lifts slightly (mouse, desktop and tablet).
const tiltCard = (event: PointerEvent<HTMLElement>) => {
  trackSpotlight(event);
  if (event.pointerType !== "mouse" || isLiteMode() || !window.matchMedia(DEPTH_QUERY).matches)
    return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  gsap.to(event.currentTarget, {
    rotationX: (0.5 - y) * 5,
    rotationY: (x - 0.5) * 6,
    y: -4,
    transformPerspective: 1000,
    duration: 0.6,
    ease: "power3.out",
    overwrite: "auto",
  });
};

const resetTilt = (event: PointerEvent<HTMLElement>) => {
  gsap.to(event.currentTarget, {
    rotationX: 0,
    rotationY: 0,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    overwrite: "auto",
  });
};

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || isLiteMode()) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(grid);

    media.add(DEPTH_QUERY, () => {
      gsap.utils.toArray<HTMLElement>("[data-skill-card]").forEach((card) => {
        // Cards tip up out of a backward lean as they rise into view, tied to scroll position.
        gsap.fromTo(
          card,
          {
            rotationX: 14,
            y: 90,
            scale: 0.94,
            autoAlpha: 0.3,
            transformPerspective: 1400,
            transformOrigin: "50% 100%",
          },
          {
            rotationX: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 62%",
              scrub: 0.6,
            },
          },
        );

        // The background number and glow drift at their own speeds for depth inside the card.
        const passThrough = {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        };
        gsap.fromTo(
          card.querySelector("[data-skill-watermark]"),
          { yPercent: 35 },
          { yPercent: -35, ease: "none", scrollTrigger: passThrough },
        );
        gsap.fromTo(
          card.querySelector("[data-skill-orb]"),
          { yPercent: -25 },
          { yPercent: 35, ease: "none", scrollTrigger: { ...passThrough } },
        );

        // Skill rows cascade in once the card is mostly in view.
        gsap.from(card.querySelectorAll("[data-skill-row]"), {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 75%", once: true },
        });
      });
    });

    // Phones get a plain fade-up per card instead of the scroll-linked depth.
    media.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>("[data-skill-card]").forEach((card) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 32,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section id="skills" className="section-pad">
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura skills-aura-lime" />
        <span className="lux-aura skills-aura-coral" />
        <span className="lux-grain" />
      </div>

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: luxEase }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <span className="lux-pill">
              <span className="lux-pill-dot" aria-hidden="true" />
              The toolkit
            </span>
            <h2
              data-split
              className="display-title skills-title text-5xl sm:text-6xl lg:text-7xl"
            >
              Built for the whole <span className="lux-accent">picture.</span>
            </h2>
          </div>
          <div className="lux-card skills-note" onPointerMove={trackSpotlight}>
            <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-coral">
              01 / current stack
            </span>
            <p className="mt-3 text-sm leading-7 text-moss">
              Product-minded tools, systems thinking, and an AI-assisted
              workflow for turning ideas into dependable software.
            </p>
          </div>
        </motion.div>
      </div>

      <SkillsMarquee rows={marqueeRows} />

      <div className="site-container relative">
        <div ref={gridRef} className="grid gap-5 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => {
            const featured = category.title === "AI Innovation";

            return (
              // The wrapper carries the scroll animation; the card inside carries the hover tilt,
              // so the two transforms never overwrite each other.
              <div
                key={category.index}
                data-skill-card
                className={featured ? "md:col-span-2" : undefined}
              >
                <article
                  onPointerMove={tiltCard}
                  onPointerLeave={resetTilt}
                  data-category-index={category.index}
                  className="lux-card skill-category-card h-full"
                >
                  <span
                    className="skill-card-orb"
                    data-skill-orb
                    aria-hidden="true"
                  />
                  <span
                    className="skill-card-watermark"
                    data-skill-watermark
                    aria-hidden="true"
                  >
                    {category.index}
                  </span>

                  <div className="relative z-10 flex items-start justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <span className="skill-category-index">
                        {category.index}
                      </span>
                      <div>
                        <h3 className="display-font text-3xl font-medium leading-none tracking-[-0.06em]">
                          {category.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-moss">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <span className="skill-badge hidden sm:inline-flex">
                      {category.badge}
                    </span>
                  </div>

                  <div
                    className={`relative z-10 mt-8 grid gap-x-8 ${featured ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
                  >
                    {category.skills.map((skill, skillIndex) => {
                      const Icon = ICONS[skill.icon] ?? Code2;
                      const tier = skillTier(skill.level);

                      return (
                        <div
                          key={skill.name}
                          data-skill-row
                          className="skill-detail-card group/skill"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                              <span className="skill-icon" aria-hidden="true">
                                <Icon size={14} strokeWidth={1.7} />
                              </span>
                              <div className="min-w-0">
                                <p className="display-font truncate text-sm font-medium tracking-[-0.03em]">
                                  {skill.name}
                                </p>
                                <p className="mt-1 text-[0.62rem] leading-4 text-moss">
                                  {skill.description}
                                </p>
                              </div>
                            </div>
                            {/* A plain tier instead of a self-rated percentage; the three
                                segments fill in to match it when the row comes into view. */}
                            <div
                              className="skill-tier"
                              data-tier={tier.rank}
                              aria-label={`${skill.name}: ${tier.label}`}
                            >
                              <span className="skill-tier-label">{tier.label}</span>
                              <motion.span
                                className="skill-tier-meter"
                                aria-hidden="true"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: "some" }}
                                transition={{
                                  delayChildren: 0.2 + skillIndex * 0.04,
                                  staggerChildren: 0.1,
                                }}
                              >
                                {[1, 2, 3].map((step) => (
                                  <motion.span
                                    key={step}
                                    className={`skill-tier-step ${step <= tier.rank ? "is-filled" : ""}`}
                                    variants={{
                                      hidden: { scaleX: 0 },
                                      show: { scaleX: 1 },
                                    }}
                                    transition={{ duration: 0.6, ease: luxEase }}
                                  />
                                ))}
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
