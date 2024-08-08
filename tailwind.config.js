/** @type {import('tailwindcss').Config} */
const dotenv = require('dotenv');
dotenv.config();

const resto = process.env.RESTO;

const colors = resto === 'PETITE-TERRE' ? {
  green: { DEFAULT: '#ab511a', hover: '#7b4212' },
  red: { DEFAULT: '#539592', hover: '#40807d' }
} : {
  green: { DEFAULT: '#539592', hover: '#40807d' },
  red: { DEFAULT: '#ab511a', hover: '#7b4212' }
};

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '15px',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    colors: {
      body: '#caaa5e',
      white: '#fff',
      grey: '#888888',
      orange: {
        DEFAULT: '#f2994a',
        hover: '#da863c',
      },
      outline: '#f1f1f1',
      pink: '#ffa5a5',
      black: { DEFAULT: '#273029', heavy: '#1b211c' },
      ...colors,
    },
    extend: {
      fontFamily: {
        lora: ['var(--font-lora)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        hero: resto === 'PETITE-TERRE' ? 'url(/hero/bg2.png)' : 'url(/hero/bg.png)',
        menu: resto === 'PETITE-TERRE' ? 'url(/menu/bg2.png)' : 'url(/menu/bg.png)',
        reservation: resto === 'PETITE-TERRE' ? 'url(/reservation/bg2.png)' : 'url(/reservation/bg.png)',
        footer: resto === 'PETITE-TERRE' ? 'url(/footer/bg2.png)' : 'url(/footer/bg.png)',
      },
      boxShadow: {
        primary: '40px 4px 40px 0px rgba(68, 68, 68, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
