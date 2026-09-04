"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MousePointer2, Play } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import ProjectStack from "@/components/ProjectStack";
import { scrollToSection } from "@/lib/scroll";

export default function Projects() {
  return (
    <section id="work" className="section-pad bg-ink text-paper">
      <div className="site-container">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="kicker text-paper/60">Selected work</span>
            <h2 className="display-font mt-5 max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.09em] text-paper sm:text-7xl lg:text-8xl">
              Systems with a point of view.
            </h2>
          </div>
          <div className="max-w-[15rem] border-l border-paper/25 pl-5 mono-font text-[0.66rem] uppercase leading-[1.8] tracking-[0.09em] text-paper/55">
            <MousePointer2
              size={16}
              className="mb-3 text-lime"
              strokeWidth={1.4}
            />
            Scroll to move through {PROJECTS.length} project builds. Each card
            is a small case study.
          </div>
        </div>

        <ProjectStack>
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              data-stack-card
              data-accent={
                index % 3 === 1 ? "coral" : index % 3 === 2 ? "teal" : "lime"
              }
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.7, delay: index * 0.04 }}
              className="project-card"
              style={{ zIndex: index + 1 }}
            >
              <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[0.93fr_1.07fr] lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paper/20 pb-4">
                    <span className="project-number">
                      {String(project.id).padStart(2, "0")} / 0{PROJECTS.length}
                    </span>
                    <div className="flex flex-wrap items-center justify-end gap-3">
                      <span className="mono-font text-right text-[0.62rem] uppercase tracking-[0.1em] text-paper/50">
                        {project.type}
                      </span>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-live-button"
                      >
                        Live project{" "}
                        <ExternalLink size={13} strokeWidth={1.7} />
                      </a>
                    </div>
                  </div>

                  <h3 className="display-font mt-8 text-5xl font-medium leading-[0.9] tracking-[-0.08em] text-paper sm:text-6xl">
                    {project.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-paper/70">
                    {project.description}
                  </p>

                  <div className="mt-7 border-l-2 border-lime pl-4">
                    <span className="mono-font text-[0.58rem] uppercase tracking-[0.12em] text-lime">
                      Highlights
                    </span>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-paper/75">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.techStack.map((technology) => (
                      <span
                        key={technology}
                        className="mono-font border border-paper/20 px-2.5 py-1.5 text-[0.6rem] text-paper/65"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div
                    className="project-image"
                    style={{
                      backgroundImage: `url("${project.fallbackImage}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Image
                      src={project.imageUrl}
                      alt={`${project.name} project preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 52vw"
                      className="object-cover"
                      onError={(event) => {
                        event.currentTarget.style.opacity = "0";
                      }}
                    />
                    <span className="absolute bottom-4 left-4 z-10 mono-font text-[0.58rem] uppercase tracking-[0.12em] text-paper/70">
                      {project.restrictedOnMobile
                        ? "Best viewed on desktop"
                        : "Responsive experience"}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`mono-font border px-2.5 py-1.5 text-[0.58rem] uppercase tracking-[0.08em] ${project.restrictedOnMobile ? "border-coral/50 text-coral" : "border-paper/20 text-paper/50"}`}
                    >
                      {project.restrictedOnMobile
                        ? "Desktop only"
                        : "Mobile ready"}
                    </span>
                    <a
                      href="#contact"
                      onClick={(event) => scrollToSection(event, "#contact")}
                      className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 mono-font text-[0.62rem] uppercase tracking-[0.1em] text-paper transition-colors hover:border-lime hover:text-lime"
                    >
                      Build something similar{" "}
                      <ArrowUpRight size={14} strokeWidth={1.6} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </ProjectStack>
      </div>
    </section>
  );
}
