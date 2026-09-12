import Link from "next/link";

import { PORTFOLIO_SITE } from "@/content/site";

export default function InformationPage() {
  return (
    <div className="portfolio-information">
      <div className="portfolio-inner">
        <header className="portfolio-page-head">
          <h1>Information</h1>
          <Link href="/">Back to projects</Link>
        </header>

        <div className="portfolio-prose">
          <p>
            This is a place for your work and the things you&apos;re still working out.
          </p>
          <p>
            Write a few lines about yourself here. Where do you work? What do you make?
            What keeps you interested?
          </p>
          <h2>Selected work</h2>
          <p>
            Add a few exhibitions, publications, collaborations, or projects. A short list is
            enough. Remove this section if you don&apos;t need it.
          </p>
          <h2>About this site</h2>
          <p>
            This is a demo of Portfolio Starter, made for the Echoes from Afar workshop. All
            six projects are fictional examples. The images are original vector studies that you
            can replace or reuse.
          </p>
          {PORTFOLIO_SITE.email ? (
            <p>
              <a href={`mailto:${PORTFOLIO_SITE.email}`}>{PORTFOLIO_SITE.email}</a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
