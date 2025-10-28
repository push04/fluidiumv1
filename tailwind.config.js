/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark: '#312e81',
        },
        secondary: {
          DEFAULT: '#9333ea',
          dark: '#6b21a8',
        },
        accent: {
          DEFAULT: '#ec4899',
          dark: '#be185d',
        },
        background: {
          light: '#f9fafb',
          dark: '#1e293b',
        },
        card: {
          light: '#ffffff',
          dark: '#334155',
        },
      },
    },
  },
  plugins: [],
};