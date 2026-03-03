import { Navbar } from "@/components/ui/Navbar";
import { PricingTable } from "@/components/ui/PricingTable";
import { PricingDetails } from "@/components/ui/PricingDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — AI Revenue Machine Packages | MyNewStaff.ai",
  description:
    "Transparent pricing for AI-powered revenue machines. From free ScaleX diagnostic to full Domination package. No contracts, cancel anytime, ROI guaranteed.",
};

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-[1100px] mx-auto text-center">
            <span className="block text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6">Investment</span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold uppercase leading-[0.9] mb-8">
              Simple <span className="shimmer-text">Pricing.</span>
              <br />
              Serious Results.
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
              Every package runs autonomously — AI content, lead generation, outreach, and CRM — all deployed in 7-14 days. No lock-ins. No vanity metrics.
            </p>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="px-4 pb-20">
          <div className="max-w-[1100px] mx-auto">
            <PricingTable />
          </div>
        </section>

        {/* Detailed breakdown */}
        <section className="px-4 pb-20">
          <div className="max-w-[1100px] mx-auto">
            <PricingDetails />
          </div>
        </section>
      </main>
    </>
  );
}
