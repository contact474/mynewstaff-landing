import { Navbar } from "@/components/ui/Navbar";
import { PartnersLocaleProvider } from "@/components/partners/PartnersLocaleProvider";
import { PartnersLanguageToggle } from "@/components/partners/PartnersLanguageToggle";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersSteps } from "@/components/partners/PartnersSteps";
import { PartnersValueCompare } from "@/components/partners/PartnersValueCompare";
import { PartnersProof } from "@/components/partners/PartnersProof";
import { PartnersTiers } from "@/components/partners/PartnersTiers";
import { PartnersBigPlays } from "@/components/partners/PartnersBigPlays";
import { PartnersAddOn } from "@/components/partners/PartnersAddOn";
import { PartnersTerms } from "@/components/partners/PartnersTerms";
import { PartnersCTA } from "@/components/partners/PartnersCTA";
import { PartnersFloatingCTA } from "@/components/partners/PartnersFloatingCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us | MyNewStaff.ai — Influencer Barter Program",
  description:
    "Post content. Earn build credits. Redeem landing pages, explainer videos, press kits, AI content and growth assets from MyNewStaff.ai.",
};

export default function Partners() {
  return (
    <PartnersLocaleProvider>
      <Navbar />
      <PartnersLanguageToggle />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        <PartnersHero />
        <PartnersSteps />
        <PartnersValueCompare />
        <PartnersProof />
        <PartnersTiers />
        <PartnersBigPlays />
        <PartnersAddOn />
        <PartnersTerms />
        <PartnersCTA />
        <PartnersFloatingCTA />
      </main>
    </PartnersLocaleProvider>
  );
}
