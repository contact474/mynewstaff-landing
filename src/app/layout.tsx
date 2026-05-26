import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google"; // eslint-disable-line @typescript-eslint/camelcase
import { ClientLayout } from "@/components/ui/ClientLayout";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MyNewStaff.ai | Revenue Machines",
  description: "We build revenue machines. Scale your growth with AI staff and unlimited video content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyNewStaff.ai",
    url: "https://www.mynewstaff.ai",
    description:
      "AI-powered autonomous marketing system. Replace your $1M marketing team with AI agents.",
    founder: { "@type": "Person", name: "Luka Lah" },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@mynewstaff.ai",
    },
    sameAs: ["https://www.instagram.com/ga.god/"],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "MyNewStaff AI Marketing System",
    description:
      "Autonomous AI agents that handle lead generation, content creation, cold calling, email outreach, and social media management.",
    brand: { "@type": "Brand", name: "MyNewStaff.ai" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "749",
      highPrice: "4999",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is MyNewStaff.ai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MyNewStaff.ai is an AI-powered autonomous marketing system that replaces traditional marketing teams with AI agents. Our system handles lead generation, content creation, cold calling, email outreach, and social media management autonomously.",
        },
      },
      {
        "@type": "Question",
        name: "How much does MyNewStaff.ai cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Plans start at $749/month for the Growth tier. We also offer a $2,500 one-time setup option. Enterprise and custom pricing available for agencies.",
        },
      },
      {
        "@type": "Question",
        name: "What AI agents are included?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brooke (AI cold caller with NEPQ sales methodology), autonomous content creation engine, lead enrichment and scoring pipeline, email outreach automation, and social media management across all platforms.",
        },
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Marketing Automation",
    provider: { "@type": "Organization", name: "MyNewStaff.ai" },
    areaServed: "Worldwide",
    description:
      "Full-stack AI marketing: lead generation, cold calling, content creation, email outreach, social media, and analytics — all autonomous.",
  };

  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
