/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // V2 zinc/emerald dark palette
        bg: '#09090b',
        'bg-card': '#18181b',
        'bg-muted': '#27272a',
        text: '#fafafa',
        'text-muted': '#a1a1aa',
        accent: '#10b981',
        'accent-light': '#34d399',
        border: '#27272a',
        // Legacy aliases for backward compat
        cream: '#09090b',
        'warm-dark': '#fafafa',
        gold: '#10b981',
        'gold-light': '#34d399',
        muted: '#a1a1aa',
        'off-white': '#18181b',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'shimmer-spin': 'shimmer-spin 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'badge-pulse': 'badge-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'shimmer-spin': { to: { transform: 'rotate(360deg)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'badge-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
