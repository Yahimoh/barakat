import Link from "next/link";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";

export const metadata = {
  title: "Give — Barakat",
  description: "Calculate and give your Zakat, or donate Sadaqah to vetted causes.",
};

const OPTIONS = [
  {
    href: "/zakat",
    arabic: "زکات",
    title: "Zakat",
    body: "Check if you meet the nisab, calculate the 2.5% due, and direct it to a zakat-eligible cause.",
    cta: "Open the calculator",
  },
  {
    href: "/sadaqah",
    arabic: "صدقه",
    title: "Sadaqah",
    body: "Voluntary charity for projects that need it now — in collaboration with LaunchGood.",
    cta: "Browse causes",
  },
];

export default function GivePage() {
  return (
    <div className="container-page space-y-8 py-8">
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          Give with Barakat
        </h1>
        <p className="mx-auto mt-2 max-w-prose text-muted">
          Fulfil your Zakat or give Sadaqah — two paths, one intention.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {OPTIONS.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-turquoise via-lapis to-azure-deep p-7 text-ivory shadow-glow transition-all hover:-translate-y-1 md:p-9"
          >
            <GirihPattern className="absolute -right-10 -top-10 h-48 w-48 text-gold opacity-15 transition-transform duration-700 group-hover:rotate-45" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <EightPointStar className="h-9 w-9 text-gold-light" />
                <div>
                  <div className="font-display text-2xl font-semibold">
                    {o.title}
                  </div>
                  <div className="text-sm text-gold-light">{o.arabic}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ivory/85">
                {o.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
                {o.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
