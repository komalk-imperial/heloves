"use client";

import { useState } from "react";
import { showToast } from "@/lib/store";
import { ArrowRight } from "./Icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <form
      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 pl-6 backdrop-blur focus-within:border-white/50 transition-colors"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return showToast("Please enter a valid email");
        setEmail("");
        showToast("Welcome to Heloves — check your inbox");
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="flex-1 min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
      />
      <button className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm text-ink hover:bg-gold hover:text-white transition-colors">
        Subscribe <ArrowRight />
      </button>
    </form>
  );
}
