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
      {
        blog: {
          primary: "#0085FF",
          secondary: "#0d1117",
          // accent: "#D2C5BA",
          accent: "#d8d8d8",
          neutral: "#717066",
          // "base-100": "#EEE7D7",
          "base-100": "#FFF",
          info: "#58a6ff",
          success: "#09e841",
          warning: "#ef4444",
          error: "#21262d",
        },
      },
    ],
  },
};
export default config;
