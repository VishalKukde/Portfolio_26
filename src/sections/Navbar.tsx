"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { scrollToSection } from "@/lib/scroll";
import { sectionAt, themeOf, type SectionTheme } from "@/lib/sections";
import { lockScroll, unlockScroll } from "@/lib/lenis";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<SectionTheme>("light");
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Match the section currently behind the bar so it stays legible on dark and coral backgrounds.
      const bar = barRef.current;
      if (!bar) return;
      const header = bar.parentElement;
      const centerX = window.innerWidth / 2;
      const { top, height } = bar.getBoundingClientRect();
      setTheme(themeOf(sectionAt(centerX, top + height / 2, header)));

      // The active link follows whichever section fills the middle of the screen.
      const inView = sectionAt(centerX, window.innerHeight / 2, header);
      const href = inView?.tagName === "FOOTER" ? "#contact" : inView ? `#${inView.id}` : null;
      setActiveHref(NAV_LINKS.some((link) => link.href === href) ? href : null);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // The open mobile menu freezes the page underneath it.
  useEffect(() => {
    if (!menuOpen) return undefined;
    lockScroll("mobile-menu");
    return () => unlockScroll("mobile-menu");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      data-theme={theme}
      className={`site-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div
        ref={barRef}
        className={`site-nav-bar site-container flex items-center justify-between gap-4 rounded-2xl border p-2 pr-2.5 ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <a
          href="#home"
          onClick={(event) => {
            closeMenu();
            scrollToSection(event, "#home");
          }}
          className="group flex items-center gap-3"
        >
          <span className="site-nav-logo display-font flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold tracking-[-0.1em] transition-transform group-hover:rotate-6">
            VK
          </span>
          <span className="site-nav-name mono-font hidden text-[0.66rem] uppercase tracking-[0.12em] sm:block">
            Vishal Kukde
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = link.href === activeHref;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => scrollToSection(event, link.href)}
                aria-current={active ? "location" : undefined}
                className={`nav-link ${active ? "is-active" : ""}`}
              >
                {link.label}
                {active && (
                  // Shared layoutId makes the bar glide from the previous link to this one.
                  <motion.span
                    layoutId="nav-active-bar"
                    className="nav-active-bar"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={(event) => scrollToSection(event, "#contact")}
          className="button-primary nav-cta hidden sm:inline-flex"
          data-magnetic="0.25"
        >
          Let&apos;s talk <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="menu-button md:hidden"
        >
          {menuOpen ? (
            <X size={19} strokeWidth={1.8} />
          ) : (
            <Menu size={19} strokeWidth={1.8} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            aria-label="Mobile navigation"
            className="site-container mt-2 rounded-2xl border border-ink bg-paper p-5 shadow-ink md:hidden"
          >
            <div className="grid gap-4">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    closeMenu();
                    scrollToSection(event, link.href);
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  aria-current={link.href === activeHref ? "location" : undefined}
                  className={`display-font flex items-center justify-between border-b border-ink/15 pb-3 text-2xl font-medium tracking-[-0.06em] ${
                    link.href === activeHref ? "text-coral" : ""
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={17} strokeWidth={1.7} />
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
