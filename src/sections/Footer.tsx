'use client';

import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { CONTACT_EMAIL, NAV_LINKS, SOCIAL_LINKS } from "@/constants";
import { scrollToSection } from "@/lib/scroll";

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") return <Github size={16} strokeWidth={1.6} />;
  if (label === "LinkedIn") return <Linkedin size={16} strokeWidth={1.6} />;
  return <Twitter size={16} strokeWidth={1.6} />;
}

export default function Footer() {
  return (
    <footer className="footer-cta border-t border-paper/20 py-10">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <a
              href="#home"
              onClick={(event) => scrollToSection(event, "#home")}
              className="display-font text-3xl font-medium tracking-[-0.08em] text-paper"
            >
              VK<span className="text-coral">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-paper/55">
              Full stack developer building useful complexity into calm digital
              products.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="social-link border-paper/25 text-paper hover:bg-lime"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-16">
            <div>
              <span className="mono-font text-[0.6rem] uppercase tracking-[0.12em] text-paper/40">
                Explore
              </span>
              <nav aria-label="Footer navigation" className="mt-4 grid gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => scrollToSection(event, link.href)}
                    className="mono-font text-[0.65rem] uppercase tracking-[0.08em] text-paper/65 transition-colors hover:text-lime"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <span className="mono-font text-[0.6rem] uppercase tracking-[0.12em] text-paper/40">
                Say hello
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 flex items-center gap-2 text-sm text-paper transition-colors hover:text-lime"
              >
                {CONTACT_EMAIL} <ArrowUpRight size={14} />
              </a>
              <p className="mt-8 mono-font text-[0.6rem] uppercase tracking-[0.1em] text-paper/35">
                Built with Next.js / Love / Care
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-paper/15 pt-5 mono-font text-[0.58rem] uppercase tracking-[0.1em] text-paper/35 sm:flex-row">
          <span>© {new Date().getFullYear()} Vishal Kukde</span>
          <span>Available for remote collaboration</span>
        </div>
      </div>
    </footer>
  );
}
