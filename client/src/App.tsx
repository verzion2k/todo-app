import { TodoLayout } from "./components/todoLayout/TodoLayout";
import { Provider } from "react-redux";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { store } from "./store/store";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <TodoLayout />
      </ThemeProvider>
    </Provider>
  );
}
