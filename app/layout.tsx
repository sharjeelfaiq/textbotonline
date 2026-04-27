import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { siteData } from "@/src/components/About/AboutData";

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default: "Textbotonline",
    template: "%s | Textbotonline",
  },
  description: siteData.tagLine,
  alternates: {
    canonical: siteData.url,
  },
  openGraph: {
    type: "website",
    url: siteData.url,
    title: "Textbotonline",
    description: siteData.tagLine,
    siteName: "Textbotonline",
  },
  twitter: {
    card: "summary",
    title: "Textbotonline",
    description: siteData.tagLine,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var mode = localStorage.getItem("mode") || "dark";
              document.documentElement.dataset.theme = mode;
            } catch (e) {}
          })();
        `}</Script>
        {children}
      </body>
    </html>
  );
}
