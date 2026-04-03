/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        sand: 'var(--sand)',
        paper: 'var(--paper)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        line: 'var(--line)',
        glow: 'var(--glow)',
      },
      boxShadow: {
        soft: '0 20px 60px -40px rgba(9, 12, 20, 0.45)',
        card: '0 25px 80px -60px rgba(12, 18, 40, 0.5)',
      },
    },
  },
  plugins: [],
}
