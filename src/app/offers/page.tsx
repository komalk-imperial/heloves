import PageHero from "@/components/PageHero";
import ProductListing from "@/components/ProductListing";
import { products } from "@/lib/catalog";

export const metadata = { title: "Shop All — HELOVES" };

export default function OffersPage() {
  return (
    <div>
      <PageHero
        image="/images/b-wellness.jpg"
        eyebrow="Shop Heloves"
        title="The Collection"
        text="Every Heloves product in one place — with up to 50% off this season. Extra 10% off with code HELOVES10."
        crumbs={[{ href: "/", label: "Home" }, { label: "Shop" }]}
      />
      <div className="mx-auto max-w-[1320px] px-5 lg:px-10 mt-14">
        <ProductListing products={products} showCategories scope="offers" />
      </div>
    </div>
  );
}
