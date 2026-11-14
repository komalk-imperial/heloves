import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductRail from "@/components/ProductRail";
import Reveal from "@/components/Reveal";
import { StarIcon } from "@/components/Icons";
import { getCategory, getProduct, products, similarTo } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  return { title: p ? `${p.name} — HELOVES` : "HELOVES", description: p?.description };
}

const sampleReviews = [
  { name: "Priya K.", rating: 5, title: "Absolutely love it", text: "Exactly as described. Quality is excellent and delivery was super quick." },
  { name: "Arjun S.", rating: 4, title: "Great value", text: "Very good product for the price. Packaging was elegant and secure." },
  { name: "Meera D.", rating: 5, title: "Will buy again", text: "My second order already — consistent quality every time. Highly recommended." },
];

// The page itself stays URL-independent so its App Shell can be shared by every
// product link; the part that reads `params` streams in behind <Suspense>.
export default function ProductPage({ params }: PageProps<"/product/[id]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 lg:px-10 animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-56 rounded bg-brand-soft mt-6" />
      <div className="mt-8 grid lg:grid-cols-[1.1fr_1fr] gap-12">
        <div className="grid grid-cols-[84px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((k) => (
              <div key={k} className="aspect-[4/5] rounded-[14px] bg-brand-soft" />
            ))}
          </div>
          <div className="aspect-[4/5] rounded-[28px] bg-brand-soft" />
        </div>
        <div className="space-y-5">
          <div className="h-3 w-32 rounded bg-brand-soft" />
          <div className="h-12 w-4/5 rounded-xl bg-brand-soft" />
          <div className="h-5 w-48 rounded bg-brand-soft" />
          <div className="h-10 w-40 rounded-xl bg-brand-soft" />
          <div className="h-12 w-full rounded-full bg-brand-soft" />
          <div className="h-40 w-full rounded-[20px] bg-brand-soft" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }: Pick<PageProps<"/product/[id]">, "params">) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const dist = [68, 20, 7, 3, 2];
  const gallery = [p.image, cat.card, cat.banner];

  return (
    <div>
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
        <nav className="text-xs text-muted pt-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink">Home</Link> <span className="mx-1.5">/</span>
          <Link href={`/category/${cat.slug}`} className="hover:text-ink">{cat.vertical}</Link> <span className="mx-1.5">/</span>
          <span className="text-ink">{p.name}</span>
        </nav>

        <div className="mt-8 grid lg:grid-cols-[1.1fr_1fr] gap-12">
          {/* gallery */}
          <div className="lg:sticky lg:top-28 self-start grid grid-cols-[84px_1fr] gap-4">
            <div className="flex flex-col gap-3">
              {gallery.map((g, i) => (
                <div key={g} className={`relative aspect-[4/5] overflow-hidden rounded-[14px] ${i === 0 ? "ring-2 ring-ink" : "opacity-80"}`}>
                  <Image src={g} alt="" fill sizes="84px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-brand-soft zoom-img">
              <Image src={p.image} alt={p.name} fill priority sizes="(max-width: 1024px) 90vw, 600px" className="object-cover" />
              {p.badge && (
                <span className="absolute top-5 left-5 rounded-full bg-ivory/90 backdrop-blur px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.16em]">{p.badge}</span>
              )}
            </div>
          </div>

          <div>
            <ProductBuyBox key={p.id} p={p} />

            <section className="mt-12">
              <h2 className="font-display text-3xl">Highlights</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 rounded-[16px] bg-ivory border border-line px-4 py-3.5 text-sm">
                    <span className="size-1.5 rounded-full bg-gold" /> {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-3xl">The Story</h2>
              <p className="mt-3 leading-relaxed text-ink/80">{p.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm border-t border-line pt-6">
                <dt className="text-muted">Brand</dt><dd>{p.brand}</dd>
                <dt className="text-muted">Vertical</dt><dd>{cat.vertical} · {p.sub}</dd>
                <dt className="text-muted">Options</dt><dd>{p.sizes.join(", ")}</dd>
                <dt className="text-muted">Country of origin</dt><dd>India</dd>
              </dl>
            </section>

            <Reveal as="section" className="mt-12 rounded-[24px] bg-ivory border border-line p-7">
              <h2 className="font-display text-3xl">Ratings &amp; Reviews</h2>
              <div className="mt-5 grid sm:grid-cols-[140px_1fr] gap-6 items-center">
                <div className="text-center">
                  <p className="font-display text-6xl">{p.rating}</p>
                  <div className="flex justify-center gap-0.5 text-gold mt-1">
                    {Array.from({ length: 5 }, (_, k) => <StarIcon key={k} className="size-4" />)}
                  </div>
                  <p className="text-xs text-muted mt-1">{p.reviews.toLocaleString("en-IN")} ratings</p>
                </div>
                <div className="space-y-2">
                  {dist.map((d, k) => (
                    <div key={k} className="flex items-center gap-3 text-xs">
                      <span className="w-6">{5 - k}★</span>
                      <span className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                        <span className="block h-full rounded-full bg-gold" style={{ width: `${d}%` }} />
                      </span>
                      <span className="w-8 text-right text-muted">{d}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 divide-y divide-line">
                {sampleReviews.map((r) => (
                  <div key={r.name} className="py-5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-0.5 text-gold">
                        {Array.from({ length: r.rating }, (_, k) => <StarIcon key={k} className="size-3" />)}
                      </span>
                      <p className="font-display text-xl">{r.title}</p>
                    </div>
                    <p className="text-sm text-ink/80 mt-1.5">{r.text}</p>
                    <p className="text-xs text-muted mt-2">{r.name} · Verified buyer</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <ProductRail eyebrow={cat.vertical} title="You May Also Like" products={similarTo(p)} href={`/category/${cat.slug}`} />
    </div>
  );
}
