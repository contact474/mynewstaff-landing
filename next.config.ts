import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FORCE_REBUILD_2471
  async rewrites() {
    return [
      {
        source: "/mission-control",
        destination: "/mission-control/index.html",
      },
    ];
  },
};

export default nextConfig;
