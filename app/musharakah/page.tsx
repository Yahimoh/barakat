import { PoolCard } from "@/components/musharakah/PoolCard";
import { EightPointStar } from "@/components/ornaments/EightPointStar";
import { GirihPattern } from "@/components/ornaments/GirihPattern";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { loadPools, getInvestor } from "@/lib/data";

export const metadata = {
  title: "Musharakah circles — Barakat",
  description:
    "Pool capital with others and vote, weighted by contribution, on which project to back.",
};

const STEPS = [
  {
    title: "Pool together",
    body: "Join a circle and contribute to a shared pot. Your contribution is your stake.",
  },
  {
    title: "Vote, weighted",
    body: "When voting opens, back one candidate project. Your vote carries the weight of your share.",
  },
  {
    title: "Invest as one",
    body: "The winning project receives the entire pot — a single, collective investment.",
  },
];

export default function MusharakahPage() {
  const pools = loadPools();
  const youId = getInvestor().id;

  return (
    <div className="space-y-12 py-8">
      {/* Intro */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-turquoise via-lapis to-azure-deep p-6 text-ivory shadow-glow md:p-10">
          <GirihPattern className="absolute -right-12 -top-12 h-64 w-64 animate-spin-slow text-gold opacity-15" />
          <div className="relative max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-gold-light backdrop-blur">
              <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
              <span>مشارکه — Musharakah</span>
            </div>
            <h1 className="font-display text-3xl font-semibold md:text-4xl">
              Invest together. Decide together.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ivory/85 md:text-base">
              A Musharakah is a profit-sharing partnership. A circle of
              investors pools capital into one pot, then votes on the single
              project to back — and every vote is weighted by what each member
              put in.
            </p>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold font-display text-xs font-semibold text-ink">
                    {i + 1}
                  </span>
                  <span className="font-display text-sm font-semibold text-ivory">
                    {s.title}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ivory/75">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pools */}
      <section className="container-page">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Open circles
            </h2>
            <p className="mt-1 text-sm text-muted">
              {pools.length} Musharakah pools across the lifecycle.
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} youId={youId} />
          ))}
        </div>
      </section>

      <ArabesqueDivider className="mx-auto h-3 w-48 text-gold-deep" />
    </div>
  );
}
