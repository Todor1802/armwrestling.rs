import { Guide } from "@/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export function getAllGuides(): Guide[] {
  const files = fs
    .readdirSync(guidesDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(guidesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title,
        summary: data.summary,
        publishedAt: data.publishedAt,
        tags: data.tags || [],
      } as Guide;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getGuideBySlug(slug: string) {
  const filePath = path.join(guidesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      title: data.title,
      summary: data.summary,
      publishedAt: data.publishedAt,
      tags: data.tags || [],
    } as Guide,
    content,
  };
}
