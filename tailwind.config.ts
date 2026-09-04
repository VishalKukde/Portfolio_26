import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#14201d',
        paper: '#f1eee6',
        lime: '#c8f169',
        coral: '#ff765f',
        mist: '#d9ded5',
        moss: '#64776c',
      },
      boxShadow: {
        ink: '0 24px 80px rgba(9, 20, 17, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
