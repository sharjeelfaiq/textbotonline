"use client";

import { useCallback, useRef, useState } from "react";
import Alert from "@/src/components/Utils/Alert";
import About from "@/src/components/About/About";
import Main from "@/src/components/Main/Main";
import ScrollToTop from "@/src/components/Utils/ScrollToTop";
import { useTheme } from "@/src/context/ThemeContext";

export default function ToolSuite() {
  const { mode } = useTheme();
  const [alert, setAlert] = useState<{ msg: string; type: string } | null>(
    null
  );
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissAlert = useCallback(() => {
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    dismissTimeoutRef.current = null;
    setAlert(null);
  }, []);

  const showAlert = useCallback((message: string, type: string) => {
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    setAlert({ msg: message, type });
    dismissTimeoutRef.current = setTimeout(() => {
      dismissTimeoutRef.current = null;
      setAlert(null);
    }, 1500);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Alert alert={alert} onDismiss={dismissAlert} />
      <Main mode={mode} showAlert={showAlert} />
      <div className="mt-10">
        <About mode={mode} showAlert={showAlert} />
      </div>
    </>
  );
}
