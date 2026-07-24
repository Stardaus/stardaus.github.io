/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './content/**/*.mdx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        swiss: {
          black: '#0A0A0A',
          white: '#FAFAFA',
          gray: {
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            800: '#262626',
            900: '#171717',
          },
          accent: '#FF3300', // Classic Swiss International Red accent tag
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
