import { memo } from "react";
import { siteData } from "../About/AboutData";
import { BsShare } from "react-icons/bs";

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
  const canShare = typeof navigator !== "undefined" && navigator.share;

  return (
    <footer className="border-t border-slate-200 py-8 text-sm dark:border-tbo-border/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-4 text-center text-slate-600 dark:text-tbo-muted sm:px-6">
        <span>&copy;</span>
        <a
          href="https://www.textbotonline.com"
          className="font-medium text-slate-900 hover:underline dark:text-tbo-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Textbotonline
        </a>

        {canShare && (
          <>
            <span className="opacity-60">|</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 font-medium text-slate-900 hover:underline dark:text-tbo-text"
              title="Share this website to help others..."
              onClick={handleShareButton}
              aria-label="Share this website"
            >
              Share <BsShare className="text-sm opacity-80" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </footer>
  );
});

export default Footer;
