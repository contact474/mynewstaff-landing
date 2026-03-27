import { Suspense } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { BookingPage } from "@/components/booking/BookingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Free AI Scalability Assessment | MyNewStaff.ai",
  description:
    "30-minute strategy session. Walk away with a $2,500 AI scalability assessment, custom action plan, and DIY implementation guide. No pitch. No obligation.",
};

export default function Book() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-zinc-600 text-sm font-sans">Loading...</span></div>}>
          <BookingPage />
        </Suspense>
      </main>
    </>
  );
}
