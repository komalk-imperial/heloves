// Demo catalog for Heloves.
// Everything here is sample data — swap it for a real API / database later.
// Photos: Unsplash (free under the Unsplash License), stored in /public/images.

export type CategorySlug = "perfumes" | "water" | "clothing" | "honey" | "wellness";
export type IconName = "bottle" | "drop" | "hanger" | "flower" | "leaf" | "calendar";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  sub: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  sizes: string[];
  badge?: "Bestseller" | "New" | "Trending" | "Limited" | "Organic";
  image: string;
  description: string;
  highlights: string[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  vertical: string; // corporate name for the business vertical
  tagline: string;
  blurb: string;
  subs: string[];
  tint: string; // soft background behind product photos
  accent: string;
  icon: IconName;
  card: string; // portrait photo for vertical cards
  banner: string; // wide photo for page headers
};

export const categories: Category[] = [
  {
    slug: "perfumes",
    name: "Parfums",
    vertical: "Fragrances",
    tagline: "Signature scents, long-lasting luxury",
    blurb: "Eau de parfums, attars and gift sets crafted with master perfumers and premium imported oils.",
    subs: ["Women", "Men", "Unisex", "Attar", "Gift Sets"],
    tint: "#f4ebe6",
    accent: "#9b5a4a",
    icon: "bottle",
    card: "/images/v-fragrance.jpg",
    banner: "/images/b-perfumes.jpg",
  },
  {
    slug: "water",
    name: "Packaged Water",
    vertical: "Packaged Drinking Water",
    tagline: "Pure, mineral-rich hydration",
    blurb: "9-stage purified, BIS-certified packaged drinking water — from 500 ml bottles to 20 L home and office jars.",
    subs: ["500 ml", "1 Litre", "20 L Jar", "Alkaline", "Sparkling"],
    tint: "#e9f0f3",
    accent: "#2d6e8e",
    icon: "drop",
    card: "/images/v-water.jpg",
    banner: "/images/b-water.jpg",
  },
  {
    slug: "clothing",
    name: "Clothing",
    vertical: "Clothing",
    tagline: "Everyday comfort, festive style",
    blurb: "Organic-cotton essentials, ethnic wear and activewear designed for comfort that lasts.",
    subs: ["Men", "Women", "Kids", "Ethnic", "Activewear"],
    tint: "#efebe5",
    accent: "#6b5a48",
    icon: "hanger",
    card: "/images/v-clothing.jpg",
    banner: "/images/b-clothing.jpg",
  },
  {
    slug: "honey",
    name: "Honey",
    vertical: "Honey",
    tagline: "Raw, golden, straight from the hive",
    blurb: "Single-origin raw and organic honey, NMR-tested and cold-filtered to keep every natural enzyme.",
    subs: ["Raw", "Organic", "Flavoured", "Honeycomb"],
    tint: "#f6eedd",
    accent: "#a5741c",
    icon: "flower",
    card: "/images/v-honey.jpg",
    banner: "/images/b-honey.jpg",
  },
  {
    slug: "wellness",
    name: "Health & Wellness",
    vertical: "Health & Wellness",
    tagline: "Feel good from the inside out",
    blurb: "Ayurvedic botanicals, supplements, protein and herbal teas made in GMP-certified facilities.",
    subs: ["Supplements", "Ayurveda", "Protein", "Herbal Tea", "Immunity"],
    tint: "#e8eee6",
    accent: "#3f6b45",
    icon: "leaf",
    card: "/images/v-wellness.jpg",
    banner: "/images/b-wellness.jpg",
  },
];

type Seed = Omit<Product, "highlights" | "description" | "image"> &
  Partial<Pick<Product, "highlights" | "description">>;

const seeds: Seed[] = [
  // ───────────── PARFUMS ─────────────
  { id: "velvet-rose-edp", name: "Velvet Rose Eau de Parfum", brand: "Heloves Signature", category: "perfumes", sub: "Women", price: 1899, mrp: 2799, rating: 4.6, reviews: 2381, sizes: ["30 ml", "50 ml", "100 ml"], badge: "Bestseller" },
  { id: "noir-oud-intense", name: "Noir Oud Intense", brand: "Noir Atelier", category: "perfumes", sub: "Men", price: 2499, mrp: 3499, rating: 4.7, reviews: 1642, sizes: ["50 ml", "100 ml"], badge: "Trending" },
  { id: "citrus-bloom-edt", name: "Citrus Bloom Eau de Toilette", brand: "Aurelle", category: "perfumes", sub: "Unisex", price: 1299, mrp: 1799, rating: 4.4, reviews: 968, sizes: ["50 ml", "100 ml"] },
  { id: "royal-sandal-attar", name: "Royal Sandal Attar", brand: "Heloves Signature", category: "perfumes", sub: "Attar", price: 899, mrp: 1199, rating: 4.8, reviews: 3120, sizes: ["6 ml", "12 ml"], badge: "Bestseller" },
  { id: "ocean-breeze-men", name: "Ocean Breeze Pour Homme", brand: "Aurelle", category: "perfumes", sub: "Men", price: 1599, mrp: 2299, rating: 4.3, reviews: 742, sizes: ["50 ml", "100 ml"] },
  { id: "midnight-jasmine", name: "Midnight Jasmine Parfum", brand: "Velvet Bloom", category: "perfumes", sub: "Women", price: 2199, mrp: 2999, rating: 4.5, reviews: 1105, sizes: ["30 ml", "75 ml"], badge: "New" },
  { id: "parfum-discovery-set", name: "Parfum Discovery Gift Set (5 x 10 ml)", brand: "Heloves Signature", category: "perfumes", sub: "Gift Sets", price: 1499, mrp: 2499, rating: 4.7, reviews: 856, sizes: ["5 x 10 ml"], badge: "Limited" },
  { id: "amber-musk-unisex", name: "Amber Musk Eau de Parfum", brand: "Noir Atelier", category: "perfumes", sub: "Unisex", price: 1999, mrp: 2599, rating: 4.5, reviews: 534, sizes: ["50 ml", "100 ml"] },

  // ───────────── WATER ─────────────
  { id: "heloves-aqua-1l", name: "Heloves Aqua Packaged Drinking Water 1 L (Pack of 12)", brand: "Heloves Aqua", category: "water", sub: "1 Litre", price: 216, mrp: 240, rating: 4.6, reviews: 5210, sizes: ["Pack of 6", "Pack of 12"], badge: "Bestseller" },
  { id: "heloves-aqua-500", name: "Heloves Aqua 500 ml (Pack of 24)", brand: "Heloves Aqua", category: "water", sub: "500 ml", price: 239, mrp: 288, rating: 4.5, reviews: 3844, sizes: ["Pack of 12", "Pack of 24"] },
  { id: "aquaveda-alkaline", name: "AquaVeda Alkaline Water pH 8.5+ 1 L (Pack of 6)", brand: "AquaVeda", category: "water", sub: "Alkaline", price: 359, mrp: 420, rating: 4.7, reviews: 1290, sizes: ["Pack of 6", "Pack of 12"], badge: "Trending" },
  { id: "heloves-20l-jar", name: "Heloves Aqua 20 L Jar (Refill)", brand: "Heloves Aqua", category: "water", sub: "20 L Jar", price: 90, mrp: 110, rating: 4.4, reviews: 2210, sizes: ["1 Jar", "Monthly Plan (15 Jars)"] },
  { id: "pristine-sparkling", name: "Pristine Drops Sparkling Water 300 ml (Pack of 6)", brand: "Pristine Drops", category: "water", sub: "Sparkling", price: 299, mrp: 360, rating: 4.3, reviews: 476, sizes: ["Pack of 6"], badge: "New" },
  { id: "himspring-mineral", name: "Mountain Spring Natural Mineral Water 750 ml (Pack of 12)", brand: "Pristine Drops", category: "water", sub: "1 Litre", price: 312, mrp: 360, rating: 4.5, reviews: 902, sizes: ["Pack of 12"] },

  // ───────────── CLOTHING ─────────────
  { id: "essential-cotton-tee", name: "Essential Organic Cotton Crew Tee", brand: "Heloves Studio", category: "clothing", sub: "Men", price: 499, mrp: 999, rating: 4.3, reviews: 3410, sizes: ["S", "M", "L", "XL", "XXL"], badge: "Bestseller" },
  { id: "floral-anarkali-kurta", name: "Floral Print Anarkali Kurta", brand: "Kora Threads", category: "clothing", sub: "Ethnic", price: 1299, mrp: 2599, rating: 4.5, reviews: 1288, sizes: ["XS", "S", "M", "L", "XL"], badge: "Trending" },
  { id: "everyday-hoodie", name: "Everyday Fleece Hoodie", brand: "Urban Loom", category: "clothing", sub: "Men", price: 1199, mrp: 1999, rating: 4.4, reviews: 860, sizes: ["S", "M", "L", "XL"] },
  { id: "women-relaxed-tee", name: "Women's Relaxed Fit Graphic Tee", brand: "Heloves Studio", category: "clothing", sub: "Women", price: 449, mrp: 899, rating: 4.2, reviews: 1532, sizes: ["XS", "S", "M", "L"] },
  { id: "kids-rainbow-tee", name: "Kids Rainbow Cotton Tee (Pack of 2)", brand: "Urban Loom", category: "clothing", sub: "Kids", price: 599, mrp: 999, rating: 4.6, reviews: 644, sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], badge: "New" },
  { id: "flex-active-hoodie", name: "Flex Active Zip Hoodie", brand: "Urban Loom", category: "clothing", sub: "Activewear", price: 1499, mrp: 2499, rating: 4.4, reviews: 412, sizes: ["S", "M", "L", "XL"] },
  { id: "chikankari-kurta", name: "Lucknowi Chikankari Cotton Kurta", brand: "Kora Threads", category: "clothing", sub: "Ethnic", price: 1599, mrp: 2999, rating: 4.7, reviews: 982, sizes: ["S", "M", "L", "XL", "XXL"], badge: "Bestseller" },

  // ───────────── HONEY ─────────────
  { id: "wild-forest-honey", name: "Wild Forest Raw Honey", brand: "Heloves Gold", category: "honey", sub: "Raw", price: 449, mrp: 599, rating: 4.8, reviews: 4120, sizes: ["250 g", "500 g", "1 kg"], badge: "Bestseller" },
  { id: "organic-multiflora", name: "Certified Organic Multiflora Honey", brand: "Forest Nectar", category: "honey", sub: "Organic", price: 549, mrp: 699, rating: 4.6, reviews: 1870, sizes: ["500 g", "1 kg"], badge: "Organic" },
  { id: "tulsi-infused-honey", name: "Tulsi Infused Honey", brand: "Wild Hive", category: "honey", sub: "Flavoured", price: 399, mrp: 499, rating: 4.5, reviews: 652, sizes: ["250 g", "500 g"] },
  { id: "natural-honeycomb", name: "Natural Raw Honeycomb Frame", brand: "Wild Hive", category: "honey", sub: "Honeycomb", price: 899, mrp: 1099, rating: 4.7, reviews: 318, sizes: ["400 g"], badge: "Limited" },
  { id: "kashmiri-acacia", name: "Kashmiri Acacia Honey", brand: "Heloves Gold", category: "honey", sub: "Raw", price: 699, mrp: 899, rating: 4.7, reviews: 1024, sizes: ["500 g", "1 kg"] },
  { id: "cinnamon-honey", name: "Cinnamon Spiced Honey", brand: "Forest Nectar", category: "honey", sub: "Flavoured", price: 379, mrp: 449, rating: 4.4, reviews: 437, sizes: ["250 g"], badge: "New" },

  // ───────────── WELLNESS ─────────────
  { id: "ashwagandha-caps", name: "KSM-66 Ashwagandha 600 mg (60 Capsules)", brand: "Heloves Vital", category: "wellness", sub: "Ayurveda", price: 499, mrp: 799, rating: 4.6, reviews: 5320, sizes: ["60 Caps", "120 Caps"], badge: "Bestseller" },
  { id: "daily-multivitamin", name: "Daily Multivitamin for Men & Women (60 Tablets)", brand: "NutriRoot", category: "wellness", sub: "Supplements", price: 649, mrp: 999, rating: 4.4, reviews: 2140, sizes: ["60 Tabs"] },
  { id: "plant-protein", name: "Plant Protein Powder – Chocolate (1 kg)", brand: "NutriRoot", category: "wellness", sub: "Protein", price: 1899, mrp: 2599, rating: 4.3, reviews: 1206, sizes: ["500 g", "1 kg"], badge: "Trending" },
  { id: "chamomile-tea", name: "Calm Chamomile Herbal Tea (25 Bags)", brand: "Ayurlife", category: "wellness", sub: "Herbal Tea", price: 299, mrp: 399, rating: 4.5, reviews: 874, sizes: ["25 Bags", "50 Bags"] },
  { id: "immunity-kadha", name: "Immunity Kadha Mix", brand: "Ayurlife", category: "wellness", sub: "Immunity", price: 349, mrp: 449, rating: 4.4, reviews: 690, sizes: ["100 g", "200 g"] },
  { id: "omega3-fish-oil", name: "Omega-3 Fish Oil 1000 mg (60 Softgels)", brand: "Heloves Vital", category: "wellness", sub: "Supplements", price: 599, mrp: 899, rating: 4.5, reviews: 1532, sizes: ["60 Caps", "90 Caps"] },
  { id: "green-tea-tulsi", name: "Tulsi Green Tea (100 Bags)", brand: "Ayurlife", category: "wellness", sub: "Herbal Tea", price: 449, mrp: 550, rating: 4.6, reviews: 1981, sizes: ["100 Bags"], badge: "Organic" },
  { id: "biotin-gummies", name: "Biotin Hair & Skin Gummies (30 Days)", brand: "Heloves Vital", category: "wellness", sub: "Supplements", price: 699, mrp: 999, rating: 4.3, reviews: 742, sizes: ["30 Gummies", "60 Gummies"], badge: "New" },
];

const defaultCopy: Record<CategorySlug, { description: string; highlights: string[] }> = {
  perfumes: {
    description:
      "Crafted by master perfumers with premium imported oils, this fragrance opens bright and settles into a warm, skin-close dry-down that lasts all day. Perfect for gifting or making it your signature scent.",
    highlights: ["Long-lasting: 8–10 hours", "Premium imported oils", "Cruelty-free & IFRA compliant", "Elegant gift-ready packaging"],
  },
  water: {
    description:
      "Purified through a 9-stage process including RO, UV and ozonisation, then enriched with essential minerals for a crisp, clean taste. BIS-certified and sealed for freshness.",
    highlights: ["9-stage purification", "Added minerals for taste", "BIS certified (IS 14543)", "BPA-free food-grade bottles"],
  },
  clothing: {
    description:
      "Made from soft, breathable fabric that holds its shape wash after wash. Designed for an easy, flattering fit you'll reach for every day.",
    highlights: ["Breathable, skin-friendly fabric", "True-to-size fit", "Colour-fast, machine washable", "Easy 15-day returns"],
  },
  honey: {
    description:
      "Ethically harvested from partner beekeepers and cold-filtered to retain natural enzymes, pollen and antioxidants. No added sugar, no syrups — just pure honey.",
    highlights: ["100% pure, no added sugar", "NMR tested for purity", "Cold-filtered, unheated", "Supports local beekeepers"],
  },
  wellness: {
    description:
      "Clinically studied ingredients in effective doses, made in a GMP-certified facility. Supports your daily health routine naturally.",
    highlights: ["GMP-certified facility", "Clinically studied ingredients", "No artificial colours", "Vegetarian friendly"],
  },
};

export const products: Product[] = seeds.map((s) => ({
  ...s,
  image: `/images/products/${s.id}.jpg`,
  description: s.description ?? defaultCopy[s.category].description,
  highlights: s.highlights ?? defaultCopy[s.category].highlights,
}));

export type ExpoEvent = {
  id: string;
  title: string;
  city: string;
  venue: string;
  start: string; // ISO date
  end: string;
  theme: string;
  focus: CategorySlug[];
  stallsLeft: number;
  passPrice: number;
  color: string;
  image: string;
};

export const expoEvents: ExpoEvent[] = [
  { id: "wellness-expo-mumbai", title: "Heloves Wellness & Lifestyle Expo", city: "Mumbai", venue: "Bombay Exhibition Centre, Goregaon", start: "2026-12-12", end: "2026-12-14", theme: "Live better, naturally", focus: ["wellness", "honey", "water"], stallsLeft: 18, passPrice: 199, color: "#3f6b45", image: "/images/e-mumbai.jpg" },
  { id: "fragrance-fest-delhi", title: "Fragrance & Fashion Fest", city: "New Delhi", venue: "Pragati Maidan, Hall 5", start: "2027-01-16", end: "2027-01-18", theme: "Scent meets style", focus: ["perfumes", "clothing"], stallsLeft: 9, passPrice: 249, color: "#9b5a4a", image: "/images/e-delhi.jpg" },
  { id: "honey-harvest-pune", title: "Honey Harvest & Organic Fair", city: "Pune", venue: "Auto Cluster Exhibition Centre", start: "2027-02-06", end: "2027-02-07", theme: "From hive to home", focus: ["honey", "wellness"], stallsLeft: 24, passPrice: 99, color: "#a5741c", image: "/images/e-pune.jpg" },
  { id: "lifestyle-popup-bengaluru", title: "Heloves Lifestyle Pop-up", city: "Bengaluru", venue: "Palace Grounds", start: "2027-03-13", end: "2027-03-15", theme: "Everything you love, under one roof", focus: ["perfumes", "water", "clothing", "honey", "wellness"], stallsLeft: 32, passPrice: 149, color: "#2d6e8e", image: "/images/e-bengaluru.jpg" },
];

/** Brand portfolio for the corporate "Our Brands" page. */
export const brandPortfolio: { name: string; category: CategorySlug; line: string }[] = [
  { name: "Heloves Signature", category: "perfumes", line: "Our flagship parfums & attars" },
  { name: "Noir Atelier", category: "perfumes", line: "Deep, nocturnal luxury scents" },
  { name: "Aurelle", category: "perfumes", line: "Fresh citrus & aquatic fragrances" },
  { name: "Velvet Bloom", category: "perfumes", line: "Romantic florals" },
  { name: "Heloves Aqua", category: "water", line: "Everyday purified drinking water" },
  { name: "AquaVeda", category: "water", line: "Alkaline pH 8.5+ water" },
  { name: "Pristine Drops", category: "water", line: "Natural mineral & sparkling" },
  { name: "Heloves Studio", category: "clothing", line: "Organic cotton essentials" },
  { name: "Urban Loom", category: "clothing", line: "Casual & activewear" },
  { name: "Kora Threads", category: "clothing", line: "Contemporary ethnic wear" },
  { name: "Heloves Gold", category: "honey", line: "Single-origin raw honey" },
  { name: "Wild Hive", category: "honey", line: "Infused honey & honeycomb" },
  { name: "Forest Nectar", category: "honey", line: "Certified organic honey" },
  { name: "Heloves Vital", category: "wellness", line: "Clinically studied supplements" },
  { name: "NutriRoot", category: "wellness", line: "Plant protein & daily nutrition" },
  { name: "Ayurlife", category: "wellness", line: "Ayurvedic teas & immunity blends" },
];

export const brands = [
  "Heloves Signature",
  "Noir Atelier",
  "Aurelle",
  "Velvet Bloom",
  "Heloves Aqua",
  "AquaVeda",
  "Pristine Drops",
  "Heloves Studio",
  "Urban Loom",
  "Kora Threads",
  "Heloves Gold",
  "Wild Hive",
  "Forest Nectar",
  "Heloves Vital",
  "NutriRoot",
  "Ayurlife",
];

// ───────────── helpers ─────────────

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const discountPct = (p: Pick<Product, "price" | "mrp">) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
export const bestsellers = () => products.filter((p) => p.badge === "Bestseller");
export const topDeals = () => [...products].sort((a, b) => discountPct(b) - discountPct(a)).slice(0, 10);
export const similarTo = (p: Product) => products.filter((x) => x.category === p.category && x.id !== p.id);

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatDateRange = (start: string, end: string) => {
  const [, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  return sm === em
    ? `${sd}–${ed} ${MONTHS[em - 1]} ${ey}`
    : `${sd} ${MONTHS[sm - 1]} – ${ed} ${MONTHS[em - 1]} ${ey}`;
};

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  const catNames = categories.filter((c) => c.name.toLowerCase().includes(t)).map((c) => c.slug);
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(t) ||
      p.brand.toLowerCase().includes(t) ||
      p.sub.toLowerCase().includes(t) ||
      catNames.includes(p.category),
  );
}
