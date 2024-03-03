import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      /**
       * size: mobile : 480px;
       */
      xs: '480px',

      /**
       * size: table : 768px;
       */
      md: '768px',

      /**
       * size: desktop : 1024px;
       */
      lg: '1024px',
    },
    colors: {
      main: {
        primary: '#252A32',
      },
      white: '#FFF',
      black: '#000',
      status: {
        alert: '#EB5147',
      },
      gray: {
        normal: '#E1E1E1',
        light: '#939393',
        primary: '#323232',
        dark: '#272727',
        disabled: '#D6D6D6',
      },
      blue: {
        primary: '#4374F3',
        secondary: '#405ABA',
        normal: '#324883',
        tertiary: '#475F85',
        light: '#F5F6F8',
      },
      background: {
        lightgray: '#F4F4F4',
        bluegray: '#E2E5EC',
      },
      hover: {
        primary: '#121418',
        blueSecondary: '#2F4597',
        bluePrimary: '#325DCE',
        blueNormarl: '#253560',
        blueTertiary: '#30405A',
        grayLight: '#EAEEF3',
      },
      yellow: {
        kakao: '#FDDC3F',
      },
      green: {
        naver: '#00C73C',
      },
    },
    extend: {
      boxShadow: {
        normal: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        sm: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
        md: '0px 2px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
export default config;
