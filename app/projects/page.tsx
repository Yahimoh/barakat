import { loadValidatedProjects } from "@/lib/data";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";

export default function ProjectsPage() {
  const projects = loadValidatedProjects();
  return <ProjectsBrowser initial={projects} />;
}
