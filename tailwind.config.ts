import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)",
        ring: "var(--color-ring)",
      },
    },
  },
  plugins: [],
};

export default config;
