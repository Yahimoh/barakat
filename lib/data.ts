import projects from "@/data/projects.json";
import investor from "@/data/investors.json";
import manager from "@/data/manager.json";
import pools from "@/data/pools.json";
import zakatBeneficiaries from "@/data/zakat-beneficiaries.json";
import sadaqah from "@/data/sadaqah.json";
import type {
  Commitment,
  Pool,
  Project,
  SadaqahProject,
  ZakatBeneficiary,
} from "@/types";

const allProjects = projects as Project[];
const allPools = pools as Pool[];
const allBeneficiaries = zakatBeneficiaries as ZakatBeneficiary[];
const allSadaqah = sadaqah as SadaqahProject[];
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

export function loadPools(): Pool[] {
  return allPools;
}

export function getPool(id: string): Pool | undefined {
  return allPools.find((p) => p.id === id);
}

export function loadZakatBeneficiaries(): ZakatBeneficiary[] {
  return allBeneficiaries;
}

export function loadSadaqahProjects(): SadaqahProject[] {
  return allSadaqah;
}
