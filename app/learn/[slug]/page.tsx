import { notFound } from "next/navigation";
import PostPage from "@/components/PostPage";
import { getPost, getSectionPosts } from "@/lib/content";

export function generateStaticParams() {
  return getSectionPosts("learn").map((p) => ({ slug: p.slug }));
}

export default async function LearnPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("learn", slug);
  if (!post) return notFound();
  return <PostPage post={post} backHref="/learn" backLabel="All guides" />;
}
