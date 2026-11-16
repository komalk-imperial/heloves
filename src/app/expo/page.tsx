import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import { ExpoButtons, StallForm } from "@/components/ExpoActions";
import { CalendarIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { expoEvents, formatDateRange, formatINR, getCategory } from "@/lib/catalog";

export const metadata = {
  title: "Expo & Events — HELOVES",
};

const stats = [
  { n: 4, s: "", t: "Cities this season" },
  { n: 450, s: "+", t: "Exhibiting brands" },
  { n: 50, s: "K+", t: "Expected visitors" },
  { n: 60, s: "+", t: "Workshops & tastings" },
];

const activities = [
  { title: "Fragrance Bar", text: "Discover your signature scent with our perfumers, plus custom attar blending.", image: "/images/v-fragrance.jpg" },
  { title: "Honey Tasting Lounge", text: "Taste 12 single-origin honeys and meet the beekeepers behind them.", image: "/images/e-pune.jpg" },
  { title: "Wellness Zone", text: "Health check-ups, sunrise yoga and talks by Ayurveda experts.", image: "/images/meditation.jpg" },
  { title: "Fashion Runway", text: "Live shows by Heloves Studio, Kora Threads and emerging designers.", image: "/images/b-clothing.jpg" },
  { title: "Hydration Station", text: "Free refills all day and a look inside our 9-stage purification.", image: "/images/v-water.jpg" },
  { title: "Business Forum", text: "Panels and B2B meetings for distributors, retailers and investors.", image: "/images/e-panel.jpg" },
];

const faqs = [
  { q: "Is entry free?", a: "General entry is free for online registrations made at least 48 hours in advance. On-the-spot passes are charged at the listed price." },
  { q: "Can I buy products at the expo?", a: "Yes — every stall sells directly, and Heloves brands carry expo-only prices. UPI, cards and cash are accepted." },
  { q: "How do I book a stall?", a: "Fill in the exhibitor form below or use 'Book a stall' on any event. Our team shares floor plans and pricing within 24 hours." },
  { q: "Is parking available?", a: "All venues have paid parking. We recommend public transport on weekends." },
];

export default function ExpoPage() {
  return (
    <div>
      <PageHero
        image="/images/b-expo.jpg"
        eyebrow="Season 2026 – 27"
        title={<>Expo &amp; Events</>}
        text="India's lifestyle exhibition for fragrance, fashion, organic food and wellness — touch, taste and try before you buy."
        crumbs={[{ href: "/", label: "Home" }, { label: "Events" }]}
        tall
      >
        <div className="flex flex-wrap gap-3">
          <a href="#events" className="h-12 inline-flex items-center rounded-full bg-white px-7 text-sm text-ink">Upcoming expos</a>
          <a href="#stall" className="h-12 inline-flex items-center rounded-full border border-white/60 px-7 text-sm hover:bg-white hover:text-ink transition-colors">Exhibit with us</a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
        {stats.map((s, k) => (
          <Reveal key={s.t} delay={k * 100} className="text-center lg:border-r lg:last:border-r-0 border-line">
            <p className="font-display text-6xl"><Counter to={s.n} suffix={s.s} /></p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{s.t}</p>
          </Reveal>
        ))}
      </section>

      {/* events */}
      <section id="events" className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-24 scroll-mt-28">
        <Reveal>
          <p className="eyebrow text-rose">Upcoming</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Find an Expo Near You</h2>
        </Reveal>
        <div className="mt-10 space-y-6">
          {expoEvents.map((e, k) => (
            <Reveal key={e.id} delay={k * 80} as="article" className="group grid md:grid-cols-[380px_1fr] overflow-hidden rounded-[26px] bg-ivory border border-line">
              <div className="zoom-img relative h-60 md:h-auto min-h-[240px]">
                <Image src={e.image} alt={e.title} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-5 left-5 rounded-2xl bg-ivory/95 px-4 py-2.5 text-center leading-none">
                  <span className="block font-display text-3xl">{Number(e.start.slice(8))}</span>
                  <span className="block text-[0.6rem] tracking-[0.2em] uppercase mt-1">{new Date(e.start).toLocaleString("en", { month: "short" })}</span>
                </span>
              </div>
              <div className="p-7 md:p-9 flex flex-col">
                <p className="eyebrow" style={{ color: e.color }}>{e.city}</p>
                <h3 className="font-display text-3xl md:text-4xl mt-2">{e.title}</h3>
                <p className="font-display italic text-xl text-muted mt-1">&ldquo;{e.theme}&rdquo;</p>
                <div className="mt-5 grid sm:grid-cols-2 gap-2 text-sm">
                  <p className="flex items-center gap-2"><CalendarIcon className="size-4 text-muted" /> {formatDateRange(e.start, e.end)} · 10 AM – 8 PM</p>
                  <p className="flex items-center gap-2"><PinIcon className="size-4 text-muted" /> {e.venue}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.focus.map((f) => {
                    const c = getCategory(f)!;
                    return (
                      <Link key={f} href={`/category/${f}`} className="rounded-full border border-line px-3 py-1 text-xs hover:border-ink">
                        {c.vertical}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-auto pt-7 flex items-center justify-between gap-4 flex-wrap">
                  <ExpoButtons eventId={e.id} color={e.color} />
                  <p className="text-xs text-muted">Passes from {formatINR(e.passPrice)} · {e.stallsLeft} stalls left</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* activities */}
      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28">
        <Reveal>
          <p className="eyebrow text-rose">On the floor</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">What&apos;s Happening at the Expo</h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((a, k) => (
            <Reveal key={a.title} from={(["left", "up", "right", "zoom", "tilt", "down"] as const)[k % 6]} delay={(k % 3) * 120} className="group shine zoom-img relative h-80 overflow-hidden rounded-[24px]">
              <Image src={a.image} alt={a.title} fill sizes="(max-width: 1024px) 50vw, 420px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <h3 className="font-display text-3xl">{a.title}</h3>
                <p className="text-sm text-white/80 mt-1.5">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* schedule */}
      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28">
        <Reveal>
          <p className="eyebrow text-rose">Schedule</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">A Day at Heloves Expo</h2>
        </Reveal>
        <ol className="mt-10 grid md:grid-cols-5 border-t border-line">
          {[
            ["10:00", "Doors open & welcome kits"],
            ["11:30", "Ayurveda & wellness talks"],
            ["14:00", "Perfume blending masterclass"],
            ["16:30", "Honey & organic tasting"],
            ["18:30", "Fashion runway & lucky draw"],
          ].map(([t, x], k) => (
            <Reveal as="li" key={t} delay={k * 100} className="relative pt-8 pr-6 pb-4">
              <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-gold" />
              <p className="font-display text-4xl">{t}</p>
              <p className="text-sm text-muted mt-2">{x}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* stall booking */}
      <section id="stall" className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28 scroll-mt-28">
        <div className="relative overflow-hidden rounded-[30px] text-white">
          <Image src="/images/e-hall.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(18,16,14,.92)_0%,rgba(18,16,14,.8)_50%,rgba(18,16,14,.6)_100%)]" />
          <div aria-hidden className="fx-aurora" />
          <div className="relative p-7 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <p className="eyebrow text-gold">Exhibitors</p>
              <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1.02]">Exhibit at Heloves Expo</h2>
              <p className="mt-4 text-white/75 max-w-md">
                Put your brand in front of 50,000+ high-intent visitors. Shell stalls, raw space and tasting kiosks available.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                {["Pre-event promotion to 2M+ Heloves customers", "Listing on heloves.com through the season", "Power, Wi-Fi, furniture & branding included", "A dedicated exhibitor success manager"].map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-gold">✦</span> {x}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal from="right">
              <StallForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="mx-auto max-w-3xl px-5 mt-28 scroll-mt-28">
        <Reveal className="text-center">
          <p className="eyebrow text-rose justify-center">Visitor help</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Frequently Asked Questions</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="cursor-pointer list-none flex justify-between items-center font-display text-2xl">
                {f.q}
                <span className="text-gold text-3xl font-light transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink/75 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
