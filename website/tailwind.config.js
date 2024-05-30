// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bespoke': ['BespokeSerif', 'sans-serif'], // Custom font family
      },
      fontWeight: {
        'light': 300,
        'regular': 400,
        'medium': 500,
        'bold': 700,
        'extrabold': 800,
      },
      colors: {
        'custom-blue': "#00006e",
      },
    },
  },
  plugins: [],
}
