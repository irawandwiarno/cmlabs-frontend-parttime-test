"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { ROUTES } from "@/lib/constants/routes";

const navItems = [
  { label: "Home", href: ROUTES.home },
  { label: "Ingredients", href: ROUTES.ingredients },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={ROUTES.home}
          className="font-bold text-xl text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          meal<span className="text-orange-500">app</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {navItems.map((item) => {
            const isActive =
              item.href === ROUTES.home
                ? pathname === ROUTES.home
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative pb-0.5 ${
                  isActive
                    ? "text-orange-500"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
