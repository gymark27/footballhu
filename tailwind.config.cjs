/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Barlow"', "system-ui", "sans-serif"],
        display: ['"Barlow Condensed"', '"Barlow"', "sans-serif"],
      },
      borderColor: {
        "white/8": "rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
