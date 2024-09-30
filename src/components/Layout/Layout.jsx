// Layout.js
import { useCallback, useEffect, useState } from "react";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Alert from "../Utils/Alert";
import ScrollToTop from "../Utils/ScrollToTop";
import { useTheme } from "../../context/ThemeContext"; // Adjust the import path as needed

import "../../css/Layout.css";

const Layout = () => {
  const { mode, toggleMode } = useTheme();
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 500);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "#18191A" : "white";
  }, [mode]);

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onChange={toggleMode}
          checked={mode === "dark"}
        />
      </div>
      <Header mode={mode} />
      <ScrollToTop />
      <Alert alert={alert} />
      <div className="container-lg">
        <Main mode={mode} showAlert={showAlert} />
        <div className="my-5">
          <About mode={mode} showAlert={showAlert} />
        </div>
        <hr className={`text-${mode === "dark" ? "light" : "dark"}`} />
      </div>
      <div className="pt-3">
        <Footer mode={mode} />
      </div>
    </>
  );
};

export default Layout;
