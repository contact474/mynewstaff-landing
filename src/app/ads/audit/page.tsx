import { AuditQuizFunnel } from "@/components/audit/AuditQuizFunnel";

export const metadata = {
  title: "Free AI Ad Audit | MyNewStaff.ai",
  description:
    "Discover where your ads are leaking money. Get a free 10-pillar AI scalability report with personalized recommendations in under 5 minutes.",
};

export default function AdsAudit() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <AuditQuizFunnel />
    </main>
  );
}
