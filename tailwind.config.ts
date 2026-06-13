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
        /**
         * Persian-mosque palette. The legacy token names are kept so existing
         * utility classes keep working, but their values now follow the
         * blue-turquoise tilework of Isfahan / Shiraz mosques.
         *
         * `emerald` = the primary turquoise (firouzeh); `navy` = lapis/azure.
         */
        // Primary brand — Persian turquoise (firouzeh)
        emerald: {
          DEFAULT: "#0F7C8C",
          light: "#17A6B8",
          deep: "#0A4E5A",
        },
        // Signature turquoise tile colour, used for glazes and glows
        turquoise: {
          DEFAULT: "#17A6B8",
          light: "#46C7D6",
          deep: "#0E7C8B",
        },
        // Lapis / cobalt blue of dome interiors
        lapis: {
          DEFAULT: "#1E5BA8",
          light: "#3F7FD0",
          deep: "#123C75",
        },
        // Deep azure night-sky blue for dome backgrounds
        navy: {
          DEFAULT: "#0B2E5A",
          deep: "#071F40",
        },
        azure: {
          DEFAULT: "#0B2E5A",
          deep: "#071F40",
        },
        // Saffron gold of the muqarnas and calligraphy bands
        gold: {
          DEFAULT: "#D4A537",
          light: "#ECC971",
          deep: "#9C7320",
        },
        // Pomegranate / Persian rose accent
        crimson: {
          DEFAULT: "#B23A36",
          light: "#CC524C",
        },
        ivory: "#F6F1E4",
        ink: "#13262E",
        muted: "#5B6B70",
      },
      fontFamily: {
        display: ["var(--font-vazirmatn)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 46, 90, 0.06), 0 8px 24px rgba(11, 46, 90, 0.07)",
        "card-hover":
          "0 1px 2px rgba(11, 46, 90, 0.10), 0 16px 40px rgba(11, 46, 90, 0.16)",
        glow: "0 0 0 1px rgba(212, 165, 55, 0.30), 0 14px 50px -12px rgba(23, 166, 184, 0.55)",
      },
      borderRadius: {
        arch: "50% 50% 0 0 / 18% 18% 0 0",
      },
      backgroundImage: {
        "dome-night":
          "radial-gradient(120% 90% at 50% 0%, #17A6B8 0%, #1E5BA8 38%, #0B2E5A 72%, #071F40 100%)",
        "gold-sheen":
          "linear-gradient(110deg, transparent 30%, rgba(236,201,113,0.65) 50%, transparent 70%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        sheen: {
          "0%": { backgroundPosition: "-150% 0" },
          "100%": { backgroundPosition: "250% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        twinkle: "twinkle 4.5s ease-in-out infinite",
        sheen: "sheen 3s ease-in-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
