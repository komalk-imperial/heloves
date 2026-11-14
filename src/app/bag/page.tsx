import BagView from "@/components/BagView";

export const metadata = { title: "Your Bag — Heloves" };

export default function BagPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <BagView />
    </div>
  );
}
