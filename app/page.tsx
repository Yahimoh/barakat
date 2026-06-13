import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { loadFeaturedProjects } from "@/lib/data";

const STEPS = [
  { step: "01", title: "Form", body: "Invite your friends, family, or mosque community." },
  { step: "02", title: "Pool", body: "Everyone contributes to a shared, transparent pot." },
  { step: "03", title: "Discover", body: "Browse vetted, halal businesses nearby." },
  { step: "04", title: "Vote", body: "The circle decides together, by shura." },
  { step: "05", title: "Grow", body: "Profits are shared by the agreed split." },
];

const ROUTES = [
  {
    title: "Circles",
    tag: "The heart",
    body: "Pool with a community and decide together — true Musharakah.",
    href: "/musharakah",
  },
  {
    title: "Direct",
    tag: "Solo",
    body: "Invest one-to-one, straight into a business you believe in.",
    href: "/projects",
  },
  {
    title: "Wasit",
    tag: "On your behalf",
    body: "Place funds with a trusted manager who invests for you.",
    href: "/investor",
  },
];

export default function HomePage() {
  const featured = loadFeaturedProjects(3);

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-dome text-ivory">
        <div className="pointer-events-none absolute -top-1/3 left-1/2 aspect-square w-[140%] -translate-x-1/2 animate-spin-slow opacity-[0.12]">
          <GirihPattern className="h-full w-full text-gold-light" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-azure-deep/70 via-transparent to-transparent" />

        <div className="container-page relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-4 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-gold-light backdrop-blur">
              <EightPointStar className="h-3.5 w-3.5 animate-twinkle text-gold-light" />
              <span>برکة — Barakat · for Muslims in Finland</span>
            </div>
            <h1 className="animate-fade-up font-display text-4xl font-semibold leading-tight delay-100 md:text-5xl">
              Invest together.{" "}
              <span className="text-gold-gradient">Grow together.</span>
            </h1>
            <p className="mt-4 max-w-prose animate-fade-up text-base leading-relaxed text-ivory/80 delay-200 md:text-lg">
              Local investment circles for Muslims — pool your money, choose as
              a community, and back the halal businesses around you. From Helsinki
              to Oulu, your community is your best investment.
            </p>
            <div className="mt-7 flex animate-fade-up flex-wrap gap-3 delay-300">
              <Link
                href="/musharakah"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-br from-turquoise to-lapis px-6 text-sm font-medium text-ivory shadow-glow transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Explore investment circles
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gold/50 px-6 text-sm font-medium text-ivory transition-colors hover:bg-white/10"
              >
                Browse halal businesses
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up delay-200">
            <div className="arch-thumb relative mx-auto flex h-80 w-full max-w-sm flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-turquoise via-lapis to-azure-deep p-6 text-center shadow-glow ring-1 ring-gold/30">
              <GirihPattern className="absolute inset-0 h-full w-full text-gold opacity-25" />
              <EightPointStar className="relative h-16 w-16 animate-spin-slow text-gold-light drop-shadow" />
              <div className="relative mt-4 font-display text-3xl text-ivory">
                Barakat
              </div>
              <div className="relative mt-1 text-[11px] uppercase tracking-[0.2em] text-gold-light">
                community · transparent · halal
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 animate-float rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-xs text-ink shadow-card-hover md:-left-6">
              <div className="text-muted">Local businesses</div>
              <div className="font-display text-lg text-turquoise-deep">9 live</div>
            </div>
            <div className="absolute -right-2 -top-4 animate-float-slow rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-xs text-ink shadow-card-hover md:-right-6">
              <div className="text-muted">Committed by circles</div>
              <div className="font-display text-lg text-lapis">€829K</div>
            </div>
          </div>
        </div>

        <div className="gold-rule absolute inset-x-0 bottom-0" />
      </section>

      {/* How it works — five steps, one circle */}
      <section className="container-page">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            Five steps, one circle
          </h2>
          <p className="mt-2 text-muted">From forming a circle to sharing the profit.</p>
          <ArabesqueDivider className="mx-auto mt-4 h-3 w-40 text-gold-deep" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="group relative overflow-hidden rounded-lg border border-muted/15 bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:border-turquoise/30 hover:shadow-card-hover"
            >
              <GirihPattern className="absolute -right-6 -top-6 h-20 w-20 text-turquoise opacity-[0.06] transition-opacity group-hover:opacity-15" />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-turquoise to-lapis font-display text-xs font-semibold text-ivory">
                {s.step}
              </span>
              <div className="mt-3 font-display text-base font-semibold text-ink">
                {s.title}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three ways to invest */}
      <section className="container-page">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
            Circles lead. You still have options.
          </h2>
          <p className="mt-2 text-muted">
            Investment circles are the heart of Barakat — two more routes sit
            alongside them.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ROUTES.map((r, i) => (
            <Link
              key={r.title}
              href={r.href}
              className={[
                "group rounded-xl border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover",
                i === 0 ? "border-gold/50 ring-1 ring-gold/30" : "border-muted/15",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-ink">
                  {r.title}
                </span>
                <span className="rounded-full bg-turquoise/10 px-2.5 py-0.5 text-[11px] font-medium text-turquoise-deep">
                  {r.tag}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              <span className="mt-3 inline-flex text-sm font-medium text-turquoise-deep transition-transform group-hover:translate-x-0.5">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Local halal businesses */}
      <section className="container-page">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Halal businesses near you
            </h2>
            <p className="mt-1 text-muted">
              Vetted, local businesses open for commitments.
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
            View all businesses →
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
                <span>مشارکة — Musharakah</span>
              </div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Your community is your best investment.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ivory/85">
                Pool capital into a shared pot with a circle, then vote on the
                one business to back — every vote weighted by what you put in.
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
        © {new Date().getFullYear()} Barakat — invest together, grow together.
      </footer>
    </div>
  );
}
