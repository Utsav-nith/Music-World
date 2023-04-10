/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm: '480px',
      

      lg: '976px',
      

      xl: '1440px',
    },
    extend: {
      colors:{
        "primary": "	#0040ff",
        "secondary": "#330033",
        "active": "#330033#",
      }
    },
  },
  plugins: [],
}