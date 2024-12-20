/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{  
        gray:{
          200:"#f9fbfc",
          500:"#797d84",
          600:"#212b39"
        },
        purple:{
          200:"#5046e4",
          400:"#8784d7",
          600:"#5046e4",
        }
      }
    },
  },
  
  plugins:[
    require('tailwind-scrollbar'),
  ],
}

