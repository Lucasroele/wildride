import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPortfolioProjectBySlug, getPortfolioProjects } from "@/lib/portfolio";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPortfolioProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPortfolioProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="portfolio-project">
      <div className="portfolio-inner">
        <header className="portfolio-page-head">
          <h1>{project.title}</h1>
          <Link href="/">Back to projects</Link>
        </header>

        <div className="portfolio-project-header">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            width={1200}
            height={900}
            className="portfolio-project-cover"
            priority
          />

          <div className="portfolio-project-meta">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.medium}</span>
          </div>
        </div>

        <div className="portfolio-project-body">
          <div className="portfolio-prose" dangerouslySetInnerHTML={{ __html: project.content }} />

          {project.gallery.map((item, index) => (
            <figure key={`${item.src}-${index}`}>
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={900}
                className="portfolio-project-cover"
              />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
