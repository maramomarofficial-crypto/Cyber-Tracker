/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4C6180',
        'brand-dark': '#303F55',
        'navy-deep': '#17202D',
        'accent-1': '#92AAD1',
        'accent-2': '#6985AE',
        'cyber-bg': '#EEF1F7',
      },
      borderRadius: {
        'cyber': '3.5rem',
      },
    },
  },
  plugins: [],
};