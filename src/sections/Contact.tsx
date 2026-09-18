'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '@/constants';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };
const luxEase = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const updateField = (field: keyof FormState, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Project enquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section id="contact" data-nav-theme="coral" className="contact-lux section-pad bg-coral">
      <div className="lux-ambient" aria-hidden="true">
        <span className="lux-aura contact-aura-lime" />
        <span className="lux-aura contact-aura-deep" />
        <span className="lux-grain" />
      </div>

      <div className="site-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: luxEase }}
          >
            <span className="lux-pill contact-pill">
              <span className="lux-pill-dot" aria-hidden="true" />
              One more thing
            </span>
            <h2 data-split className="display-font contact-title mt-6 text-6xl font-medium leading-[0.9] text-ink sm:text-8xl">
              Let&apos;s make something <span className="lux-accent">useful.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-ink/75">
              Have a product to shape, a system to untangle, or a team that needs another thoughtful builder? My inbox is open.
            </p>

            <div className="contact-email mt-9">
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email-link">
                <span className="contact-email-icon" aria-hidden="true">
                  <Mail size={16} strokeWidth={1.7} />
                </span>
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="contact-copy"
                data-magnetic="0.45"
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                {copied ? <Check size={15} strokeWidth={2} /> : <Copy size={15} strokeWidth={1.7} />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email copied to clipboard' : ''}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, delay: 0.1, ease: luxEase }}
            className="contact-card"
          >
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: luxEase }}
                  className="flex min-h-[22rem] flex-col justify-center"
                >
                  <span className="contact-success-icon" aria-hidden="true">
                    <Check size={22} strokeWidth={2} />
                  </span>
                  <span className="mt-7 mono-font text-[0.65rem] uppercase tracking-[0.12em] text-ink/60">Your email client should be opening now.</span>
                  <h3 className="display-font mt-4 max-w-lg text-4xl font-medium leading-none tracking-[-0.07em] text-ink sm:text-6xl">Thanks for reaching out.</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                    }}
                    className="contact-link mt-8"
                  >
                    Send another note <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: luxEase }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="contact-label">Your name</span>
                      <input required minLength={2} type="text" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Alex Morgan" className="input-field" />
                    </label>
                    <label className="block">
                      <span className="contact-label">Email address</span>
                      <input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="alex@company.com" className="input-field" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="contact-label">What are we building?</span>
                    <textarea required minLength={10} rows={5} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="A sentence or two about the challenge..." className="input-field resize-none" />
                  </label>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button type="submit" className="lux-cta" data-magnetic="0.25">
                      <span>Open an email draft</span>
                      <span className="lux-cta-icon" aria-hidden="true">
                        <Send size={16} strokeWidth={1.7} />
                      </span>
                    </button>
                    <span className="mono-font text-[0.58rem] uppercase tracking-[0.12em] text-ink/65">Opens in your mail app</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
