// Layout.js
import { useCallback, useRef, useState } from "react";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Alert from "../Utils/Alert";
import ScrollToTop from "../Utils/ScrollToTop";
import { useTheme } from "../../context/ThemeContext"; // Adjust the import path as needed

const Layout = () => {
  const { mode, toggleMode } = useTheme();
  const [alert, setAlert] = useState(null);
  const dismissTimeoutRef = useRef(null);

  const dismissAlert = useCallback(() => {
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    dismissTimeoutRef.current = null;
    setAlert(null);
  }, []);

  const showAlert = useCallback((message, type) => {
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    setAlert({ msg: message, type });
    dismissTimeoutRef.current = setTimeout(() => {
      dismissTimeoutRef.current = null;
      setAlert(null);
    }, 1500);
  }, []);

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
      <Alert alert={alert} onDismiss={dismissAlert} />
      <div className="container-lg">
        <Main mode={mode} showAlert={showAlert} />
        <div className="my-5">
          <About mode={mode} showAlert={showAlert} />
        </div>
      </div>
      <div className="pt-3">
        <Footer mode={mode} />
      </div>
    </>
  );
};

export default Layout;
