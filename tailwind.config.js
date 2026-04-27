/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(-4%, -6%, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(4%, 6%, 0) rotate(180deg)" },
        },
      },
      animation: {
        aurora: "aurora 12s ease-in-out infinite",
        "aurora-slow": "aurora 20s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
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
        sans: ["var(--font-sans)", "Roboto", ...defaultTheme.fontFamily.sans],
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        page: "500ms",
      },
    },
  },
  plugins: [],
};
