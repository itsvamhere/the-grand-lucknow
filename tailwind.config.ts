import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '810px',
      laptop: '1024px',
    },
    extend: {
      colors: {
        espresso: '#14120E',
        'espresso-elevated': '#1C1915',
        sand: '#F5EEDB',
        'sand-muted': '#EAE0C8',
        taupe: '#6E6853',
        terracotta: '#C46335',
        'terracotta-card': '#B85D3B',
        'text-cream': '#F5EEDB',
        'text-cream-muted': '#B5AEA0',
        'text-charcoal': '#14120E',
        'text-charcoal-muted': '#5C564B',
        unavailable: '#E06D53',
      },
      fontFamily: {
        display: ['"EL PACRE Regular"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '"Lay Grotesk Regular"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
