"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/role";
import { RoleSwitcher } from "./RoleSwitcher";
import { EightPointStar } from "./ornaments/EightPointStar";

const navItems = [
  { href: "/projects", label: "Browse" },
  { href: "/investor", label: "Invest" },
  { href: "/manager", label: "Manage" },
];

export function Header() {
  const pathname = usePathname();
  const [role] = useRole();

  // Show the most relevant dashboard for the active role in the top nav.
  const primaryCta =
    role === "manager"
      ? { href: "/manager", label: "My projects" }
      : role === "investor"
        ? { href: "/investor", label: "Dashboard" }
        : { href: "/projects", label: "Browse projects" };

  return (
    <header className="sticky top-0 z-30 border-b border-muted/15 bg-ivory/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <EightPointStar className="h-6 w-6 text-emerald" />
          <span className="font-display text-lg font-semibold text-emerald-deep">
            Barakat
          </span>
          <span className="hidden text-xs text-muted sm:inline">برکت</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-emerald font-medium"
                    : "text-ink hover:text-emerald",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={primaryCta.href}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-emerald hover:bg-emerald/5 md:inline"
          >
            {primaryCta.label}
          </Link>
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}
