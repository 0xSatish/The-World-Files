import Link from "next/link";
import type { Post } from "@/lib/content";
import SourceList from "./SourceList";
import TopicMark from "./TopicMark";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatLayer(layer: string) {
  return layer.replace("-", " ").toUpperCase();
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="group flex flex-col gap-2 py-6 border-b border-line last:border-b-0">
      <Link
        href={`/${post.section}/${post.slug}`}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2.5 font-mono text-[12px] text-ink-dim uppercase tracking-wide">
          <TopicMark size={18} />
          <span>{formatDate(post.date)}</span>
          <span className="text-gradient">{post.type}</span>
          {post.layer && (
            <>
              <span className="text-ink-dim">·</span>
              <span className="text-gradient">{formatLayer(post.layer)}</span>
            </>
          )}
        </div>
        <h3 className="font-serif text-xl md:text-2xl leading-snug group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-ink-dim text-[15px] max-w-xl">{post.summary}</p>
      </Link>
      {post.sources && post.sources.length > 0 && (
        <div className="mt-2">
          <SourceList sources={post.sources} compact />
        </div>
      )}
    </div>
  );
}
