import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Alert from "./components/Alert";
import TextForm from "./components/TextForm";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Script from "@gumgum/react-script-tag";

import "./App.css";

const App = () => {
  const [mode, setMode] = useState("light"); // Handles the state of dark mode
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // toggleMood() function - STARTS
  function toggleMood() {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#18191A";
      showAlert("Dark mode has been enabled.", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled.", "success");
    }
  }
  // toggleMood() function - ENDS
  return (
    <>
      {/* Toggle mode Switch - STARTS */}
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onClick={toggleMood}
        />
      </div>
      {/* Toggle mode Switch - ENDS */}
      <Navbar mode={mode} />
      <ScrollToTop />
      <Alert alert={alert} />
      <div className="container-lg">
        <TextForm mode={mode} showAlert={showAlert} />
        {/* ABOUT SECTION STARTS */}
        <div className="my-5">
          <About mode={mode} showAlert={showAlert} />
        </div>
        {/* ABOUT SECTION ENDS */}
        <hr className={`text-${mode === "dark" ? "light" : "dark"}`} />
        {/* CONTACT US SECTION STARTS */}
        <div className="my-5">
          <ContactUs mode={mode} showAlert={showAlert} />
        </div>
        {/* CONTACT US SECTION ENDS */}
      </div>
      {/* SSL SECURITY SEAL STARTS */}
      <div className="siteseal">
        <span id="siteseal">
          <Script
            async
            type="text/javascript"
            src="https://seal.godaddy.com/getSeal?sealID=HMgNcG9mIWiSb6zRMRwW1XQgZfKgyFTokjgC5k7nSfBdfUJiOrMYyj1fOcuL"
          ></Script>
        </span>
      </div>
      {/* SSL SECURITY SEAL ENDS */}

      {/* FOOTER STARTS */}
      <div className="pt-3">
        <Footer />
      </div>
      {/* FOOTER ENDS */}
    </>
  );
};

export default App;
