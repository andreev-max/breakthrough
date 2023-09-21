import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base50: "rgb(var(--base-50) / <alpha-value>)",
        base100: "rgb(var(--base-100) / <alpha-value>)",
        base200: "rgb(var(--base-200) / <alpha-value>)",
        base300: "rgb(var(--base-300) / <alpha-value>)",
        base400: "rgb(var(--base-400) / <alpha-value>)",
        base500: "rgb(var(--base-500) / <alpha-value>)",
        base600: "rgb(var(--base-600) / <alpha-value>)",
        base700: "rgb(var(--base-700) / <alpha-value>)",
        base800: "rgb(var(--base-800) / <alpha-value>)",
        base900: "rgb(var(--base-900) / <alpha-value>)",
        base950: "rgb(var(--base-950) / <alpha-value>)",

        primary50: "rgb(var(--primary-50) / <alpha-value>)",
        primary100: "rgb(var(--primary-100) / <alpha-value>)",
        primary200: "rgb(var(--primary-200) / <alpha-value>)",
        primary300: "rgb(var(--primary-300) / <alpha-value>)",
        primary400: "rgb(var(--primary-400) / <alpha-value>)",
        primary500: "rgb(var(--primary-500) / <alpha-value>)",
        primary600: "rgb(var(--primary-600) / <alpha-value>)",
        primary700: "rgb(var(--primary-700) / <alpha-value>)",
        primary800: "rgb(var(--primary-800) / <alpha-value>)",
        primary900: "rgb(var(--primary-900) / <alpha-value>)",
        primary950: "rgb(var(--primary-950) / <alpha-value>)",

        error100: "rgb(var(--error-100) / <alpha-value>)",
        error200: "rgb(var(--error-200) / <alpha-value>)",
        error300: "rgb(var(--error-300) / <alpha-value>)",
        error400: "rgb(var(--error-400) / <alpha-value>)",
      },
    },
  },
  plugins: [],
} satisfies Config;
