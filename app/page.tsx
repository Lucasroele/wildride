import Image from "next/image";
import Link from "next/link";

import { PORTFOLIO_SITE } from "@/content/site";
import { getPortfolioProjects } from "@/lib/portfolio";

export default function Home() {
  const projects = getPortfolioProjects();

  return (
    <div className="portfolio-page">
      <div className="portfolio-shell">
        <header className="portfolio-header">
          <div className="portfolio-title-wrap">
            <Link href="/" className="portfolio-title">
              {PORTFOLIO_SITE.name}
            </Link>
          </div>
          <nav className="portfolio-nav" aria-label="Main navigation">
            <Link href="/">Index</Link>
            <Link href="/information">Information</Link>
          </nav>
        </header>

        <main className="portfolio-grid" id="main" tabIndex={-1}>
          {PORTFOLIO_SITE.groups.map((group) => (
            <section key={group.id} className="portfolio-group" aria-label={group.label}>
              <header className="portfolio-group-header">
                <h2>{group.label}</h2>
              </header>

              <div className="portfolio-feed">
                {projects
                  .filter((project) => project.group === group.id)
                  .map((project) => (
                    <article key={project.slug} className="portfolio-entry">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="portfolio-link"
                        aria-label={`View ${project.title}`}
                      >
                        <Image
                          src={project.cover}
                          alt={project.coverAlt}
                          width={1200}
                          height={900}
                          priority={project.order === 1}
                          className="portfolio-cover"
                        />
                        <div className="portfolio-entry-heading">
                          <h3>{project.title}</h3>
                          <span>{project.year}</span>
                        </div>
                      </Link>

                      <div className="portfolio-entry-description">
                        <p className="portfolio-metadata">{project.medium}</p>
                        <p>{project.summary}</p>
                        <Link href={`/projects/${project.slug}`} className="portfolio-view-link">
                          [View project]
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
