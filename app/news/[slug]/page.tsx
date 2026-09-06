import { notFound } from "next/navigation";
import PostPage from "@/components/PostPage";
import { getPost, getSectionPosts } from "@/lib/content";

export function generateStaticParams() {
  return getSectionPosts("news").map((p) => ({ slug: p.slug }));
}

export default async function NewsPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("news", slug);
  if (!post) return notFound();
  return <PostPage post={post} backHref="/news" backLabel="All updates" />;
}
