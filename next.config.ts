import type { NextConfig } from "next";

// GitHub Pages project sites use a repository subpath, e.g. /wildride.
const basePath = process.env.NEXT_BASE_PATH ?? "/wildride";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
