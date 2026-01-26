import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://willkusch.com";
const title = "Will Kusch";
const description =
  "Notes, projects, and what I'm working on now.";

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
    "Convuu",
    "mobile apps",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
