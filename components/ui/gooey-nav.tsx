"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  activeIndex?: number;
  className?: string;
}

export function GooeyNav({
  items,
  activeIndex = 0,
  className,
}: GooeyNavProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const blobRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  React.useEffect(() => {
    const updateBlob = () => {
      const activeEl = itemRefs.current[activeIndex];
      const containerEl = containerRef.current;
      if (activeEl && containerEl && blobRef.current) {
        const activeRect = activeEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();

        blobRef.current.style.setProperty(
          "--left",
          `${activeRect.left - containerRect.left}px`
        );
        blobRef.current.style.setProperty(
          "--top",
          `${activeRect.top - containerRect.top}px`
        );
        blobRef.current.style.setProperty("--width", `${activeRect.width}px`);
        blobRef.current.style.setProperty("--height", `${activeRect.height}px`);
      }
    };

    updateBlob();
    window.addEventListener("resize", updateBlob);
    return () => window.removeEventListener("resize", updateBlob);
  }, [activeIndex, items]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center p-1 rounded-full border border-white/[0.08] bg-bg-raised/60 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className
      )}
    >
      {/* SVG Gooey Filter - preserves RGB gradient stops while computing gooey alpha matrix */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Iridescent Gooey Blob Element */}
      {activeIndex >= 0 && activeIndex < items.length && (
        <div
          ref={blobRef}
          className="absolute transition-all duration-300 ease-out rounded-full opacity-90 pointer-events-none"
          style={{
            left: "var(--left, 0px)",
            top: "var(--top, 4px)",
            width: "var(--width, 0px)",
            height: "var(--height, 0px)",
            background: "var(--accent-gradient)",
            filter: "url(#goo)",
          }}
        />
      )}

      {/* Nav Link Items */}
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <Link
            key={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            href={item.href}
            className={cn(
              "relative z-10 px-3.5 py-1.5 font-mono text-[13px] font-medium transition-colors duration-200 rounded-full whitespace-nowrap select-none",
              isActive
                ? "text-bg font-semibold"
                : "text-ink-dim hover:text-ink"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
