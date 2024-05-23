/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '20rem',
        tablet: '40rem',
      },
      minWidth: {
        mobile: '20rem',
      },
    },
  },
  plugins: [],
};
