import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { WarRoomThanks } from "@/components/warroom/WarRoomThanks";

export const metadata: Metadata = {
  title: "You're In — The AI War Room | MyNewStaff.ai",
  description:
    "You're registered for The AI War Room. Check your email for the join link.",
  robots: { index: false, follow: false },
};

export default function WarRoomThanksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        <WarRoomThanks />
      </main>
    </>
  );
}
