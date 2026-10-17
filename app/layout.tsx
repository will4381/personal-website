import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://willkusch.com";
const title = "Will Kusch";
const description =
  "Notes, projects, and current work across Lucra, Runes, and more.";

const relativeGrotesque = localFont({
  src: [
    { path: "../public/fonts/relative-grotesque/RelativeGrotesque.woff2", weight: "100 900", style: "normal" },
    { path: "../public/fonts/relative-grotesque/RelativeGrotesque-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-relative-grotesque",
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
    <html lang="en" className={relativeGrotesque.variable}>
      <body>
        {children}
        <Script id="snap-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');

            snaptr('init', '42d9c93c-b157-40b1-9f1e-630b11061ec3');
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      </body>
    </html>
  );
}
