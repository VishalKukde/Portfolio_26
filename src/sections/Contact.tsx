'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Mail, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '@/constants';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <section id="contact" className="section-pad bg-coral">
      <div className="site-container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <span className="kicker text-ink/70">One more thing</span>
            <h2 className="display-font mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.1em] text-ink sm:text-8xl">
              Let&apos;s make something useful.
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-ink/75">
              Have a product to shape, a system to untangle, or a team that needs another thoughtful builder? My inbox is open.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 mono-font text-[0.68rem] uppercase tracking-[0.1em] text-ink hover:border-paper hover:text-paper">
              <Mail size={15} strokeWidth={1.7} /> {CONTACT_EMAIL}
            </a>
          </div>

          <div className="border-t border-ink/30 pt-5">
            {submitted ? (
              <div className="flex min-h-[20rem] flex-col justify-center border border-ink bg-coral p-6 sm:p-10">
                <span className="mono-font text-[0.65rem] uppercase tracking-[0.12em] text-ink/60">Your email client should be opening now.</span>
                <h3 className="display-font mt-5 max-w-lg text-4xl font-medium leading-none tracking-[-0.08em] text-ink sm:text-6xl">Thanks for reaching out.</h3>
                <button type="button" onClick={() => { setSubmitted(false); setForm(initialForm); }} className="mt-8 inline-flex w-fit items-center gap-2 border-b border-ink pb-1 mono-font text-[0.65rem] uppercase tracking-[0.1em] text-ink">
                  Send another note <ArrowUpRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <label className="block">
                  <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-ink/60">Your name</span>
                  <input required minLength={2} type="text" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Alex Morgan" className="input-field" />
                </label>
                <label className="block">
                  <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-ink/60">Email address</span>
                  <input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="alex@company.com" className="input-field" />
                </label>
                <label className="block">
                  <span className="mono-font text-[0.62rem] uppercase tracking-[0.12em] text-ink/60">What are we building?</span>
                  <textarea required minLength={10} rows={4} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="A sentence or two about the challenge..." className="input-field resize-none" />
                </label>
                <button type="submit" className="button-primary border-ink bg-ink text-paper shadow-none hover:bg-paper hover:text-ink">
                  Open an email draft <Send size={15} strokeWidth={1.7} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
