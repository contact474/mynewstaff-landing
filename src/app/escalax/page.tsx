import { Navbar } from "@/components/ui/Navbar";
import { EscalaXDiagnostic } from "@/components/escalax/EscalaXDiagnostic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EscalaX — Free AI Business Diagnostic | MyNewStaff.ai",
  description:
    "Get your EscalaX Score: a free AI-powered diagnostic that scans your website, analyzes your digital footprint, and reveals exactly where your business stands across 10 growth pillars. Real data, not guesswork.",
};

export default function EscalaX() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <EscalaXDiagnostic />
      </main>
    </>
  );
}
