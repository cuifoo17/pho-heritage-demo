import type { NextConfig } from "next";

// GitHub Pages serves the site at user.github.io/<repo>, so the Actions build sets
// NEXT_PUBLIC_BASE_PATH; locally it's empty and the site runs at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Lets the phone on the LAN load dev chunks and hot-reload. Dev only.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "192.0.0.*"],
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
