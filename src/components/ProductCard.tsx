"use client";

import Image from "next/image";
import Link from "next/link";
import { discountPct, formatINR, type Product } from "@/lib/catalog";
import { addToCart, toggleWishlist, useStore } from "@/lib/store";
import { BagIcon, HeartIcon, StarIcon } from "./Icons";

export default function ProductCard({ p }: { p: Product; scope?: string }) {
  const { wishlist } = useStore();
  const saved = wishlist.includes(p.id);
  const off = discountPct(p);

  return (
    <div className="group relative flex flex-col">
      <div className="shine zoom-img relative aspect-[4/5] overflow-hidden rounded-[20px] bg-brand-soft transition-shadow duration-500 group-hover:shadow-[0_26px_44px_-26px_rgba(80,40,20,.6)]">
        <Link href={`/product/${p.id}`} aria-label={p.name} className="absolute inset-0">
          <Image data-rv-img src={p.image} alt={p.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        {p.badge && (
          <span className="absolute top-3.5 left-3.5 rounded-full bg-ivory/90 backdrop-blur px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink">
            {p.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(p.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 grid place-items-center size-10 rounded-full bg-ivory/90 backdrop-blur transition-colors ${saved ? "text-[#a8463b]" : "text-ink hover:text-[#a8463b]"}`}
        >
          <HeartIcon filled={saved} />
        </button>
        <button
          onClick={() => addToCart(p.id, p.sizes[0])}
          className="absolute inset-x-3 bottom-3 h-11 rounded-full bg-ivory/95 backdrop-blur text-sm text-ink inline-flex items-center justify-center gap-2 transition-all duration-500 md:translate-y-16 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink hover:text-white"
        >
          <BagIcon className="size-4" /> Add to Bag
        </button>
      </div>

      <div className="pt-4 px-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">{p.brand}</p>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <StarIcon className="size-3 text-gold" /> {p.rating}
          </span>
        </div>
        <Link href={`/product/${p.id}`} className="mt-1.5 block font-display text-[1.3rem] leading-tight line-clamp-2 hover:opacity-70 transition-opacity">
          {p.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2.5 text-sm">
          <span className="font-medium text-ink">{formatINR(p.price)}</span>
          {off > 0 && (
            <>
              <span className="text-muted line-through text-xs">{formatINR(p.mrp)}</span>
              <span className="text-xs text-sage font-medium">{off}% off</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
