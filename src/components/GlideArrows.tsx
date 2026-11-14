"use client";

import { ArrowLeft, ArrowRight } from "./Icons";

type W = Window & { __glideBy?: (dx: number) => void };

/**
 * Prev / next for the portfolio cards. When the desktop glide is running (Motion.tsx) they move the
 * pinned track; otherwise they scroll the swipeable rail directly.
 */
export default function GlideArrows() {
  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    const scene = (e.currentTarget as HTMLElement).closest('[data-scene="glide"]');
    const wrap = scene?.querySelector<HTMLElement>("[data-glide-wrap]");
    const card = scene?.querySelector<HTMLElement>("[data-glide-card]");
    const step = (card?.offsetWidth ?? 340) + 24;
    const glideBy = (window as W).__glideBy;
    if (scene?.classList.contains("h-glide") && glideBy) glideBy(dir * step);
    else wrap?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="flex gap-3">
      {([-1, 1] as const).map((d) => (
        <button
          key={d}
          onClick={(e) => go(d, e)}
          aria-label={d < 0 ? "Previous vertical" : "Next vertical"}
          className="grid place-items-center size-12 rounded-full border border-white/30 bg-white/5 backdrop-blur text-white hover:bg-white hover:text-ink transition-colors"
        >
          {d < 0 ? <ArrowLeft /> : <ArrowRight />}
        </button>
      ))}
    </div>
  );
}
