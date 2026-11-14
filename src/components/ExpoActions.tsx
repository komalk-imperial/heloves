"use client";

import { useState } from "react";
import { expoEvents, formatDateRange, formatINR, type ExpoEvent } from "@/lib/catalog";
import { showToast } from "@/lib/store";
import { CloseIcon } from "./Icons";

type Mode = { kind: "visit" | "stall"; event: ExpoEvent };

const field = "w-full h-11 rounded-lg border border-line px-3 text-sm outline-none focus:border-brand bg-ivory";

export function ExpoButtons({ eventId, color }: { eventId: string; color: string }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const event = expoEvents.find((e) => e.id === eventId)!;
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setMode({ kind: "visit", event })} className="h-10 rounded-full px-5 text-sm font-medium text-white" style={{ background: color }}>
          Get passes
        </button>
        <button onClick={() => setMode({ kind: "stall", event })} className="h-10 rounded-full px-5 text-sm font-medium border" style={{ borderColor: color, color }}>
          Book a stall
        </button>
      </div>
      {mode && <ExpoModal mode={mode} onClose={() => setMode(null)} />}
    </>
  );
}

export function StallForm() {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="rounded-[20px] bg-ivory p-8 text-center">
        <p className="font-display text-2xl">Thank you! 🎉</p>
        <p className="text-sm text-muted mt-2">Our exhibitor team will call you within 24 hours with the floor plan and pricing.</p>
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        showToast("Stall enquiry submitted");
      }}
      className="rounded-[20px] bg-ivory p-6 grid sm:grid-cols-2 gap-3 text-ink"
    >
      <input required placeholder="Company / brand name" className={field} aria-label="Company name" />
      <input required placeholder="Contact person" className={field} aria-label="Contact person" />
      <input required type="tel" pattern="[0-9+ ]{10,14}" placeholder="Phone number" className={field} aria-label="Phone" />
      <input required type="email" placeholder="Email" className={field} aria-label="Email" />
      <select className={field} aria-label="Expo" defaultValue={expoEvents[0].id}>
        {expoEvents.map((e) => (
          <option key={e.id} value={e.id}>
            {e.city} — {formatDateRange(e.start, e.end)}
          </option>
        ))}
      </select>
      <select className={field} aria-label="Stall size" defaultValue="3x3">
        <option value="3x3">Shell stall 3m × 3m</option>
        <option value="3x6">Shell stall 3m × 6m</option>
        <option value="raw">Raw space (min 36 sq m)</option>
        <option value="kiosk">Food / tasting kiosk</option>
      </select>
      <button className="sm:col-span-2 h-12 rounded-[14px] bg-brand text-white font-medium hover:bg-brand-dark">Request stall booking</button>
    </form>
  );
}

function ExpoModal({ mode, onClose }: { mode: Mode; onClose: () => void }) {
  const { event, kind } = mode;
  const [passes, setPasses] = useState(1);
  const [type, setType] = useState<"general" | "vip">("general");
  const [done, setDone] = useState(false);
  const price = type === "vip" ? event.passPrice * 4 : event.passPrice;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/50" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-ivory p-6 fade-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4" aria-label="Close">
          <CloseIcon />
        </button>
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: event.color }}>
          {event.city} · {formatDateRange(event.start, event.end)}
        </p>
        <h3 className="font-display text-2xl mt-1 pr-8">{kind === "visit" ? "Get your passes" : "Book a stall"}</h3>
        <p className="text-sm text-muted">{event.title}</p>

        {done ? (
          <div className="py-8 text-center">
            <p className="text-4xl">🎟️</p>
            <p className="font-medium mt-3">{kind === "visit" ? "Passes booked!" : "Enquiry received!"}</p>
            <p className="text-sm text-muted mt-1">
              {kind === "visit" ? "Your e-passes have been sent to your email and WhatsApp (demo)." : "Our exhibitor team will contact you within 24 hours (demo)."}
            </p>
            <button onClick={onClose} className="mt-6 h-11 rounded-full bg-ink px-6 text-white text-sm font-medium">Done</button>
          </div>
        ) : (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <input required placeholder={kind === "visit" ? "Full name" : "Company / brand name"} className={field} aria-label="Name" />
            <input required type="tel" pattern="[0-9+ ]{10,14}" placeholder="Mobile number" className={field} aria-label="Mobile" />
            <input required type="email" placeholder="Email" className={field} aria-label="Email" />
            {kind === "visit" ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {(["general", "vip"] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setType(t)}
                      className={`rounded-[14px] border p-3 text-left ${type === t ? "border-brand bg-brand-soft" : "border-line"}`}
                    >
                      <p className="text-sm font-medium">{t === "vip" ? "VIP Pass" : "General"}</p>
                      <p className="text-xs text-muted">{formatINR(t === "vip" ? event.passPrice * 4 : event.passPrice)} · {t === "vip" ? "Lounge + goodie bag" : "1-day entry"}</p>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between rounded-[14px] border border-line px-4 h-12">
                  <span className="text-sm">Passes</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setPasses(Math.max(1, passes - 1))} aria-label="Fewer">−</button>
                    <span className="w-5 text-center font-medium">{passes}</span>
                    <button type="button" onClick={() => setPasses(Math.min(10, passes + 1))} aria-label="More">+</button>
                  </div>
                </div>
                <button className="w-full h-12 rounded-[14px] text-white font-medium" style={{ background: event.color }}>
                  Pay {formatINR(price * passes)}
                </button>
              </>
            ) : (
              <>
                <select className={field} aria-label="Stall size" defaultValue="3x3">
                  <option value="3x3">Shell stall 3m × 3m</option>
                  <option value="3x6">Shell stall 3m × 6m</option>
                  <option value="raw">Raw space</option>
                </select>
                <p className="text-xs text-muted">Only {event.stallsLeft} stalls left for this expo.</p>
                <button className="w-full h-12 rounded-[14px] text-white font-medium" style={{ background: event.color }}>
                  Send enquiry
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
