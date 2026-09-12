/**
 * Site identity configuration.
 *
 * This file is CONTENT: the name, contact details, and external service URLs
 * for the portfolio this deployment serves.
 */
export const PORTFOLIO_SITE = {
  name: "Your Name",
  description: "Selected work, collected in one place.",
  email: "",
  groups: [
    { id: "left", label: "Selected work" },
    { id: "right", label: "Studies & notes" },
  ],
} as const;

export const SITE_CONFIG = {
  siteName: PORTFOLIO_SITE.name,
  siteDescription: PORTFOLIO_SITE.description,
  siteTagline: "Selected work, collected in one place.",
  contactEmail: PORTFOLIO_SITE.email,
  instagramUrl: "",
  verifyWorkerUrl: "",
  storyUpdateFormUrl: "",
} as const;
