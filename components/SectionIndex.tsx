import PostCard from "./PostCard";
import type { Post } from "@/lib/content";

export default function SectionIndex({
  eyebrow,
  title,
  intro,
  posts,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  posts: Post[];
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="font-mono text-[13px] uppercase tracking-wide text-accent mb-3">
        {eyebrow}
      </p>
      <h1 className="font-serif text-4xl md:text-5xl mb-4 max-w-2xl">{title}</h1>
      <p className="text-ink-dim max-w-xl mb-12">{intro}</p>
      <div>
        {posts.map((p) => (
          <PostCard key={`${p.section}-${p.slug}`} post={p} />
        ))}
        {posts.length === 0 && (
          <p className="text-ink-dim py-8">Nothing published here yet.</p>
        )}
      </div>
    </div>
  );
}
