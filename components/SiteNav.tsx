"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GooeyNav } from "@/components/ui/gooey-nav";

const LINKS = [
  { href: "/what-is-world", label: "What is World" },
  { href: "/news", label: "News" },
  { href: "/learn", label: "Learn" },
  { href: "/markets", label: "Markets Desk" },
  { href: "/archive", label: "Archive" },
  { href: "/team", label: "Team Badges" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();

  // Determine active item index based on current pathname
  const activeIndex = LINKS.findIndex((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-bg/70 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Left: Brand Wordmark */}
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-ink hover:opacity-90 transition-opacity shrink-0"
        >
          The World File
        </Link>

        {/* Right: Gooey Nav (Desktop) */}
        <nav className="hidden md:flex items-center">
          <GooeyNav items={LINKS} activeIndex={activeIndex} />
        </nav>
      </div>

      {/* Mobile Nav Strip (< md) */}
      <div className="md:hidden border-t border-white/[0.06] bg-bg-raised/40 px-6 py-2 overflow-x-auto scrollbar-none flex gap-4 text-[12px] font-mono text-ink-dim">
        {LINKS.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 transition-colors ${
                isActive ? "text-accent font-semibold" : "hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
