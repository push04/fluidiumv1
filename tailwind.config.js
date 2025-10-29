
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1F77B4' },
        secondary: { DEFAULT: '#FF7F0E' },
        accent: { DEFAULT: '#2CA02C' },
        purple: { DEFAULT: '#9467BD' },
        bg: { light: '#F8FAFC', dark: '#0B1220' },
        card: { light: '#FFFFFF', dark: '#0F172A' },
        focus: '#F59E0B'
      },
      boxShadow: { 'soft': '0 12px 30px rgba(0,0,0,0.12)' }
    }
  },
  plugins: [],
}
