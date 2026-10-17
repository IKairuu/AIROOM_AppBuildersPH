import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Hide the Next.js dev tools badge; compile and runtime errors still show.
  devIndicators: false,
  // Phones on the laptop's hotspot open the dev server by its LAN IP
  // (Windows Mobile Hotspot is usually 192.168.137.1).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  // systeminformation shells out to OS tools (powershell, wmic); bundling it breaks the build.
  serverExternalPackages: ["systeminformation"],
  // The hosted demo seeds its temp data folder from /data, so ship it with the server.
  outputFileTracingIncludes: {
    "/*": ["./data/**/*"],
  },
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
