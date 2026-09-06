import { notFound } from "next/navigation";
import PostPage from "@/components/PostPage";
import { getPost, getSectionPosts } from "@/lib/content";

export function generateStaticParams() {
  return getSectionPosts("archive").map((p) => ({ slug: p.slug }));
}

export default async function ArchivePost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("archive", slug);
  if (!post) return notFound();
  return <PostPage post={post} backHref="/archive" backLabel="Archive" />;
}
