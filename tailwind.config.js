/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        card: '10px 0px 25px 0px #999'
      }
    },
  },
  plugins: [],
}

