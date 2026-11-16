"use client";

import { useMemo, useState } from "react";
import { categories, discountPct, type Product } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { CloseIcon, FilterIcon } from "./Icons";

type Sort = "popular" | "rating" | "low" | "high" | "discount";

const priceBuckets = [
  { id: "u500", label: "Under ₹500", test: (n: number) => n < 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", test: (n: number) => n >= 500 && n <= 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", test: (n: number) => n > 1000 && n <= 2000 },
  { id: "o2000", label: "Above ₹2,000", test: (n: number) => n > 2000 },
];

export default function ProductListing({
  products,
  subs,
  initialSub,
  showCategories = false,
  scope,
  reveal = false,
}: {
  products: Product[];
  subs?: string[];
  initialSub?: string;
  showCategories?: boolean;
  scope: string;
  /** stagger the cards in as they scroll into view */
  reveal?: boolean;
}) {
  const [sub, setSub] = useState<string[]>(initialSub ? [initialSub] : []);
  const [cats, setCats] = useState<string[]>([]);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [minOff, setMinOff] = useState(0);
  const [sort, setSort] = useState<Sort>("popular");
  const [open, setOpen] = useState(false);

  const brandList = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);

  const shown = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!sub.length || sub.includes(p.sub)) &&
        (!cats.length || cats.includes(p.category)) &&
        (!brandSel.length || brandSel.includes(p.brand)) &&
        (!prices.length || priceBuckets.some((b) => prices.includes(b.id) && b.test(p.price))) &&
        p.rating >= minRating &&
        discountPct(p) >= minOff,
    );
    const sorters: Record<Sort, (a: Product, b: Product) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      rating: (a, b) => b.rating - a.rating,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      discount: (a, b) => discountPct(b) - discountPct(a),
    };
    return list.sort(sorters[sort]);
  }, [products, sub, cats, brandSel, prices, minRating, minOff, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const activeCount = sub.length + cats.length + brandSel.length + prices.length + (minRating ? 1 : 0) + (minOff ? 1 : 0);
  const clearAll = () => {
    setSub([]);
    setCats([]);
    setBrandSel([]);
    setPrices([]);
    setMinRating(0);
    setMinOff(0);
  };

  const filters = (
    <div className="space-y-6">
      {showCategories && (
        <FilterGroup title="Category">
          {categories
            .filter((c) => products.some((p) => p.category === c.slug))
            .map((c) => (
              <Check key={c.slug} label={c.name} checked={cats.includes(c.slug)} onChange={() => toggle(cats, setCats, c.slug)} />
            ))}
        </FilterGroup>
      )}
      {subs && subs.length > 0 && (
        <FilterGroup title="Type">
          {subs.map((s) => (
            <Check key={s} label={s} checked={sub.includes(s)} onChange={() => toggle(sub, setSub, s)} />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Brand">
        {brandList.map((b) => (
          <Check key={b} label={b} checked={brandSel.includes(b)} onChange={() => toggle(brandSel, setBrandSel, b)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        {priceBuckets.map((b) => (
          <Check key={b.id} label={b.label} checked={prices.includes(b.id)} onChange={() => toggle(prices, setPrices, b.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Customer rating">
        {[4.5, 4].map((r) => (
          <Check key={r} label={`${r}★ & above`} checked={minRating === r} onChange={() => setMinRating(minRating === r ? 0 : r)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Discount">
        {[20, 30, 40].map((d) => (
          <Check key={d} label={`${d}% or more`} checked={minOff === d} onChange={() => setMinOff(minOff === d ? 0 : d)} />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8">
      {/* desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-[20px] bg-ivory border border-line p-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="font-display text-2xl">Filters</p>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-xs font-medium text-brand">
                Clear all
              </button>
            )}
          </div>
          {filters}
        </div>
      </aside>

      <div>
        {subs && subs.length > 0 && (
          <div className="rail flex gap-2 overflow-x-auto pb-4">
            <Chip active={!sub.length} onClick={() => setSub([])}>
              All
            </Chip>
            {subs.map((s) => (
              <Chip key={s} active={sub.includes(s)} onClick={() => setSub(sub.length === 1 && sub[0] === s ? [] : [s])}>
                {s}
              </Chip>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mb-5">
          <p className="text-sm text-muted">
            Showing <span className="font-medium text-ink">{shown.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 h-10 rounded-lg border border-line bg-ivory px-3 text-sm"
            >
              <FilterIcon /> Filters {activeCount > 0 && <span className="text-brand font-medium">({activeCount})</span>}
            </button>
            <label className="sr-only" htmlFor={`sort-${scope}`}>
              Sort by
            </label>
            <select
              id={`sort-${scope}`}
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 rounded-lg border border-line bg-ivory px-3 text-sm outline-none focus:border-brand"
            >
              <option value="popular">Sort: Popularity</option>
              <option value="rating">Customer rating</option>
              <option value="discount">Discount</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {shown.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
            {shown.map((p, k) =>
              reveal ? (
                <Reveal key={p.id} from={k % 3 === 1 ? "down" : "up"} delay={(k % 3) * 110}>
                  <ProductCard p={p} scope={scope} />
                </Reveal>
              ) : (
                <ProductCard key={p.id} p={p} scope={scope} />
              ),
            )}
          </div>
        ) : (
          <div className="rounded-[20px] bg-ivory border border-line p-12 text-center">
            <p className="font-display text-xl">No products match these filters</p>
            <button onClick={clearAll} className="mt-4 h-10 rounded-full bg-brand px-5 text-sm font-medium text-white">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* mobile filter sheet */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Close filters" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-ivory p-5 fade-up">
            <div className="flex items-center justify-between mb-5">
              <p className="font-medium text-lg">Filters</p>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            {filters}
            <div className="sticky bottom-0 bg-ivory pt-4 mt-6 flex gap-3">
              <button onClick={clearAll} className="flex-1 h-11 rounded-full border border-line text-sm font-medium">
                Clear
              </button>
              <button onClick={() => setOpen(false)} className="flex-1 h-11 rounded-full bg-brand text-white text-sm font-medium">
                Show {shown.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-xs font-medium uppercase tracking-wider text-muted mb-2.5">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-[#1b1d24]" />
      {label}
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 h-9 rounded-full px-4 text-sm border transition-colors ${
        active ? "bg-ink text-white border-ink" : "bg-ivory border-line hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
