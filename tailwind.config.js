
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4f46e5', dark: '#312e81' },
        secondary: { DEFAULT: '#9333ea', dark: '#6b21a8' },
        accent: { DEFAULT: '#ec4899', dark: '#be185d' },
        background: { light: '#f9fafb', dark: '#0f172a' },
        card: { light: '#ffffff', dark: '#111826' }
      },
      boxShadow: { 'soft': '0 10px 25px rgba(0,0,0,0.08)' }
    }
  },
  plugins: [],
}
