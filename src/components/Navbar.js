import React from "react";
// import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar(props) {
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
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Text
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Numbers">
                  Numbers
                </Link>
              </li>
            </ul> */}
          {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          {/* </div> */}
          {/* <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
