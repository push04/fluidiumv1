
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
        card: { light: '#ffffff', dark: '#0b1220' }
      },
      boxShadow: { 'soft': '0 12px 30px rgba(0,0,0,0.10)' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-4px)' } }
      },
      animation: { float: 'float 3s ease-in-out infinite' }
    }
  },
  plugins: [],
}
