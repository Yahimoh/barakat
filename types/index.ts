export type Role = "guest" | "investor" | "manager" | "viewer";

export type ProjectStatus = "draft" | "pending" | "validated" | "closed";

export type ProjectCategory =
  | "real-estate"
  | "tech"
  | "agriculture"
  | "energy"
  | "crafts";

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  managerId: string;
  status: ProjectStatus;
  goal: number;
  committed: number;
  backers: number;
  createdAt: string; // ISO
  imageHue: number; // 0-360
  image?: string; // optional real photo URL (e.g. "/projects/turku-lamb.jpg")
}

export interface Commitment {
  id: string;
  projectId: string;
  investorId: string;
  amount: number;
  createdAt: string;
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  bio: string;
}

/**
 * Musharakah — an Islamic profit-sharing partnership. A group pools money
 * into a shared pot, then votes on the single project the whole pot is
 * invested into. Each member's voting weight equals their contribution.
 */
export type PoolStatus = "open" | "voting" | "invested";

export interface PoolMember {
  id: string; // investor id
  name: string;
  contribution: number; // USD — also this member's voting weight
}

export interface PoolVote {
  memberId: string;
  projectId: string;
}

/** A zakat-eligible cause (aligned with the eight asnaf categories). */
export interface ZakatBeneficiary {
  id: string;
  name: string;
  category: string; // e.g. "The poor (al-Fuqarā)"
  description: string;
  imageHue: number;
}

/** A general charity (sadaqah) project, surfaced via LaunchGood. */
export interface SadaqahProject {
  id: string;
  title: string;
  summary: string;
  category: string;
  raised: number;
  goal: number;
  donors: number;
  imageHue: number;
  image?: string; // optional real photo URL
}

export interface Pool {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  status: PoolStatus;
  members: PoolMember[];
  candidateProjectIds: string[];
  votes: PoolVote[];
  winningProjectId?: string;
  minContribution: number;
  createdAt: string; // ISO
  votingClosesAt: string; // ISO
}
