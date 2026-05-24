/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0d1117',
          1: '#161b22',
          2: '#1c2128',
          3: '#22272e',
          4: '#2d333b',
        },
        accent: {
          cyan:   '#22d3ee',
          green:  '#4ade80',
          amber:  '#fbbf24',
          red:    '#f87171',
          purple: '#a78bfa',
          blue:   '#60a5fa',
        },
        border: {
          DEFAULT: '#30363d',
          light:   '#3d444d',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in':   'slideIn .25s ease-out',
        'fade-in':    'fadeIn .3s ease-out',
      },
      keyframes: {
        slideIn: { '0%': { transform: 'translateX(-8px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      }
    },
  },
  plugins: [],
}
