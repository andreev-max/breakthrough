"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navigationConfig } from "@/lib/routes";

export function Navigation() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-2">
      {Object.values(navigationConfig).map(({ href, name, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <li key={name}>
            <Link
              className={`${
                isActive ? "text-primary500" : "text-base500 hover:text-base200"
              }`}
              href={href}
            >
              <span className="hidden sm:inline">{name}</span>
              <Icon className="inline h-8 w-8 sm:hidden" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
