// All of the greys, one black, one white
const NEUTRAL = {
  main: "#EBEBEB",
  grey_2: "#D8D8D8",
  grey_3: "#B7B7B7",
  grey_4: "#8A8A8A",
  grey_5: "#6C6B6B",
  grey_6: "#3E3E3E",
  black_7: "#0E0E0E",
  grey_8: "#4D4D4D",
  grey_9: "#E6E6E6",
  grey_10: "#676767",
  grey_11: "#828282",
  grey_12: "#E0E0E0",
  grey_13: "#4F4F4F",
  grey_14: "#9C9C9C",
  white: "#FFFFFF",
};

// Oranges and dark button color
const PRIMARY = {
  main: "#EE9B3B",
  light: "#F3B340",
  dark: "#263C58",
};

// Most of the blues and badge orange
const SECONDARY = {
  main: "#1C77F8",
  light_blue_2: "#DCEAFE",
  orange_3: "#ED6220",
  light_blue_3: "#1471EB",
};

// Random greens and purple
const TERTIARY = {
  main: "#2DC4A7",
  purple_2: "#767FFE",
  green: "#4BB543",
};

// Error red
const ERROR = {
  main: "#BD0F0D",
};

// DocType icon colors
const ICONCOLOR = {
  CSV: "#208BAD",
  PDF: "#CF3A3A",
  XLS: "#2E9E61",
  IMG: "#393797",
  DOC: "#B67617",
  JPG: "#A62974",
  fallback: "#5B6770",
  fallback2: "#828282",
};

export const palette = {
  neutral: { ...NEUTRAL },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  tertiary: { ...TERTIARY },
  error: { ...ERROR },
  iconColor: { ...ICONCOLOR },
};
