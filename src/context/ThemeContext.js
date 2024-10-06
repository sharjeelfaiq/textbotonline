import React from "react";
import { createContext, useCallback, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );

  const toggleMode = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    document.body.style.backgroundColor =
      newMode === "dark" ? "#18191A" : "white";
  }, [mode]);

  useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "#18191A" : "white";
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
