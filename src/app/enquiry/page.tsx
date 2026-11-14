import EnquiryForm from "@/components/EnquiryForm";
import { GlobeIcon, HandshakeIcon, PinIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Business Enquiry — HELOVES" };

export default function EnquiryPage() {
  return (
    <div>
      <PageHero
        image="/images/office.jpg"
        eyebrow="Business Enquiry"
        title={<>Let&apos;s Grow Together</>}
        text="Distribution, private label, corporate supply, expo partnerships or investment — tell us what you have in mind."
        crumbs={[{ href: "/", label: "Home" }, { label: "Business Enquiry" }]}
      />

      <section className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-16 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <Reveal className="space-y-8 lg:sticky lg:top-28">
          <div>
            <p className="eyebrow text-rose">Talk to us</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-[1.08]">Our partnerships team replies within one business day.</h2>
          </div>
          <ul className="space-y-6">
            {[
              { icon: HandshakeIcon, t: "Partnerships", d: "partners@heloves.com · +91 22 4000 7001" },
              { icon: GlobeIcon, t: "Exports & International", d: "export@heloves.com · Presence in 25+ countries" },
              { icon: PinIcon, t: "Head Office", d: "Heloves House, Bandra Kurla Complex, Mumbai 400051" },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid place-items-center size-12 shrink-0 rounded-full bg-gold-soft text-gold">
                  <Icon className="size-6" />
                </span>
                <div>
                  <p className="font-display text-2xl">{t}</p>
                  <p className="text-sm text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal from="right">
          <EnquiryForm />
        </Reveal>
      </section>
    </div>
  );
}
