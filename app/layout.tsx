import type { Metadata } from "next";
import { IM_Fell_English, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://willkusch.com";
const title = "Will Kusch";
const description =
  "Notes, projects, and current work across Lucra, Runes, and more.";

const imFellEnglish = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-im-fell-english",
});

const sourceSerif = Source_Serif_4({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  applicationName: title,
  authors: [{ name: "Will Kusch", url: siteUrl }],
  creator: "Will Kusch",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Will Kusch",
    "Lucra",
    "Runes",
    "web apps",
    "product development",
    "development agency",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: "@hellakusch",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${imFellEnglish.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
