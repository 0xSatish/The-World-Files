import SectionIndex from "@/components/SectionIndex";
import { getSectionPosts } from "@/lib/content";

export const metadata = { title: "Archive / Timeline  The World File" };

export default function ArchiveIndex() {
  const posts = getSectionPosts("archive");
  return (
    <SectionIndex
      eyebrow="Archive / Timeline"
      title="The public record, and its edges"
      intro="Only confirmed public facts, from teaser account to launch to now. The team stays unpublished  see About for why."
      posts={posts}
    />
  );
}
