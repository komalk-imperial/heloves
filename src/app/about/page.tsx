import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import { ArrowRight, DiamondIcon, HandshakeIcon, LeafIcon, PeopleIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About Us — HELOVES" };

const milestones = [
  { y: "2012", t: "The beginning", d: "Heloves starts as a small attar house in Mumbai, blending fragrances by hand." },
  { y: "2015", t: "Heloves Aqua", d: "We launch packaged drinking water with our first 9-stage purification plant." },
  { y: "2018", t: "Into wellness", d: "Heloves Gold honey and Heloves Vital supplements join the family." },
  { y: "2021", t: "Heloves Studio", d: "A conscious clothing line built on organic cotton and fair wages." },
  { y: "2023", t: "First Expo", d: "The first Heloves Lifestyle Expo welcomes 18,000 visitors in Mumbai." },
  { y: "2026", t: "Global footprint", d: "16 brands, 6 verticals and a presence in 25+ countries." },
];

const values = [
  { icon: DiamondIcon, t: "Premium Quality", d: "Every product is tested, certified and crafted to a standard we would give our own families." },
  { icon: LeafIcon, t: "Sustainability", d: "Recyclable packaging, responsible sourcing and a goal of carbon-neutral operations by 2030." },
  { icon: HandshakeIcon, t: "Partnerships", d: "We grow with our farmers, beekeepers, distributors and retail partners — fairly and transparently." },
  { icon: PeopleIcon, t: "People First", d: "Customers, employees and communities sit at the centre of every decision we make." },
];

const leaders = [
  { n: "Founder & Chairman", r: "Vision & strategy", img: "/images/office.jpg" },
  { n: "Managing Director", r: "Operations & growth", img: "/images/building.jpg" },
  { n: "Head of Innovation", r: "R&D and quality", img: "/images/dropper.jpg" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        image="/images/hero-woman-city.jpg"
        eyebrow="About Heloves"
        title={<>A Diverse World.<br />One Vision.</>}
        text="We create premium lifestyle products and experiences for a healthier, happier and more inspired life."
        crumbs={[{ href: "/", label: "Home" }, { label: "About Us" }]}
        tall
      />

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-24 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal from="mask" className="relative h-[520px]">
          <div className="absolute left-0 top-0 w-[72%] h-[82%] overflow-hidden rounded-t-[999px] rounded-b-[28px] zoom-img">
            <Image src="/images/building.jpg" alt="Heloves headquarters" fill sizes="480px" className="object-cover" />
          </div>
          <div className="absolute right-0 bottom-0 w-[48%] h-[52%] overflow-hidden rounded-[28px] ring-8 ring-cream zoom-img">
            <Image src="/images/sprout.jpg" alt="" fill sizes="320px" className="object-cover" />
          </div>
        </Reveal>
        <Reveal>
          <p className="eyebrow text-rose">Who we are</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.08]">Nature, science and creativity — in everyday life.</h2>
          <p className="mt-6 leading-relaxed text-ink/75">
            Heloves is a diversified lifestyle group spanning fragrances, packaged drinking water, clothing, honey, health &amp;
            wellness and live expo experiences. What connects them is a single belief: the things you use every day should make
            your life genuinely better.
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            From our perfumery in Mumbai to our partner beekeepers in the Himalayas and our purification plants across India, we
            control quality at every step — so every product carries the same promise.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              { n: 25, s: "+", t: "Countries" },
              { n: 16, s: "", t: "Brands" },
              { n: 1200, s: "+", t: "Team members" },
            ].map((s) => (
              <div key={s.t}>
                <p className="font-display text-5xl"><Counter to={s.n} suffix={s.s} /></p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted mt-1">{s.t}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28 grid md:grid-cols-2 gap-6">
        {[
          { t: "Our Mission", d: "To make premium, honest and sustainable lifestyle products accessible to every home — and to bring people together through memorable experiences.", img: "/images/leaf-drop.jpg" },
          { t: "Our Vision", d: "To be the world's most trusted lifestyle group, known for products that improve wellbeing and choices that protect the planet.", img: "/images/forest.jpg" },
        ].map((b, k) => (
          <Reveal key={b.t} from={k ? "wipe-right" : "wipe-left"} delay={k * 150} className="shine zoom-img relative h-80 overflow-hidden rounded-[28px]">
            <Image src={b.img} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a0e]/90 via-[#0f1a0e]/45 to-transparent" />
            <div className="absolute inset-x-8 bottom-8 text-white">
              <h3 className="font-display text-4xl">{b.t}</h3>
              <p className="mt-3 text-white/85 leading-relaxed max-w-md">{b.d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28">
        <Reveal className="text-center">
          <p className="eyebrow text-rose justify-center">What we stand for</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Our Values</h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, t, d }, k) => (
            <Reveal key={t} delay={k * 100} className="rounded-[24px] border border-line bg-ivory p-8 hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(27,29,36,.5)] transition-all duration-500">
              <Icon className="size-10 text-gold" />
              <h3 className="font-display text-2xl mt-5">{t}</h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28">
        <Reveal>
          <p className="eyebrow text-rose">Our journey</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Milestones</h2>
        </Reveal>
        <ol className="mt-12 relative grid md:grid-cols-3 lg:grid-cols-6 gap-8 before:hidden lg:before:block before:absolute before:left-0 before:right-0 before:top-[7px] before:h-px before:bg-line">
          {milestones.map((m, k) => (
            <Reveal as="li" key={m.y} delay={k * 90} className="relative">
              <span className="relative block size-4 rounded-full border-2 border-gold bg-cream" />
              <p className="font-display text-4xl mt-5">{m.y}</p>
              <p className="font-medium text-sm mt-1">{m.t}</p>
              <p className="text-sm text-muted mt-2 leading-relaxed">{m.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28">
        <Reveal>
          <p className="eyebrow text-rose">Leadership</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">The Team Behind Heloves</h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {leaders.map((l, k) => (
            <Reveal key={l.n} delay={k * 120}>
              <div className="zoom-img relative h-80 overflow-hidden rounded-[24px] bg-brand-soft">
                <Image src={l.img} alt="" fill sizes="420px" className="object-cover grayscale-[30%]" />
              </div>
              <p className="font-display text-2xl mt-4">{l.n}</p>
              <p className="text-sm text-muted">{l.r} · Photo &amp; name coming soon</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28">
        <Reveal className="rounded-[30px] bg-gradient-to-r from-brand-soft via-[#f3ebdf] to-brand-soft border border-line p-10 md:p-14 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Let&apos;s build something together.</h2>
            <p className="text-ink/70 mt-2">Distribution, private label, corporate supply or expo partnerships.</p>
          </div>
          <Link href="/enquiry" className="group shrink-0 inline-flex h-14 items-center gap-3 rounded-full bg-brand px-8 text-sm text-white hover:bg-black">
            Business Enquiry <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
