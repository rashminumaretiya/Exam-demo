import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6495ED",
      light: "#6495ED25",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F0F0F0",
      dark: "#667085",
      light: "#F7F9FB",
    },
    error: {
      main: "#ff5e5e",
      light: "#ff000020",
      contrastText: "#fff",
    },
    blue: {
      main: "#2C5CDC",
    },
    white: {
      main: "#FFFFFF",
    },
    black: {
      main: "#252B33",
      contrastText: "#fff",
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
