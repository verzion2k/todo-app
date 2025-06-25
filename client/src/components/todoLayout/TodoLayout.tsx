import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { TodoList } from "../todoList/TodoList";
import { AddTodo } from "../addTodo/AddTodo";

export const TodoLayout: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      width={300}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <AddTodo />
        <TodoList />
      </Container>
    </Box>
  );
};
