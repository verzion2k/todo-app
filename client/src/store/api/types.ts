import type { Todo } from "../../types";

export enum ApiKeys {
  TODOS = "todos",
}

export enum Tags {
  TODO_LIST = "TodoList",
}

export enum HttpMethods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface BaseTodoPayload {
  id: string;
}

export interface CreateTodoPayload {
  text: string;
}

export interface UpdateTodoPayload extends BaseTodoPayload {
  data: Pick<Todo, "text" | "completed">;
}
