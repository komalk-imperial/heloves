"use client";
/**
 * HELOVES motion system (modelled on the VIAZA site). Elements opt in with data attributes;
 * nothing here is required for content to show.
 *
 *   data-parallax="0.12"    soft scroll-linked parallax (fraction of element height)
 *   data-scrub-zoom         image slowly zooms out as it travels through the viewport
 *   data-drift              decorative element rotates and drifts while scrolling
 *   data-tone-layer         blend layer at the top of a dark section; fades out as the section arrives
 *   <Split>                 (component) headings rise word by word — rendered by React, not injected
 *   data-scene="glide"      vertical scroll becomes a horizontal glide (desktop, pinned)
 *
 * Reveals on enter are handled by <Reveal>. Smooth scroll (Lenis) runs on desktop pointers only.
 * prefers-reduced-motion switches everything off. GSAP loads lazily after first paint and every
 * trigger is reverted when the page changes.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type LenisLike = { raf: (t: number) => void; destroy: () => void; on: (e: string, f: () => void) => void; scrollTo: (t: number, o?: object) => void };
type W = Window & { __lenis?: LenisLike; __glideBy?: (dx: number) => void };
const mq = (q: string) => window.matchMedia(q).matches;
// Next keeps recently visited routes mounted but hidden (React Activity), so only visible elements count.
const visible = (el: HTMLElement) => (typeof el.checkVisibility === "function" ? el.checkVisibility() : el.offsetParent !== null);
const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s)).filter(visible);

export default function Motion() {
  const path = usePathname();

  // once: smooth momentum scrolling on desktop pointers
  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    if (mq("(prefers-reduced-motion: reduce)") || !mq("(pointer: fine)")) return;
    let raf = 0;
    let lenis: LenisLike | null = null;
    let dead = false;
    import("lenis").then(({ default: Lenis }) => {
      if (dead) return;
      lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }) as unknown as LenisLike;
      (window as W).__lenis = lenis;
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      window.dispatchEvent(new Event("heloves:lenis"));
    });
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as W).__lenis;
    };
  }, []);

  // per page: split headings, then scroll choreography
  useEffect(() => {
    const reduce = mq("(prefers-reduced-motion: reduce)");
    const desktop = mq("(min-width: 1024px)");
    let dead = false;
    let revert = () => {};

    // new page starts at the top
    (window as W).__lenis?.scrollTo(0, { immediate: true });

    if (reduce) return;

    const start = () =>
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (dead) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = (window as W).__lenis;
        if (lenis) lenis.on("scroll", () => ScrollTrigger.update());
        const k = desktop ? 1 : 0.5;
        const offs: (() => void)[] = [];

        const ctx = gsap.context(() => {
          // soft parallax
          $$("[data-parallax]").forEach((el) => {
            const a = parseFloat(el.dataset.parallax || "0.12") * k;
            gsap.fromTo(el, { yPercent: -a * 100 }, { yPercent: a * 100, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: 1 } });
          });

          // images zoom out gently while they pass through the viewport
          $$("[data-scrub-zoom]").forEach((el) => {
            gsap.fromTo(el, { scale: 1.18 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: 1.2 } });
          });

          // decorative drift
          $$("[data-drift]").forEach((el) =>
            gsap.fromTo(el, { rotation: -8, y: 30 * k }, { rotation: 6, y: -30 * k, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 } }),
          );

          // dark bands: the light tone at the top (rendered in JSX) fades away as the section arrives
          $$("[data-tone-layer]").forEach((tone) => {
            gsap.fromTo(tone, { opacity: 1 }, { opacity: 0, ease: "none", scrollTrigger: { trigger: tone.parentElement || tone, start: "top bottom", end: "top 30%", scrub: 1 } });
          });

          // horizontal glide (desktop): the section pins and the track slides sideways
          $$('[data-scene="glide"]').forEach((scene) => {
            if (!desktop) return;
            const track = scene.querySelector<HTMLElement>("[data-glide-track]");
            const wrap = track?.parentElement;
            const bar = scene.querySelector<HTMLElement>("[data-glide-bar]");
            if (!track || !wrap) return;
            scene.classList.add("h-glide");
            offs.push(() => scene.classList.remove("h-glide"));
            const dist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
            const SLOW = 1.4; // page pixels scrolled per pixel of sideways travel
            const tween = gsap.to(track, {
              x: () => -dist(),
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top top",
                end: () => "+=" + dist() * SLOW,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (s) => bar && (bar.style.transform = `scaleX(${s.progress})`),
              },
            });
            $$("[data-glide-img]", scene).forEach((img) =>
              gsap.fromTo(img, { xPercent: 8, scale: 1.2 }, { xPercent: -8, scale: 1.2, ease: "none", scrollTrigger: { trigger: img.closest("[data-glide-card]") || img, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }),
            );
            // ── direct controls: sideways swipe, mouse drag and arrow buttons all move the cards ──
            const st = tween.scrollTrigger!;
            const trackPos = () => st.progress * dist();
            const goTrack = (x: number, immediate = false) => {
              const clamped = Math.min(dist(), Math.max(0, x));
              const y = st.start + (clamped / (dist() || 1)) * (st.end - st.start);
              const l = (window as W).__lenis;
              if (l) l.scrollTo(y, immediate ? { immediate: true } : { duration: 0.9 });
              else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
            };
            (window as W).__glideBy = (dx: number) => goTrack(trackPos() + dx);
            offs.push(() => delete (window as W).__glideBy);

            const onWheel = (e: WheelEvent) => {
              const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
              if (!dx || !st.isActive) return;
              e.preventDefault();
              goTrack(trackPos() + dx, true);
            };
            scene.addEventListener("wheel", onWheel, { passive: false });

            let drag: { x: number; pos: number } | null = null;
            let moved = false;
            const onDown = (e: PointerEvent) => {
              if (e.pointerType !== "mouse" || e.button !== 0) return;
              drag = { x: e.clientX, pos: trackPos() };
              moved = false;
            };
            const onMove = (e: PointerEvent) => {
              if (!drag) return;
              const dx = e.clientX - drag.x;
              if (Math.abs(dx) > 5) {
                moved = true;
                wrap.style.cursor = "grabbing";
              }
              if (moved) goTrack(drag.pos - dx, true);
            };
            const onUp = () => {
              drag = null;
              wrap.style.cursor = "";
            };
            // a drag should not also count as a click on the card underneath
            const onClick = (e: MouseEvent) => {
              if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
              }
            };
            const noDrag = (e: DragEvent) => e.preventDefault();
            wrap.addEventListener("pointerdown", onDown);
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
            wrap.addEventListener("click", onClick, true);
            wrap.addEventListener("dragstart", noDrag);
            offs.push(() => {
              scene.removeEventListener("wheel", onWheel);
              wrap.removeEventListener("pointerdown", onDown);
              window.removeEventListener("pointermove", onMove);
              window.removeEventListener("pointerup", onUp);
              wrap.removeEventListener("click", onClick, true);
              wrap.removeEventListener("dragstart", noDrag);
            });

            $$("[data-glide-card]", scene).forEach((card, i) =>
              gsap.fromTo(card, { y: i % 2 ? 60 : -30, rotate: i % 2 ? 2 : -2 }, { y: 0, rotate: 0, ease: "power2.out", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: 1 } }),
            );
          });
        });

        // re-measure once fonts and late images settle
        let t = 0;
        const refresh = () => {
          clearTimeout(t);
          t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
        };
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        const onImg = (e: Event) => {
          if ((e.target as HTMLElement).tagName === "IMG") refresh();
        };
        document.addEventListener("load", onImg, true);
        refresh();

        revert = () => {
          clearTimeout(t);
          window.removeEventListener("load", refresh);
          document.removeEventListener("load", onImg, true);
          offs.forEach((f) => f());
          ctx.revert();
        };
      });

    // start only after the page has loaded and the browser is idle, so React has finished hydrating
    const idle = (window as Window & { requestIdleCallback?: (f: () => void) => number }).requestIdleCallback;
    const kick = () => (idle ? idle(start) : setTimeout(start, 200));
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });

    return () => {
      dead = true;
      window.removeEventListener("load", kick);
      revert();
    };
  }, [path]);

  return null;
}
