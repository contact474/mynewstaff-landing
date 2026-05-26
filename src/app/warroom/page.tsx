import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { WarRoomLanding } from "@/components/warroom/WarRoomLanding";

export const metadata: Metadata = {
  title: "The AI War Room — Free Weekly Live Session | MyNewStaff.ai",
  description:
    "Every Thursday, Luka Lah shows business owners how to deploy AI employees that work 24/7 for less than a coffee. Free. Live. No fluff.",
  openGraph: {
    title: "The AI War Room — Free Weekly Live Breakdown",
    description:
      "45 minutes of real AI deployment strategies. Live demos. Q&A. Every Thursday.",
    type: "website",
    url: "https://www.mynewstaff.ai/warroom",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI War Room — Free Weekly Live",
    description:
      "Every Thursday: how to deploy AI employees that work 24/7. Free.",
  },
};

function getNextThursday(): string {
  const now = new Date();
  const day = now.getUTCDay();
  // Thursday = 4
  const daysUntil = (4 - day + 7) % 7 || 7;
  const next = new Date(now);
  next.setUTCDate(now.getUTCDate() + daysUntil);
  next.setUTCHours(18, 0, 0, 0); // 6PM UTC = 2PM ET / 11AM PT
  return next.toISOString();
}

export default function WarRoomPage() {
  const nextThursday = getNextThursday();

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "The AI War Room — Weekly Live Breakdown",
    description:
      "Free weekly live session where Luka Lah shows business owners how to deploy AI employees that work 24/7.",
    startDate: nextThursday,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://www.mynewstaff.ai/warroom",
    },
    organizer: {
      "@type": "Organization",
      name: "MyNewStaff.ai",
      url: "https://www.mynewstaff.ai",
    },
    performer: {
      "@type": "Person",
      name: "Luka Lah",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/LimitedAvailability",
      url: "https://www.mynewstaff.ai/warroom",
    },
    isAccessibleForFree: true,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-black text-white selection:bg-white selection:text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventSchema),
          }}
        />
        <WarRoomLanding nextThursday={nextThursday} />
      </main>
    </>
  );
}
