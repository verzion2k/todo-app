import { TextField } from "@mui/material";
import { useCreateTodoMutation } from "../../store/api/todos";
import { useState } from "react";

export const AddTodo: React.FC = () => {
  const [createTodo] = useCreateTodoMutation();
  const [todoText, setTodoText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodoText(value);
  };

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTodo({ text: todoText });
      setTodoText("");
    }
  };

  return (
    <>
      <TextField
        label="New Todo"
        onChange={onChange}
        value={todoText}
        fullWidth
        margin="normal"
        onKeyDown={onCreateTodo}
      />
    </>
  );
};
