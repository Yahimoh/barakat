import { ZakatCalculator } from "@/components/zakat/ZakatCalculator";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { loadZakatBeneficiaries } from "@/lib/data";

export const metadata = {
  title: "Zakat calculator — Barakat",
  description: "Check if your wealth meets the nisab and calculate your Zakat.",
};

export default function ZakatPage() {
  const beneficiaries = loadZakatBeneficiaries();

  return (
    <div className="container-page space-y-8 py-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-turquoise via-lapis to-azure-deep p-6 text-ivory shadow-glow md:p-8">
        <GirihPattern className="absolute -right-12 -top-12 h-56 w-56 animate-spin-slow text-gold opacity-15" />
        <div className="relative max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-gold-light backdrop-blur">
            <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
            <span>زکات — Zakat</span>
          </div>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">
            Calculate your Zakat
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ivory/85 md:text-base">
            Enter your wealth to see whether you meet the nisab threshold and
            how much Zakat is due — then choose which zakat-eligible cause
            receives it.
          </p>
        </div>
      </section>

      <ZakatCalculator beneficiaries={beneficiaries} />
    </div>
  );
}
