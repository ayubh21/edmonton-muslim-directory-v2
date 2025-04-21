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
        violet: "#78586F",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  //   plugins: [require("tailwindcss-animate")],
} satisfies Config;
