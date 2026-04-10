import type { Config } from 'tailwindcss';

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'poe-void': '#0b0b0c',
        'poe-panel': '#141416',
        'poe-panel-2': '#1a1a1f',
        'poe-gold': '#d4b35d',
        'poe-gold-soft': '#d4b35d1f',
        'poe-ember': '#c06b2a',
        'poe-ash': '#b7b0a6',
        'poe-border': '#d4b35d59',
        'poe-danger': '#a8482a'
      },
      fontFamily: {
        serif: ['Cinzel', 'Trajan Pro', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        poe: '0 0 0 1px rgba(212, 179, 93, 0.12), 0 20px 60px rgba(0, 0, 0, 0.55)',
        'poe-soft': '0 0 0 1px rgba(212, 179, 93, 0.1), inset 0 0 24px rgba(212, 179, 93, 0.05)'
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
