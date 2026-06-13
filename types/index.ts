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
