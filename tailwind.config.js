/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#ec4899',
        accent: '#14b8a6',
        dark: '#0f172a',
        'dark-light': '#1e293b',
        gray: '#64748b',
        light: '#f8fafc',
      },
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
        'white/5': 'rgba(255, 255, 255, 0.05)',
        'white/8': 'rgba(255, 255, 255, 0.08)',
        'white/10': 'rgba(255, 255, 255, 0.1)',
        'indigo-600/10': 'rgba(79, 70, 229, 0.1)',
      }),
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        'white/10': 'rgba(255, 255, 255, 0.1)',
        'white/20': 'rgba(255, 255, 255, 0.2)',
        'white/30': 'rgba(255, 255, 255, 0.3)',
        'indigo-500/20': 'rgba(99, 102, 241, 0.2)',
        'indigo-500/30': 'rgba(99, 102, 241, 0.3)',
        'indigo-500/40': 'rgba(99, 102, 241, 0.4)',
        'indigo-600/30': 'rgba(79, 70, 229, 0.3)',
        'pink-600/10': 'rgba(236, 72, 153, 0.1)',
      }),
    },
  },
  plugins: [],
}
