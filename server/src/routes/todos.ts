import { Router } from "express";
import * as ctrl from "../controllers/todosController";

export const todosRouter = Router()
  .get("/", ctrl.getTodos)
  .post("/", ctrl.addTodo)
  .put("/:id", ctrl.editTodo)
  .delete("/:id", ctrl.removeTodo);
