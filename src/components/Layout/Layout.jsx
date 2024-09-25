import { useCallback, useEffect, useState } from "react";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import Textareas from "../Textareas/Textareas.jsx";
import Alert from "../Utils/Alert.jsx";
import ScrollToTop from "../Utils/ScrollToTop.jsx";

import "../../css/Layout.css";

const Layout = () => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 500);
  }, []);

  const toggleMode = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    document.body.style.backgroundColor =
      newMode === "dark" ? "#18191A" : "white";
    showAlert(
      `${
        newMode.charAt(0).toUpperCase() + newMode.slice(1)
      } mode has been enabled.`,
      "success"
    );
  }, [mode, showAlert]);

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
        <Textareas mode={mode} showAlert={showAlert} />
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
