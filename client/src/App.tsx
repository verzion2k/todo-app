import { TodoLayout } from "./components/todoLayout/TodoLayout";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <TodoLayout />
    </ThemeProvider>
  );
}
