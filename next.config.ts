import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FORCE_REBUILD_2471
  async rewrites() {
    return [
      {
        source: "/mission-control",
        destination: "/mission-control/index.html",
      },
      {
        source: "/mission-control-es",
        destination: "/mission-control-es/index.html",
      },
      {
        source: "/admin",
        destination: "https://mns-dashboard.vercel.app/",
      },
      {
        source: "/admin/:path*",
        destination: "https://mns-dashboard.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
