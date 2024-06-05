/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-colors-white-light": "#fff",
        "light-colors-dark-gray-light": "#707070",
        "light-colors-black-light": "#000",
        "light-colors-gray-light": "#d8d8d8",
        "light-colors-light-gray-light": "#efefef",
        "light-colors-accent-light": "#a18a68",
      },
    },
  },
  plugins: [],
};
