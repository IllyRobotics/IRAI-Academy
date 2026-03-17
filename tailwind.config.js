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
    },
  },
  plugins: [],
}
