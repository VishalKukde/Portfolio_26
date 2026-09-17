"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Monitor,
  MousePointer2,
  Smartphone,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";
import ProjectStack from "@/components/ProjectStack";
import { scrollToSection } from "@/lib/scroll";
import { trackSpotlight } from "@/lib/spotlight";

const luxEase = [0.16, 1, 0.3, 1] as const;

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default function Projects() {
  return (
    <section
      id="work"
      data-nav-theme="dark"
      className="projects-lux section-pad bg-ink text-paper"
    >
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura projects-aura-lime" />
        <span className="lux-aura projects-aura-coral" />
        <span className="lux-grain" />
      </div>

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: luxEase }}
          className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <span className="lux-pill projects-pill">
              <span className="lux-pill-dot" aria-hidden="true" />
              Selected work
            </span>
            <h2 className="display-font mt-6 max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.08em] text-paper sm:text-7xl lg:text-8xl">
              Systems with a <span className="lux-accent">point of view.</span>
            </h2>
          </div>
          <div className="projects-note">
            <span className="projects-note-icon" aria-hidden="true">
              <MousePointer2 size={15} strokeWidth={1.5} />
            </span>
            <p>
              Scroll to move through {PROJECTS.length} project builds. Each card
              is a small case study.
            </p>
          </div>
        </motion.div>

        <ProjectStack>
          {PROJECTS.map((project, index) => (
            // GSAP drives the wrapper on desktop; Framer keeps the entrance on the card.
            <div key={project.id} data-stack-card style={{ zIndex: index + 1 }}>
              <motion.article
                data-accent={
                  index % 3 === 1 ? "coral" : index % 3 === 2 ? "teal" : "lime"
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.9, delay: index * 0.04, ease: luxEase }}
                onPointerMove={trackSpotlight}
                className="project-card h-full"
              >
                <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="project-number">
                          {String(project.id).padStart(2, "0")} / 0
                          {PROJECTS.length}
                        </span>
                        <span className="project-chip">{project.type}</span>
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-live-button"
                      >
                        Live project
                        <span className="project-live-icon" aria-hidden="true">
                          <ArrowUpRight size={13} strokeWidth={2} />
                        </span>
                      </a>
                    </div>

                    <h3 className="display-font mt-8 text-5xl font-medium leading-[0.9] tracking-[-0.07em] text-paper sm:text-6xl">
                      {project.name}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-7 text-paper/65">
                      {project.description}
                    </p>

                    <div className="project-highlights">
                      <span className="project-highlights-label">Highlights</span>
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="project-highlight">
                            <span className="project-highlight-check" aria-hidden="true">
                              <Check size={10} strokeWidth={2.6} />
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.techStack.map((technology) => (
                        <span key={technology} className="project-tech">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="project-frame">
                      <div className="project-frame-bar">
                        <span className="hero-window-dots" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                        </span>
                        <span className="project-frame-url">
                          {hostname(project.url)}
                        </span>
                      </div>
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
                        <span className="project-image-label">
                          {project.restrictedOnMobile
                            ? "Best viewed on desktop"
                            : "Responsive experience"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`project-chip ${project.restrictedOnMobile ? "is-warning" : ""}`}
                      >
                        {project.restrictedOnMobile ? (
                          <Monitor size={12} strokeWidth={1.8} aria-hidden="true" />
                        ) : (
                          <Smartphone size={12} strokeWidth={1.8} aria-hidden="true" />
                        )}
                        {project.restrictedOnMobile
                          ? "Desktop only"
                          : "Mobile ready"}
                      </span>
                      <a
                        href="#contact"
                        onClick={(event) => scrollToSection(event, "#contact")}
                        className="lux-link projects-link"
                      >
                        Build something similar
                        <span className="lux-link-icon" aria-hidden="true">
                          <ArrowUpRight size={14} strokeWidth={1.8} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </ProjectStack>
      </div>
    </section>
  );
}
