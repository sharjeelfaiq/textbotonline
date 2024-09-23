import React, { memo } from "react";

function handleShareButton() {
  if (!navigator.onLine) {
    alert("You are offline. Please connect to the internet to share.");
    return;
  }

  if (navigator.share) {
    navigator
      .share({
        url: "http://textbotonline.netlify.app",
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
    <footer
      id="sticky-footer"
      className={`flex-shrink-0 py-3 mt-4 ${
        isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container text-center">
        <small>
          &copy;{" "}
          <a
            href="https://www.textbotonline.com"
            className={`text-${
              isDarkMode ? "light" : "dark"
            } text-decoration-none`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Textbotonline
          </a>
        </small>{" "}
        |{" "}
        {canShare && (
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            title="Share this website to help others..."
            onClick={handleShareButton}
            aria-label="Share this website"
          >
            Share{" "}
            <i
              className={`bi bi-share text-${isDarkMode ? "light" : "dark"}`}
            />
          </button>
        )}
      </div>
    </footer>
  );
});

export default Footer;
