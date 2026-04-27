"use client";

import Layout from "@/src/components/Layout/Layout";
import { ThemeProvider } from "@/src/context/ThemeContext";

export default function AppClient() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
