import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        "schiphol-blue": {
          50: "#e6e6f5",
          100: "#cccceb",
          200: "#9999d6",
          300: "#6666c2",
          400: "#3333ad",
          500: "#141251",
          600: "#10103d",
          700: "#0c0c2a",
          800: "#080819",
          900: "#04040c",
        },
        "dark-red": {
          50: "#fde8e8", // Lightest
          100: "#fbd1d1",
          200: "#f7a3a3",
          300: "#f37575",
          400: "#ef4747",
          500: "#d0021b", // Base color
          600: "#a90116",
          700: "#820110",
          800: "#5a000b",
          900: "#330005", // Darkest
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
