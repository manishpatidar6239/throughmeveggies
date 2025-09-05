"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,

  typography: {
    fontFamily: "var(--font-lora)",
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3cb815",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff0000",
    },
    bglightorange: "#F9F4EE ", //  light grayish-orange background color
    bglightorange10: "#f9ebdb ", //  light grayish-orange background color
    bgSpringGreen: "#F0F3E8",
    bggray200: "#F5F5F5",

    gray70: "#323B3E",
    gray40: "#666666",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiButton-containedPrimary:hover": {
            backgroundColor: '#76a713',
          },
          "&.MuiButton-containedSecondary:hover": {
            backgroundColor: '#76a713',
          },
        }),
      },
    },
  },
});

export default theme;
