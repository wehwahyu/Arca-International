import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";
require('dotenv').config()

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: process.env.VITE_PRIMARY_COLOR,
        second: process.env.VITE_SECOND_COLOR,
        sidebar: process.env.VITE_SIDEBAR_COLOR,
      },
    },
  },
  plugins: [
    forms,
    typography,
    aspectRatio,
  ],
}
