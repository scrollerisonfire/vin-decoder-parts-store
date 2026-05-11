/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"DM Sans"',    'sans-serif'],
        mono:    ['"DM Mono"',    'monospace'],
      },
      colors: {
        bg:       '#0a0a0a',
        surface:  '#111111',
        surface2: '#1a1a1a',
        border:   '#2a2a2a',
        accent:   '#e8441a',
        accent2:  '#f5a623',
        muted:    '#888880',
      },
    },
  },
  plugins: [],
}