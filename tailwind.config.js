/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      primary: '#16b91a',
      btnColor:'#81c784',
      btnColorHover:'#81c745',
      textColor:'#ffff',
      textInput:'#000'
    }
  },
  plugins: [],
}