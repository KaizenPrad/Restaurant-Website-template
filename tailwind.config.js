/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        ink: '#090909',
        coal: '#0D0D0D',
        panel: '#151515',
        card: '#252525',
        accent: {
          DEFAULT: '#D98236',
          soft: '#B8793F',
          light: '#E9A15C',
        },
        cream: '#F5F2ED',
        muted: '#B8B3AD',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Great Vibes"', '"Playfair Display"', 'cursive'],
      },
      letterSpacing: {
        widest: '0.28em',
        mega: '0.4em',
      },
      boxShadow: {
        soft: '0 24px 70px -30px rgba(0, 0, 0, 0.9)',
        card: '0 30px 80px -40px rgba(0, 0, 0, 1)',
        glow: '0 0 0 1px rgba(217, 130, 54, 0.25), 0 20px 60px -25px rgba(217, 130, 54, 0.22)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spinSlow 28s linear infinite',
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
