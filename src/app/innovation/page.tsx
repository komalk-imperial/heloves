import Image from "next/image";
import { BulbIcon, FlaskIcon, LeafIcon, RecycleIcon, ShieldIcon, DropIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

export const metadata = { title: "Innovation & Sustainability — HELOVES" };

const pillars = [
  { icon: FlaskIcon, t: "Heloves Labs", d: "Our in-house R&D centre develops new fragrances, nutraceutical formulas and honey-testing methods, with 40+ scientists and perfumers." },
  { icon: ShieldIcon, t: "Quality Assurance", d: "NMR-tested honey, BIS-certified water, GMP-certified supplements and IFRA-compliant fragrances — verified batch by batch." },
  { icon: BulbIcon, t: "Smart Supply", d: "A connected supply chain with batch traceability and IoT-monitored water plants that track purity in real time." },
  { icon: DropIcon, t: "Water Stewardship", d: "For every litre we bottle, we help replenish groundwater through rainwater harvesting with local communities." },
];

const goals = [
  { n: 100, s: "%", t: "Recyclable packaging by 2028" },
  { n: 60, s: "%", t: "Renewable energy in our plants today" },
  { n: 5000, s: "+", t: "Farmers & beekeepers supported" },
  { n: 2030, s: "", t: "Our carbon-neutral target year" },
];

export default function InnovationPage() {
  return (
    <div>
      <PageHero
        image="/images/dropper.jpg"
        eyebrow="Innovation"
        title={<>Where Nature<br />Meets Science</>}
        text="Research, rigorous quality and responsible choices — the quiet work behind every Heloves product."
        crumbs={[{ href: "/", label: "Home" }, { label: "Innovation" }]}
        tall
      />

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-24 grid md:grid-cols-2 gap-6">
        {pillars.map(({ icon: Icon, t, d }, k) => (
          <Reveal key={t} delay={k * 100} className="group rounded-[26px] border border-line bg-ivory p-9 flex gap-6 hover:bg-white transition-colors">
            <span className="grid place-items-center size-16 shrink-0 rounded-full bg-gold-soft text-gold group-hover:bg-ink group-hover:text-white transition-colors duration-500">
              <Icon className="size-8" />
            </span>
            <div>
              <h3 className="font-display text-3xl">{t}</h3>
              <p className="text-ink/70 mt-2 leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-28 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal from="wipe-left" className="shine zoom-img relative h-[460px] overflow-hidden rounded-[30px]">
          <Image src="/images/office.jpg" alt="Heloves Labs" fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" />
        </Reveal>
        <Reveal>
          <p className="eyebrow text-rose">Research &amp; development</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.08]">From idea to shelf, with care at every step.</h2>
          <ol className="mt-8 space-y-6">
            {[
              ["01", "Discover", "Consumer insight and ingredient research shape every new idea."],
              ["02", "Formulate", "Perfumers, nutritionists and designers prototype in Heloves Labs."],
              ["03", "Validate", "Third-party testing, stability studies and real-world trials."],
              ["04", "Launch", "Small-batch launch, feedback, refinement — then scale."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-5">
                <span className="font-display text-3xl text-gold w-10">{n}</span>
                <div>
                  <p className="font-display text-2xl">{t}</p>
                  <p className="text-sm text-ink/70 mt-1">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section id="sustainability" className="relative mt-28 overflow-hidden scroll-mt-24">
        <Image src="/images/forest.jpg" alt="" fill sizes="100vw" className="kenburns object-cover" />
        <div className="absolute inset-0 bg-[#0f1a0e]/80" />
        <div aria-hidden className="fx-aurora" style={{ "--glow": "#4f8a58", "--hi": "#c9dcb0" } as React.CSSProperties} />
        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10 py-24 text-white">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-[#c9dcb0]">Sustainability</p>
            <h2 className="font-display text-5xl md:text-6xl mt-3 leading-[1.02]">Together for a Better Tomorrow</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              Responsible sourcing, recyclable packaging and cleaner energy are built into how we grow — not added on afterwards.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((g, k) => (
              <Reveal key={g.t} delay={k * 100} className="rounded-[22px] border border-white/15 bg-white/5 backdrop-blur p-7">
                <p className="font-display text-5xl"><Counter to={g.n} suffix={g.s} duration={g.n > 1000 ? 1200 : 1800} /></p>
                <p className="text-sm text-white/75 mt-2">{g.t}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><RecycleIcon className="size-6" /> Bottle take-back programme</span>
            <span className="inline-flex items-center gap-2"><LeafIcon className="size-6" /> Ethical, traceable sourcing</span>
          </div>
        </div>
      </section>
    </div>
  );
}
