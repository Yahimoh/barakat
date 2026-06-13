"use client";

import { useEffect, useState } from "react";
import type { Role } from "@/types";

const STORAGE_KEY = "barakat.role";
const EVENT_NAME = "barakat:role-change";

const ROLES: Role[] = ["guest", "viewer", "investor", "manager"];

function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as string[]).includes(value);
}

function readRole(): Role {
  if (typeof window === "undefined") return "guest";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isRole(stored) ? stored : "guest";
}

/**
 * Client-side role hook. Reads the active role from localStorage and
 * re-renders any component that uses it when the role changes (via a
 * custom event emitted by the RoleSwitcher).
 */
export function useRole(): [Role, (next: Role) => void] {
  const [role, setRole] = useState<Role>("guest");

  useEffect(() => {
    setRole(readRole());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Role>).detail;
      if (isRole(detail)) setRole(detail);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const update = (next: Role) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent<Role>(EVENT_NAME, { detail: next }));
    setRole(next);
  };

  return [role, update];
}

export const roleLabel: Record<Role, string> = {
  guest: "Guest",
  viewer: "Viewer",
  investor: "Investor",
  manager: "Project Manager",
};
