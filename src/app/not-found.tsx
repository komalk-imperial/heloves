import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-7xl text-brand">404</p>
      <h1 className="font-display text-2xl mt-4">We couldn&apos;t find that page</h1>
      <p className="text-muted mt-2">It may have moved, or the product is no longer available.</p>
      <Link href="/" className="inline-flex mt-8 h-12 items-center rounded-full bg-brand px-8 text-white font-semibold">
        Back to home
      </Link>
    </div>
  );
}
