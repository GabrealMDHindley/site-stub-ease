/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0C0F',
        steel: {
          DEFAULT: '#12151A',
          panel: '#171B21',
          line: '#262B33',
          soft: '#8A909C',
          bright: '#E9ECF1',
        },
        signal: {
          DEFAULT: '#FF5A1F',
          dim: '#B4441C',
          glow: '#FF8A4C',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(255,90,31,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,90,31,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
        'grid-sm': '24px 24px',
      },
      boxShadow: {
        signal: '0 0 40px -8px rgba(255,90,31,0.55)',
      },
    },
  },
  plugins: [],
}
