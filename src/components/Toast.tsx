"use client";

import { useStore } from "@/lib/store";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      role="status"
      className="toast fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-full bg-ink/95 backdrop-blur text-white text-sm px-6 py-3 shadow-xl"
    >
      {toast.text}
    </div>
  );
}
