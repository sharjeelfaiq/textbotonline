"use client";

import React from "react";
import { createContext, useCallback, useEffect, useState } from "react";

const ThemeContext = createContext({
  mode: "dark",
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Keep the initial server and client render consistent to avoid hydration mismatches.
  const [mode, setMode] = useState("dark");

  const toggleMode = useCallback(() => {
    setMode((previousMode) => {
      const newMode = previousMode === "light" ? "dark" : "light";
      try {
        localStorage.setItem("mode", newMode);
      } catch (e) {}
      try {
        document.documentElement.dataset.theme = newMode;
      } catch (e) {}
      try {
        document.documentElement.classList.toggle("dark", newMode === "dark");
      } catch (e) {}
      return newMode;
    });
  }, []);

  useEffect(() => {
    let initialMode = "dark";
    try {
      const storedMode = localStorage.getItem("mode");
      if (storedMode === "light" || storedMode === "dark") {
        initialMode = storedMode;
      }
    } catch (e) {}
    setMode(initialMode);
    try {
      document.documentElement.dataset.theme = initialMode;
    } catch (e) {}
    try {
      document.documentElement.classList.toggle("dark", initialMode === "dark");
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.dataset.theme = mode;
    } catch (e) {}
    try {
      document.documentElement.classList.toggle("dark", mode === "dark");
    } catch (e) {}
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return React.useContext(ThemeContext);
};
