import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Barakat — Invest together. Grow together.",
  description:
    "Local investment circles for Muslims in Finland — pool your money, choose as a community, and back the halal businesses around you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${vazirmatn.variable}`}
    >
      <body className="min-h-screen pb-20 md:pb-0">
        <Header />
        <main>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
