export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#effcf9",
          100: "#d5f5ed",
          500: "#0d9488",
          600: "#0f766e",
          700: "#115e59",
          900: "#123b3a",
        },
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15,60,58,.09)",
      },
    },
  },
  plugins: [],
};