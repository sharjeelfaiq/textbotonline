import { redirect } from "next/navigation";
import { defaultLocale, isSupportedLocale } from "@/src/i18n/config";

export default async function LocaleIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isSupportedLocale(locale) ? locale : defaultLocale;
  redirect(`/${loc}/tools`);
}

