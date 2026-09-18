"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import {
  CONTACT_EMAIL,
  NAV_LINKS,
  PREVIOUS_VERSIONS,
  SOCIAL_LINKS,
} from "@/constants";
import { scrollToSection } from "@/lib/scroll";

const luxEase = [0.16, 1, 0.3, 1] as const;

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") return <Github size={16} strokeWidth={1.6} />;
  if (label === "LinkedIn") return <Linkedin size={16} strokeWidth={1.6} />;
  return <Twitter size={16} strokeWidth={1.6} />;
}

// Sizes the name so it spans the full footer width edge to edge, then lets each letter rise in.
function FooterWordmark({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const word = textRef.current;
    if (!wrap || !word) return undefined;

    const BASE_SIZE = 100;
    const fit = () => {
      word.style.fontSize = `${BASE_SIZE}px`;
      const ratio = wrap.clientWidth / word.getBoundingClientRect().width;
      word.style.fontSize = `${BASE_SIZE * ratio}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // Scroll-linked stretch: over the last stretch of the page the name grows taller from its
  // bottom edge, reaching its limit at the very bottom. It follows the scroll position exactly,
  // so it holds wherever you stop and only shrinks as you scroll back up.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (
      !wrap ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    // The footer layout is untouched: the letters grow upward behind the footer content.
    const MAX_STRETCH = 0.35;
    // Phones skip the stretch; it is a desktop and tablet scroll effect.
    const phone = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (phone.matches) {
        wrap.style.transform = "";
        return;
      }
      const zone = wrap.offsetHeight * (1 + MAX_STRETCH);
      const remaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      const progress = Math.min(1, Math.max(0, 1 - remaining / zone));
      wrap.style.transform = `scaleY(${1 + progress * MAX_STRETCH})`;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    requestUpdate();
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(wrap);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      wrap.style.transform = "";
    };
  }, []);

  return (
    <div ref={wrapRef} className="footer-wordmark" aria-hidden="true">
      <motion.span
        ref={textRef}
        className="footer-wordmark-text"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {Array.from(text).map((char, index) => (
          <motion.span
            key={index}
            className="footer-wordmark-char"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 1.1, ease: luxEase }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="footer-lux">
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura footer-aura-lime" />
        <span className="lux-aura footer-aura-coral" />
        <span className="lux-grain" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: luxEase }}
        className="site-container relative z-10 pt-16 md:pt-20"
      >
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-10">
          <div>
            <a
              href="#home"
              onClick={(event) => scrollToSection(event, "#home")}
              className="footer-brand"
            >
              VK<span className="text-coral">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-paper/55">
              Senior full stack developer building useful complexity into calm
              digital products.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="social-link"
                  data-magnetic="0.45"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="footer-heading">Explore</span>
            <nav aria-label="Footer navigation" className="mt-5 grid gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link.href)}
                  className="footer-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <span className="footer-heading">Say hello</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email mt-5">
              <span className="truncate">{CONTACT_EMAIL}</span>
              <span className="footer-email-icon" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </span>
            </a>

            <span className="footer-heading mt-8 block">Previous versions</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {PREVIOUS_VERSIONS.map((version) => (
                <a
                  key={version.href}
                  href={version.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${version.label} portfolio (opens in a new tab)`}
                  className="footer-version"
                  data-magnetic="0.25"
                >
                  <span className="footer-version-year">{version.label}</span>
                  <span className="footer-version-url">Portfolio</span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            <p className="mt-8 mono-font text-[0.6rem] uppercase tracking-[0.1em] text-paper/35">
              Built with Next.js / Love / Care
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vishal Kukde</span>
          <span className="flex items-center gap-2"></span>
          <a
            href="#home"
            onClick={(event) => scrollToSection(event, "#home")}
            aria-label="Back to top"
            className="footer-top"
            data-magnetic="0.45"
          >
            <ArrowUp size={15} strokeWidth={1.8} />
          </a>
        </div>
      </motion.div>

      <FooterWordmark text="Vishal Kukde" />
    </footer>
  );
}
