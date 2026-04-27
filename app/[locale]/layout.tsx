import Script from "next/script";
import type { Metadata } from "next";
import "../globals.css";
import type { ReactNode } from "react";
import { siteData } from "@/src/components/About/AboutData";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/backgrounds/aurora-background";
import Providers from "@/components/Providers";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { defaultLocale, isSupportedLocale, supportedLocales, type SupportedLocale } from "@/src/i18n/config";
import { getDictionary } from "@/src/i18n/getDictionary";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: SupportedLocale = isSupportedLocale(locale) ? locale : defaultLocale;

  return {
    metadataBase: new URL(siteData.url),
    title: {
      default: "Textbotonline",
      template: "%s | Textbotonline",
    },
    description: siteData.tagLine,
    alternates: {
      canonical: siteData.url,
      languages: Object.fromEntries(
        supportedLocales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      type: "website",
      url: siteData.url,
      title: "Textbotonline",
      description: siteData.tagLine,
      siteName: "Textbotonline",
      locale: loc,
    },
    twitter: {
      card: "summary",
      title: "Textbotonline",
      description: siteData.tagLine,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const loc: SupportedLocale = isSupportedLocale(locale) ? locale : defaultLocale;
  const dictionary = await getDictionary(loc);

  return (
    <html
      lang={loc}
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
        <div className="relative z-10">
          <Providers locale={loc} dictionary={dictionary}>
            <div className="tbo-app-shell min-h-dvh">
              <AppHeader />
              <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
                {children}
              </main>
              <AppFooter />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}

