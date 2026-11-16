"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right" | "zoom" | "tilt" | "wipe" | "wipe-left" | "wipe-right" | "mask";
  as?: "div" | "section" | "li" | "article";
};

/** Fades/slides its children in the first time they scroll into view. */
export default function Reveal({ children, className = "", delay = 0, from = "up", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  // Next keeps visited pages alive in a hidden <Activity>; when one is shown again its effects
  // re-mount, so hide before paint and let the observer below play the entrance once more.
  useLayoutEffect(() => {
    // snap back to hidden without animating the way out (see [data-reveal-reset] in globals.css)
    if (shown) ref.current?.setAttribute("data-reveal-reset", "");
    setShown(false); // eslint-disable-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-runs whenever `shown` drops back to false, so the observers start only after the hidden state is committed
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    // fully clipped reveals (wipe / mask) can report no visible area, so measure their parent instead
    const clipped = from === "wipe" || from === "wipe-left" || from === "wipe-right" || from === "mask";
    const target = clipped && el.parentElement ? el.parentElement : el;

    let done = false;
    // nothing reveals until the hidden state has been painted for a frame, otherwise there is
    // no starting point and the transition is skipped (e.g. a kept-alive page being shown again)
    let ready = false;
    let raf = 0;
    const show = () => {
      if (done || !ready) return;
      done = true;
      el.removeAttribute("data-reveal-reset");
      setShown(true);
      cleanup();
    };
    // entered the viewport, or already scrolled past it
    const reached = () => target.getBoundingClientRect().top < window.innerHeight * 0.94;

    const io = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && show(), { threshold: 0.06 });
    io?.observe(target);

    // safety net alongside the observer: a cheap check once per frame while scrolling
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (reached()) show();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    let first = requestAnimationFrame(() => {
      first = requestAnimationFrame(() => {
        ready = true;
        if (reached()) show();
      });
    });

    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(first);
    }
    return cleanup;
  }, [from, shown]);

  const dir = {
    up: "",
    down: "reveal-down",
    left: "reveal-left",
    right: "reveal-right",
    zoom: "reveal-zoom",
    tilt: "reveal-tilt",
    wipe: "reveal-wipe",
    "wipe-left": "reveal-wipe-left",
    "wipe-right": "reveal-wipe-right",
    mask: "reveal-mask",
  }[from];
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${dir} ${shown ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
