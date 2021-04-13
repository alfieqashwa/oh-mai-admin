const colors = require("tailwindcss/colors");

module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",

      N900: "#09090A",
      N850: "#16161A",
      N800: "#212126",
      N700: "#2D2D33",
      N600: "#3F3F46",
      N500: "#4E4E57",
      N450: "#71717A",
      N400: "#868691",
      N350: "#A0A0AD",
      N300: "#B8B8C7",
      N250: "#C5C5DB",
      N200: "#E0E0F2",
      N100: "#ECECFF",
      N50: "#F2F2F2",
      N0: "#FFFFFF",

      P900: "#682EC0",
      P850: "#7233D3",
      P800: "#7D38E8",
      P700: "#8A3EFF",
      P600: "#983CF0",
      P500: "#A53AE1",
      P400: "#C035C2",
      P300: "#DB31A3",
      P200: "#E92F94",
      P100: "#F62C84",

      G400: "#2EC09D",
      Y400: "#F4C82B",
      R600: "#C02E2E",

      GradientEnd: "#E92F94",
    },

    fontFamily: {
      primary: ['"Space Grotesk"', "sans-serif"],
      secondary: ['"Work Sans"', "sans-serif"], // Ensure fonts with spaces have " " surrounding it.
    },

    extend: {
      height: {
        "200s": "34.25rem",
      },

      fontSize: {
        "2.5xl": "1.75rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
