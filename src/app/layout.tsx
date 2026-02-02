import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google"; // eslint-disable-line @typescript-eslint/camelcase
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MyNewStaff.ai | Revenue Machines",
  description: "We build revenue machines. Scale your growth with AI staff and unlimited video content.",
  icons: {
    icon: "/logo-white.png?v=6",
    apple: "/apple-touch-icon.png?v=6",
  },
  openGraph: {
    images: ["/logo-white.png?v=6"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
