"use client";

import { useSearchParams } from "next/navigation";
import { byCategory, getCategory, type CategorySlug } from "@/lib/catalog";
import ProductListing from "./ProductListing";

/** Reads ?sub= from the URL so mega-menu links pre-select a type. */
export default function CategoryListing({ slug, reveal = false }: { slug: CategorySlug; reveal?: boolean }) {
  const sub = useSearchParams().get("sub") ?? undefined;
  const cat = getCategory(slug)!;
  const valid = sub && cat.subs.includes(sub) ? sub : undefined;
  return <ProductListing key={valid ?? "all"} products={byCategory(slug)} subs={cat.subs} initialSub={valid} scope={`list-${slug}`} reveal={reveal} />;
}
