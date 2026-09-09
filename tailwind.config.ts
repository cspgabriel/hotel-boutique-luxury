import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          sand: {
            50: '#FAF8F5',
            100: '#F5EFEB',
            200: '#ECE3D8',
            300: '#DCCEC0',
            400: '#C7B49F',
            500: '#B09C86',
            900: '#3D342B',
          },
          gold: {
            100: '#F7EFE3',
            200: '#EBD9BD',
            300: '#DEC297',
            400: '#D1AC72',
            500: '#C59B63',
            600: '#B6894E',
            700: '#8F6632',
          },
          navy: {
            800: '#18293F',
            900: '#0F1D2F',
            950: '#0A131F',
          },
          slate: {
            100: '#F1F3F5',
            200: '#E2E5E8',
            300: '#C7CBD1',
            400: '#8C93A0',
            700: '#484E55',
            800: '#2A2D30',
            900: '#181A1B',
            950: '#111213',
          },
          forest: {
            800: '#26382F',
            900: '#1B2922',
          },
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(15, 29, 47, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(15, 29, 47, 0.16)',
        'modal': '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
