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
  title: "Barakat — Invest with blessing",
  description:
    "A Klarna-style investment marketplace, themed with Iranian Islamic colors and shapes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
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
