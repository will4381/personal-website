import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Will Kusch",
  description: "Notes, projects, and what I'm working on now.",
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
