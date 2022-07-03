const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      mono: ["Inconsolata"],
    },
    colors: {
      ...defaultTheme.colors,
      white: "#f8f8f8",
      black: "#282a36",
      "black-alt": "#44475a",
      gray: "#f7fff7",
      "highlight-alt": "#339933",

      background: "#f7fff7",
      body: "#282a36",
      "body-alt": "#f8f8f8",
      highlight: "#4ecdc4",

      "background-dark": "#282a36",
      "body-dark": "#f8f8f8",
      "body-alt-dark": "#44475a",
      "highlight-dark": "#5af78e",
    },
  },
  plugins: [],
};
