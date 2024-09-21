import React from "react";
import "../../css/Header.css";

const Header = (props) => {
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
        </div>
      </nav>
    </>
  );
};

export default Header;
