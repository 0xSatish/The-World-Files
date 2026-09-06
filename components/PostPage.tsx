import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
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

export default function PostPage({
  post,
  backHref,
  backLabel,
}: {
  post: Post;
  backHref: string;
  backLabel: string;
}) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 font-mono text-[12px] text-ink-dim uppercase tracking-wide mb-4">
        <TopicMark size={28} />
        <span className="text-gradient">{post.type}</span>
        {post.layer && (
          <>
            <span className="text-ink-dim">·</span>
            <span className="text-gradient">{formatLayer(post.layer)}</span>
          </>
        )}
        <span>{formatDate(post.date)}</span>
      </div>
      <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
        {post.title}
      </h1>
      <div className="prose-body text-[17px]">
        <MDXRemote source={post.content} />
      </div>

      {post.sources && post.sources.length > 0 && (
        <div className="border-t border-line pt-8 mt-8">
          <p className="font-mono text-[12px] uppercase tracking-wide text-ink-dim mb-4">
            Sources
          </p>
          <SourceList sources={post.sources} />
        </div>
      )}

      <Link
        href={backHref}
        className="inline-block mt-16 font-mono text-[13px] text-accent hover:underline"
      >
        &larr; {backLabel}
      </Link>
    </article>
  );
}
