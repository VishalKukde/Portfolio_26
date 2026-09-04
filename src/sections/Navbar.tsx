'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
import { scrollToSection } from '@/lib/scroll';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 py-4 transition-all duration-300 md:px-8 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`site-container flex items-center justify-between border-b pb-3 transition-all duration-300 ${
          scrolled ? 'border-ink/20 backdrop-blur-md' : 'border-ink/10'
        }`}
      >
        <a href="#home" onClick={(event) => { closeMenu(); scrollToSection(event, '#home'); }} className="group flex items-center gap-3">
          <span className="display-font flex h-9 w-9 items-center justify-center bg-ink text-sm font-bold tracking-[-0.1em] text-lime transition-transform group-hover:rotate-6">
            VK
          </span>
          <span className="mono-font hidden text-[0.66rem] uppercase tracking-[0.12em] text-ink sm:block">
            Vishal Kukde / 2026
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" onClick={(event) => scrollToSection(event, '#contact')} className="button-primary hidden min-h-0 px-4 py-2 text-[0.62rem] sm:inline-flex">
          Let&apos;s talk <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
          className="menu-button md:hidden"
        >
          {menuOpen ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            aria-label="Mobile navigation"
            className="site-container mt-2 border border-ink bg-paper p-5 shadow-ink md:hidden"
          >
            <div className="grid gap-4">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => { closeMenu(); scrollToSection(event, link.href); }}
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
