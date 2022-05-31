import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Alert from "./components/Alert";
import TextForm from "./components/TextForm";
import Footer from "./components/Footer";

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
      <div>
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
        {/* ROUTING STARTS */}
        <div className="container-lg routes-div">
          <TextForm mode={mode} showAlert={showAlert} />
        </div>
        {/* ROUTING ENDS */}
        <Footer />
      </div>
    </>
  );
};

export default App;
