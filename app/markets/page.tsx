import SectionIndex from "@/components/SectionIndex";
import { getSectionPosts } from "@/lib/content";

export const metadata = { title: "Markets Desk  The World File" };

export default function MarketsIndex() {
  const posts = getSectionPosts("markets");
  return (
    <SectionIndex
      eyebrow="Markets Desk"
      title="An editorial map, not an exchange terminal"
      intro="Notes on the categories World trades  sports, crypto, politics, culture  and what to watch for as new markets go live. Always trade at world.xyz or through Phantom."
      posts={posts}
    />
  );
}
