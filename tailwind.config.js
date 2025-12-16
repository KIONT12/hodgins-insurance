/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          500: '#1a1a1a',
          600: '#0a0a0a',
          700: '#000000',
        },
        accent: {
          500: '#10b981',
          600: '#059669',
        },
        navy: {
          800: '#1a1a1a',
          900: '#0a0a0a',
          950: '#000000',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        }
      }
    },
  },
  plugins: [],
}

