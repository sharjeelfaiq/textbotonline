"use client";

import React from "react";
import { createContext, useCallback, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => {
      if (typeof window === "undefined") return "dark";
      return localStorage.getItem("mode") || "dark";
    }
  );

  const toggleMode = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", newMode);
      document.documentElement.dataset.theme = newMode;
    }
  }, [mode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = mode;
    }
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
