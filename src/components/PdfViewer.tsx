"use client";

import { useEffect, useRef, useState } from "react";

interface PdfViewerProps {
  url: string;
  className?: string;
}

// Renders every page of a PDF onto canvases inside a normal scrollable element, so the
// scrollbar can be styled like the rest of the site (the browser's built-in viewer can't be).
export default function PdfViewer({ url, className }: PdfViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const scroller = scrollRef.current;
    const pages = pagesRef.current;
    if (!scroller || !pages) return undefined;

    let cancelled = false;
    let resizeTimer: number | undefined;
    let lastWidth = 0;
    let destroyDocument: (() => void) | undefined;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        // Served as a static file from /public: Next can't bundle this worker itself.
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjs.getDocument(url);
        destroyDocument = () => loadingTask.destroy();
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        // Draws all pages at the current width, sharp on high-density screens.
        const render = async () => {
          const width = pages.clientWidth;
          if (!width || width === lastWidth) return;
          lastWidth = width;
          const ratio = window.devicePixelRatio || 1;
          const canvases: HTMLCanvasElement[] = [];

          for (let number = 1; number <= pdf.numPages; number += 1) {
            const page = await pdf.getPage(number);
            if (cancelled) return;
            const base = page.getViewport({ scale: 1 });
            const viewport = page.getViewport({ scale: (width / base.width) * ratio });
            const canvas = document.createElement("canvas");
            canvas.className = "pdf-viewer-page";
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            canvas.setAttribute("aria-label", `Page ${number} of ${pdf.numPages}`);
            const context = canvas.getContext("2d");
            if (!context) continue;
            await page.render({ canvasContext: context, viewport }).promise;
            canvases.push(canvas);
          }

          if (!cancelled) {
            pages.replaceChildren(...canvases);
            setStatus("ready");
          }
        };

        await render();
        const observer = new ResizeObserver(() => {
          window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(render, 150);
        });
        observer.observe(pages);
        const previousDestroy = destroyDocument;
        destroyDocument = () => {
          observer.disconnect();
          previousDestroy?.();
        };
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      destroyDocument?.();
    };
  }, [url]);

  return (
    // data-lenis-prevent lets this element scroll natively while Lenis holds the page still.
    <div ref={scrollRef} className={`pdf-viewer lux-scrollbar ${className ?? ""}`} data-lenis-prevent>
      {status === "loading" && <p className="pdf-viewer-status">Loading preview…</p>}
      {status === "error" && (
        <p className="pdf-viewer-status">The preview couldn&apos;t load. Use Download below instead.</p>
      )}
      <div ref={pagesRef} className="pdf-viewer-pages" />
    </div>
  );
}
