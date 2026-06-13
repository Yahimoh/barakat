import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#0F5132",
          light: "#2E7D5B",
          deep: "#0A3A23",
        },
        crimson: {
          DEFAULT: "#A91B1F",
          light: "#C8323A",
        },
        gold: {
          DEFAULT: "#C8A24B",
          light: "#E1C176",
          deep: "#8C6A1F",
        },
        ivory: "#F7F1E3",
        ink: "#1B1B1B",
        navy: "#102A43",
        muted: "#6B6357",
      },
      fontFamily: {
        display: ["var(--font-vazirmatn)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 42, 67, 0.06), 0 8px 24px rgba(16, 42, 67, 0.06)",
        "card-hover":
          "0 1px 2px rgba(16, 42, 67, 0.08), 0 12px 32px rgba(16, 42, 67, 0.12)",
      },
      borderRadius: {
        arch: "50% 50% 0 0 / 18% 18% 0 0",
      },
    },
  },
  plugins: [],
};

export default config;
