/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand tokens — extracted from brand/brandbook-extracted.md (2026-04-23).
        // gradient intermediate stops are [PENDING #3] from designer — see extracted.md.
        brand: {
          amber: '#FBBF26', // primary, Pantone 1235 C
          'amber-dark': '#B55417', // primary, Pantone 7573 C
          'amber-light': '#F9C655', // secondary, Pantone 123 C
          orange: '#BC682F', // secondary, Pantone 7572 C
          'gray-dark': '#3D3D3D', // secondary, Pantone 11C
          white: '#FFFFFF',
          black: '#000000',
        },
        // Semantic aliases for site use
        surface: {
          DEFAULT: '#000000', // dark-first: black base
          raised: '#1A1A1A', // cards, elevated sections
          sunken: '#111111', // alternating sections; must differ from DEFAULT for visual rhythm
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#A3A3A3', // mid-gray, WCAG AA on black surface (~6.2:1); #3D3D3D is light-surface only
          subtle: '#8B8B8B', // WCAG AA on black (~5.9:1); captions, hints
        },
        accent: {
          DEFAULT: '#FBBF26', // amber bright
          hover: '#F9C655', // amber light
          press: '#B55417', // amber dark
        },
        danger: '#F87171',
        warn: '#FBBF26',
        ok: '#34D399',
      },
      fontFamily: {
        // Titles/display: Helvetica Now (licensed). Falls back to system sans.
        // Body: Poppins (canonical per p.17 guidelines). Inter is fallback.
        // Wordmark font: [PENDING #4] — confirmed pending designer.
        display: ['"Helvetica Now Display"', '"Helvetica Now"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display scale — matches brand.md §Type Scale
        '5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '4xl': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        '2xl': ['1.25rem', { lineHeight: '1.35' }],
      },
      spacing: {
        section: '6rem',
      },
      maxWidth: {
        prose: '72ch',
        narrow: '42rem',
      },
    },
  },
  plugins: [],
};
