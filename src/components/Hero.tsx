"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, type IconName } from "@/lib/catalog";
import { ArrowRight, CloseIcon, GlobeIcon, PlayIcon, StarIcon, VerticalIcon } from "./Icons";

const slides = [
  {
    eyebrow: "A Diverse World. One Vision.",
    title: ["Creating Better", "Experiences"],
    text: "Premium lifestyle products for a healthier, happier and more inspired life.",
    image: "/images/hero-woman.jpg",
    alt: "Woman with arms open in warm morning light",
  },
  {
    eyebrow: "Rooted in Nature. Backed by Science.",
    title: ["Wellness for", "Every Day"],
    text: "From raw honey to Ayurvedic botanicals — goodness you can trust, made with care.",
    image: "/images/hero-yoga.jpg",
    alt: "Yoga at sunset",
  },
  {
    eyebrow: "Six Verticals. One Promise.",
    title: ["Experiences", "Without Limits"],
    text: "Fragrance, water, fashion, honey, wellness and live expos across India and beyond.",
    image: "/images/hero-woman-city.jpg",
    alt: "Woman overlooking the city with arms outstretched",
  },
];

type Tile = { href: string; title: string; image: string; icon: IconName; tag: string };
const tiles: Tile[] = [
  ...categories.map((c) => ({ href: `/category/${c.slug}`, title: c.vertical, image: c.card, icon: c.icon, tag: c.subs.slice(0, 2).join(" · ") })),
  { href: "/expo", title: "Expo & Events", image: "/images/v-expo.jpg", icon: "calendar" as const, tag: "4 cities · 2026–27" },
];
const colA = [tiles[0], tiles[2], tiles[4]];
const colB = [tiles[1], tiles[3], tiles[5]];

export default function Hero() {
  const [i, setI] = useState(0);
  const [video, setVideo] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  // gentle mouse parallax via CSS variables (no re-render)
  const onMove = (e: React.MouseEvent) => {
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const s = slides[i];

  return (
    <section
      ref={root}
      onMouseMove={onMove}
      className="relative -mt-[84px] overflow-hidden min-h-[760px] lg:h-[min(900px,100vh)] lg:min-h-[780px] [--mx:0] [--my:0]"
    >
      {/* ── colour background ── */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#fbf4ea_0%,#f8e6cf_35%,#f1cdaa_62%,#e7ad8e_85%,#d9918a_100%)]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute -top-32 left-[30%] size-[520px] rounded-full bg-[#f6c66f]/45 blur-[100px]" />
        <div className="blob absolute top-[30%] -right-24 size-[560px] rounded-full bg-[#c96a7a]/35 blur-[110px] [animation-delay:-5s]" />
        <div className="blob absolute -bottom-40 left-[8%] size-[460px] rounded-full bg-[#9fbf9a]/40 blur-[110px] [animation-delay:-10s]" />
      </div>
      <Image
        src="/images/hero-sky.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="kenburns object-cover object-bottom opacity-30 mix-blend-multiply [mask-image:linear-gradient(to_left,#000_20%,transparent_75%)]"
      />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#fbf4ea]/90 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />

      <div className="relative mx-auto max-w-[1320px] h-full px-5 lg:px-10 pt-[130px] lg:pt-[84px] grid lg:grid-cols-[1fr_1.05fr] items-center gap-10">
        {/* ── copy ── */}
        <div key={i} className="relative z-10 max-w-[580px]">
          <p className="rise eyebrow text-rose" style={{ "--d": "0ms" } as React.CSSProperties}>
            {s.eyebrow}
          </p>
          <h1 className="font-display text-[3.3rem] sm:text-[4.3rem] lg:text-[5.3rem] leading-[0.95] mt-5 text-ink">
            <span className="rise block" style={{ "--d": "120ms" } as React.CSSProperties}>
              {s.title[0]}
            </span>
            <span className="rise block text-gradient pb-2" style={{ "--d": "240ms" } as React.CSSProperties}>
              {s.title[1]}
            </span>
          </h1>
          <p className="rise mt-5 font-display text-[1.45rem] leading-snug text-ink/80 max-w-md" style={{ "--d": "380ms" } as React.CSSProperties}>
            {s.text}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-6" style={{ "--d": "500ms" } as React.CSSProperties}>
            <Link href="/about" className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink px-8 text-sm text-white shadow-[0_16px_34px_-14px_rgba(27,29,36,.7)] hover:bg-black transition-colors">
              Explore Our World <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            <button onClick={() => setVideo(true)} className="group inline-flex items-center gap-3 text-sm">
              <span className="relative grid place-items-center size-12 rounded-full bg-white/70 backdrop-blur border border-white">
                <span className="absolute inset-0 rounded-full border border-rose/50 animate-ping [animation-duration:2.4s]" />
                <PlayIcon className="size-3.5 translate-x-px text-rose" />
              </span>
              Watch Video
            </button>
          </div>
          <div className="rise mt-10 hidden sm:flex items-center gap-4" style={{ "--d": "620ms" } as React.CSSProperties}>
            <div className="flex -space-x-3">
              {["/images/products/velvet-rose-edp.jpg", "/images/products/wild-forest-honey.jpg", "/images/products/ashwagandha-caps.jpg", "/images/products/heloves-aqua-1l.jpg"].map((src) => (
                <span key={src} className="relative size-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={src} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="text-sm text-ink/75 leading-tight">
              <span className="inline-flex items-center gap-1 font-medium text-ink">
                4.8 <StarIcon className="size-3.5 text-accent" />
              </span>{" "}
              from 2M+ happy customers
              <br />
              across 25+ countries
            </p>
          </div>
        </div>

        {/* ── visual composition ── */}
        <div className="relative h-[560px] lg:h-[640px] flex items-center justify-center lg:justify-end gap-4">
          {/* portrait arch */}
          <div
            className="relative shrink-0 w-[62%] sm:w-[300px] h-[440px] sm:h-[500px] transition-transform duration-300 ease-out"
            style={{ transform: "translate(calc(var(--mx) * -18px), calc(var(--my) * -14px))" }}
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[34px] border border-ink/25" />
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[34px] shadow-[0_40px_70px_-30px_rgba(110,50,30,.6)] ring-[6px] ring-white/70">
              {slides.map((sl, k) => (
                <Image
                  key={sl.image}
                  src={sl.image}
                  alt={sl.alt}
                  fill
                  priority={k === 0}
                  sizes="320px"
                  className={`object-cover transition-all duration-[1600ms] ease-out ${k === i ? "opacity-100 scale-105" : "opacity-0 scale-125"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#9c3d54]/35 via-transparent to-[#f6c66f]/20 mix-blend-multiply" />
            </div>

            {/* floating chips */}
            <div className="float-y absolute -left-10 sm:-left-16 top-16 rounded-2xl bg-white/80 backdrop-blur-md border border-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(60,30,20,.5)]">
              <p className="flex items-center gap-2 text-xs text-muted">
                <GlobeIcon className="size-4 text-accent" /> Global presence
              </p>
              <p className="font-display text-2xl leading-tight">25+ Countries</p>
            </div>
            <div className="float-y absolute -left-6 sm:-left-12 bottom-14 rounded-2xl bg-forest/90 backdrop-blur-md px-4 py-3 text-white shadow-[0_18px_40px_-20px_rgba(20,40,30,.7)] [animation-delay:-3s]">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/60">Since 2012</p>
              <p className="font-display text-2xl leading-tight">16 Trusted Brands</p>
            </div>
          </div>

          {/* two scrolling columns of vertical cards (md+) */}
          <div
            className="marquee-pause hidden md:flex gap-4 h-full fade-y transition-transform duration-300 ease-out"
            style={{ transform: "translate(calc(var(--mx) * 14px), calc(var(--my) * 10px))" }}
          >
            {[colA, colB].map((col, c) => (
              <div key={c} className="w-[168px] overflow-hidden">
                <div className={`flex flex-col gap-4 ${c === 0 ? "marquee-up" : "marquee-down"}`}>
                  {[...col, ...col].map((t, k) => (
                    <TileCard key={`${t.href}-${k}`} t={t} hidden={k >= col.length} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* mobile: horizontal strip of cards */}
      <div className="md:hidden relative -mt-4 pb-10 overflow-hidden fade-x marquee-pause">
        <div className="marquee-x flex w-max gap-3 px-3">
          {[...tiles, ...tiles].map((t, k) => (
            <div key={`${t.href}-${k}`} className="w-[140px]">
              <TileCard t={t} hidden={k >= tiles.length} />
            </div>
          ))}
        </div>
      </div>

      {/* slide controls */}
      <div className="absolute left-5 lg:left-10 bottom-8 hidden lg:flex flex-col items-center gap-3 text-xs text-ink/70">
        <span className="relative h-20 w-px bg-ink/15 overflow-hidden">
          <span key={i} className="absolute inset-x-0 top-0 bg-ink animate-[grow_7s_linear_forwards]" />
        </span>
        <span>
          <span className="text-ink font-medium">{String(i + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
      <div className="absolute right-5 lg:right-10 bottom-8 hidden md:flex gap-2">
        {slides.map((_, k) => (
          <button
            key={k}
            aria-label={`Slide ${k + 1}`}
            onClick={() => setI(k)}
            className={`h-[3px] rounded-full transition-all duration-500 ${k === i ? "w-10 bg-ink" : "w-5 bg-ink/25 hover:bg-ink/50"}`}
          />
        ))}
      </div>

      <style>{`@keyframes grow{from{height:0}to{height:100%}}`}</style>

      {video && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 fade-up" role="dialog" aria-modal="true">
          <button className="absolute inset-0" aria-label="Close video" onClick={() => setVideo(false)} />
          <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-3xl">
            <Image src="/images/b-expo.jpg" alt="" fill sizes="900px" className="object-cover kenburns" />
            <div className="absolute inset-0 bg-black/45 grid place-items-center text-center text-white p-6">
              <div>
                <p className="eyebrow text-gold justify-center">Brand film</p>
                <p className="font-display text-4xl mt-3">The World of Heloves</p>
                <p className="text-white/70 mt-2 text-sm">Your brand film will play here once it&apos;s uploaded.</p>
              </div>
            </div>
            <button onClick={() => setVideo(false)} className="absolute top-4 right-4 grid place-items-center size-10 rounded-full bg-white/90 text-ink" aria-label="Close">
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function TileCard({ t, hidden }: { t: Tile; hidden?: boolean }) {
  return (
    <Link
      href={t.href}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group shine zoom-img relative block h-[212px] overflow-hidden rounded-[22px] ring-1 ring-white/70 shadow-[0_18px_34px_-20px_rgba(80,40,20,.6)]"
    >
      <Image src={t.image} alt={hidden ? "" : t.title} fill sizes="170px" className="object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <span className="absolute left-3.5 right-3 bottom-3 text-white">
        <VerticalIcon name={t.icon} className="size-5 mb-1" />
        <span className="block text-[0.95rem] leading-tight font-normal">{t.title}</span>
        <span className="block text-[0.65rem] text-white/70 mt-0.5">{t.tag}</span>
      </span>
    </Link>
  );
}
