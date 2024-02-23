import React from "react";
import "../css/Navbar.css";

const Navbar = (props) => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand mx-2" href="/">
            <h4
              className="navbar-title"
              style={{
                fontFamily: "cursive",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
              }}
            >
              TBO
            </h4>
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-components">
            <li
              className={`text-${
                props.mode === "light" ? "dark" : "light"
              } nav-item mx-3`}
              onClick={scrollToBottom}
              style={{ cursor: "pointer" }}
            >
              Contact Us
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
