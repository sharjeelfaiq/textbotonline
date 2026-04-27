"use client";

import { useCallback, useRef, useState } from "react";
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
      <div className="min-h-screen bg-white/85 text-slate-900 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:bg-tbo-bg/70 dark:text-tbo-text dark:supports-[backdrop-filter]:bg-tbo-bg/55">
        <Header mode={mode} onToggleTheme={toggleMode} />
        <ScrollToTop />

        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Alert alert={alert} onDismiss={dismissAlert} />
          <Main mode={mode} showAlert={showAlert} />
        </div>

        <Footer mode={mode} />
      </div>
    </>
  );
};

export default Layout;
