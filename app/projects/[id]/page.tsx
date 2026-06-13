import { notFound } from "next/navigation";
import { getProject } from "@/lib/data";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = getProject(params.id);
  if (!project) notFound();
  return <ProjectDetailClient initial={project} />;
}
