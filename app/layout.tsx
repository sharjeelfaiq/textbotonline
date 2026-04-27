import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { siteData } from "@/src/components/About/AboutData";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/backgrounds/aurora-background";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body className="relative min-h-dvh">
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var mode = localStorage.getItem("mode") || "dark";
              document.documentElement.dataset.theme = mode;
              document.documentElement.classList.toggle("dark", mode === "dark");
            } catch (e) {}
          })();
        `}</Script>
        <AuroraBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
