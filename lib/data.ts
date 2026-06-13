import projects from "@/data/projects.json";
import investor from "@/data/investors.json";
import manager from "@/data/manager.json";
import type { Commitment, Project } from "@/types";

const allProjects = projects as Project[];
const investorData = investor as {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  commitments: Commitment[];
};
const managerData = manager as {
  id: string;
  name: string;
  email: string;
  bio: string;
};

export function loadProjects(): Project[] {
  return allProjects;
}

export function loadValidatedProjects(): Project[] {
  return allProjects.filter((p) => p.status === "validated");
}

export function loadFeaturedProjects(limit = 3): Project[] {
  return loadValidatedProjects()
    .sort((a, b) => b.committed / b.goal - a.committed / a.goal)
    .slice(0, limit);
}

export function getProject(id: string): Project | undefined {
  return allProjects.find((p) => p.id === id);
}

export function loadManagerProjects(managerId: string): Project[] {
  return allProjects.filter((p) => p.managerId === managerId);
}

export function getManager() {
  return managerData;
}

export function getInvestor() {
  return investorData;
}

export function getProjectTitle(id: string): string {
  return getProject(id)?.title ?? "Unknown project";
}
