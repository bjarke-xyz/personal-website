const white = "#f8f8f2";
const black = "#282a36";
const gray = "#F7FFF7";
const highlightAlt = "#393";

const themeLight = {
  background: gray,
  body: black,
  highlight: "#4ecdc4",
  highlightAlt
};

const themeDark = {
  background: black,
  body: white,
  highlight: "#5af78e",
  highlightAlt
};

const theme = mode => (mode === "dark" ? themeDark : themeLight);

export default theme;
