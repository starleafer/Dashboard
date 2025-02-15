import type { Config } from "tailwindcss";

const dark = "#111827";
const light = "#eeebeb";
const darkComponent = "#172135";
const lightComponent = "white";
const shade = "#6a717f";
const primary = "#40a4ff";
const primaryDark = "#20517f";
const warning = "#f8a65b";
const warningDark = "#946336";
const danger = "#f23838";
const dangerDark = "#731a1a";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark,
        primary,
        primaryDark,
        warning,
        warningDark,
        danger,
        dangerDark,
      },
      backgroundColor: {
        "light-bg": light,
        "light-primary": primary,
        "light-component": lightComponent,
        "dark-bg": dark,
        "dark-primary": primaryDark,
        "dark-component": darkComponent,
      },
      textColor: {
        "light-text": light,
        "primary": primary,
        "shade": shade,
        "dark-text": "#FFFFFF",
        "dark-primary": primaryDark,
        "light-component": lightComponent,
        "dark-component": darkComponent,
      },
      gridTemplateRows: {
        "7": "repeat(7, minmax(0, 1fr))",
        "8": "repeat(8, minmax(0, 1fr))",
      },
      borderColor: {
        "light-border": "#9E9E9E",
        "dark-border": "#FFFFFF",
        "light-component": lightComponent,
        "dark-component": darkComponent,
        "light-primary": primary,
        "dark-primary": primaryDark,
      },
    },
  },
  plugins: [],
};

export default config;