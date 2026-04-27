import { siteData } from "../About/AboutData";

const Header = ({ mode, onToggleTheme }) => {
  const { slug } = siteData;
  const isDark = mode === "dark";

  return (
    <header className="relative z-30">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-6 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-wide text-slate-900 dark:text-tbo-text">
            {slug}
          </span>
        </a>

        <button
          type="button"
          onClick={onToggleTheme}
          className="relative inline-flex h-5 w-10 items-center rounded-full bg-slate-300 shadow-inner transition dark:bg-tbo-border"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full shadow transition-transform ${
              isDark
                ? "translate-x-5 bg-tbo-accent"
                : "translate-x-0 bg-white"
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
