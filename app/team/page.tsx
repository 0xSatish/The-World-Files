import { Metadata } from "next";
import { TEAM_MEMBERS, TEAM_SECTIONS } from "@/lib/teamData";
import TeamCard from "@/components/TeamCard";
import AvatarGroup from "@/components/AvatarGroup";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Team & Affiliations — The World File",
  description:
    "Directory of X affiliation badge holders, public mascots, and Solana-native accounts associated with World Prediction Markets.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header Banner */}
      <section className="relative border-b border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent py-12 md:py-16 overflow-hidden">
        {/* Subtle Ambient Background Mesh */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#63D8F2]/10 via-[#8668D9]/10 to-[#E76B9B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Breadcrumb / Kicker */}
          <div className="text-[12px] font-mono text-ink-dim uppercase tracking-wider mb-3">
            THE WORLD FILE &mdash; AFFILIATION DIRECTORY
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal tracking-tight mb-4">
            Who&rsquo;s around World?
          </h1>

          {/* Top Mandatory Disclaimer */}
          <div className="max-w-2xl p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8">
            <div className="flex items-start gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 animate-pulse" />
              <p className="text-[13px] font-mono text-ink/90 leading-relaxed">
                <span className="font-semibold text-accent uppercase">
                  Affiliation Badge Page.
                </span>{" "}
                Not official employment. World can add or remove the badge.
                Profiles below highlight public accounts associated with World and its broader community.
              </p>
            </div>
          </div>

          {/* Avatar Group Navigation Strip */}
          <div className="mt-6">
            <div className="text-[11px] font-mono text-ink-dim uppercase tracking-wider mb-2.5">
              QUICK AVATAR CIRCLE INDEX ({TEAM_MEMBERS.length} ACCOUNTS)
            </div>
            <AvatarGroup members={TEAM_MEMBERS} />
          </div>
        </div>
      </section>

      {/* Main Directory Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-16">
        {TEAM_SECTIONS.map((section) => {
          const sectionMembers = TEAM_MEMBERS.filter(
            (m) => m.sectionId === section.id
          );

          if (sectionMembers.length === 0) return null;

          return (
            <section key={section.id} className="space-y-6 scroll-mt-24">
              {/* Section Header */}
              <div className="border-b border-white/[0.08] pb-3 flex items-baseline justify-between gap-2">
                <h2 className="font-sans text-sm md:text-base font-medium tracking-tight text-ink/90">
                  {section.subtitle}
                </h2>
                <span className="text-[11px] font-mono text-ink-dim shrink-0">
                  {sectionMembers.length}{" "}
                  {sectionMembers.length === 1 ? "Profile" : "Profiles"}
                </span>
              </div>

              {/* Grid Layout based on Section Importance */}
              <div
                className={`grid gap-6 ${
                  section.id === "official"
                    ? "grid-cols-1"
                    : section.id === "house-face"
                    ? "grid-cols-1 md:grid-cols-1"
                    : section.id === "first-wave"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {sectionMembers.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom Longer Required Disclaimer */}
        <section className="pt-8 border-t border-white/[0.08]">
          <div className="p-6 rounded-2xl bg-[#0D0D0F]/90 border border-white/10 backdrop-blur-md">
            <h3 className="font-mono text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              DISCLAIMER & AFFILIATION NOTICE
            </h3>
            <p className="text-[13px] font-sans text-ink-dim leading-relaxed">
              These accounts hold or have held a World affiliation badge on X, or are publicly tied to World’s badge campaign. They are not published founders, engineers, or officers of World Prediction Markets. Solana Sensei has said he is not on the team. Check each live X profile before you ship. Badges get added and removed.
            </p>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <footer className="pt-4 flex items-center justify-between text-xs text-ink-dim border-t border-white/[0.06]">
          <Disclaimer />
          <span className="font-mono text-[11px]">The World File &copy; 2026</span>
        </footer>
      </main>
    </div>
  );
}
