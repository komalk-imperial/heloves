"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatINR, getProduct, topDeals } from "@/lib/catalog";
import { clearCart, removeFromCart, setQty, showToast, toggleWishlist, useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import { BagIcon, LockIcon } from "./Icons";

const COUPONS: Record<string, number> = { HELOVES10: 10, SCENT30: 30, STYLE40: 40 };
const FREE_SHIP = 499;

export default function BagView() {
  const { cart } = useStore();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [placed, setPlaced] = useState<string | null>(null);

  const lines = cart
    .map((i) => ({ ...i, p: getProduct(i.id) }))
    .filter((l): l is typeof l & { p: NonNullable<typeof l.p> } => !!l.p);

  const mrp = lines.reduce((s, l) => s + l.p.mrp * l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  // coupons are capped at ₹500 off
  const couponOff = applied ? Math.min(500, Math.round((subtotal * COUPONS[applied]) / 100)) : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : 49;
  const total = subtotal - couponOff + shipping;

  if (placed) {
    return (
      <div className="py-20 text-center fade-up">
        <div className="mx-auto grid place-items-center size-20 rounded-full bg-[#e8eee6] text-[#3f5a3c] text-4xl">✓</div>
        <h1 className="font-display text-3xl mt-6">Order placed!</h1>
        <p className="text-muted mt-2">Order {placed} · This is a demo — no payment was taken.</p>
        <Link href="/" className="inline-flex mt-8 h-12 items-center rounded-full bg-brand px-8 text-white font-medium">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="py-16">
        <div className="text-center">
          <div className="mx-auto grid place-items-center size-20 rounded-full bg-brand-soft text-brand">
            <BagIcon className="size-9" />
          </div>
          <h1 className="font-display text-3xl mt-6">Your bag is empty</h1>
          <p className="text-muted mt-2">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/" className="inline-flex mt-6 h-12 items-center rounded-full bg-brand px-8 text-white font-medium">
            Start shopping
          </Link>
        </div>
        <h2 className="font-display text-2xl mt-16 mb-5">Trending deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topDeals().slice(0, 4).map((p) => <ProductCard key={p.id} p={p} scope="bag-empty" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <h1 className="font-display text-3xl">Shopping Bag <span className="text-base font-sans text-muted">({lines.reduce((n, l) => n + l.qty, 0)} items)</span></h1>

      {subtotal < FREE_SHIP && (
        <div className="mt-4 rounded-[14px] bg-gold-soft px-4 py-3 text-sm">
          Add <b>{formatINR(FREE_SHIP - subtotal)}</b> more for <b>FREE delivery</b>
          <div className="mt-2 h-1.5 rounded-full bg-ivory overflow-hidden">
            <div className="h-full bg-gold" style={{ width: `${(subtotal / FREE_SHIP) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        <ul className="space-y-4">
          {lines.map((l) => {
            return (
              <li key={l.id + l.size} className="flex gap-4 rounded-[20px] bg-ivory border border-line p-4">
                <Link href={`/product/${l.p.id}`} className="relative w-24 h-28 md:w-28 md:h-32 shrink-0 overflow-hidden rounded-[14px] bg-brand-soft">
                  <Image src={l.p.image} alt={l.p.name} fill sizes="120px" className="object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted uppercase tracking-wider">{l.p.brand}</p>
                  <Link href={`/product/${l.p.id}`} className="text-sm font-medium line-clamp-2 hover:text-brand">{l.p.name}</Link>
                  <p className="text-xs text-muted mt-1">{l.size}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-medium">{formatINR(l.p.price * l.qty)}</span>
                    <span className="text-xs text-muted line-through">{formatINR(l.p.mrp * l.qty)}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center h-9 rounded-lg border border-line">
                      <button className="w-8 h-full" onClick={() => setQty(l.id, l.size, l.qty - 1)} aria-label="Decrease">−</button>
                      <span className="w-6 text-center text-sm font-medium">{l.qty}</span>
                      <button className="w-8 h-full" onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <button className="text-xs font-medium text-muted hover:text-brand" onClick={() => removeFromCart(l.id, l.size)}>Remove</button>
                    <button
                      className="text-xs font-medium text-muted hover:text-brand"
                      onClick={() => {
                        removeFromCart(l.id, l.size);
                        toggleWishlist(l.id);
                      }}
                    >
                      Move to wishlist
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="lg:sticky lg:top-28 space-y-4">
          <div className="rounded-[20px] bg-ivory border border-line p-5">
            <p className="text-sm font-medium mb-3">Apply coupon</p>
            {applied ? (
              <div className="flex items-center justify-between rounded-lg bg-[#e8eee6] px-3 py-2 text-sm">
                <span><b>{applied}</b> applied — {COUPONS[applied]}% off</span>
                <button className="text-xs font-medium text-brand" onClick={() => setApplied(null)}>Remove</button>
              </div>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const c = code.trim().toUpperCase();
                  if (COUPONS[c]) {
                    setApplied(c);
                    setCode("");
                    showToast(`Coupon ${c} applied`);
                  } else showToast("Invalid coupon code");
                }}
              >
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Try HELOVES10" aria-label="Coupon code" className="flex-1 min-w-0 h-10 rounded-lg border border-line px-3 text-sm uppercase outline-none focus:border-brand" />
                <button className="h-10 px-4 rounded-lg border border-brand text-brand text-sm font-medium">Apply</button>
              </form>
            )}
          </div>

          <div className="rounded-[20px] bg-ivory border border-line p-5">
            <p className="text-sm font-medium mb-4">Price details</p>
            <dl className="space-y-2.5 text-sm">
              <Row label="Total MRP" value={formatINR(mrp)} />
              <Row label="Discount on MRP" value={`− ${formatINR(mrp - subtotal)}`} green />
              {couponOff > 0 && <Row label="Coupon discount" value={`− ${formatINR(couponOff)}`} green />}
              <Row label="Delivery fee" value={shipping ? formatINR(shipping) : "FREE"} green={!shipping} />
              <div className="border-t border-dashed border-line pt-3 flex justify-between font-medium text-base">
                <dt>Total amount</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-lg bg-[#e8eee6] px-3 py-2 text-xs font-medium text-[#3f5a3c]">
              You save {formatINR(mrp - subtotal + couponOff)} on this order 🎉
            </p>
            <button
              onClick={() => {
                setPlaced("HLV" + Math.floor(100000 + Math.random() * 900000));
                clearCart();
              }}
              className="mt-4 w-full h-12 rounded-[14px] bg-brand text-white font-medium hover:bg-brand-dark inline-flex items-center justify-center gap-2"
            >
              <LockIcon className="size-4" /> Place order
            </button>
            <p className="mt-2 text-center text-[11px] text-muted">Demo checkout · UPI · Cards · Net banking · COD</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={green ? "text-[#3f5a3c] font-medium" : ""}>{value}</dd>
    </div>
  );
}
