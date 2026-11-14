import Image from "next/image";
import Link from "next/link";
import { categories, type IconName } from "@/lib/catalog";
import { ArrowRight, VerticalIcon } from "./Icons";
import GlideArrows from "./GlideArrows";
import Reveal from "./Reveal";
import Split from "./Split";

const cards: { href: string; title: string; image: string; icon: IconName; blurb: string; tag: string }[] = [
  ...categories.map((c) => ({ href: `/category/${c.slug}`, title: c.vertical, image: c.card, icon: c.icon, blurb: c.blurb, tag: c.subs.slice(0, 3).join(" · ") })),
  { href: "/expo", title: "Expo & Events", image: "/images/v-expo.jpg", icon: "calendar", blurb: "Live lifestyle expos with tastings, workshops and expo-only prices in four cities.", tag: "Mumbai · Delhi · Pune · Bengaluru" },
];

/**
 * Dark band: on desktop the section pins and the cards glide sideways as you scroll
 * (driven by Motion.tsx). On touch screens it is a swipeable rail.
 */
export default function PortfolioGlide() {
  return (
    <section
      data-scene="glide"
      className="relative overflow-hidden rounded-b-[56px] bg-[radial-gradient(ellipse_at_20%_0%,#2c4a39_0%,#16261e_45%,#0f1915_100%)] text-white lg:min-h-screen lg:flex lg:flex-col lg:justify-center pt-28 pb-16 lg:py-0"
    >
      <div data-tone-layer aria-hidden className="tone-layer" />
      <div className="blob absolute -top-20 right-[20%] size-[460px] rounded-full bg-[#c98a4a]/20 blur-[120px]" />
      <div className="blob absolute bottom-0 -left-20 size-[420px] rounded-full bg-[#9c3d54]/25 blur-[120px] [animation-delay:-7s]" />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 lg:px-10 lg:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow text-[#e8b98a]">Our Business Verticals</p>
            </Reveal>
            <Split as="h2" className="font-display text-4xl md:text-6xl leading-[1.05] mt-4">
              Explore Our Diverse Portfolio
            </Split>
          </div>
          <Reveal from="right" className="flex flex-col items-start lg:items-end gap-4">
            <p className="max-w-sm text-white/70 text-sm leading-relaxed lg:text-right">
              Six verticals built on one promise of quality.{" "}
              <span className="hidden lg:inline">Scroll, swipe or drag to travel through our world.</span>
              <span className="lg:hidden">Swipe to explore.</span>
            </p>
            <GlideArrows />
          </Reveal>
        </div>
      </div>

      <div data-glide-wrap className="relative z-10 mt-10 overflow-x-auto rail">
        <div data-glide-track className="flex w-max gap-6 px-5 lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] pb-4">
          {cards.map((c, k) => (
            <Link
              key={c.href}
              href={c.href}
              data-glide-card
              className="group shine relative block w-[270px] sm:w-[320px] lg:w-[350px] h-[400px] lg:h-[470px] shrink-0 overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_40px_70px_-35px_rgba(0,0,0,.9)]"
            >
              <span className="absolute inset-0 overflow-hidden">
                <Image data-glide-img src={c.image} alt={c.title} fill sizes="360px" className="object-cover transition-transform duration-1000 group-hover:scale-[1.28]" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-[#0b120e] via-[#0b120e]/30 to-transparent" />
              <span className="absolute inset-0 bg-[#9c3d54]/0 mix-blend-color transition-colors duration-700 group-hover:bg-[#9c3d54]/15" />
              <span className="absolute top-5 left-6 font-display text-6xl text-white/25 leading-none">{String(k + 1).padStart(2, "0")}</span>
              <span className="absolute top-6 right-6 grid place-items-center size-12 rounded-full bg-white/10 backdrop-blur border border-white/20">
                <VerticalIcon name={c.icon} className="size-6" />
              </span>
              <span className="absolute inset-x-6 bottom-6">
                <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#e8b98a]">{c.tag}</span>
                <span className="block font-display text-[2rem] leading-tight mt-1.5">{c.title}</span>
                <span className="block text-sm text-white/70 mt-2 line-clamp-2">{c.blurb}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm">
                  <span className="u-link">Discover More</span> <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
          <Link
            href="/brands"
            data-glide-card
            className="group relative grid place-items-center w-[270px] sm:w-[320px] h-[400px] lg:h-[470px] shrink-0 rounded-[28px] border border-dashed border-white/25 text-center p-8 hover:bg-white/5 transition-colors"
          >
            <span>
              <span className="block font-display text-4xl leading-tight">16 brands.<br />One promise.</span>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 h-12 text-sm">
                View all brands <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* glide progress */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 lg:px-10 mt-8 hidden lg:block">
        <div className="h-px bg-white/15 overflow-hidden">
          <div data-glide-bar className="h-full bg-[#e8b98a] origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}
