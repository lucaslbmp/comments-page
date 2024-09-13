import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#F5F6F9",
        primary: "#605FA2",
        cardBg: "#ffffff",
        fgPrimary: "#8F9195",
        fgSecondary: "#7271aa",
        fgSecondaryLight: "#7777AA",
        border: "#686787",
        danger: "#ED6368",
      },
    },
  },
  plugins: [],
};
export default config;
