"use client";

import { useCallback, useMemo, useRef, useState } from "react";

export function useTextareaTransitions(mode) {
  const [textareaBackground, setTextareaBackground] = useState({
    inputDark: "#242526",
    inputLight: "white",
    outputDark: "#242526",
    outputLight: "white",
  });

  const timeoutDuration = 280;

  const inputTimeoutsRef = useRef([]);
  const outputTimeoutsRef = useRef([]);

  const clearTimeouts = useCallback((timeoutsRef) => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  const transitionTextarea = useCallback(
    (area, darkColor, lightColor) => {
      setTextareaBackground((prevState) => ({
        ...prevState,
        [area]: darkColor,
      }));
      const timeout = setTimeout(() => {
        setTextareaBackground((prevState) => ({
          ...prevState,
          [area]: lightColor,
        }));
      }, timeoutDuration);

      return timeout;
    },
    [timeoutDuration]
  );

  const transitionInputTextarea = useCallback(() => {
    clearTimeouts(inputTimeoutsRef);
    const a = transitionTextarea("inputDark", "#CED4DA", "#242526");
    const b = transitionTextarea("inputLight", "#CED4DA", "white");
    inputTimeoutsRef.current = [a, b];
  }, [clearTimeouts, transitionTextarea]);

  const transitionOutputTextarea = useCallback(() => {
    clearTimeouts(outputTimeoutsRef);
    const a = transitionTextarea("outputDark", "#CED4DA", "#242526");
    const b = transitionTextarea("outputLight", "#CED4DA", "white");
    outputTimeoutsRef.current = [a, b];
  }, [clearTimeouts, transitionTextarea]);

  const createTextAreaStyle = useCallback(
    (isDark, darkBackgroundColor, lightBackgroundColor) => ({
      width: "100%",
      backgroundColor: isDark ? darkBackgroundColor : lightBackgroundColor,
      color: isDark ? "white" : "black",
      textAlign: "left",
    }),
    []
  );

  const isDarkMode = mode === "dark";

  const inputTextAreaStyle = useMemo(
    () =>
      createTextAreaStyle(
        isDarkMode,
        textareaBackground.inputDark,
        textareaBackground.inputLight
      ),
    [
      createTextAreaStyle,
      isDarkMode,
      textareaBackground.inputDark,
      textareaBackground.inputLight,
    ]
  );

  const outputTextAreaStyle = useMemo(
    () =>
      createTextAreaStyle(
        isDarkMode,
        textareaBackground.outputDark,
        textareaBackground.outputLight
      ),
    [
      createTextAreaStyle,
      isDarkMode,
      textareaBackground.outputDark,
      textareaBackground.outputLight,
    ]
  );

  return {
    inputTextAreaStyle,
    outputTextAreaStyle,
    transitionInputTextarea,
    transitionOutputTextarea,
  };
}
