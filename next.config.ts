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
        // MNS Command Center (CRM + Reports + Agents)
        {
          source: "/command",
          destination: "http://82.25.92.135/command",
        },
        {
          source: "/command/api/:path*",
          destination: "http://82.25.92.135/command/api/:path*",
        },
        // Scalability Reports — public links
        {
          source: "/report/:id",
          destination: "http://82.25.92.135/command/api/v1/reports/:id/view",
        },
        {
          source: "/report/:id/pdf",
          destination: "http://82.25.92.135/command/api/v1/reports/:id/pdf",
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
