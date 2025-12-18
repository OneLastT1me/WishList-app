export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        ptsans: ["PT Sans", "sans-serif"],
      },
      colors: {
        darkblue: "#001F3F",
      },
    },
  },
  plugins: [],
}