"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { siteData } from "@/src/components/About/AboutData";
import { useTheme } from "@/src/context/ThemeContext";
import { cn } from "@/lib/utils";
import { supportedLocales } from "@/src/i18n/config";
import { useI18n } from "@/components/i18n/I18nProvider";

type NavItem = { href: string; label: string; description?: string };

function setLocaleCookie(locale: string) {
  try {
    document.cookie = `tbo_locale=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch (_) {}
}

function DropdownNav({
  title,
  items,
  isActive,
}: {
  title: string;
  items: NavItem[];
  isActive: boolean;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-fast ease-out hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 motion-reduce:transition-none dark:hover:bg-tbo-panelSoft",
          isActive
            ? "text-sky-700 dark:text-sky-300"
            : "text-slate-900 dark:text-tbo-text"
        )}
      >
        {title}
        <span aria-hidden="true" className="text-xs opacity-70">
          ▾
        </span>
      </button>

      <div
        role="menu"
        className="invisible absolute left-0 top-full z-50 mt-2 min-w-56 translate-y-1 rounded-xl border border-slate-200 bg-white p-1 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:border-tbo-border dark:bg-tbo-surface"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="block rounded-lg px-3 py-2 text-sm text-slate-900 transition-colors duration-fast ease-out hover:bg-slate-100 focus:bg-slate-100 focus:outline-none dark:text-tbo-text dark:hover:bg-tbo-panel dark:focus:bg-tbo-panel motion-reduce:transition-none"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function AppHeader() {
  const pathname = usePathname() ?? "/";
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, t } = useI18n();

  const segments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix =
    segments.length > 0 && supportedLocales.includes(segments[0] as never);
  const pathnameNoLocale = hasLocalePrefix
    ? `/${segments.slice(1).join("/")}` || "/"
    : pathname;

  const withLocale = (href: string) => {
    if (!href.startsWith("/")) return href;
    return `/${locale}${href === "/" ? "/tools" : href}`;
  };

  const changeCaseItems: NavItem[] = [
    { href: withLocale("/sentence-case"), label: "Change case to Sentence Case" },
    { href: withLocale("/lowercase"), label: "Change case to Lowercase" },
    { href: withLocale("/uppercase"), label: "Change case to Uppercase" },
    { href: withLocale("/title-case"), label: "Change case to Title Case" },
    { href: withLocale("/camel-case"), label: "Change case to Camel Case" },
  ];

  const editItems: NavItem[] = [
    { href: withLocale("/edit/text-trim"), label: "Edit: Trim text" },
    { href: withLocale("/edit/remove-spaces"), label: "Edit: Remove spaces" },
    { href: withLocale("/edit/find-replace"), label: "Edit: Find & replace" },
  ];

  const generateItems: NavItem[] = [
    { href: withLocale("/generate/quotes"), label: "Generate: Quotes" },
    { href: withLocale("/generate/lorem-ipsum"), label: "Generate: Lorem ipsum" },
    { href: withLocale("/generate/passwords"), label: "Generate: Passwords" },
  ];

  const switchLocale = (nextLocale: string) => {
    if (!supportedLocales.includes(nextLocale as never)) return;
    setLocaleCookie(nextLocale);
    const nextPath = `/${nextLocale}${pathnameNoLocale === "/" ? "/tools" : pathnameNoLocale}`;
    const query = searchParams?.toString();
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  const isChangeCaseActive =
    pathnameNoLocale === "/sentence-case" ||
    pathnameNoLocale === "/lowercase" ||
    pathnameNoLocale === "/uppercase" ||
    pathnameNoLocale === "/title-case" ||
    pathnameNoLocale === "/camel-case";
  const isEditActive = pathnameNoLocale.startsWith("/edit/");
  const isGenerateActive = pathnameNoLocale.startsWith("/generate/");

  return (
    <header className="relative z-30">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 pt-6 sm:px-6">
        <Link
          href={withLocale("/tools")}
          className="flex items-center gap-2"
          aria-label={t("nav.home", "Home")}
        >
          <span className="font-display text-xl font-semibold leading-none tracking-wide text-slate-900 dark:text-tbo-text sm:text-2xl">
            {siteData.slug}
          </span>
        </Link>

        <nav
          aria-label="Tool navigation"
          className="hidden items-center gap-1 sm:flex"
        >
          <div className="group">
            <DropdownNav
              title={t("nav.changeCase", "Change Case")}
              items={changeCaseItems}
              isActive={isChangeCaseActive}
            />
          </div>
          <div className="group">
            <DropdownNav
              title={t("nav.edit", "Edit")}
              items={editItems}
              isActive={isEditActive}
            />
          </div>
          <div className="group">
            <DropdownNav
              title={t("nav.generate", "Generate")}
              items={generateItems}
              isActive={isGenerateActive}
            />
          </div>
        </nav>

        <details className="relative sm:hidden">
          <summary className="list-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors duration-fast ease-out hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:hover:bg-tbo-panel">
            {t("nav.menu", "Menu")}
          </summary>
          <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-tbo-border dark:bg-tbo-surface">
            <div className="p-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-tbo-muted">
                {t("nav.changeCase", "Change Case")}
              </div>
              <div className="mt-1 space-y-1">
                {changeCaseItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-900 hover:bg-slate-100 dark:text-tbo-text dark:hover:bg-tbo-panel"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 p-2 dark:border-tbo-border">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-tbo-muted">
                {t("nav.edit", "Edit")}
              </div>
              <div className="mt-1 space-y-1">
                {editItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-900 hover:bg-slate-100 dark:text-tbo-text dark:hover:bg-tbo-panel"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 p-2 dark:border-tbo-border">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-tbo-muted">
                {t("nav.generate", "Generate")}
              </div>
              <div className="mt-1 space-y-1">
                {generateItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-900 hover:bg-slate-100 dark:text-tbo-text dark:hover:bg-tbo-panel"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </details>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMode}
            role="switch"
            aria-checked={isDark}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 p-1 shadow-inner transition-colors duration-fast ease-out dark:bg-tbo-border focus:outline-none focus-visible:ring-2 focus-visible:ring-tbo-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-tbo-bg motion-reduce:transition-none"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-between px-2"
              aria-hidden="true"
            >
              <BsSunFill
                className={cn(
                  "h-3.5 w-3.5 transition-opacity duration-fast ease-out motion-reduce:transition-none",
                  isDark
                    ? "opacity-40 text-slate-600"
                    : "opacity-100 text-amber-500"
                )}
              />
              <BsMoonStarsFill
                className={cn(
                  "h-3.5 w-3.5 transition-opacity duration-fast ease-out motion-reduce:transition-none",
                  isDark ? "opacity-100 text-sky-200" : "opacity-40 text-slate-500"
                )}
              />
            </span>

            <span
              className={cn(
                "pointer-events-none absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform duration-normal ease-out dark:bg-tbo-panel motion-reduce:transition-none",
                isDark ? "translate-x-6" : "translate-x-0"
              )}
              aria-hidden="true"
            >
              <span className="relative h-3.5 w-3.5">
                <BsSunFill
                  className={cn(
                    "absolute inset-0 h-3.5 w-3.5 text-amber-500 transition-opacity duration-fast ease-out motion-reduce:transition-none",
                    isDark ? "opacity-0" : "opacity-100"
                  )}
                />
                <BsMoonStarsFill
                  className={cn(
                    "absolute inset-0 h-3.5 w-3.5 text-sky-300 transition-opacity duration-fast ease-out motion-reduce:transition-none",
                    isDark ? "opacity-100" : "opacity-0"
                  )}
                />
              </span>
            </span>
          </button>

          <label className="sr-only" htmlFor="tbo-locale">
            Language
          </label>
          <select
            id="tbo-locale"
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors duration-fast ease-out hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-tbo-border dark:bg-tbo-panelSoft dark:text-tbo-text dark:hover:bg-tbo-panel"
            aria-label="Language"
            title="Language"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
          </select>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mt-4 h-px bg-slate-200/80 dark:bg-tbo-border/80" />
      </div>
    </header>
  );
}
