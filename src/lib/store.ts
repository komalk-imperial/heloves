"use client";

import { useSyncExternalStore } from "react";

export type CartItem = { id: string; size: string; qty: number };
type State = { cart: CartItem[]; wishlist: string[]; toast: { id: number; text: string } | null };

const KEY = "heloves-store-v1";
const EMPTY: State = { cart: [], wishlist: [], toast: null };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { cart: parsed.cart ?? [], wishlist: parsed.wishlist ?? [], toast: null };
    }
  } catch {
    // storage unavailable (private mode etc.) — start empty
  }
}

function set(next: Partial<State>, persist = true) {
  state = { ...state, ...next };
  if (persist) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ cart: state.cart, wishlist: state.wishlist }));
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;
export function showToast(text: string) {
  clearTimeout(toastTimer);
  set({ toast: { id: Date.now(), text } }, false);
  toastTimer = setTimeout(() => set({ toast: null }, false), 2600);
}

export function addToCart(id: string, size: string, qty = 1) {
  load();
  const existing = state.cart.find((i) => i.id === id && i.size === size);
  const cart = existing
    ? state.cart.map((i) => (i === existing ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
    : [...state.cart, { id, size, qty }];
  set({ cart });
  showToast("Added to bag");
}

export function setQty(id: string, size: string, qty: number) {
  set({
    cart: state.cart
      .map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(0, Math.min(10, qty)) } : i))
      .filter((i) => i.qty > 0),
  });
}

export function removeFromCart(id: string, size: string) {
  set({ cart: state.cart.filter((i) => !(i.id === id && i.size === size)) });
}

export function clearCart() {
  set({ cart: [] });
}

export function toggleWishlist(id: string) {
  load();
  const has = state.wishlist.includes(id);
  set({ wishlist: has ? state.wishlist.filter((w) => w !== id) : [...state.wishlist, id] });
  showToast(has ? "Removed from wishlist" : "Saved to wishlist ♥");
}
