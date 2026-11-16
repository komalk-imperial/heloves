import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryWorld from "@/components/CategoryWorld";
import { categories, getCategory } from "@/lib/catalog";

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
  // keyed so switching category remounts the page and its entrance animations replay
  return <CategoryWorld key={cat.slug} slug={cat.slug} />;
}
