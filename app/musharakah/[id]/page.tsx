import { notFound } from "next/navigation";
import { getPool, getProject, getInvestor } from "@/lib/data";
import { PoolDetailClient } from "@/components/musharakah/PoolDetailClient";
import type { Project } from "@/types";

export default function PoolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pool = getPool(params.id);
  if (!pool) notFound();

  const candidateProjects = pool.candidateProjectIds
    .map((id) => getProject(id))
    .filter((p): p is Project => Boolean(p));

  const investor = getInvestor();

  return (
    <PoolDetailClient
      initial={pool}
      candidateProjects={candidateProjects}
      youId={investor.id}
      youName={investor.name}
    />
  );
}
