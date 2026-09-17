"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { scrollToSection } from "@/lib/scroll";

type NavTheme = "light" | "dark" | "coral";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<NavTheme>("light");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Match the section currently behind the bar so it stays legible on dark and coral backgrounds.
      const bar = barRef.current;
      if (!bar) return;
      const { top, height } = bar.getBoundingClientRect();
      const probe = top + height / 2;
      const section = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      ).find((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= probe && rect.bottom >= probe;
      });
      setTheme((section?.dataset.navTheme as NavTheme | undefined) ?? "light");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToSection(event, link.href)}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(event) => scrollToSection(event, "#contact")}
          className="button-primary nav-cta hidden sm:inline-flex"
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
                  className="display-font flex items-center justify-between border-b border-ink/15 pb-3 text-2xl font-medium tracking-[-0.06em]"
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
