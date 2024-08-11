import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#0000ff",
    },
    info: {
      main: "#f00f00",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          gridAutoRows: "200px",
          padding: "30px",
        },
      },
    },
  },
});
