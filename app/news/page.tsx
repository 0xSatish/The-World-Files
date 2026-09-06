import SectionIndex from "@/components/SectionIndex";
import { getSectionPosts } from "@/lib/content";

export const metadata = { title: "News / Updates  The World File" };

export default function NewsIndex() {
  const posts = getSectionPosts("news");
  return (
    <div>
      <SectionIndex
        eyebrow="News / Updates"
        title="What's happened with World"
        intro="Dated posts, newest first. Launches, markets, partnerships, product changes, and the occasional X moment worth noting."
        posts={posts}
      />
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-[13px] text-ink-dim italic">
          Unofficial archive. Compiled from public reporting and official posts,
          June&ndash;September 2026. Not affiliated with World. Confirm live
          markets inside Phantom or at{" "}
          <a
            href="https://world.xyz"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline hover:text-ink transition-colors"
          >
            world.xyz
          </a>
          .
        </p>
      </div>
    </div>
  );
}
