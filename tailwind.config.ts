import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#252A32',
      white: '#FFF',
      black: '#000',
      status: {
        alert: '#EB5147',
      },
      gray: {
        normal: '#E1E1E1',
        light: '#F6F6F8',
        secondary: '#E2E5EC',
        disabled: '#CACACA',
      },
      blue: {
        primary: '#405ABA',
        secondary: '#4374F3',
        normal: '#324883',
      },
      background: {
        gray: '#F6F6F6',
        bluegray: '#E2E5EC',
      },
    },
  },
  plugins: [],
};
export default config;
