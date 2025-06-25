import { TodoModel, ITodo } from "../models/Todo";

export const findAll = async (): Promise<ITodo[]> => {
  return TodoModel.find().sort({ createdAt: -1 }).exec();
};

export const createTodo = async (text: string): Promise<ITodo> => {
  const todo = new TodoModel({ text });
  return todo.save();
};

export const updateTodo = async (
  id: string,
  patch: Partial<Pick<ITodo, "text" | "completed">>
): Promise<ITodo | null> => {
  return TodoModel.findByIdAndUpdate(id, patch, { new: true }).exec();
};

export const deleteTodo = async (id: string): Promise<{ id: string }> => {
  await TodoModel.findByIdAndDelete(id).exec();
  return { id };
};
