const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {

      fontFamily: {
        chapri: ['Lobster', 'cursive'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), require('flowbite/plugin')],
  corePlugins: {
    preflight: true,
  },
}