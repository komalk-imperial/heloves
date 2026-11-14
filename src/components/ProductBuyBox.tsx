"use client";

import { useState } from "react";
import { discountPct, formatINR, type Product } from "@/lib/catalog";
import { addToCart, toggleWishlist, useStore } from "@/lib/store";
import { HeartIcon, StarIcon, TagIcon, TruckIcon } from "./Icons";

const offerLines = [
  "Extra 10% off on your first order — code HELOVES10",
  "5% cashback with Heloves UPI · up to ₹100",
  "No-cost EMI on orders above ₹3,000",
];

export default function ProductBuyBox({ p }: { p: Product }) {
  const { wishlist } = useStore();
  const saved = wishlist.includes(p.id);
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [eta, setEta] = useState<string | null>(null);
  const off = discountPct(p);

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) return setEta("Please enter a valid 6-digit pincode");
    const d = new Date();
    d.setDate(d.getDate() + (Number(pin[0]) % 3) + 2);
    setEta(`Delivery by ${d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · Free`);
  };

  return (
    <div>
      <p className="eyebrow text-gold">{p.brand}</p>
      <h1 className="font-display text-4xl md:text-5xl mt-3 leading-[1.05]">{p.name}</h1>
      <div className="mt-3 flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2.5 py-0.5 text-ink">
          {p.rating} <StarIcon />
        </span>
        <span className="text-muted">{p.reviews.toLocaleString("en-IN")} ratings & reviews</span>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-4xl">{formatINR(p.price)}</span>
        <span className="text-muted line-through">MRP {formatINR(p.mrp)}</span>
        <span className="font-medium text-[#3f5a3c]">{off}% off</span>
      </div>
      <p className="text-xs text-muted mt-1">Inclusive of all taxes</p>

      <div className="mt-6">
        <p className="text-sm font-medium mb-2">
          Select {p.category === "clothing" ? "size" : "option"}: <span className="font-normal text-muted">{size}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`min-w-14 h-11 rounded-[14px] border px-4 text-sm transition-colors ${
                s === size ? "border-brand bg-brand-soft text-brand font-medium" : "border-line bg-ivory hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center h-12 rounded-[14px] border border-line bg-ivory">
          <button className="w-10 h-full text-lg" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button className="w-10 h-full text-lg" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button
          onClick={() => addToCart(p.id, size, qty)}
          className="flex-1 h-12 rounded-full bg-brand text-white hover:bg-black transition-colors"
        >
          Add to Bag
        </button>
        <button
          onClick={() => toggleWishlist(p.id)}
          aria-label="Wishlist"
          className={`grid place-items-center size-12 rounded-[14px] border ${saved ? "border-brand text-brand bg-brand-soft" : "border-line bg-ivory"}`}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <div className="mt-7 rounded-[20px] border border-line bg-ivory p-5">
        <p className="text-sm font-medium mb-3">Available offers</p>
        <ul className="space-y-2.5">
          {offerLines.map((o) => (
            <li key={o} className="flex gap-2 text-sm">
              <TagIcon className="size-4 text-[#3f5a3c] shrink-0 mt-0.5" /> {o}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={checkPin} className="mt-4 rounded-[20px] border border-line bg-ivory p-5">
        <p className="text-sm font-medium mb-3 flex items-center gap-2">
          <TruckIcon className="size-5" /> Check delivery
        </p>
        <div className="flex gap-2">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter pincode"
            inputMode="numeric"
            aria-label="Pincode"
            className="flex-1 h-10 rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
          />
          <button className="h-10 px-4 rounded-lg border border-brand text-brand text-sm font-medium">Check</button>
        </div>
        {eta && <p className="mt-2 text-sm text-[#3f5a3c]">{eta}</p>}
      </form>
    </div>
  );
}
