"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Info, Map, Play, Trophy } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Map },
  { href: "/play", label: "Play", icon: Play },
  { href: "/concepts", label: "Concepts", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: Trophy },
  { href: "/about", label: "About", icon: Info }
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/82 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/78">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss-500">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-bark-700 text-lg text-white shadow-sm">B</div>
          <div className="hidden sm:block">
            <p className="text-sm font-black leading-tight">Zustand Quest</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Bear Store Academy</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss-500",
                pathname === href
                  ? "bg-moss-100 text-moss-950 shadow-sm dark:bg-moss-900 dark:text-moss-50"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
