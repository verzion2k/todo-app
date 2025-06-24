import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { mockTodos } from "./types";

export const TodoLayout = () => {
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
        <TextField
          label="New Todo"
          onChange={() => {}}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={() => {}} fullWidth>
          Add Todo
        </Button>
        <List>
          {mockTodos.map((todo, index) => (
            <ListItem key={index} dense>
              <Checkbox onChange={() => {}} checked={todo.completed} />
              <ListItemText primary={todo.text} />
              <IconButton edge="end" onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};
