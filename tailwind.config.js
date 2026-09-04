/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#073B4C',
          800: '#0F4C5C',
        },
        teal: {
          700: '#0F766E',
          600: '#0D9488',
          500: '#14B8A6',
          400: '#20B2AA',
        },
        sand: {
          100: '#FDFBF7',
          200: '#F4EBD0',
          300: '#E6D7AB',
        },
        coral: {
          500: '#FF7F50',
          600: '#E05A2B',
        }
      }
    },
  },
  plugins: [],
}
