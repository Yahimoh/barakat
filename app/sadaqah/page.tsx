import { SadaqahCard } from "@/components/sadaqah/SadaqahCard";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { loadSadaqahProjects } from "@/lib/data";

export const metadata = {
  title: "Sadaqah — Barakat",
  description: "Donate to vetted sadaqah projects, in collaboration with LaunchGood.",
};

export default function SadaqahPage() {
  const projects = loadSadaqahProjects();

  return (
    <div className="container-page space-y-8 py-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lapis via-turquoise-deep to-azure-deep p-6 text-ivory shadow-glow md:p-8">
        <GirihPattern className="absolute -left-12 -top-12 h-56 w-56 animate-spin-slow text-gold opacity-15" />
        <div className="relative max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-gold-light backdrop-blur">
            <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
            <span>صدقه — Sadaqah · with LaunchGood</span>
          </div>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">
            Give Sadaqah, any amount
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ivory/85 md:text-base">
            Voluntary charity for causes that need it now. These projects are
            run in collaboration with LaunchGood — give whatever your heart
            allows.
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <SadaqahCard key={p.id} project={p} />
        ))}
      </div>

      <ArabesqueDivider className="mx-auto h-3 w-48 text-gold-deep" />
    </div>
  );
}
