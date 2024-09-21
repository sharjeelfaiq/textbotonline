import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ScrollToTop from "../src/components/ScrollToTop";
import Alert from "../src/components/Alert";
import Textareas from "../src/components/Textareas/Textareas";
import About from "../src/components/About";
import Footer from "../src/components/Footer";

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

  function toggleMood() {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#18191A";
      showAlert("Dark mode has been enabled.", "success");
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled.", "success");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("mode") === "dark") {
      setMode("dark");
      document.body.style.backgroundColor = "#18191A";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  }, []);

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onClick={toggleMood}
          checked={mode === "light" ? false : true}
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
        <Footer />
      </div>
      {/* FOOTER ENDS */}
    </>
  );
};

export default App;
