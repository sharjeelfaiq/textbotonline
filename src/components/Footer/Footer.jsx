import React from "react";
import "../css/Footer.css";

function Footer() {
  const handleShareButton = () => {
    navigator
      .share({
        url: `http://textbotonline.netlify.app`,
      })
      .then(() => {
        console.log("Sharing successfull");
      })
      .catch(() => {
        console.log("Sharing failed");
      });
  };
  return (
    <footer
      id="sticky-footer"
      className={`flex-shrink-0 py-3 mt-4 bg-dark text-white-50 footer`}
    >
      <div className="container text-center">
        <small>
          Copyright &copy;
          <a
            href="https://www.textbotonline.com"
            style={{ textDecoration: "none", color: "#909294" }}
          >
            Textbotonline
          </a>
        </small>{" "}
        |{" "}
        <span
          title="Share this website to help others..."
          onClick={handleShareButton}
          style={{ cursor: "pointer" }}
        >
          Share <i className="bi bi-share bottom-btns-icons" />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
