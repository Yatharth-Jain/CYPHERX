import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "light-around": "0px 3px 8px 1px rgb(255 255 255 / 20%)",
        "dark-around": "0px 3px 8px 1px rgb(0 0 0 / 20%)",
      },
      colors: {
        heading: "#8D8D8D",
      },
    },
  },
  plugins: [],
};
export default config;
