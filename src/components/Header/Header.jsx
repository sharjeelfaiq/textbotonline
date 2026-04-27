import { siteData } from "../About/AboutData";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const Header = ({ mode, onToggleTheme }) => {
  const { slug } = siteData;
  const isDark = mode === "dark";

  return (
    <header className="relative z-30">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-6 sm:px-6">
        <a href="/" className="flex items-center gap-2" aria-label="Home">
          <span className="font-display text-xl font-semibold leading-none tracking-wide text-slate-900 dark:text-tbo-text sm:text-2xl">
            {slug}
          </span>
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          role="switch"
          aria-checked={isDark}
          className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 p-1 shadow-inner transition-colors dark:bg-tbo-border focus:outline-none focus-visible:ring-2 focus-visible:ring-tbo-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-tbo-bg"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-between px-2"
            aria-hidden="true"
          >
            <BsSunFill
              className={`h-3.5 w-3.5 transition-opacity ${
                isDark ? "opacity-40 text-slate-600" : "opacity-100 text-amber-500"
              }`}
            />
            <BsMoonStarsFill
              className={`h-3.5 w-3.5 transition-opacity ${
                isDark ? "opacity-100 text-sky-200" : "opacity-40 text-slate-500"
              }`}
            />
          </span>

          <span
            className={`pointer-events-none absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ease-out dark:bg-tbo-panel ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
            aria-hidden="true"
          >
            <span className="relative h-3.5 w-3.5">
              <BsSunFill
                className={`absolute inset-0 h-3.5 w-3.5 text-amber-500 transition-opacity ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
              />
              <BsMoonStarsFill
                className={`absolute inset-0 h-3.5 w-3.5 text-sky-300 transition-opacity ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
