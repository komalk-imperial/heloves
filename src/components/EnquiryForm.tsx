"use client";

import { useState } from "react";
import { categories } from "@/lib/catalog";
import { ArrowRight } from "./Icons";

const types = ["Distribution / Dealership", "Corporate & Bulk Supply", "Private Label", "Expo Partnership", "Export", "Investor Relations"];

const field =
  "w-full h-12 rounded-[14px] border border-line bg-white/70 px-4 text-sm outline-none focus:border-ink transition-colors placeholder:text-muted/70";

export default function EnquiryForm() {
  const [type, setType] = useState(types[0]);
  const [verticals, setVerticals] = useState<string[]>([]);
  const [sent, setSent] = useState<string | null>(null);

  if (sent)
    return (
      <div className="rounded-[28px] bg-ivory border border-line p-12 text-center fade-up">
        <p className="font-display text-5xl">Thank you.</p>
        <p className="mt-3 text-ink/70">
          Your enquiry reference is <b>{sent}</b>. Our partnerships team will be in touch within one business day.
        </p>
        <p className="text-xs text-muted mt-6">Demo form — no data has been sent.</p>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent("HLV-B" + Math.floor(10000 + Math.random() * 90000));
      }}
      className="rounded-[28px] bg-ivory border border-line p-7 md:p-10 space-y-7"
    >
      <fieldset>
        <legend className="text-xs uppercase tracking-[0.2em] text-muted mb-3">Enquiry type</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${t === type ? "bg-ink text-white border-ink" : "border-line hover:border-ink"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs uppercase tracking-[0.2em] text-muted mb-3">Verticals of interest</legend>
        <div className="flex flex-wrap gap-2">
          {[...categories.map((c) => c.vertical), "Expo & Events"].map((v) => {
            const on = verticals.includes(v);
            return (
              <button
                type="button"
                key={v}
                onClick={() => setVerticals(on ? verticals.filter((x) => x !== v) : [...verticals, v])}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? "bg-gold text-white border-gold" : "border-line hover:border-ink"}`}
              >
                {v}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Full name" aria-label="Full name" className={field} />
        <input required placeholder="Company" aria-label="Company" className={field} />
        <input required type="email" placeholder="Work email" aria-label="Work email" className={field} />
        <input required type="tel" pattern="[0-9+ ]{10,15}" placeholder="Phone" aria-label="Phone" className={field} />
        <input placeholder="City / Country" aria-label="City or country" className={field} />
        <select aria-label="Expected volume" className={field} defaultValue="">
          <option value="" disabled>
            Expected monthly volume
          </option>
          <option>Under ₹5 lakh</option>
          <option>₹5 – 25 lakh</option>
          <option>₹25 lakh – 1 crore</option>
          <option>Above ₹1 crore</option>
        </select>
      </div>
      <textarea required rows={5} placeholder="Tell us about your business and what you're looking for" aria-label="Message" className={`${field} h-auto py-3 resize-none`} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-muted">By submitting, you agree to be contacted about your enquiry.</p>
        <button className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brand px-8 text-sm text-white hover:bg-black">
          Send Enquiry <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
