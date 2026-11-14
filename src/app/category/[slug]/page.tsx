import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryListing from "@/components/CategoryListing";
import PageHero from "@/components/PageHero";
import ProductListing from "@/components/ProductListing";
import Reveal from "@/components/Reveal";
import { brandPortfolio, byCategory, categories, getCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  return { title: cat ? `${cat.vertical} — HELOVES` : "HELOVES" };
}

// The page itself stays URL-independent so its App Shell can be shared by every
// category link; the part that reads `params` streams in behind <Suspense>.
export default function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

function CategorySkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 pt-4">
        <div className="h-[380px] md:h-[440px] rounded-[30px] bg-brand-soft" />
      </div>
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-14 grid md:grid-cols-[1fr_2fr] gap-10">
        <div className="h-24 rounded-2xl bg-brand-soft" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((k) => (
            <div key={k} className="h-24 rounded-[20px] bg-brand-soft" />
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="aspect-[4/5] rounded-[20px] bg-brand-soft" />
        ))}
      </div>
    </div>
  );
}

async function CategoryContent({ params }: Pick<PageProps<"/category/[slug]">, "params">) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const items = byCategory(cat.slug);
  const catBrands = brandPortfolio.filter((b) => b.category === cat.slug);

  return (
    <div>
      <PageHero
        image={cat.banner}
        eyebrow="Our World"
        title={cat.vertical}
        text={cat.blurb}
        crumbs={[{ href: "/", label: "Home" }, { label: "Our World" }, { label: cat.vertical }]}
      />

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-14 grid md:grid-cols-[1fr_2fr] gap-10 items-start">
        <Reveal>
          <p className="eyebrow text-rose">Brands in this vertical</p>
          <h2 className="font-display text-4xl mt-3">{cat.tagline}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {catBrands.map((b, k) => (
            <Reveal key={b.name} delay={k * 100} className="rounded-[20px] border border-line bg-ivory p-6">
              <p className="font-display text-2xl">{b.name}</p>
              <p className="text-sm text-muted mt-1.5">{b.line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-16">
        <Suspense fallback={<ProductListing products={items} subs={cat.subs} scope={`list-${cat.slug}`} />}>
          <CategoryListing slug={cat.slug} />
        </Suspense>
      </div>
    </div>
  );
}
