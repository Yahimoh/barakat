import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { loadFeaturedProjects } from "@/lib/data";

export default function HomePage() {
  const featured = loadFeaturedProjects(3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory to-white">
        <GirihPattern className="absolute inset-0 h-full w-full text-emerald opacity-[0.05]" />
        <div className="container-page relative grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold-deep">
              <EightPointStar className="h-3.5 w-3.5" />
              <span>برکت — Invest with blessing</span>
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              Trustworthy investment,{" "}
              <span className="text-emerald">rooted in craft.</span>
            </h1>
            <p className="mt-4 max-w-prose text-base text-muted md:text-lg">
              Barakat curates and validates investment projects from across the
              region — agriculture, energy, real estate, crafts, and tech — so
              you can commit with confidence, track outcomes, and grow wealth
              that builds communities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald px-6 text-sm font-medium text-ivory hover:bg-emerald-light"
              >
                Browse validated projects
              </Link>
              <Link
                href="/investor"
                className="inline-flex h-12 items-center justify-center rounded-md border border-emerald px-6 text-sm font-medium text-emerald hover:bg-emerald/5"
              >
                I'm an investor
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="arch-thumb relative h-72 w-full overflow-hidden bg-gradient-to-br from-emerald/80 via-emerald to-navy shadow-card">
              <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-ivory">
                <EightPointStar className="h-14 w-14 text-gold-light" />
                <div className="mt-3 font-display text-2xl">Barakat</div>
                <div className="text-xs uppercase tracking-widest text-gold-light">
                  curated · validated · transparent
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-md border border-gold/40 bg-white px-3 py-2 text-xs shadow-card md:-left-8">
              <div className="text-muted">Active cohort</div>
              <div className="font-display text-lg text-emerald">
                9 projects
              </div>
            </div>
            <div className="absolute -right-3 -top-3 rotate-3 rounded-md border border-emerald/30 bg-white px-3 py-2 text-xs shadow-card md:-right-6 md:-top-6">
              <div className="text-muted">Total committed</div>
              <div className="font-display text-lg text-emerald">
                $1.06M
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            How Barakat works
          </h2>
          <p className="mt-2 text-muted">
            Three steps from discovery to outcome.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Discover",
              body: "Browse a curated set of projects. Every project is reviewed for feasibility and impact before going live.",
            },
            {
              step: "02",
              title: "Commit",
              body: "Choose an amount, see the remaining goal, and commit. No money is moved in this template — it's a simulated flow.",
            },
            {
              step: "03",
              title: "Track",
              body: "Follow progress, view updates from the project manager, and see when funding closes.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-lg border border-muted/15 bg-white p-5 shadow-card"
            >
              <div className="font-display text-2xl text-gold-deep">
                {s.step}
              </div>
              <div className="mt-1 font-display text-lg font-semibold text-ink">
                {s.title}
              </div>
              <p className="mt-1 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-page">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Featured validated projects
            </h2>
            <p className="mt-1 text-muted">
              A selection of projects open for commitments.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-emerald hover:underline md:inline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/projects"
            className="text-sm font-medium text-emerald hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </section>

      <ArabesqueDivider className="mx-auto h-3 w-48 text-gold-deep" />

      <footer className="container-page pb-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Barakat. Template build · barakat.local
      </footer>
    </div>
  );
}
