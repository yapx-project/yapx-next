import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary_gray: "#F3F4F6",
        input_border: "#D1D5DB",
        primary_blue: "#2563EB",
        gray_title_dark: "#6B7280",
        gray_title_light: "#9CA3AF"
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        roboto: ["var(--font-roboto)"]
      }
    },
  },
  plugins: [],
} satisfies Config;
