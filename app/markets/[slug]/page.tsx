import { notFound } from "next/navigation";
import PostPage from "@/components/PostPage";
import { getPost, getSectionPosts } from "@/lib/content";

export function generateStaticParams() {
  return getSectionPosts("markets").map((p) => ({ slug: p.slug }));
}

export default async function MarketsPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("markets", slug);
  if (!post) return notFound();
  return <PostPage post={post} backHref="/markets" backLabel="Markets Desk" />;
}
