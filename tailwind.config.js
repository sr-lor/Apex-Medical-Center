/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apex: {
          gold: "#E9CD7E",
          "gold-dark": "#DDC57A",
          "gold-deep": "#C5A856",
          "gold-light": "#FDFBF4",
          navy: "#151112",
          "navy-dark": "#0A0A0C",
          charcoal: "#151112",
          slate: "#1E293B",
          body: "#334155",
          bg: "#FDFBF7",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["Cairo", "Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(21, 17, 18, 0.12)",
        gold: "0 8px 25px -5px rgba(233, 205, 126, 0.4)",
        card: "0 10px 30px -5px rgba(21, 17, 18, 0.06)",
        "card-hover": "0 20px 40px -10px rgba(233, 205, 126, 0.25)",
      },
    },
  },
  plugins: [],
};
