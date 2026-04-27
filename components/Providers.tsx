"use client";

import { ThemeProvider } from "@/src/context/ThemeContext";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import type { Dictionary } from "@/src/i18n/getDictionary";
import type { SupportedLocale } from "@/src/i18n/config";

export default function Providers({
  children,
  locale,
  dictionary,
}: {
  children: React.ReactNode;
  locale: SupportedLocale;
  dictionary: Dictionary;
}) {
  return (
    <ThemeProvider>
      <I18nProvider locale={locale} dictionary={dictionary}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
