import Image from "next/image";
import Link from "next/link";
import { ArrowRight, VerticalIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { brandPortfolio, byCategory, categories } from "@/lib/catalog";

export const metadata = { title: "Our Brands — HELOVES" };

export default function BrandsPage() {
  return (
    <div>
      <PageHero
        image="/images/b-perfumes.jpg"
        eyebrow="Our Brands"
        title={<>16 Brands.<br />One Promise.</>}
        text="Each Heloves brand is crafted for a different moment of your day — all built on the same standard of quality."
        crumbs={[{ href: "/", label: "Home" }, { label: "Our Brands" }]}
      />

      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-20 space-y-24">
        {categories.map((c, k) => {
          const list = brandPortfolio.filter((b) => b.category === c.slug);
          const count = byCategory(c.slug).length;
          return (
            <section key={c.slug} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${k % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal from={k % 2 ? "wipe-right" : "wipe-left"} className="shine zoom-img relative h-[420px] overflow-hidden rounded-[30px]">
                <Image src={c.card} alt={c.vertical} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute left-7 bottom-6 inline-flex items-center gap-3 text-white">
                  <VerticalIcon name={c.icon} className="size-8" />
                  <span className="font-display text-3xl">{c.vertical}</span>
                </span>
              </Reveal>
              <Reveal>
                <p className="eyebrow text-rose">{String(k + 1).padStart(2, "0")} — {c.vertical}</p>
                <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.08]">{c.tagline}</h2>
                <p className="mt-4 text-ink/70 leading-relaxed">{c.blurb}</p>
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {list.map((b) => (
                    <li key={b.name}>
                      <Link href={`/search?q=${encodeURIComponent(b.name)}`} className="group flex items-center justify-between py-4">
                        <span>
                          <span className="block font-display text-2xl">{b.name}</span>
                          <span className="block text-sm text-muted">{b.line}</span>
                        </span>
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/category/${c.slug}`} className="group mt-7 inline-flex h-12 items-center gap-3 rounded-full bg-brand px-7 text-sm text-white hover:bg-black">
                  Explore {count} products <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </section>
          );
        })}
      </div>
    </div>
  );
}
