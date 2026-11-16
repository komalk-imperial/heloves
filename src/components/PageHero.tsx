import Image from "next/image";
import Split from "./Split";
import Link from "next/link";

type Crumb = { href?: string; label: string };

export default function PageHero({
  image,
  eyebrow,
  title,
  text,
  crumbs,
  children,
  tone = "rgba(20,18,15,.78)",
  tall = false,
}: {
  image: string;
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  tone?: string;
  tall?: boolean;
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-5 lg:px-10 pt-4">
      <div className={`relative overflow-hidden rounded-[30px] ${tall ? "min-h-[520px]" : "min-h-[380px] md:min-h-[440px]"} flex items-end`}>
        <div data-parallax="0.12" className="absolute -inset-y-[14%] inset-x-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="kenburns object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${tone} 0%, rgba(20,18,15,.35) 55%, rgba(20,18,15,.05) 100%)` }} />
        <div className="absolute inset-0 bg-[#f3d9b8]/10 mix-blend-soft-light" />
        <div aria-hidden className="fx-aurora opacity-40!" />
        <div className="relative p-8 md:p-14 text-white max-w-3xl">
          {crumbs && (
            <nav className="rise text-xs text-white/70 mb-6" aria-label="Breadcrumb">
              {crumbs.map((c, k) => (
                <span key={c.label}>
                  {k > 0 && <span className="mx-2">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && (
            <p className="rise eyebrow text-[#e8cfa6]" style={{ "--d": "80ms" } as React.CSSProperties}>
              {eyebrow}
            </p>
          )}
          <Split as="h1" key={image + String(text)} className="font-display text-5xl md:text-7xl leading-[1] mt-4">
            {title}
          </Split>
          {text && (
            <p className="rise mt-5 font-display text-xl md:text-2xl text-white/85 max-w-xl leading-snug" style={{ "--d": "260ms" } as React.CSSProperties}>
              {text}
            </p>
          )}
          {children && (
            <div className="rise mt-8" style={{ "--d": "360ms" } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
