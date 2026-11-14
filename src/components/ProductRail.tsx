import Link from "next/link";
import type { Product } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import Split from "./Split";
import { ArrowRight } from "./Icons";

export default function ProductRail({
  eyebrow,
  title,
  products,
  href,
}: {
  eyebrow?: string;
  title: string;
  products: Product[];
  href?: string;
  scope?: string;
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-24">
      <div className="flex items-end justify-between gap-4 mb-9">
        <div>
          <Reveal>
          {eyebrow && <p className="eyebrow text-rose">{eyebrow}</p>}
          </Reveal>
          <Split as="h2" key={title} className="font-display text-4xl md:text-6xl leading-tight mt-3">
            {title}
          </Split>
        </div>
        {href && (
          <Link href={href} className="group shrink-0 inline-flex items-center gap-2 text-sm pb-2">
            <span className="u-link">View all</span> <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className="rail -mx-5 px-5 lg:mx-0 lg:px-0 flex gap-6 overflow-x-auto pt-2 pb-6">
        {products.map((p, k) => (
          <Reveal key={p.id} from="tilt" delay={Math.min(k, 5) * 110} className="w-[62%] sm:w-[40%] md:w-[30%] lg:w-[calc((100%-72px)/4)] shrink-0">
            <ProductCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
