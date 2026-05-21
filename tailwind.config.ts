import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bark: {
          50: "#f8f4ee",
          100: "#efe4d5",
          300: "#d2aa7c",
          500: "#9b6438",
          700: "#5e3a24",
          900: "#2d1b12"
        },
        moss: {
          50: "#eef8ef",
          100: "#d9eedb",
          300: "#8fcf95",
          500: "#4d9b59",
          700: "#2f6338",
          900: "#19351f"
        },
        river: {
          50: "#edf7fb",
          100: "#d6edf5",
          300: "#80c7dc",
          500: "#3290b3",
          700: "#236278",
          900: "#143746"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(20, 35, 30, 0.12)"
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(.94)", opacity: "0.45" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        pop: "pop 180ms ease-out",
        drift: "drift 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
