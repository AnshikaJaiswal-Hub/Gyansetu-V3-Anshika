// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     darkMode: 'class', // Use class-based dark mode
//     content: [
//       './src/**/*.{js,jsx,ts,tsx}', // Ensure all your source files are included
//     ],
//     darkMode: 'class',
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables dark mode with the 'dark' class
  theme: {
    extend: {},
  },
  plugins: [],
}