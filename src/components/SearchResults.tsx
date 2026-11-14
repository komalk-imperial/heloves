"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories, searchProducts } from "@/lib/catalog";
import ProductListing from "./ProductListing";
import { SearchIcon } from "./Icons";

const popular = ["Rose", "Oud", "Attar", "Alkaline", "20 L Jar", "Kurta", "Hoodie", "Raw Honey", "Ashwagandha", "Green Tea"];

export default function SearchResults() {
  const q = useSearchParams().get("q") ?? "";
  return <SearchInner key={q} q={q} />;
}

function SearchInner({ q }: { q: string }) {
  const router = useRouter();
  const [term, setTerm] = useState(q);
  const results = searchProducts(q);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (term.trim()) router.push(`/search?q=${encodeURIComponent(term.trim())}`);
        }}
        className="mt-5 flex items-center gap-2 rounded-full bg-ivory border border-line px-5 h-12 focus-within:border-brand"
      >
        <SearchIcon className="size-5 text-muted" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for products, brands and more"
          className="w-full bg-transparent outline-none text-sm"
          aria-label="Search"
        />
      </form>

      {q ? (
        <>
          <h1 className="font-display text-2xl md:text-3xl mt-8 mb-6">
            Results for “{q}” <span className="text-base font-sans text-muted">({results.length})</span>
          </h1>
          {results.length ? (
            <ProductListing key={q} products={results} showCategories scope="search" />
          ) : (
            <p className="text-muted">No products found. Try one of the popular searches below.</p>
          )}
        </>
      ) : (
        <h1 className="font-display text-2xl mt-8">What are you looking for?</h1>
      )}

      <div className="mt-10">
        <p className="text-xs font-medium uppercase tracking-wider text-muted mb-3">Popular searches</p>
        <div className="flex flex-wrap gap-2">
          {popular.map((p) => (
            <Link key={p} href={`/search?q=${encodeURIComponent(p)}`} onClick={() => setTerm(p)} className="rounded-full border border-line bg-ivory px-4 py-2 text-sm hover:border-brand hover:text-brand">
              {p}
            </Link>
          ))}
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted mt-8 mb-3">Browse categories</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="rounded-full px-4 py-2 text-sm font-medium" style={{ background: c.tint, color: c.accent }}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
