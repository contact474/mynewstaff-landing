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
        // Public proposal viewer — clean URLs (no /admin/)
        {
          source: "/p/:id",
          destination: "https://mns-dashboard.vercel.app/p/:id",
        },
        {
          source: "/p/:id/:file",
          destination: "https://mns-dashboard.vercel.app/p/:id/:file",
        },
        // Closer Portal — standalone page served by dashboard
        {
          source: "/closer",
          destination: "https://mns-dashboard.vercel.app/closer",
        },
        {
          source: "/closer/:path*",
          destination: "https://mns-dashboard.vercel.app/closer/:path*",
        },
        // MNS Command API — proxied through dashboard's Vercel rewrite
        {
          source: "/command-api/:path*",
          destination: "https://mns-dashboard.vercel.app/command-api/:path*",
        },
        // A/B Testing API — proxy to Armando Franco portal
        {
          source: "/ab-api/:path*",
          destination: "https://armando-franco.com/api/ab/:path*",
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
        // Products showcase — static HTML with Brooke voice widget
        {
          source: "/products",
          destination: "/products.html",
        },
      ],
    };
  },
};

export default nextConfig;
