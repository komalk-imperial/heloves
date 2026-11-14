import Link from "next/link";
import { categories } from "@/lib/catalog";
import { Logo } from "./Icons";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#14171a] text-white/70">
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 -left-20 size-[480px] rounded-full bg-gold/15 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 size-[420px] rounded-full bg-sage/30 blur-[120px]" />

        <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10 pt-20 pb-12">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] items-end border-b border-white/10 pb-14">
            <div>
              <p className="eyebrow text-gold">Stay in the loop</p>
              <h2 className="font-display text-4xl md:text-5xl text-white mt-4 leading-tight">
                Live well. Choose better.
                <br />
                <span className="italic text-white/60">Hear from us first.</span>
              </h2>
            </div>
            <Newsletter />
          </div>

          <div className="grid gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo light />
              <p className="mt-5 text-sm leading-relaxed max-w-xs font-light">
                A diverse world, one vision. Heloves brings together fragrance, pure water, conscious clothing, raw honey,
                wellness and live experiences under one trusted name.
              </p>
              <div className="mt-6 flex gap-2">
                {["In", "Ig", "Fb", "Yt"].map((s) => (
                  <span key={s} className="grid place-items-center size-10 rounded-full border border-white/15 text-xs hover:bg-white hover:text-ink transition-colors cursor-pointer">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <FooterCol title="Our World">
              {categories.map((c) => (
                <FLink key={c.slug} href={`/category/${c.slug}`}>{c.vertical}</FLink>
              ))}
              <FLink href="/expo">Expo &amp; Events</FLink>
            </FooterCol>
            <FooterCol title="Company">
              <FLink href="/about">About Us</FLink>
              <FLink href="/brands">Our Brands</FLink>
              <FLink href="/innovation">Innovation</FLink>
              <FLink href="/innovation#sustainability">Sustainability</FLink>
              <FLink href="/enquiry">Business Enquiry</FLink>
            </FooterCol>
            <FooterCol title="Contact">
              <li className="text-sm">Heloves House, BKC<br />Mumbai 400051, India</li>
              <li className="text-sm">hello@heloves.com</li>
              <li className="text-sm">+91 22 4000 7000</li>
              <FLink href="/offers">Shop Offers</FLink>
            </FooterCol>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10 py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/45">
            <p>© 2026 Heloves Group. All rights reserved.</p>
            <p>Privacy · Terms · Cookies · Photography: Unsplash</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold mb-5">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="u-link text-sm hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}
