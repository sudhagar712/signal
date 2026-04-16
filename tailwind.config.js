/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'signal-amber': '#F5A623',
        'signal-amber-dark': '#B5740F',
        dark: {
          900: '#0A0A0A',
          800: '#141414',
          700: '#1F1F1F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #F5A62333 0deg, #050505 180deg, #F5A62333 360deg)',
      }
    },
  },
  plugins: [],
}
