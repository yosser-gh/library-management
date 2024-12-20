/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/pages/Stats.js'],
  theme: {
    extend: {
      display: {
        'inline-block': 'inline-block',
      },
      verticalAlign: {
        'baseline': 'baseline',
      },
    },
  },
  variants: {},
  plugins: [],
};
