
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4338CA', dark: '#312E81' }, /* indigo-600/900 */
        secondary: { DEFAULT: '#7C3AED', dark: '#5B21B6' }, /* violet */
        accent: { DEFAULT: '#EC4899', dark: '#BE185D' },
        bg: { light: '#F8FAFC', dark: '#0B1220' },
        card: { light: '#FFFFFF', dark: '#0F172A' },
        focus: '#F59E0B'
      },
      boxShadow: { 'soft': '0 12px 30px rgba(0,0,0,0.12)' },
      outlineWidth: { 3: '3px' }
    }
  },
  plugins: [],
}
