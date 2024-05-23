import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./Routes";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Suspense fallback="Loading...">
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <AllRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </div>
  );
}

export default App;
