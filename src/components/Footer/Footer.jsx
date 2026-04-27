import { memo } from "react";
import { siteData } from "../About/AboutData";

const url = siteData.url;
function handleShareButton() {
  if (!navigator.onLine) {
    alert("You are offline. Please connect to the internet to share.");
    return;
  }

  if (navigator.share) {
    navigator
      .share({
        url,
      })
      .then(() => {
        console.log("Sharing successful");
      })
      .catch((error) => {
        console.error("Sharing failed:", error);
        alert("Sharing failed. Please try again later.");
      });
  } else {
    alert("Web Share API is not supported in this browser.");
  }
}

const Footer = memo(function Footer({ mode }) {
  const isDarkMode = mode === "dark";
  const canShare = typeof navigator !== "undefined" && navigator.share;

  return (
    <footer className="border-t border-slate-200 py-6 text-sm dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-slate-600 dark:text-zinc-300 sm:flex-row sm:px-6 sm:text-left">
        <div>
          <span>&copy; </span>
          <a
            href="https://www.textbotonline.com"
            className="font-medium text-slate-900 hover:underline dark:text-zinc-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            Textbotonline
          </a>
        </div>

        {canShare && (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            title="Share this website to help others..."
            onClick={handleShareButton}
            aria-label="Share this website"
          >
            Share
            <i
              className={`bi bi-share text-base opacity-80 ${
                isDarkMode ? "text-zinc-100" : "text-slate-900"
              }`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </footer>
  );
});

export default Footer;
