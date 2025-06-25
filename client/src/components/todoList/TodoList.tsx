import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../store/api/todos";
import { TodoListSkeleton } from "../todoListSkeleton/TodoListSkeleton";
import type { Todo } from "../../types";
import React, { useState } from "react";

export const TodoList: React.FC = () => {
  const { data: todos } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setDraftText(text);
  };

  const finishEditing = (
    id: string,
    originalText: string,
    completed: boolean
  ) => {
    const trimmed = draftText.trim();
    if (trimmed && trimmed !== originalText) {
      updateTodo({ id, data: { text: trimmed, completed } });
    }
    setEditingId(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string,
    text: string,
    completed: boolean
  ) => {
    if (e.key === "Enter") finishEditing(id, text, completed);
    else if (e.key === "Escape") setEditingId(null);
  };

  const onDeleteTodo = (id: string) => {
    deleteTodo({ id });
  };

  const onUpdateTodo = (todo: Todo) => {
    updateTodo({
      id: todo.id,
      data: {
        text: todo.text,
        completed: !todo.completed,
      },
    });
  };

  if (!todos) {
    return <TodoListSkeleton />;
  }

  return (
    <List>
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;

        return (
          <ListItem
            dense
            key={todo.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => onDeleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              onChange={() => onUpdateTodo(todo)}
              checked={todo.completed}
            />
            {isEditing ? (
              <TextField
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                onBlur={() => finishEditing(todo.id, todo.text, todo.completed)}
                onKeyDown={(e) =>
                  handleKeyDown(e, todo.id, todo.text, todo.completed)
                }
                size="small"
                autoFocus
                fullWidth
              />
            ) : (
              <ListItemText
                primary={todo.text}
                onDoubleClick={() => startEditing(todo.id, todo.text)}
                sx={{ cursor: "pointer" }}
              />
            )}

            {!isEditing && (
              <IconButton
                edge="end"
                onClick={() => startEditing(todo.id, todo.text)}
              >
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
