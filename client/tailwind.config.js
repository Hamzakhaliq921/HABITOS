/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f5f8f3',
          100: '#ebf1e8',
          200: '#d2e0ce',
          300: '#b3c9ad',
          400: '#8fad88',
          500: '#6f9068',
          600: '#587553',
          700: '#455b42',
          800: '#334236',
          900: '#222d24',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        display: ['"Fraunces"', 'serif'],
      },
      boxShadow: {
        glow: '0 18px 60px rgba(77, 103, 76, 0.18)',
        glass: '0 10px 40px rgba(31, 41, 35, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.72' },
          '50%': { opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseSoft: 'pulseSoft 6s ease-in-out infinite',
        rise: 'rise 700ms ease-out both',
      },
      backgroundImage: {
        haze: 'radial-gradient(circle at top left, rgba(235, 241, 232, 0.95), rgba(183, 204, 177, 0.38) 34%, transparent 56%), radial-gradient(circle at top right, rgba(151, 181, 143, 0.34), transparent 42%), linear-gradient(135deg, rgba(248, 250, 247, 0.96), rgba(218, 229, 215, 0.82))',
      },
    },
  },
  plugins: [],
};
