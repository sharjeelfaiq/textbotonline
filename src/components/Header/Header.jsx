import { siteData } from "../About/AboutData";

const Header = ({ mode, onToggleTheme }) => {
  const { slug } = siteData;
  const isDark = mode === "dark";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white shadow-sm">
            {slug}
          </span>
          <span className="font-display text-base font-semibold tracking-wide text-slate-900 dark:text-zinc-100">
            Textbotonline
          </span>
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          <i
            className={`bi ${isDark ? "bi-sun" : "bi-moon"} text-base opacity-80`}
            aria-hidden="true"
          />
          <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
