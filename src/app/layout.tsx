import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import Motion from "@/components/Motion";
import "./globals.css";

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const display = Cormorant_Garamond({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "HELOVES — Creating Better Experiences",
  description:
    "Heloves is a diversified lifestyle group: fragrances, packaged drinking water, clothing, honey, health & wellness and expo events — premium products for a healthier, happier life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans font-light">
        <Header />
        <main className="flex-1 pt-[84px]">{children}</main>
        <Footer />
        <Toast />
        <Motion />
      </body>
    </html>
  );
}
