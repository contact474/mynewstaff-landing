import { Navbar } from "@/components/ui/Navbar";
import { EscalaXDiagnostic } from "@/components/escalax/EscalaXDiagnostic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScaleX — Free AI Business Diagnostic | MyNewStaff.ai",
  description:
    "Get your ScaleX Score: AI-powered diagnostic that scans your website, analyzes your funnel, offer, positioning, ad strategy, and scores your business across 10 growth pillars. Now with funnel analysis, ad intelligence, and improvement roadmap.",
  alternates: {
    languages: {
      en: "/scalex",
      es: "/escalax",
    },
  },
};

export default function ScaleX() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <EscalaXDiagnostic />
      </main>
    </>
  );
}
