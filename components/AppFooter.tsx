"use client";

import Footer from "@/src/components/Footer/Footer";
import { useTheme } from "@/src/context/ThemeContext";

export default function AppFooter() {
  const { mode } = useTheme();
  return <Footer mode={mode} />;
}

