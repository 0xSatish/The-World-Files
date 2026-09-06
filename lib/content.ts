import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostType = "news" | "guide" | "note" | "timeline" | "market";

export interface Source {
  label: "official" | "press" | "independent";
  outlet: string;
  title: string;
  date: string;
  url: string;
}

export interface PostMeta {
  title: string;
  date: string;
  type: PostType;
  tags: string[];
  summary: string;
  slug: string;
  section: string;
  layer?: "confirmed" | "x-moment" | "research";
  sources?: Source[];
}

export interface Post extends PostMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

// map each site section to the folder(s) it reads from
const SECTION_DIRS: Record<string, string[]> = {
  news: ["news"],
  learn: ["learn"],
  markets: ["markets"],
  archive: ["timeline"],
};

function readDir(dir: string, section: string): Post[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return {
        title: data.title as string,
        date: data.date as string,
        type: data.type as PostType,
        tags: (data.tags as string[]) ?? [],
        summary: data.summary as string,
        slug,
        section,
        layer: (data.layer as PostMeta["layer"]) ?? undefined,
        sources: (data.sources as Source[]) ?? undefined,
        content,
      };
    });
}

export function getSectionPosts(section: keyof typeof SECTION_DIRS): Post[] {
  const dirs = SECTION_DIRS[section] ?? [];
  const posts = dirs.flatMap((d) => readDir(d, section));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): Post[] {
  const all = Object.keys(SECTION_DIRS).flatMap((s) =>
    getSectionPosts(s as keyof typeof SECTION_DIRS)
  );
  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(section: string, slug: string): Post | undefined {
  const dirs = SECTION_DIRS[section] ?? [section];
  for (const dir of dirs) {
    const found = readDir(dir, section).find((p) => p.slug === slug);
    if (found) return found;
  }
  return undefined;
}

export function getLatest(n: number): Post[] {
  return getAllPosts().slice(0, n);
}
