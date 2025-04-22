/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D97706',
        secondary: '#1F1F1F',
        background: '#000000',
        card: '#121212'
      }
    },
  },
  plugins: [],
}

