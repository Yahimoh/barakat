import type { PoolMember } from "@/types";

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** Overlapping initials avatars, mosque-tile turquoise/lapis fills. */
export function MemberAvatars({
  members,
  max = 5,
  youId,
}: {
  members: PoolMember[];
  max?: number;
  youId?: string;
}) {
  const shown = members.slice(0, max);
  const extra = members.length - shown.length;
  const fills = ["bg-turquoise", "bg-lapis", "bg-turquoise-deep", "bg-lapis-deep"];

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((m, i) => (
          <span
            key={m.id}
            title={m.name}
            className={[
              "grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold text-ivory ring-2 ring-white",
              fills[i % fills.length],
              m.id === youId ? "ring-gold" : "",
            ].join(" ")}
          >
            {initials(m.name)}
          </span>
        ))}
      </div>
      {extra > 0 && (
        <span className="ms-2 text-xs text-muted">+{extra}</span>
      )}
    </div>
  );
}
