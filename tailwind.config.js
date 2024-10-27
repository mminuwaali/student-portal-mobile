/** @type {import("tailwindcss").Config} */
module.exports = {
  theme: {
    extend: {
      colors: {

        "red": "#e74c3c",
        "blue": "#3498db",
        "orange": "#f39c12",
        "dark-blue": "#2c3e50",
        "pale-blue": "#aed6f1",
        "light-blue": "#5dade2",
        gray: {
          100: "#f7f7f7",
          200: "#e6e6e6",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
        },

      },
      padding: {
        "1/20": "5%",
        "1/2": "50%",
        "1/3": "33%",
        "1/4": "25%",
        "1/5": "20%",
        "1/10": "10%",
      },
      margin: {
        "1/20": "5%",
        "1/2": "50%",
        "1/3": "33%",
        "1/4": "25%",
        "1/5": "20%",
        "1/10": "10%",
      },
    },
  },
  plugins: [
    ({ addComponents }) => void addComponents({
      ".cointainer": {
        width: "100%",
        height: "100%",
      },
      ".wrapper": {
        padding: "5%",
        width: "100%",
        height: "100%",
      },
    })

  ],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
}
