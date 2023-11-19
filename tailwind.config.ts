import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // "blog_dark", // first one will be the default theme
      {
        blog_light: {
          primary: "#0094FF",
          secondary: "#032041",
          accent: "#d8d8d8",
          neutral: "#717066",
          "base-100": "#FFFFFF",
          "base-200": "#FFFFFF",
          info: "#58a6ff",
          success: "#00d600",
          warning: "#ef4444",
          error: "#0b397f4d",
        },
        blog_dark: {
          primary: "#0094FF",
          secondary: "#dddddd",
          accent: "#1e232a",
          neutral: "#898c92",
          "base-100": "#0d1117",
          // "base-100": "#010409",
          "base-200": "#0d1117",
          info: "#58a6ff",
          success: "#00d600",
          warning: "#ef4444",
          error: "#1e232a",
        },
      },
    ],
  },
};
export default config;
