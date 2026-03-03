import { Navbar } from "@/components/ui/Navbar";
import { EscalaXDiagnostic } from "@/components/escalax/EscalaXDiagnostic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScaleX AI — Free AI Business Diagnostic | MyNewStaff.ai",
  description:
    "Get your ScaleX AI Score: see exactly where your growth engine is leaking revenue. AI-powered diagnostic scans your website, funnel, offer, positioning, and ad strategy across 10 pillars. Free. Under 5 minutes.",
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
