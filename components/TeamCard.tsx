"use client";

import React from "react";
import Image from "next/image";
import { TeamMember } from "@/lib/teamData";
import TiltCard from "@/components/TiltCard";

interface TeamCardProps {
  member: TeamMember;
  isHighlighted?: boolean;
}

export default function TeamCard({ member, isHighlighted = false }: TeamCardProps) {
  const isOfficial = member.id === "world_xyz";
  const isHouseFace = member.id === "vibnorman";
  const isTemporary = member.sectionId === "temporary-support";

  // Badge Color Styles based on Status Badge
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "OFFICIAL WORLD ACCOUNT":
        return "bg-gradient-to-r from-[#63D8F2]/20 to-[#F2D58A]/20 text-[#F2D58A] border-[#F2D58A]/40";
      case "HOUSE FACE / PUBLIC MASCOT":
        return "bg-[#63D8F2]/15 text-[#63D8F2] border-[#63D8F2]/40";
      case "EARLY OFFICIAL BADGE":
        return "bg-[#687FDF]/15 text-[#687FDF] border-[#687FDF]/40";
      case "CONFIRMED BADGE":
      case "WORLD-ALIGNED":
        return "bg-[#E76B9B]/15 text-[#E76B9B] border-[#E76B9B]/40";
      case "ECOSYSTEM CALL":
        return "bg-[#4F8FD9]/15 text-[#4F8FD9] border-[#4F8FD9]/40";
      case "TEMPORARY / NOT WORLD STAFF":
        return "bg-amber-500/15 text-amber-400 border-amber-500/40";
      case "BADGE  VERIFY LIVE":
      default:
        return "bg-white/[0.06] text-ink-dim border-white/15";
    }
  };

  return (
    <TiltCard className="h-full">
      <div
        id={`member-${member.id}`}
        className={`group relative rounded-2xl border transition-all duration-320 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:scale-[1.025] hover:z-20 h-full ${isOfficial
            ? "bg-gradient-to-br from-[#0D0D0F] via-[#121218] to-[#181524] border-white/20 shadow-[0_0_30px_rgba(99,216,242,0.12)] p-7 md:p-8"
            : isHouseFace
              ? "bg-gradient-to-br from-[#0D0D0F] via-[#11131F] to-[#161828] border-white/20 shadow-[0_0_25px_rgba(104,127,223,0.1)] p-7"
              : isTemporary
                ? "bg-gradient-to-br from-[#0D0D0F] via-[#1A1412] to-[#1F1714] border-amber-500/30 p-6"
                : "bg-[#0D0D0F]/80 backdrop-blur-md border-white/[0.08] hover:border-white/25 p-6"
          } ${isHighlighted ? "ring-2 ring-cyan-400/50" : ""}`}
      >
        {/* Iridescent Glow Effect on Hover */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#63D8F2]/30 via-[#8668D9]/30 to-[#E76B9B]/30 opacity-0 transition-opacity duration-320 group-hover:opacity-100 pointer-events-none blur-[1px]" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Top Header Row: Image & Badge */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="relative shrink-0">
              {/* Iridescent Image Halo */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#63D8F2] via-[#8668D9] to-[#E76B9B] opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-[2px]" />
              <div
                className={`relative overflow-hidden rounded-full border border-white/20 bg-bg-raised ${isOfficial ? "w-20 h-20 md:w-24 md:h-24" : isHouseFace ? "w-16 h-16 md:w-20 md:h-20" : "w-14 h-14"
                  }`}
              >
                <Image
                  src={member.image}
                  alt={`${member.name}  ${member.handle}`}
                  fill
                  sizes="(max-width: 768px) 64px, 96px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Status Label Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium tracking-wide border uppercase shrink-0 ${getBadgeStyle(
                member.statusBadge
              )}`}
            >
              {member.statusBadge}
            </span>
          </div>

          {/* Name & Handle */}
          <div className="mb-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3
                className={`font-serif tracking-tight text-ink font-normal ${isOfficial ? "text-2xl md:text-3xl" : isHouseFace ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                  }`}
              >
                {member.name}
              </h3>
              {member.followers && (
                <span className="text-[11px] font-mono text-ink-dim shrink-0">
                  {member.followers}
                </span>
              )}
            </div>
            <a
              href={member.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[13px] font-mono text-cyan-400/90 hover:text-cyan-300 transition-colors mt-0.5"
            >
              {member.handle}
            </a>
          </div>

          {/* Bio */}
          <p className="text-[13px] text-ink-dim leading-relaxed mb-4 font-sans line-clamp-2">
            {member.bio}
          </p>

          {/* World Context Box */}
          <div className="mt-auto pt-3 border-t border-white/[0.06] bg-white/[0.02] -mx-6 -mb-6 p-4 rounded-b-2xl">
            <div className="text-[11px] font-mono text-ink-dim/70 uppercase tracking-wider mb-1">
              World Context
            </div>
            <p className="text-[12px] text-ink/90 leading-snug font-sans">
              {member.worldContext}
            </p>

            {/* View on X External Link */}
            <div className="mt-3 text-right">
              <a
                href={member.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-ink-dim hover:text-accent transition-colors group/link"
              >
                <span>VIEW ON X</span>
                <svg
                  className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
