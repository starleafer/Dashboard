import type { Config } from "tailwindcss";

const dark = "#111827";
const primary = "#40a4ff";
const primaryDark = "#20517f";
const warning = "#f8a65b";
const warningDark = "#946336";
const danger = "#f23838";
const dangerDark = "#731a1a";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',  
  theme: {
    extend: {
      colors: {
        dark: dark,
        primary: primary,
        primaryDark: primaryDark,
        warning: warning,
        warningDark: warningDark,
        danger: danger,
        dangerDark: dangerDark,
      },
      backgroundColor: {
        'light-bg': '#ffffff',
        'light-primary': primary,
        
        'dark-bg': dark,
        'dark-primary': primaryDark,
      },
      textColor: {
        'light-text': '#9E9E9E',
        'light-primary': primary,
        
        'dark-text': '#FFFFFF',
        'dark-primary': primaryDark,
      },
      gridTemplateRows: {
        "7": "repeat(7, minmax(0, 1fr))",
        "8": "repeat(8, minmax(0, 1fr))",
      },
      borderColor: {
        'light-border': '#9E9E9E',
        'dark-border': '#FFFFFF',
      },
    },
  },
  plugins: [],
} satisfies Config;