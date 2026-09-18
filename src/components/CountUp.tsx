"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { onSplashDone } from "@/lib/splash";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  /** Custom display for the running value; overrides decimals and suffix. */
  format?: (current: number) => string;
  /** Seconds to wait after the number becomes visible (e.g. to line up with a fade-in). */
  delay?: number;
  duration?: number;
  className?: string;
}

// Renders the final number on the server, then counts up from zero the first time it's seen.
// Watching only starts once the splash has lifted, since the splash hides numbers that are
// technically on screen underneath it.
export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  format: formatValue,
  delay = 0,
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const format = (current: number) =>
      formatValue ? formatValue(current) : `${current.toFixed(decimals)}${suffix}`;
    // The server-rendered text can be stale (e.g. a date-based value from build time), so
    // always write the current final value first.
    element.textContent = format(value);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const counter = { current: 0 };
    element.textContent = format(0);
    let tween: gsap.core.Tween | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        tween = gsap.to(counter, {
          current: value,
          duration,
          delay,
          ease: "power3.out",
          onUpdate: () => {
            element.textContent = format(counter.current);
          },
        });
      },
      { threshold: 0.6 },
    );
    const stopWaiting = onSplashDone(() => observer.observe(element));

    return () => {
      stopWaiting();
      observer.disconnect();
      tween?.kill();
      element.textContent = format(value);
    };
  }, [value, decimals, suffix, delay, duration, formatValue]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
      suppressHydrationWarning
    >
      {formatValue ? formatValue(value) : `${value.toFixed(decimals)}${suffix}`}
    </span>
  );
}
