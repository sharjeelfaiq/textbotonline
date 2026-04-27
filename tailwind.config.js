/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        tbo: {
          bg: "#17191B",
          surface: "#1E2124",
          panel: "#23272A",
          panelSoft: "#2B3034",
          border: "#343A40",
          muted: "#A8B0B8",
          text: "#E9ECEF",
          accent: "#4DA3FF",
          danger: "#D9534F",
        },
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
        display: ["Oswald", "Roboto", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      boxShadow: {
        tbo: "0 10px 30px rgba(0,0,0,0.55)",
        "tbo-inset": "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};
