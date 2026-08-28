/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          200: '#B9C9FC',
          400: '#5C82F5',
          600: '#1149DE',
          800: '#0C33A6',
        },
        navy: {
          800: '#152945',
          900: '#0E1E36',
          950: '#081526',
          line: 'rgba(255,255,255,0.10)',
        },
        ember: {
          100: '#FFE3CE',
          500: '#FB6100',
          600: '#D14E00',
        },
        paper: {
          DEFAULT: '#F5F6FA',
          line: '#E3E6EF',
        },
        ink: {
          400: '#828EA3',
          600: '#4A5468',
          900: '#0B1220',
        },
        mist: {
          300: '#AEB8CC',
          500: '#7B87A0',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'scroll-x': 'scroll-x 32s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
