"use client";

import { motion } from "framer-motion";
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
import { SKILL_CATEGORIES } from "@/data/skills";
import { trackSpotlight } from "@/lib/spotlight";

const luxEase = [0.16, 1, 0.3, 1] as const;

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

export default function Skills() {
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
            <h2 className="display-title skills-title text-5xl sm:text-6xl lg:text-7xl">
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

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => {
            const featured = category.title === "AI Innovation";

            return (
              <motion.article
                key={category.index}
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1, delay: (index % 2) * 0.1, ease: luxEase }}
                onPointerMove={trackSpotlight}
                data-category-index={category.index}
                className={`lux-card skill-category-card ${featured ? "md:col-span-2" : ""}`}
              >
                <div className="relative z-10 flex items-start justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <span className="skill-category-index">{category.index}</span>
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

                    return (
                      <div key={skill.name} className="skill-detail-card group/skill">
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
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                        {/* The track watches the viewport: the fill starts at zero width, which
                            intersection checks can miss, so it only follows the track's state. */}
                        <motion.div
                          className="skill-level-track"
                          aria-label={`${skill.name} proficiency ${skill.level}%`}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: "some" }}
                        >
                          <motion.div
                            variants={{
                              hidden: { scaleX: 0 },
                              show: { scaleX: skill.level / 100 },
                            }}
                            transition={{
                              duration: 1.2,
                              delay: 0.15 + skillIndex * 0.04,
                              ease: luxEase,
                            }}
                            className="skill-level-fill"
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
