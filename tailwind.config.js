
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#f59e0b',
        surface: { light: '#ffffff', dark: '#0b1220' }
      },
      boxShadow: {
        soft: '0 12px 30px rgba(0,0,0,0.12)'
      }
    }
  },
  plugins: []
}
