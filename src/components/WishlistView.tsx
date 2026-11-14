"use client";

import Link from "next/link";
import { getProduct, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import { HeartIcon } from "./Icons";

export default function WishlistView() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is Product => !!p);

  return (
    <div className="pt-6">
      <h1 className="font-display text-3xl">
        My Wishlist <span className="text-base font-sans text-muted">({items.length})</span>
      </h1>
      {items.length ? (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} scope="wish" />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="mx-auto grid place-items-center size-20 rounded-full bg-brand-soft text-brand">
            <HeartIcon className="size-9" />
          </div>
          <p className="font-display text-2xl mt-6">Nothing saved yet</p>
          <p className="text-muted mt-2">Tap the heart on any product to save it here.</p>
          <Link href="/offers" className="inline-flex mt-6 h-12 items-center rounded-full bg-brand px-8 text-white font-medium">
            Explore products
          </Link>
        </div>
      )}
    </div>
  );
}
