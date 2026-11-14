import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export const metadata = { title: "Search — Heloves" };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <Suspense fallback={<div className="mt-5 h-12 rounded-full bg-white border border-line" />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
