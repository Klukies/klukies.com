import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    // https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    extend: {
      colors: {
        rosewater: 'rgb(var(--color-rosewater) / <alpha-value>)',
        flamingo: 'rgb(var(--color-flamingo) / <alpha-value>)',
        pink: 'rgb(var(--color-pink) / <alpha-value>)',
        mauve: 'rgb(var(--color-mauve) / <alpha-value>)',
        red: 'rgb(var(--color-red) / <alpha-value>)',
        maroon: 'rgb(var(--color-maroon) / <alpha-value>)',
        peach: 'rgb(var(--color-peach) / <alpha-value>)',
        yellow: 'rgb(var(--color-yellow) / <alpha-value>)',
        green: 'rgb(var(--color-green) / <alpha-value>)',
        teal: 'rgb(var(--color-teal) / <alpha-value>)',
        sky: 'rgb(var(--color-sky) / <alpha-value>)',
        sapphire: 'rgb(var(--color-sapphire) / <alpha-value>)',
        blue: 'rgb(var(--color-blue) / <alpha-value>)',
        lavender: 'rgb(var(--color-lavender) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        subtext1: 'rgb(var(--color-subtext1) / <alpha-value>)',
        subtext0: 'rgb(var(--color-subtext0) / <alpha-value>)',
        overlay2: 'rgb(var(--color-overlay2) / <alpha-value>)',
        overlay1: 'rgb(var(--color-overlay1) / <alpha-value>)',
        overlay0: 'rgb(var(--color-overlay0) / <alpha-value>)',
        surface2: 'rgb(var(--color-surface2) / <alpha-value>)',
        surface1: 'rgb(var(--color-surface1) / <alpha-value>)',
        surface0: 'rgb(var(--color-surface0) / <alpha-value>)',
        base: 'rgb(var(--color-base) / <alpha-value>)',
        mantle: 'rgb(var(--color-mantle) / <alpha-value>)',
        crust: 'rgb(var(--color-crust) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        ...defaultTheme.minHeight,
        screen: '100dvh',
      },
    },
  },
  plugins: [],
} satisfies Config;
