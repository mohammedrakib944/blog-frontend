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
          primary: "#0094FF",
          secondary: "#0d1117",
          accent: "#d8d8d8",
          neutral: "#717066",
          "base-100": "#FFFFFF",
          info: "#58a6ff",
          success: "#21e205",
          warning: "#ef4444",
          error: "#21262d",
        },
      },
    ],
  },
};
export default config;
