import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { loadFeaturedProjects } from "@/lib/data";

export default function HomePage() {
  const featured = loadFeaturedProjects(3);

  return (
    <div className="space-y-20">
      {/* Hero — a mosque-dome interior in lapis and turquoise */}
      <section className="relative overflow-hidden bg-dome text-ivory">
        {/* Slowly rotating girih disc, like light through a dome oculus. */}
        <div className="pointer-events-none absolute -top-1/3 left-1/2 aspect-square w-[140%] -translate-x-1/2 animate-spin-slow opacity-[0.12]">
          <GirihPattern className="h-full w-full text-gold-light" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-azure-deep/70 via-transparent to-transparent" />

        <div className="container-page relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-4 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-gold-light backdrop-blur">
              <EightPointStar className="h-3.5 w-3.5 animate-twinkle text-gold-light" />
              <span>برکت — Invest with blessing</span>
            </div>
            <h1 className="animate-fade-up font-display text-4xl font-semibold leading-tight delay-100 md:text-5xl">
              Trustworthy investment,{" "}
              <span className="text-gold-gradient">rooted in craft.</span>
            </h1>
            <p className="mt-4 max-w-prose animate-fade-up text-base leading-relaxed text-ivory/80 delay-200 md:text-lg">
              Barakat curates and validates investment projects from across the
              region — agriculture, energy, real estate, crafts, and tech — so
              you can commit with confidence, track outcomes, and grow wealth
              that builds communities.
            </p>
            <div className="mt-7 flex animate-fade-up flex-wrap gap-3 delay-300">
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-br from-turquoise to-lapis px-6 text-sm font-medium text-ivory shadow-glow transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Browse validated projects
              </Link>
              <Link
                href="/investor"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gold/50 px-6 text-sm font-medium text-ivory transition-colors hover:bg-white/10"
              >
                I&apos;m an investor
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up delay-200">
            {/* The mihrab — a glazed pointed-arch niche. */}
            <div className="arch-thumb relative mx-auto h-80 w-full max-w-sm overflow-hidden bg-gradient-to-br from-turquoise via-lapis to-azure-deep shadow-glow ring-1 ring-gold/30">
              <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-25" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <EightPointStar className="h-16 w-16 animate-spin-slow text-gold-light drop-shadow" />
                <div className="mt-4 font-display text-3xl text-ivory">Barakat</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold-light">
                  curated · validated · transparent
                </div>
              </div>
            </div>

            {/* Floating stat tiles. */}
            <div className="absolute -bottom-4 -left-2 animate-float rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-xs text-ink shadow-card-hover md:-left-6">
              <div className="text-muted">Active cohort</div>
              <div className="font-display text-lg text-turquoise-deep">
                9 projects
              </div>
            </div>
            <div className="absolute -right-2 -top-4 animate-float-slow rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-xs text-ink shadow-card-hover md:-right-6">
              <div className="text-muted">Total committed</div>
              <div className="font-display text-lg text-lapis">$1.06M</div>
            </div>
          </div>
        </div>

        {/* Saffron filigree along the dome's spring line. */}
        <div className="gold-rule absolute inset-x-0 bottom-0" />
      </section>

      {/* How it works */}
      <section className="container-page">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            How Barakat works
          </h2>
          <p className="mt-2 text-muted">
            Three steps from discovery to outcome.
          </p>
          <ArabesqueDivider className="mx-auto mt-4 h-3 w-40 text-gold-deep" />
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
              className="group relative overflow-hidden rounded-lg border border-muted/15 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-turquoise/30 hover:shadow-card-hover"
            >
              <GirihPattern className="absolute -right-6 -top-6 h-24 w-24 text-turquoise opacity-[0.06] transition-opacity group-hover:opacity-15" />
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-turquoise to-lapis font-display text-sm font-semibold text-ivory">
                  {s.step}
                </span>
                <div className="font-display text-lg font-semibold text-ink">
                  {s.title}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
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
            className="hidden text-sm font-medium text-turquoise-deep hover:underline md:inline"
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
            className="text-sm font-medium text-turquoise-deep hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* Musharakah teaser */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lapis via-turquoise-deep to-azure-deep p-6 text-ivory shadow-glow md:p-10">
          <GirihPattern className="absolute -left-10 -top-10 h-56 w-56 animate-spin-slow text-gold opacity-15" />
          <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-gold-light backdrop-blur">
                <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
                <span>مشارکه — Musharakah</span>
              </div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Invest together, decide together.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ivory/85">
                Pool capital into a shared pot with a circle of investors, then
                vote on the one project to back — every vote weighted by what
                you put in.
              </p>
            </div>
            <Link
              href="/musharakah"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-gold to-gold-deep px-6 text-sm font-medium text-ink shadow-card transition-all hover:brightness-105 active:scale-[0.98]"
            >
              Explore circles
            </Link>
          </div>
        </div>
      </section>

      <ArabesqueDivider className="mx-auto h-3 w-48 text-gold-deep" />

      <footer className="container-page pb-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Barakat. Template build · barakat.local
      </footer>
    </div>
  );
}
