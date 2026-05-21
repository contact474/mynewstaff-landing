import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brooke AI \u2014 Your AI Cold Caller | MyNewStaff.ai",
  description:
    "Meet Brooke \u2014 the AI cold caller that dials your leads, handles objections, and books meetings 24/7. $0.04/min. Talk to her now, free demo.",
  openGraph: {
    title: "Brooke AI \u2014 Your AI Cold Caller | MyNewStaff.ai",
    description:
      "AI cold caller that books meetings while you sleep. 200+ calls/day, NEPQ-trained, your script, your number.",
  },
};

export default function TryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
