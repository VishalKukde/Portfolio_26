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
    <section id="skills" className="section-pad bg-paper-deep/50">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-8 border-b border-ink/20 pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="kicker">The toolkit</span>
            <h2 className="display-title text-5xl sm:text-6xl lg:text-7xl">
              Built for the whole picture.
            </h2>
          </div>
          <div className="max-w-sm border-l-2 border-coral pl-5">
            <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-moss">
              01 / current stack
            </span>
            <p className="mt-3 text-sm leading-7 text-moss">
              Product-minded tools, systems thinking, and an AI-assisted
              workflow for turning ideas into dependable software.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.article
              key={category.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              data-category-index={category.index}
              className={`skill-category-card ${category.title === "AI Innovation" ? "md:col-span-2" : ""}`}
            >
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  <span className="skill-category-index">{category.index}</span>
                  <div>
                    <h3 className="display-font text-3xl font-medium leading-none tracking-[-0.07em]">
                      {category.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-moss">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span className="mono-font hidden border border-ink/20 px-2.5 py-1.5 text-[0.55rem] uppercase tracking-[0.08em] text-moss sm:block">
                  {category.badge}
                </span>
              </div>

              <div
                className={`relative z-10 mt-8 grid gap-x-8 gap-y-0 ${category.title === "AI Innovation" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
              >
                {category.skills.map((skill) => {
                  const Icon = ICONS[skill.icon] ?? Code2;

                  return (
                    <div
                      key={skill.name}
                      className="skill-detail-card group/skill"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-2.5">
                          <Icon
                            size={15}
                            strokeWidth={1.6}
                            className="mt-0.5 flex-none text-coral transition-transform group-hover/skill:scale-110"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="display-font truncate text-sm font-medium tracking-[-0.04em]">
                              {skill.name}
                            </p>
                            <p className="mt-1 text-[0.62rem] leading-4 text-moss">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <span className="mono-font flex-none text-[0.58rem] text-moss">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="skill-level-track"
                        aria-label={`${skill.name} proficiency ${skill.level}%`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="skill-level-fill"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
