import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import Hero from "@/components/Hero";
import PortfolioGlide from "@/components/PortfolioGlide";
import ProductRail from "@/components/ProductRail";
import Reveal from "@/components/Reveal";
import Split from "@/components/Split";
import {
  ArrowRight,
  CalendarIcon,
  DiamondIcon,
  GlobeIcon,
  HandshakeIcon,
  LeafIcon,
  PeopleIcon,
  PinIcon,
  StarIcon,
  StarOutline,
} from "@/components/Icons";
import { bestsellers, categories, expoEvents, formatDateRange, getCategory } from "@/lib/catalog";

const storyPoints = [
  { icon: GlobeIcon, title: "Global Presence", text: "in 25+ Countries" },
  { icon: PeopleIcon, title: "Trusted by", text: "Millions" },
  { icon: LeafIcon, title: "Committed to a", text: "Sustainable Future" },
];

const values = [
  { icon: DiamondIcon, label: "Premium Quality" },
  { icon: LeafIcon, label: "Sustainability" },
  { icon: HandshakeIcon, label: "Strategic Partnerships" },
  { icon: StarOutline, label: "Global Events" },
];

const stats = [
  { n: 25, s: "+", t: "Countries reached" },
  { n: 16, s: "", t: "Brands in our portfolio" },
  { n: 2, s: "M+", t: "Happy customers" },
  { n: 450, s: "+", t: "Expo partners" },
];

const testimonials = [
  { q: "Heloves has become our single, trusted supplier for water, wellness and corporate gifting. Quality and service are consistently excellent.", n: "Rhea Kapoor", r: "Head of Admin, Northwind Tech" },
  { q: "The Wellness Expo in Mumbai gave our brand more qualified leads in three days than a quarter of digital ads.", n: "Arjun Mehta", r: "Founder, Pure Roots Organics" },
  { q: "From the raw honey to the Velvet Rose parfum — everything feels considered, honest and beautifully made.", n: "Ananya Rao", r: "Customer, Bengaluru" },
];

/* reveal directions cycle so every image arrives differently */
const eventFrom = ["left", "up", "right"] as const;

export default function Home() {
  return (
    <>
      {/* ① LIGHT — hero */}
      <Hero />

      {/* ② DARK — portfolio glide */}
      <PortfolioGlide />

      {/* ③ LIGHT — our story + values */}
      <section className="relative overflow-x-clip bg-cream pt-24 pb-6">
        <div className="grid lg:grid-cols-[1.05fr_1fr] items-center">
          <Reveal from="wipe-left" className="relative h-[380px] md:h-[520px]">
            <div className="absolute inset-y-0 left-0 w-[calc(100%+40px)] bg-[linear-gradient(120deg,#efe6da,#f3d2b3)] rounded-r-[50%_100%]" />
            <div className="absolute inset-y-0 left-0 w-full overflow-hidden rounded-r-[48%_100%]">
              <div data-scrub-zoom className="absolute inset-0">
                <Image src="/images/building.jpg" alt="Heloves headquarters" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3d2b3]/10 to-[#f3d2b3]/45 mix-blend-soft-light" />
            </div>
            <svg data-drift viewBox="0 0 200 260" className="absolute -right-8 md:-right-14 bottom-0 w-36 md:w-48" aria-hidden>
              <path d="M30 250C40 150 100 60 190 10 170 110 120 200 30 250Z" fill="#4a6a3a" />
              <path d="M30 250C80 170 130 90 190 10" stroke="#2f4726" strokeWidth="2" fill="none" />
              <path d="M10 255C30 200 70 160 140 140 110 190 70 230 10 255Z" fill="#6f8a4f" />
            </svg>
          </Reveal>

          <div className="px-5 lg:px-0 lg:pl-16 lg:pr-10 py-14 grid md:grid-cols-[minmax(0,1fr)_220px] gap-10 items-center max-w-[880px]">
            <div>
              <Reveal>
                <p className="eyebrow text-rose">— Our Story</p>
              </Reveal>
              <Split as="h2" className="font-display text-4xl md:text-[2.55rem] leading-[1.08] mt-4">
                Driven by Innovation. Committed to Wellness.
              </Split>
              <Reveal delay={200}>
                <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/75">
                  At HELOVES, we bring together the best of nature, science and creativity to enrich everyday life — from the
                  first spritz of a fragrance to a glass of pure water.
                </p>
                <Link href="/about" className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-brand px-7 text-sm text-white hover:bg-black transition-colors">
                  Know More About Us <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <ul className="space-y-7 md:border-l md:border-line md:pl-8">
              {storyPoints.map(({ icon: Icon, title, text }, k) => (
                <Reveal as="li" from="right" key={title} delay={150 + k * 140} className="flex items-center gap-4">
                  <span className="grid place-items-center size-12 shrink-0 rounded-full bg-gold-soft text-accent">
                    <Icon className="size-6" />
                  </span>
                  <p className="font-display text-[1.15rem] leading-tight whitespace-nowrap">
                    {title}
                    <br />
                    {text}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-10">
          <Reveal from="zoom" className="rounded-[22px] bg-[linear-gradient(100deg,#f3e6d6_0%,#f6e3dc_50%,#ecdcc6_100%)] border border-[#e8d3c3] shadow-[0_18px_40px_-30px_rgba(156,61,84,.45)] px-6 md:px-8 py-6 flex flex-wrap items-center gap-y-5">
            {values.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 pr-5 mr-5 md:border-r md:border-ink/15">
                <Icon className="size-8 text-accent" />
                <span className="font-display text-lg">{label}</span>
              </div>
            ))}
            <p className="ml-auto flex items-center gap-3 font-display italic text-2xl xl:text-[1.55rem] text-ink/85 whitespace-nowrap">
              Together for a Better Tomorrow
              <LeafIcon className="size-8 text-ink/60" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* ④ DARK — stats with parallax photo + vertical marquee */}
      <section className="relative mt-24 overflow-hidden rounded-b-[56px] bg-forest text-white">
        <div data-tone-layer aria-hidden className="tone-layer" />
        <div data-parallax="0.15" className="absolute -inset-y-[20%] inset-x-0">
          <Image src="/images/forest.jpg" alt="" fill sizes="100vw" className="object-cover opacity-35 mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,59,45,.6),rgba(15,25,21,.92))]" />
        <div aria-hidden className="fx-aurora" style={{ "--glow": "#c98a4a", "--hi": "#f0cf94" } as React.CSSProperties} />

        {/* moving strip of verticals */}
        <div className="relative z-10 border-b border-white/10 py-5 overflow-hidden fade-x">
          <div className="marquee-x flex w-max gap-10 font-display text-3xl md:text-4xl italic text-white/80">
            {[...Array(2)].flatMap((_, r) =>
              [...categories.map((c) => c.vertical), "Expo & Events"].map((v) => (
                <span key={`${r}-${v}`} className="flex items-center gap-10 whitespace-nowrap">
                  {v} <span className="text-[#e8b98a] not-italic text-xl">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 lg:px-10 py-20 grid grid-cols-2 lg:grid-cols-4 gap-y-12">
          {stats.map((s, k) => (
            <Reveal key={s.t} delay={k * 120} from={k % 2 ? "down" : "up"} className="text-center lg:border-r lg:last:border-r-0 border-white/15">
              <p className="font-display text-6xl md:text-8xl text-[#f0cf94]">
                <Counter to={s.n} suffix={s.s} />
              </p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/70">{s.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ⑤ LIGHT — signature products */}
      <div className="relative bg-cream pb-4 overflow-hidden">
        <div className="blob absolute top-40 -right-32 size-[420px] rounded-full bg-[#f3d2b3]/60 blur-[120px]" />
        <ProductRail eyebrow="Signature Collection" title="Loved Across Our World" products={bestsellers()} href="/offers" />
      </div>

      {/* ⑥ DARK — wellness, honey & water */}
      <section className="relative mt-24 overflow-hidden rounded-b-[56px] bg-[radial-gradient(ellipse_at_80%_10%,#3a1f28_0%,#1d1316_55%,#140d0f_100%)] text-white py-24">
        <div data-tone-layer aria-hidden className="tone-layer" />
        <div aria-hidden className="fx-aurora" style={{ "--glow": "#9c3d54", "--hi": "#e8b98a" } as React.CSSProperties} />
        <div className="relative z-10 mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <Reveal>
                <p className="eyebrow text-[#e8b98a]">Nature&apos;s Best</p>
              </Reveal>
              <Split as="h2" className="font-display text-4xl md:text-6xl mt-4 leading-[1.05]">
                Pure by nature, crafted with care
              </Split>
            </div>
            <Reveal from="right" className="max-w-sm text-white/65 text-sm leading-relaxed">
              Single-origin honey, mineral-rich water and Ayurvedic wellness — sourced responsibly and tested batch by batch.
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6">
            <Reveal from="mask" className="relative h-[560px] overflow-hidden">
              <div data-scrub-zoom className="absolute inset-0">
                <Image src="/images/meditation.jpg" alt="Meditation at sunrise" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#140d0f] via-[#140d0f]/20 to-transparent" />
              <div className="absolute inset-x-8 bottom-8">
                <p className="eyebrow text-[#e8b98a]">Health &amp; Wellness</p>
                <h3 className="font-display text-4xl md:text-5xl mt-3 leading-tight">Balance, bottled by nature.</h3>
                <Link href="/category/wellness" className="group mt-5 inline-flex items-center gap-2 text-sm">
                  <span className="u-link">Explore wellness</span> <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-6">
              {[
                { img: "/images/b-honey.jpg", eyebrow: "Heloves Gold", title: "Raw honey, straight from the hive", href: "/category/honey", cta: "Shop honey", tint: "from-[#3a2306]/90", c: "text-[#f5d58a]", from: "wipe-right" as const },
                { img: "/images/b-water.jpg", eyebrow: "Heloves Aqua", title: "Purity in every drop", href: "/category/water", cta: "Order water", tint: "from-[#062033]/90", c: "text-[#9ad3f0]", from: "wipe-left" as const },
              ].map((b, k) => (
                <Reveal key={b.href} from={b.from} delay={k * 200} className="shine relative min-h-[267px] overflow-hidden rounded-[28px]">
                  <div data-parallax="0.1" className="absolute -inset-y-[15%] inset-x-0">
                    <Image src={b.img} alt="" fill sizes="(max-width: 1024px) 100vw, 680px" className="object-cover" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${b.tint} via-black/30 to-transparent`} />
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-xs">
                    <p className={`eyebrow ${b.c}`}>{b.eyebrow}</p>
                    <h3 className="font-display text-3xl md:text-4xl mt-2 leading-tight">{b.title}</h3>
                    <Link href={b.href} className="group mt-4 inline-flex items-center gap-2 text-sm">
                      <span className="u-link">{b.cta}</span> <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ LIGHT — events */}
      <section className="relative bg-cream pt-24">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <Reveal>
                <p className="eyebrow text-rose">Expo &amp; Events</p>
              </Reveal>
              <Split as="h2" className="font-display text-4xl md:text-6xl mt-3">
                Experiences, Live
              </Split>
            </div>
            <Link href="/expo" className="group shrink-0 inline-flex items-center gap-2 text-sm pb-2">
              <span className="u-link">All events</span> <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {expoEvents.slice(0, 3).map((e, k) => (
              <Reveal key={e.id} from={eventFrom[k]} delay={k * 150}>
                <Link href="/expo" className="group block">
                  <div className="shine lift relative h-80 overflow-hidden rounded-[24px]">
                    <Image data-rv-img src={e.image} alt={e.title} fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-2xl bg-ivory/95 px-3.5 py-2 text-center leading-none">
                      <span className="block font-display text-2xl">{Number(e.start.slice(8))}</span>
                      <span className="block text-[0.6rem] tracking-[0.2em] uppercase mt-1">{new Date(e.start).toLocaleString("en", { month: "short" })}</span>
                    </span>
                    <span className="absolute left-5 bottom-4 inline-flex items-center gap-1.5 text-xs text-white/90">
                      <PinIcon className="size-4" /> {e.city}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl mt-4 group-hover:text-rose transition-colors">{e.title}</h3>
                  <p className="text-sm text-muted mt-1 inline-flex items-center gap-2">
                    <CalendarIcon className="size-4" /> {formatDateRange(e.start, e.end)} · {e.focus.map((f) => getCategory(f)!.vertical).join(", ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑧ DARK — testimonials */}
      <section className="relative mt-28 overflow-hidden rounded-b-[56px] bg-[radial-gradient(ellipse_at_10%_100%,#4a1d2c_0%,#24121a_50%,#170c11_100%)] text-white py-28">
        <div data-tone-layer aria-hidden className="tone-layer" />
        <div aria-hidden className="fx-aurora" style={{ "--glow": "#9c3d54", "--hi": "#e8b98a" } as React.CSSProperties} />
        <div data-drift className="absolute -right-20 top-10 font-display text-[22rem] leading-none text-white/[0.04] select-none" aria-hidden>
          &ldquo;
        </div>
        <div className="relative z-10 mx-auto max-w-[1320px] px-5 lg:px-10">
          <div className="text-center">
            <Reveal>
              <p className="eyebrow text-[#e8b98a] justify-center">Voices of Heloves</p>
            </Reveal>
            <Split as="h2" className="font-display text-4xl md:text-6xl mt-4">
              Trusted by Partners &amp; People
            </Split>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, k) => (
              <Reveal
                key={t.n}
                from={k === 0 ? "left" : k === 1 ? "up" : "right"}
                delay={k * 150}
                className="rounded-[24px] bg-white/[0.06] backdrop-blur border border-white/10 p-8 flex flex-col hover:bg-white/[0.09] transition-colors"
              >
                <div className="flex gap-0.5 text-[#f0cf94]">
                  {Array.from({ length: 5 }, (_, s) => <StarIcon key={s} className="size-4" />)}
                </div>
                <p className="font-display text-[1.35rem] leading-snug mt-5 flex-1 text-white/90">&ldquo;{t.q}&rdquo;</p>
                <div className="mt-7 pt-5 border-t border-white/10 flex items-center gap-3">
                  <span className="grid place-items-center size-11 rounded-full bg-[linear-gradient(135deg,#b5623f,#9c3d54)] font-display text-xl">{t.n[0]}</span>
                  <div>
                    <p className="text-sm font-medium">{t.n}</p>
                    <p className="text-xs text-white/55 mt-0.5">{t.r}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑨ LIGHT — closing banner, photo melted into the background */}
      <section className="relative -mb-16 overflow-hidden bg-cream pt-28 pb-24">
        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10">
            <Reveal>
              <p className="font-display text-2xl tracking-[0.14em] text-accent">HELOVES</p>
            </Reveal>
            <Split as="h2" className="font-display text-5xl md:text-7xl mt-3 leading-[1.02]">
              Live Well. Choose Better.
            </Split>
            <Reveal delay={250}>
              <p className="font-display text-2xl text-ink/70 mt-4">A lifestyle choice for a brighter tomorrow.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/brands" className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-sm text-white hover:bg-black transition-colors">
                  Explore More <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/enquiry" className="btn-glow inline-flex h-12 items-center gap-3 rounded-full px-7 text-sm text-white">
                  Partner With Us
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal from="zoom" className="relative h-[420px] lg:h-[520px]">
            <div
              className="absolute inset-0 overflow-hidden rounded-[40px]"
              style={{
                maskImage: "linear-gradient(to left, #000 62%, transparent), linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
                WebkitMaskImage: "linear-gradient(to left, #000 62%, transparent), linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <div data-parallax="0.12" className="absolute -inset-y-[15%] inset-x-0">
                <Image src="/images/leaf-drop.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" />
              </div>
            </div>
            <div className="absolute -left-10 bottom-10 rounded-2xl bg-white/80 backdrop-blur-md border border-white px-5 py-4 shadow-[0_20px_40px_-24px_rgba(60,30,20,.5)] float-y">
              <p className="text-xs text-muted">Carbon-neutral by</p>
              <p className="font-display text-3xl">2030</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
