/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cyber: ["Syncopate", "sans-serif"],
        body: ["Exo 2", "sans-serif"],
      },
    },
  },
  plugins: [],
}