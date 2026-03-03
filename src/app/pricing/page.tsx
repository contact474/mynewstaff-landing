import { Navbar } from "@/components/ui/Navbar";
import { SocialProofBar } from "@/components/ui/SocialProofBar";
import { PricingTable } from "@/components/ui/PricingTable";
import { PricingDetails } from "@/components/ui/PricingDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Replace Your Agency, Keep the Results | MyNewStaff.ai",
  description:
    "Transparent pricing for AI-powered revenue machines. 90-Day Pipeline Guarantee: 100 qualified leads or we work free. No contracts, cancel anytime.",
};

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {/* Hero */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-[1100px] mx-auto text-center">
            <span className="block text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6">Investment</span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-wide font-bold uppercase leading-[0.9] mb-8">
              Replace Your <span className="shimmer-text">Agency.</span>
              <br />
              Keep the Results.
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
              Every package runs autonomously — AI content, lead generation, outreach, and CRM — all deployed in 7-14 days.
              90-Day Pipeline Guarantee. No lock-ins. No vanity metrics.
            </p>
          </div>
        </section>

        <SocialProofBar />

        {/* Pricing Table */}
        <section className="px-4 py-20">
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
