"use client";

import { useRole, roleLabel } from "@/lib/role";
import type { Role } from "@/types";

const ORDER: Role[] = ["viewer", "investor", "manager"];

export function RoleSwitcher() {
  const [role, setRole] = useRole();

  return (
    <div className="flex items-center gap-1 rounded-full border border-muted/20 bg-white p-1 text-xs shadow-sm">
      {ORDER.map((r) => {
        const active = r === role;
        return (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={[
              "rounded-full px-3 py-1 transition-colors",
              active
                ? "bg-emerald text-ivory"
                : "text-muted hover:text-emerald hover:bg-emerald/5",
            ].join(" ")}
            aria-pressed={active}
          >
            {roleLabel[r]}
          </button>
        );
      })}
    </div>
  );
}
