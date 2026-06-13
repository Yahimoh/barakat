"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/projects", label: "Browse" },
  { href: "/investor", label: "Invest" },
  { href: "/manager", label: "Manage" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-muted/20 bg-ivory/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-stretch justify-around">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex-1 py-2.5 text-center text-xs",
                active ? "text-gold-deep font-semibold" : "text-muted",
              ].join(" ")}
            >
              <div
                className={[
                  "mx-auto mb-1 h-1 w-8 rounded-full",
                  active ? "bg-gold" : "bg-transparent",
                ].join(" ")}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
