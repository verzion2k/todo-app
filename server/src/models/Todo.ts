import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TodoModel = model<ITodo>("Todo", todoSchema);
