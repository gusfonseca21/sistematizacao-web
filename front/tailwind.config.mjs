/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      colors: {
        custom: {
          background: '#64d3d6',
          text: '#333',
          'navy-blue': '#000080',
          'light-grey': '#888',
          card: '#E0F6F7'
        }
      }
    }
  },
  plugins: []
};
