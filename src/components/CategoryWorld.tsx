import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CategoryListing from "./CategoryListing";
import ProductListing from "./ProductListing";
import Reveal from "./Reveal";
import Split from "./Split";
import { ArrowRight, LeafIcon, ShieldIcon, StarIcon, TruckIcon, VerticalIcon } from "./Icons";
import { brandPortfolio, byCategory, categories, discountPct, formatINR, getCategory, type CategorySlug } from "@/lib/catalog";

type Badge = { icon: typeof TruckIcon; text: string };

/**
 * Everything that differs between category pages: palette, ambient effect and copy.
 * dark bands use `dark`; light bands use `light`; `hi` is the highlight colour on dark,
 * `accent` the highlight colour on light.
 */
type World = {
  dark: string;
  light: string;
  hi: string;
  accent: string;
  glow: string;
  heroStat: { v: string; l: string };
  heroCta: string;
  brandTitle: string;
  brandText: string;
  shopEyebrow: string;
  shopTitle: string;
  collectionTitle: string;
  badges: [Badge, Badge];
  storyEyebrow: string;
  storyTitle: string;
  steps: { t: string; d: string }[];
  storyCta: string;
  storyNote: string;
};

const worlds: Record<CategorySlug, World> = {
  perfumes: {
    dark: "radial-gradient(ellipse at 80% 0%, #4a2230 0%, #24121a 50%, #150b10 100%)",
    light: "linear-gradient(180deg, #f8f4ee 0%, #f1e2dc 30%, #e8d0c8 100%)",
    hi: "#e8b98a",
    accent: "#9b5a4a",
    glow: "#9c3d54",
    heroStat: { v: "8–10h", l: "Long-lasting wear" },
    heroCta: "Corporate gifting",
    brandTitle: "Four houses of scent",
    brandText: "From our flagship parfums to nocturnal ouds and fresh citrus, every fragrance house shares one standard of craft.",
    shopEyebrow: "Shop by collection",
    shopTitle: "Find your signature",
    collectionTitle: "All Fragrances",
    badges: [
      { icon: ShieldIcon, text: "IFRA compliant" },
      { icon: TruckIcon, text: "Gift-ready packaging" },
    ],
    storyEyebrow: "Crafted with care",
    storyTitle: "The art of a lasting scent",
    steps: [
      { t: "Premium imported oils", d: "Every blend begins with premium oils sourced from trusted fragrance houses." },
      { t: "Composed by master perfumers", d: "Notes are balanced to open bright and settle into a warm, skin-close dry-down." },
      { t: "Made to last", d: "Concentrations are tuned for 8–10 hours of wear, from morning to night." },
      { t: "Gift-ready finish", d: "Cruelty-free, IFRA-compliant scents presented in elegant, gift-ready packaging." },
    ],
    storyCta: "Enquire about gifting",
    storyNote: "Cruelty-free & IFRA compliant",
  },
  water: {
    dark: "radial-gradient(ellipse at 80% 0%, #17506f 0%, #0b2536 50%, #06131c 100%)",
    light: "linear-gradient(180deg, #f8f4ee 0%, #e2edf1 30%, #cfe2ea 100%)",
    hi: "#9ad3f0",
    accent: "#2d6e8e",
    glow: "#2d8fbf",
    heroStat: { v: "9", l: "Purification stages" },
    heroCta: "Office & bulk supply",
    brandTitle: "Three springs, one standard",
    brandText: "From everyday hydration to alkaline and sparkling, every Heloves water brand is BIS-certified and tested batch by batch.",
    shopEyebrow: "Shop by size & type",
    shopTitle: "Hydration for every need",
    collectionTitle: "All Packaged Water",
    badges: [
      { icon: TruckIcon, text: "Doorstep delivery" },
      { icon: ShieldIcon, text: "BIS certified" },
    ],
    storyEyebrow: "From source to seal",
    storyTitle: "Purity in every drop",
    steps: [
      { t: "Protected source", d: "Water is drawn from tested, protected sources and checked before it enters the plant." },
      { t: "Multi-stage filtration", d: "Sand, carbon and micron filters followed by reverse osmosis remove impurities." },
      { t: "UV & ozonisation", d: "Ultraviolet treatment and ozone keep every batch microbiologically safe." },
      { t: "Mineral balance & sealing", d: "Essential minerals are added for a crisp taste, then bottled in BPA-free, tamper-sealed packs." },
    ],
    storyCta: "Set up office supply",
    storyNote: "BPA-free, recyclable packs",
  },
  clothing: {
    dark: "radial-gradient(ellipse at 80% 0%, #4a3b2c 0%, #231c16 50%, #15110d 100%)",
    light: "linear-gradient(180deg, #f8f4ee 0%, #eee6db 30%, #e0d4c4 100%)",
    hi: "#e9cfa8",
    accent: "#6b5a48",
    glow: "#b08a5f",
    heroStat: { v: "15-day", l: "Easy returns" },
    heroCta: "Bulk orders",
    brandTitle: "Three labels, one wardrobe",
    brandText: "Organic-cotton essentials, everyday casuals and contemporary ethnic wear — designed for comfort that lasts.",
    shopEyebrow: "Shop by category",
    shopTitle: "Dressed for every day",
    collectionTitle: "All Clothing",
    badges: [
      { icon: TruckIcon, text: "Easy 15-day returns" },
      { icon: ShieldIcon, text: "Colour-fast fabric" },
    ],
    storyEyebrow: "Made to be worn",
    storyTitle: "Comfort you can feel",
    steps: [
      { t: "Breathable fabrics", d: "Soft, skin-friendly fabric that keeps you comfortable from morning to night." },
      { t: "True-to-size fit", d: "Easy, flattering cuts designed to fit the way you expect." },
      { t: "Built to last", d: "Colour-fast and machine washable, holding its shape wash after wash." },
      { t: "Easy returns", d: "Not quite right? Return it within 15 days, no fuss." },
    ],
    storyCta: "Enquire about bulk orders",
    storyNote: "Organic-cotton essentials",
  },
  honey: {
    dark: "radial-gradient(ellipse at 80% 0%, #4d3409 0%, #241807 50%, #140e05 100%)",
    light: "linear-gradient(180deg, #f8f4ee 0%, #f4e8cd 30%, #eadab3 100%)",
    hi: "#f5d58a",
    accent: "#a5741c",
    glow: "#c98a1c",
    heroStat: { v: "100%", l: "Pure, no added sugar" },
    heroCta: "Gifting & bulk orders",
    brandTitle: "Three hives, one promise",
    brandText: "Single-origin raw honey, infused blends and certified organic jars — all NMR-tested and cold-filtered.",
    shopEyebrow: "Shop by type",
    shopTitle: "A jar for every taste",
    collectionTitle: "All Honey",
    badges: [
      { icon: ShieldIcon, text: "NMR tested" },
      { icon: LeafIcon, text: "No added sugar" },
    ],
    storyEyebrow: "From hive to home",
    storyTitle: "Honey, the way bees made it",
    steps: [
      { t: "Ethically harvested", d: "Collected by partner beekeepers, supporting local beekeeping communities." },
      { t: "Cold-filtered", d: "Never heated, so natural enzymes, pollen and antioxidants stay intact." },
      { t: "NMR tested", d: "Every batch is tested for purity before it is jarred." },
      { t: "Nothing added", d: "No added sugar, no syrups — just pure honey, sealed fresh." },
    ],
    storyCta: "Enquire about gifting",
    storyNote: "Supports local beekeepers",
  },
  wellness: {
    dark: "radial-gradient(ellipse at 80% 0%, #24483a 0%, #13261d 50%, #0c1812 100%)",
    light: "linear-gradient(180deg, #f8f4ee 0%, #e4ece0 30%, #d3e2cd 100%)",
    hi: "#bcdca7",
    accent: "#3f6b45",
    glow: "#4f8a58",
    heroStat: { v: "GMP", l: "Certified facility" },
    heroCta: "Partner with us",
    brandTitle: "Three brands, one routine",
    brandText: "Clinically studied supplements, plant protein and Ayurvedic blends to support your everyday health.",
    shopEyebrow: "Shop by need",
    shopTitle: "Build your daily ritual",
    collectionTitle: "All Health & Wellness",
    badges: [
      { icon: ShieldIcon, text: "GMP certified" },
      { icon: LeafIcon, text: "Vegetarian friendly" },
    ],
    storyEyebrow: "Science meets Ayurveda",
    storyTitle: "Wellness you can trust",
    steps: [
      { t: "Clinically studied ingredients", d: "Formulas built on ingredients with published research behind them." },
      { t: "Effective doses", d: "Each serving is dosed to support your daily health routine." },
      { t: "GMP-certified manufacturing", d: "Made in GMP-certified facilities with batch-level quality checks." },
      { t: "Clean formulas", d: "No artificial colours, and vegetarian friendly." },
    ],
    storyCta: "Talk to our team",
    storyNote: "Ayurveda & modern nutrition",
  },
};

const tileFrom = ["wipe-left", "wipe-right", "up", "zoom", "up"] as const;

export default function CategoryWorld({ slug }: { slug: CategorySlug }) {
  const cat = getCategory(slug)!;
  const w = worlds[slug];
  const items = byCategory(slug);
  const popular = [...items].sort((a, b) => b.reviews - a.reviews);
  const catBrands = brandPortfolio.filter((b) => b.category === slug);
  const avgRating = (items.reduce((s, p) => s + p.rating, 0) / items.length).toFixed(1);
  const reviews = items.reduce((s, p) => s + p.reviews, 0);
  const bestOff = Math.max(...items.map(discountPct));
  const fromPrice = Math.min(...items.map((p) => p.price));
  const subTiles = cat.subs.map((s) => ({ name: s, items: items.filter((p) => p.sub === s) })).filter((t) => t.items.length);
  const others = categories.filter((c) => c.slug !== slug);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  // per-category colours flow in through CSS variables
  const vars = { "--hi": w.hi, "--accent": w.accent, "--glow": w.glow, "--dark": w.dark } as React.CSSProperties;
  const dark = { background: "var(--dark)" };
  const light = { background: w.light };
  // heading and tile grid of the "shop by type" band
  const shopHead = (sub: string, eyebrow = "text-(--hi)") => (
  <div className="text-center max-w-2xl mx-auto mb-14">
    <Reveal>
      <p className={`eyebrow ${eyebrow} justify-center`}>{w.shopEyebrow}</p>
    </Reveal>
    <Split as="h2" className="font-display text-4xl md:text-6xl mt-4 leading-[1.05]">
      {w.shopTitle}
    </Split>
    <Reveal delay={200}>
      <p className={`mt-5 ${sub} text-sm leading-relaxed`}>
        Starting at {formatINR(fromPrice)} · up to {bestOff}% off across the range.
      </p>
    </Reveal>
  </div>
  );
  const shopGrid = (
  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5">
    {subTiles.map((t, k) => {
      // first tiles span wider on desktop for a magazine-style rhythm
      const n = subTiles.length;
      const wide = n === 4 || (n >= 5 && k < 2);
      const span = `${wide ? "lg:col-span-3 h-[300px] lg:h-[380px]" : "lg:col-span-2 h-[260px] lg:h-[320px]"} ${n % 2 && k === n - 1 ? "col-span-2 lg:col-span-2" : ""}`;
      return (
        <Reveal key={t.name} from={tileFrom[k % tileFrom.length]} delay={k * 110} className={span}>
          <Link
            href={`/category/${slug}?sub=${encodeURIComponent(t.name)}#shop`}
            scroll={false}
            className="group shine relative block h-full overflow-hidden rounded-[28px] ring-1 ring-white/10"
          >
            <Image data-rv-img src={t.items[0].image} alt="" fill sizes="(max-width: 1024px) 50vw, 640px" className="object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <span className="absolute inset-x-5 lg:inset-x-7 bottom-5 lg:bottom-7 flex items-end justify-between gap-3">
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-(--hi)">
                  {t.items.length} {t.items.length === 1 ? "pick" : "picks"} · from {formatINR(Math.min(...t.items.map((p) => p.price)))}
                </span>
                <span className="block font-display text-3xl lg:text-4xl leading-tight mt-1">{t.name}</span>
              </span>
              <span className="grid place-items-center size-11 shrink-0 rounded-full bg-white/15 backdrop-blur border border-white/25 transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:-rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </span>
          </Link>
        </Reveal>
      );
    })}
  </div>
  );

  return (
    <div style={vars}>
      {/* ① DARK — hero */}
      <section className="px-3 lg:px-5 pt-3">
        <div style={dark} className="relative overflow-hidden rounded-[36px] text-white">
          <div aria-hidden className="fx-aurora" />
          <div data-drift aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 text-white/[0.04]">
            <VerticalIcon name={cat.icon} className="size-[26rem]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1320px] px-5 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
            <div>
              <nav className="rise text-xs text-white/60 mb-7" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/brands" className="hover:text-white">Our World</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{cat.vertical}</span>
              </nav>
              <p className="rise eyebrow text-(--hi)" style={d(80)}>
                {cat.tagline}
              </p>
              <Split as="h1" className="font-display text-[3.2rem] sm:text-7xl lg:text-[5.6rem] leading-[0.95] mt-5">
                {cat.vertical}
              </Split>
              <p className="rise mt-6 font-display text-xl md:text-2xl text-white/80 max-w-xl leading-snug" style={d(260)}>
                {cat.blurb}
              </p>
              <div className="rise mt-9 flex flex-wrap gap-3" style={d(380)}>
                <a href="#shop" className="group inline-flex h-13 items-center gap-3 rounded-full bg-white px-7 text-sm text-ink hover:bg-(--hi) transition-colors">
                  Shop the collection <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/enquiry" className="inline-flex h-13 items-center rounded-full border border-white/30 px-7 text-sm hover:bg-white/10 transition-colors">
                  {w.heroCta}
                </Link>
              </div>

              <dl className="rise mt-12 grid grid-cols-3 max-w-lg border-t border-white/15 pt-6" style={d(480)}>
                {[w.heroStat, { v: `${catBrands.length}`, l: "Brands" }, { v: `${avgRating}★`, l: `${(reviews / 1000).toFixed(1)}k reviews` }].map((s, k) => (
                  <div key={s.l} className={k ? "pl-5 border-l border-white/15" : ""}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd className="font-display text-4xl text-(--hi)">{s.v}</dd>
                    <dd className="text-[0.68rem] uppercase tracking-[0.18em] text-white/55 mt-1">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* arched photo with floating product cards */}
            <div className="relative h-[440px] sm:h-[540px] lg:h-[600px]">
              <Reveal from="mask" className="absolute inset-y-0 right-0 w-[82%] overflow-hidden rounded-t-full rounded-b-[32px] ring-1 ring-white/15">
                <div data-parallax="0.1" className="absolute -inset-y-[12%] inset-x-0">
                  <Image src={cat.banner} alt="" fill priority sizes="(max-width: 1024px) 90vw, 560px" className="kenburns object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </Reveal>
              <div aria-hidden className="pointer-events-none absolute right-[30%] top-6 size-28 rounded-full border border-white/20 spin-slow">
                <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-(--hi)" />
              </div>
              <div aria-hidden className="ripple pointer-events-none absolute right-[18%] bottom-[18%] size-24" />

              {popular.slice(0, 2).map((p, k) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className={`float-y group absolute flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 pr-5 shadow-[0_24px_50px_-24px_rgba(0,0,0,.8)] hover:bg-white/20 transition-colors ${
                    k === 0 ? "left-0 top-[18%]" : "left-[6%] bottom-[12%] [animation-delay:-3s]"
                  }`}
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={p.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="max-w-[160px]">
                    <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-(--hi)">{k === 0 ? "Most loved" : "Top rated"}</span>
                    <span className="block font-display text-lg leading-tight line-clamp-1">{p.name}</span>
                    <span className="block text-xs text-white/70">{formatINR(p.price)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* moving strip of types */}
          <div className="relative z-10 border-t border-white/10 py-5 overflow-hidden fade-x">
            <div className="marquee-x flex w-max gap-10 font-display text-2xl md:text-3xl italic text-white/70">
              {[0, 1, 2, 3].flatMap((r) =>
                cat.subs.map((s) => (
                  <span key={`${r}-${s}`} className="flex items-center gap-10 whitespace-nowrap">
                    {s} <VerticalIcon name={cat.icon} className="size-4 text-(--hi)" />
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ② LIGHT — brands */}
      <section className="relative overflow-hidden pt-24 pb-28" style={light}>
        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <Reveal>
                <p className="eyebrow text-(--accent)">Brands in this vertical</p>
              </Reveal>
              <Split as="h2" className="font-display text-4xl md:text-6xl mt-4 leading-[1.05]">
                {w.brandTitle}
              </Split>
            </div>
            <Reveal from="right" className="max-w-sm text-sm leading-relaxed text-ink/70">
              {w.brandText}
            </Reveal>
          </div>

          <div className={`grid gap-5 sm:grid-cols-2 ${catBrands.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {catBrands.map((b, k) => {
              const hero = popular.find((p) => p.brand === b.name);
              const count = items.filter((p) => p.brand === b.name).length;
              return (
                <Reveal key={b.name} from={k % 2 ? "down" : "up"} delay={k * 120}>
                  <div className="group shine lift relative flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_24px_48px_-30px_rgba(20,30,40,.55)] ring-1 ring-black/5">
                    <div className="relative h-64 overflow-hidden">
                      {hero && <Image src={hero.image} alt="" fill sizes="(max-width: 640px) 100vw, 420px" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />}
                      {/* darken top and bottom so white text stays readable on bright photos */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/75" />
                      <span className="absolute top-4 left-5 font-display text-5xl text-white leading-none">{String(k + 1).padStart(2, "0")}</span>
                      <div className="absolute inset-x-5 bottom-5 text-white">
                        <p className="font-display text-[1.8rem] leading-tight">{b.name}</p>
                        <p className="text-sm text-white/80 mt-1">{b.line}</p>
                      </div>
                    </div>
                    <p className="mt-auto flex items-center justify-between bg-(--accent) px-5 py-4 text-xs uppercase tracking-[0.16em] text-white">
                      {count} {count === 1 ? "product" : "products"}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ③ DARK — shop by type */}
      <section style={dark} className="relative overflow-hidden rounded-[56px] text-white pt-24 pb-28 mx-3 lg:mx-5">
        <div data-tone-layer aria-hidden className="tone-layer" />
        <div aria-hidden className="fx-aurora" />
        <div className="relative z-10 mx-auto max-w-[1320px] px-5 lg:px-10">
          {shopHead("text-white/65")}
          {shopGrid}
        </div>
      </section>

      {/* ④ LIGHT — full collection */}
      <section id="shop" className="scroll-mt-24 relative pt-24 pb-24">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <Reveal>
                <p className="eyebrow text-(--accent)">The collection</p>
              </Reveal>
              <Split as="h2" className="font-display text-4xl md:text-6xl mt-3">
                {w.collectionTitle}
              </Split>
            </div>
            <Reveal from="right" className="flex flex-wrap gap-2 text-xs">
              {w.badges.map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 rounded-full bg-ivory border border-line px-3.5 h-9">
                  <Icon className="size-4 text-(--accent)" /> {text}
                </span>
              ))}
            </Reveal>
          </div>
          <Suspense fallback={<ProductListing products={items} subs={cat.subs} scope={`list-${slug}`} />}>
            <CategoryListing slug={slug} reveal />
          </Suspense>
        </div>
      </section>

      {/* ⑤ DARK — story / promise */}
      <section style={dark} className="relative overflow-hidden rounded-[56px] text-white mx-3 lg:mx-5">
        <div data-tone-layer aria-hidden className="tone-layer" />
        <div aria-hidden className="fx-aurora" />
        <div className="grid lg:grid-cols-2 items-stretch">
          <Reveal from="wipe-right" className="relative min-h-[380px] lg:min-h-[640px]">
            <div data-scrub-zoom className="absolute inset-0">
              <Image src={cat.card} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-black/60" />
            <div className="float-y absolute left-6 bottom-6 lg:left-10 lg:bottom-10 rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 px-5 py-4">
              <p className="flex items-center gap-1 text-(--hi)">
                {Array.from({ length: 5 }, (_, s) => <StarIcon key={s} className="size-4" />)}
              </p>
              <p className="font-display text-3xl mt-1">{avgRating} / 5</p>
              <p className="text-xs text-white/65">Average customer rating</p>
            </div>
          </Reveal>

          <div className="relative z-10 px-6 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow text-(--hi)">{w.storyEyebrow}</p>
            </Reveal>
            <Split as="h2" className="relative font-display text-4xl md:text-[3.4rem] leading-[1.05] mt-4">
              {w.storyTitle}
            </Split>
            <ol className="relative mt-10 space-y-3">
              <span aria-hidden className="absolute left-[1.9rem] top-6 bottom-6 w-px bg-gradient-to-b from-(--hi) to-transparent opacity-60" />
              {w.steps.map((s, k) => (
                <Reveal as="li" key={s.t} from="right" delay={150 + k * 130} className="relative flex items-start gap-4 rounded-2xl p-3 hover:bg-white/[0.06] transition-colors">
                  <span className="relative grid place-items-center size-9 shrink-0 rounded-full bg-(--hi) text-ink font-display text-lg">{k + 1}</span>
                  <span>
                    <span className="block font-display text-2xl leading-tight">{s.t}</span>
                    <span className="block text-sm text-white/70 mt-1 leading-relaxed">{s.d}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={700} className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/enquiry" className="btn-glow inline-flex h-12 items-center gap-3 rounded-full px-7 text-sm text-white">
                {w.storyCta} <ArrowRight className="size-4" />
              </Link>
              <span className="inline-flex items-center gap-2 text-xs text-white/65">
                <LeafIcon className="size-4 text-(--hi)" /> {w.storyNote}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ⑥ LIGHT — other worlds (pulled down over the footer margin so its tint meets the footer) */}
      <section className="relative -mb-16 pt-24 pb-20" style={light}>
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <Reveal>
                <p className="eyebrow text-rose">Keep exploring</p>
              </Reveal>
              <Split as="h2" className="font-display text-4xl md:text-6xl mt-3">
                More from our world
              </Split>
            </div>
            <Link href="/brands" className="group shrink-0 inline-flex items-center gap-2 text-sm pb-2">
              <span className="u-link">All brands</span> <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="rail -mx-5 px-5 lg:mx-0 lg:px-0 flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto pb-2">
            {others.map((c, k) => (
              <Reveal key={c.slug} from={k % 2 ? "down" : "up"} delay={k * 120} className="w-[240px] lg:w-auto shrink-0">
                <Link href={`/category/${c.slug}`} className="group shine lift relative block h-[340px] overflow-hidden rounded-[26px]">
                  <Image data-rv-img src={c.card} alt="" fill sizes="(max-width: 1024px) 240px, 320px" className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute top-5 right-5 grid place-items-center size-11 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white">
                    <VerticalIcon name={c.icon} className="size-5" />
                  </span>
                  <span className="absolute inset-x-6 bottom-6 text-white">
                    <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-white/70">{c.subs.slice(0, 3).join(" · ")}</span>
                    <span className="block font-display text-3xl leading-tight mt-1">{c.vertical}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm">
                      <span className="u-link">Explore</span> <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
