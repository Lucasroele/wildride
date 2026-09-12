import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PortfolioGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  group: "left" | "right";
  year: string;
  medium: string;
  summary: string;
  cover: string;
  coverAlt: string;
  order: number;
  gallery: PortfolioGalleryItem[];
  content: string;
}

const contentDirectory = path.join(process.cwd(), "content", "projects");

export function getPortfolioProjects(): PortfolioProject[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .sort();

  return files
    .map((file) => {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = file.replace(/\.(md|mdx)$/i, "");

      return {
        slug,
        title: typeof data.title === "string" ? data.title : slug,
        group:
          data.group === "left" || data.group === "right"
            ? data.group
            : "left",
        year: typeof data.year === "string" ? data.year : String(data.year ?? ""),
        medium: typeof data.medium === "string" ? data.medium : "",
        summary: typeof data.summary === "string" ? data.summary : "",
        cover: typeof data.cover === "string" ? data.cover : "/images/placeholder.svg",
        coverAlt:
          typeof data.coverAlt === "string" && data.coverAlt.trim().length > 0
            ? data.coverAlt
            : "Project cover image",
        order: typeof data.order === "number" ? data.order : 0,
        gallery: Array.isArray(data.gallery)
          ? data.gallery.map((item: any) => ({
              src: typeof item?.src === "string" ? item.src : "/images/placeholder.svg",
              alt: typeof item?.alt === "string" ? item.alt : "Project image",
              caption: typeof item?.caption === "string" ? item.caption : undefined,
            }))
          : [],
        content: content.trim(),
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | null {
  const projects = getPortfolioProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}
