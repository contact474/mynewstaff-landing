import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brooke AI \u2014 Your AI Cold Caller | MyNewStaff.ai",
  description:
    "Meet Brooke \u2014 the AI cold caller that dials your leads, handles objections, and books meetings 24/7. $0.04/min. Talk to her now, free demo.",
  openGraph: {
    title: "Brooke AI \u2014 Your AI Cold Caller | MyNewStaff.ai",
    description:
      "AI cold caller that books meetings while you sleep. 200+ calls/day, NEPQ-trained, your script, your number.",
    url: "https://mynewstaff.ai/try",
    type: "website",
    images: [{ url: "https://mynewstaff.ai/brooke-share-preview.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brooke AI \u2014 Your AI Cold Caller",
    description: "AI cold caller that books meetings while you sleep. $0.04/min.",
    images: ["https://mynewstaff.ai/brooke-share-preview.png"],
  },
};

export default function TryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
