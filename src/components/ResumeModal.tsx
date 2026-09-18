"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Github, Linkedin, Mail, X } from "lucide-react";
import {
  CONTACT_EMAIL,
  RESUME_AVAILABLE,
  RESUME_URL,
  SOCIAL_LINKS,
} from "@/constants";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { onResumeModalOpen } from "@/lib/resume";
import PdfViewer from "@/components/PdfViewer";

const luxEase = [0.16, 1, 0.3, 1] as const;

const socialHref = (label: string) =>
  SOCIAL_LINKS.find((link) => link.label === label)?.href ?? "#";

// Resume dialog. With RESUME_AVAILABLE on it previews the PDF and offers a download; with it off
// it shows a "coming soon" note. The contact buttons are always there.
export default function ResumeModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      onResumeModalOpen(() => {
        returnFocus.current = document.activeElement as HTMLElement | null;
        setOpen(true);
      }),
    [],
  );

  useEffect(() => {
    if (!open) return undefined;
    lockScroll("resume-modal");
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      // Keep keyboard focus inside the dialog while it is open.
      if (event.key === "Tab" && dialog) {
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      unlockScroll("resume-modal");
      returnFocus.current?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={close}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className={`resume-modal ${RESUME_AVAILABLE ? "" : "is-compact"}`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.6, ease: luxEase }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="resume-modal-header">
              <span className="resume-modal-icon" aria-hidden="true">
                <FileText size={18} strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <span className="resume-modal-kicker">Resume</span>
                <h2 id="resume-modal-title" className="resume-modal-title">
                  Vishal Kukde
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="resume-modal-close"
                aria-label="Close"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {RESUME_AVAILABLE ? (
              <div className="resume-modal-preview">
                <PdfViewer url={RESUME_URL} />
              </div>
            ) : (
              <div className="resume-modal-soon">
                <h3 className="resume-modal-soon-title">
                  Coming <span className="lux-accent">soon.</span>
                </h3>
                <p className="resume-modal-soon-text">
                  My resume isn&apos;t available yet. It will be here soon. In
                  the meantime, you can reach me directly:
                </p>
              </div>
            )}

            <div className="resume-modal-actions">
              {RESUME_AVAILABLE && (
                <a
                  href={RESUME_URL}
                  download
                  className="resume-modal-action is-primary"
                  data-autofocus
                >
                  <Download size={16} strokeWidth={1.7} aria-hidden="true" />{" "}
                  Download
                </a>
              )}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`resume-modal-action ${RESUME_AVAILABLE ? "" : "is-primary"}`}
                data-autofocus={RESUME_AVAILABLE ? undefined : true}
              >
                <Mail size={16} strokeWidth={1.7} aria-hidden="true" /> Email
              </a>
              <a
                href={socialHref("GitHub")}
                target="_blank"
                rel="noreferrer"
                className="resume-modal-action"
              >
                <Github size={16} strokeWidth={1.7} aria-hidden="true" /> GitHub
              </a>
              <a
                href={socialHref("LinkedIn")}
                target="_blank"
                rel="noreferrer"
                className="resume-modal-action"
              >
                <Linkedin size={16} strokeWidth={1.7} aria-hidden="true" />{" "}
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
