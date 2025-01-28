/** @type {import('tailwindcss').Config} */
import primeUiPlugin from 'tailwindcss-primeui'
import tailwindVariants from 'tailwind-variants'

export default {
  darkMode: 'selector',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [primeUiPlugin, tailwindVariants],
}
