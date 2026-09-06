"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/teamData";

interface AvatarGroupProps {
  members: TeamMember[];
  onSelectMember?: (memberId: string) => void;
  className?: string;
}

export default function AvatarGroup({
  members,
  onSelectMember,
  className = "",
}: AvatarGroupProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMemberClick = (memberId: string) => {
    if (onSelectMember) {
      onSelectMember(memberId);
    } else {
      const el = document.getElementById(`member-${memberId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div
      className={`t-avatar-group relative inline-flex items-center gap-1.5 p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-x-auto max-w-full scrollbar-none select-none ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
      aria-label="World Circle Affiliation Strip"
    >
      {members.map((member, index) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 999;

        // Transitions.dev spring falloff calculation: shift = (lift * Math.pow(falloff, distance)).toFixed(3) + 'px'
        const shiftY = hoveredIndex !== null ? (-4 * Math.pow(0.45, distance)).toFixed(3) + "px" : "0px";
        const scaleActive = isHovered ? 1.05 : 1;
        const easing = hoveredIndex !== null ? "var(--avatar-ease-in)" : "var(--avatar-ease-out)";

        return (
          <button
            key={member.id}
            onClick={() => handleMemberClick(member.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            className="t-avatar group relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
            style={{
              transitionTimingFunction: easing,
              "--shift": shiftY,
              "--scale-active": scaleActive,
            } as React.CSSProperties}
            title={`${member.name} (${member.handle})`}
            aria-label={`Jump to ${member.name}`}
          >
            {/* Iridescent Accent Ring on Hover */}
            <div
              className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#63D8F2] via-[#8668D9] to-[#E76B9B] opacity-0 transition-opacity duration-300 blur-[2px] ${isHovered ? "opacity-90" : "group-hover:opacity-60"
                }`}
            />

            {/* Profile Image Container */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/20 bg-bg-raised shadow-md">
              <Image
                src={member.image}
                alt={`${member.name}  ${member.handle}`}
                fill
                sizes="44px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Tooltip Popup on Hover */}
            {isHovered && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-bg-raised/95 border border-white/15 text-[11px] font-mono text-ink whitespace-nowrap shadow-xl pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150">
                <span className="font-semibold text-accent">{member.name}</span>{" "}
                <span className="text-ink-dim">{member.handle}</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
