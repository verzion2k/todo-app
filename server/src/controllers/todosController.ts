import { Request, Response, NextFunction } from "express";
import * as service from "../services/todosService";

export const getTodos = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await service.findAll();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    const todo = await service.createTodo(text);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const editTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const patch = req.body;
    const todo = await service.updateTodo(id, patch);
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const removeTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await service.deleteTodo(id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
