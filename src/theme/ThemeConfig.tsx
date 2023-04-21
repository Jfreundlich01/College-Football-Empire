import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { palette } from "./palette";

interface ReactChildren {
  children: React.ReactNode;
}
// Theme config for MUI
export const ThemeConfig: React.FC<ReactChildren> = (props) => {
  // TODO: Add the rest of the theme options such as typography, etc...
  const themeOptions = useMemo(() => ({ palette }), []);
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
