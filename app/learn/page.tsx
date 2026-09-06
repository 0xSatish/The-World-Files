import SectionIndex from "@/components/SectionIndex";
import { getSectionPosts } from "@/lib/content";

export const metadata = { title: "Learn  The World File" };

export default function LearnIndex() {
  const posts = getSectionPosts("learn");
  return (
    <SectionIndex
      eyebrow="Guide / Learn"
      title="Everything worth understanding before you trade"
      intro="Evergreen explainers on prediction markets, self-custody, resolution, and how World compares to the alternatives."
      posts={posts}
    />
  );
}
