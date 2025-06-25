export interface TodoResponse {
  _id: string;
  _v: number;
  text: string;
  completed: boolean;
  updatedAt: string;
  createAt: string;
}
export interface Todo extends Pick<TodoResponse, "text" | "completed"> {
  id: string;
}
