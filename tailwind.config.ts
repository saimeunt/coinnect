import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
// import colors from 'tailwindcss/colors';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import formsPlugin from '@tailwindcss/forms';

const config = {
  content: ['./{app,components}/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      /* colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        slate: colors.slate,
        gray: colors.gray,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        red: colors.red,
        green: colors.green,
        cyan: colors.cyan,
      }, */
    },
  },
  plugins: [aspectRatioPlugin, formsPlugin],
  safelist: [
    { pattern: /bg-+/ },
    { pattern: /border-+/ },
    { pattern: /text-+/ },
    { pattern: /shadow-+/ },
    { pattern: /ring-+/ },
  ],
} satisfies Config;

export default config;
