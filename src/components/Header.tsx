"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { brandPortfolio, categories } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { ArrowRight, BagIcon, ChevronDown, CloseIcon, HeartIcon, Logo, MenuIcon, SearchIcon, VerticalIcon } from "./Icons";

type Menu = "world" | "brands" | null;

const simpleLinks = [
  { href: "/innovation", label: "Innovation" },
  { href: "/expo", label: "Events" },
  { href: "/about", label: "About Us" },
];

export default function Header() {
  const { cart, wishlist } = useStore();
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", on, { passive: true });
    const raf = requestAnimationFrame(on);
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // close dropdowns on outside click / Escape
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!navRef.current?.contains(t) && !panelRef.current?.contains(t)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const openMenu = (m: Menu) => {
    clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };
  const close = () => setMenu(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const worldActive = pathname.startsWith("/category") || pathname.startsWith("/product");
  const solid = scrolled || menu !== null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          menu ? "bg-ivory shadow-[0_1px_0_#e6ddd1]" : solid ? "bg-ivory/90 backdrop-blur-xl shadow-[0_1px_0_#e6ddd1,0_12px_30px_-22px_rgba(27,29,36,.45)]" : "bg-transparent"
        }`}
      >
        <div className={`mx-auto max-w-[1320px] px-4 sm:px-5 lg:px-10 flex items-center gap-3 lg:gap-5 transition-all duration-500 ${scrolled ? "h-[70px]" : "h-[84px]"}`}>
          <button className="lg:hidden -ml-1 p-1" aria-label="Open menu" onClick={() => setDrawer(true)}>
            <MenuIcon />
          </button>
          <Link href="/" aria-label="Heloves home" className="shrink-0" onClick={close}>
            <Logo />
          </Link>

          {/* desktop nav in a glass pill */}
          <div ref={navRef} className="hidden lg:block mx-auto relative" onMouseLeave={scheduleClose}>
            <nav
              className={`flex items-center gap-1 rounded-full p-1.5 text-[0.9rem] transition-colors duration-500 ${
                solid ? "bg-cream border border-line" : "bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_10px_30px_-18px_rgba(80,40,20,.45)]"
              }`}
            >
              <PillLink href="/" active={isActive("/")} onClick={close}>
                Home
              </PillLink>
              <PillButton active={worldActive} open={menu === "world"} onEnter={() => openMenu("world")} onClick={() => setMenu(menu === "world" ? null : "world")}>
                Our World
              </PillButton>
              <PillButton active={isActive("/brands")} open={menu === "brands"} onEnter={() => openMenu("brands")} onClick={() => setMenu(menu === "brands" ? null : "brands")}>
                Our Brands
              </PillButton>
              {simpleLinks.map((l) => (
                <PillLink key={l.href} href={l.href} active={isActive(l.href)} onClick={close} onEnter={close}>
                  {l.label}
                </PillLink>
              ))}
            </nav>

          </div>

          <div className="ml-auto lg:ml-0 flex items-center gap-0.5">
            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </IconBtn>
            <Link href="/wishlist" className="relative p-2 sm:p-2.5 rounded-full hover:bg-black/5" aria-label="Wishlist">
              <HeartIcon />
              {wishlist.length > 0 && <Badge n={wishlist.length} />}
            </Link>
            <Link href="/bag" className="relative p-2 sm:p-2.5 rounded-full hover:bg-black/5" aria-label="Bag">
              <BagIcon />
              {count > 0 && <Badge n={count} />}
            </Link>
            <Link href="/enquiry" className="btn-glow hidden md:inline-flex ml-3 h-11 items-center gap-2.5 rounded-full px-6 text-[0.85rem] text-white">
              Business Enquiry <ArrowRight className="size-4 shrink-0" />
            </Link>
          </div>
        </div>
      </header>

      {/* dim backdrop while a dropdown is open */}
      {menu && <div className="hidden lg:block fixed inset-0 z-30 bg-[#1b1d24]/25 backdrop-blur-[3px] fade-up" onClick={close} />}

      {/* dropdown panels — rendered outside the blurred header so they stay crisp */}
      <div ref={panelRef} className="hidden lg:block" onMouseEnter={() => clearTimeout(closeTimer.current)} onMouseLeave={scheduleClose}>
      {menu === "world" && (
        <div className="drop-in fixed left-1/2 z-50 pt-3" style={{ top: scrolled ? 70 : 84 }}>
          <div className="w-[900px] rounded-[28px] bg-white shadow-[0_40px_80px_-30px_rgba(27,29,36,.45)] border border-line overflow-hidden grid grid-cols-[250px_1fr]">
            <div className="relative p-7 text-white bg-[linear-gradient(160deg,#1f3b2d_0%,#2f4f3a_55%,#7a3a48_130%)]">
              <p className="eyebrow text-[#e8cfa6]">Our World</p>
              <p className="font-display text-3xl mt-3 leading-tight">Six verticals, one promise of quality.</p>
              <p className="text-sm text-white/70 mt-3">Fragrance, water, fashion, honey, wellness and live experiences.</p>
              <Link href="/brands" onClick={close} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-2 text-sm hover:bg-white hover:text-ink transition-colors">
                All brands <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="p-5 grid grid-cols-3 gap-3">
              {[...categories.map((c) => ({ href: `/category/${c.slug}`, img: c.card, icon: c.icon, title: c.vertical, sub: c.tagline })), { href: "/expo", img: "/images/v-expo.jpg", icon: "calendar" as const, title: "Expo & Events", sub: "Live experiences in 4 cities" }].map((c) => (
                <Link key={c.href} href={c.href} onClick={close} className="group shine zoom-img relative h-[150px] overflow-hidden rounded-[18px]">
                  <Image src={c.img} alt="" fill sizes="200px" className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute left-4 right-3 bottom-3 text-white">
                    <VerticalIcon name={c.icon} className="size-5 mb-1" />
                    <span className="block text-[0.95rem]">{c.title}</span>
                    <span className="block text-[0.7rem] text-white/70 line-clamp-1">{c.sub}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {menu === "brands" && (
        <div className="drop-in fixed left-1/2 z-50 pt-3" style={{ top: scrolled ? 70 : 84 }}>
          <div className="w-[820px] rounded-[28px] bg-white shadow-[0_40px_80px_-30px_rgba(27,29,36,.45)] border border-line p-8">
            <div className="grid grid-cols-5 gap-6">
              {categories.map((c) => (
                <div key={c.slug}>
                  <p className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] mb-3" style={{ color: c.accent }}>
                    <VerticalIcon name={c.icon} className="size-4" /> {c.vertical}
                  </p>
                  <ul className="space-y-2">
                    {brandPortfolio
                      .filter((b) => b.category === c.slug)
                      .map((b) => (
                        <li key={b.name}>
                          <Link href={`/search?q=${encodeURIComponent(b.name)}`} onClick={close} className="u-link font-display text-[1.15rem] leading-tight">
                            {b.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-7 pt-5 border-t border-line flex items-center justify-between">
              <p className="text-sm text-muted">16 brands across 6 verticals</p>
              <Link href="/brands" onClick={close} className="group inline-flex items-center gap-2 text-sm font-medium">
                View brand portfolio <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-ivory/95 backdrop-blur-xl fade-up">
          <div className="mx-auto max-w-3xl px-5 pt-28">
            <button onClick={() => setSearchOpen(false)} className="absolute top-7 right-7 p-2" aria-label="Close search">
              <CloseIcon className="size-6" />
            </button>
            <p className="eyebrow text-rose">Search Heloves</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!q.trim()) return;
                setSearchOpen(false);
                router.push(`/search?q=${encodeURIComponent(q.trim())}`);
              }}
              className="mt-5 flex items-center gap-4 border-b border-ink/30 pb-3"
            >
              <SearchIcon className="size-7 text-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Fragrances, honey, water, brands…"
                className="w-full bg-transparent font-display text-3xl md:text-4xl outline-none placeholder:text-ink/30"
                aria-label="Search"
              />
            </form>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Oud", "Attar", "Raw Honey", "Alkaline", "Kurta", "Ashwagandha", "Green Tea", "20 L Jar"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/search?q=${encodeURIComponent(t)}`);
                  }}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-ink"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 h-full w-[340px] max-w-[88%] bg-ivory p-6 overflow-y-auto fade-up">
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button onClick={() => setDrawer(false)} aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>
            <p className="eyebrow text-rose mb-3">Our World</p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {[...categories.map((c) => ({ href: `/category/${c.slug}`, img: c.card, title: c.vertical })), { href: "/expo", img: "/images/v-expo.jpg", title: "Expo & Events" }].map((c) => (
                <Link key={c.href} href={c.href} onClick={() => setDrawer(false)} className="relative h-24 overflow-hidden rounded-xl">
                  <Image src={c.img} alt="" fill sizes="160px" className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 bottom-2 font-display text-white text-lg leading-tight">{c.title}</span>
                </Link>
              ))}
            </div>
            <nav className="space-y-4 font-display text-2xl">
              {[{ href: "/", label: "Home" }, { href: "/brands", label: "Our Brands" }, ...simpleLinks].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setDrawer(false)} className="block">
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/enquiry" onClick={() => setDrawer(false)} className="btn-glow mt-8 flex h-12 items-center justify-center gap-2 rounded-full text-white text-sm">
              Business Enquiry <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

const pill = "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors duration-300";

function PillLink({
  href,
  active,
  onClick,
  onEnter,
  children,
}: {
  href: string;
  active: boolean;
  onClick?: () => void;
  onEnter?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick} onMouseEnter={onEnter} className={`${pill} ${active ? "bg-ink text-white" : "hover:bg-white/80"}`}>
      {children}
    </Link>
  );
}

function PillButton({
  active,
  open,
  onEnter,
  onClick,
  children,
}: {
  active: boolean;
  open: boolean;
  onEnter: () => void;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onMouseEnter={onEnter}
      onClick={onClick}
      className={`${pill} ${active ? "bg-ink text-white" : open ? "bg-white shadow-sm" : "hover:bg-white/80"}`}
    >
      {children}
      <ChevronDown className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="p-2 sm:p-2.5 rounded-full hover:bg-black/5">
      {children}
    </button>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-rose text-white text-[10px] font-medium flex items-center justify-center">
      {n}
    </span>
  );
}
