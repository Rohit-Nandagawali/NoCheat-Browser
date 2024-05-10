/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Manrope: ['MuseoModerno', 'sans-serif'],
        Orbitron: ['Orbitron', 'consolas'],
      },
    },
  },
  plugins: [],
}

