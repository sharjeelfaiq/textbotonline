"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dictionary } from "@/src/i18n/getDictionary";
import type { SupportedLocale } from "@/src/i18n/config";

type I18nContextValue = {
  locale: SupportedLocale;
  dictionary: Dictionary;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: SupportedLocale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      dictionary,
      t: (key: string, fallback?: string) => {
        const hit = dictionary[key];
        if (typeof hit === "string" && hit.length > 0) return hit;
        if (typeof fallback === "string") return fallback;
        return key;
      },
    };
  }, [dictionary, locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

