/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        'primary': '#2EB398',
        'secondary': '#207d74',
        'dark-light': '#ff7849',
        'green': '#13ce66',
        'highlight': '##d0fffb',
        'dark': '#0d2538',
        'light': '#f6f7f9',
      },
    },
    
  },
  plugins: [],
}

