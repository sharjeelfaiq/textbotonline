import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isSupportedLocale, supportedLocales } from "@/src/i18n/config";

function getLocaleFromCookie(request: NextRequest) {
  const cookie = request.cookies.get("tbo_locale")?.value;
  if (cookie && isSupportedLocale(cookie)) return cookie;
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Ignore Next internals + static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && supportedLocales.includes(first as never)) {
    return NextResponse.next();
  }

  const locale = getLocaleFromCookie(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "/tools" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

