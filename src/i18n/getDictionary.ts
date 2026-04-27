import "server-only";

import type { SupportedLocale } from "@/src/i18n/config";

export type Dictionary = Record<string, string>;

const dictionaries: Record<SupportedLocale, () => Promise<Dictionary>> = {
  en: async () => (await import("@/messages/en.json")).default,
  es: async () => (await import("@/messages/es.json")).default,
  fr: async () => (await import("@/messages/fr.json")).default,
  de: async () => (await import("@/messages/de.json")).default,
};

export async function getDictionary(locale: SupportedLocale): Promise<Dictionary> {
  return dictionaries[locale]();
}

