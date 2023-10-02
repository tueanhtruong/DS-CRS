/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        primary: {
          // 100: '#cffafe',
          // 200: '#a5f3fc',
          // 300: '#67e8f9',
          // 400: '#22d3ee',
          // 500: '#06b6d4',
          // 600: '#0891b2',
          // 700: '#0e7490',
          // 800: '#155e75',
          // 900: '#164e63',
          50: '#e6f0ff',
          100: '#b5d1ff',
          200: '#84b3ff',
          300: '#5294ff',
          400: '#2175ff',
          500: '#0866ff',
          600: '#0652cc',
          700: '#053d99',
          800: '#032966',
          900: '#021f4c',
        },
      },
    },
  },
  plugins: [],
  important: true,
};
