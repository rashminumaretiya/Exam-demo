import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFE147",
    },
    secondary: {
      main: "#F0F0F0",
      dark: "#667085",
      light: "#F7F9FB",
    },
    error: {
      main: "#ff0000",
    },
    blue: {
      main: "#2C5CDC",
    },
    white: {
      main: "#FFFFFF",
    },
    black: {
      main: "#252B33",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.secondary.light,
        },
      }),
    },
  },
});

export default theme;
