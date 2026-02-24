import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // MNS Admin Dashboard (React + Vite on Vercel)
        {
          source: "/admin",
          destination: "https://mns-dashboard.vercel.app/admin",
        },
        {
          source: "/admin/:path*",
          destination: "https://mns-dashboard.vercel.app/admin/:path*",
        },
        // MNS Command API — proxied through dashboard's Vercel rewrite
        {
          source: "/command-api/:path*",
          destination: "https://mns-dashboard.vercel.app/command-api/:path*",
        },
        // Scalability Reports — public links
        {
          source: "/report/:id",
          destination: "https://mns-dashboard.vercel.app/command-api/api/v1/reports/:id/view",
        },
        {
          source: "/report/:id/pdf",
          destination: "https://mns-dashboard.vercel.app/command-api/api/v1/reports/:id/pdf",
        },
      ],
      afterFiles: [
        {
          source: "/mission-control",
          destination: "/mission-control/index.html",
        },
        {
          source: "/mission-control-es",
          destination: "/mission-control-es/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
