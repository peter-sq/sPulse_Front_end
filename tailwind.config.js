module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // enable dark mode via class strategy
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        epilogue: ["Epilogue", "sans-serif"],
        Poppins:['Poppins', "sans-serif"],
        body: ['Poppins', "sans-serif"],
        Montserrat: ['Montserrat', "sans-serif"], 
        Roboto: ['Roboto', 'sans-serif']
      },
      colors:{
        red: "#E4002B",
        black: "#000000",
        white: "#FFFFFF",
        gray: "#f2f2f2",
        black: '#09090c',
        darkGray: '#121212',
        
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',

        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',


      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
  variants: {
    extend: {},
  },
  plugins: [],
}
