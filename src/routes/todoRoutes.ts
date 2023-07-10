import express, { Request, Response } from "express";
import { TodoService } from "../services/todoService";

const router = express.Router();

export const todoRoutes = (todoService: TodoService): express.Router => {
  router.get("/todos", async (_req: Request, res: Response) => {
    console.log("get all todos");
    const todos = await todoService.getAllTodos();
    res.json(todos);
  });

  router.post("/todos", async (req: Request, res: Response) => {
    console.log("POST - TODO", { body: req.body });
    const { title, status } = req.body;
    const todo = await todoService.createTodo(title, status);
    res.json(todo);
  });

  router.get("/todos/:id", async (req: Request, res: Response) => {
    console.log("GET - TODO BY ID", { body: req.body });
    const { id } = req.params;
    const todo = await todoService.getTodo(id);
    res.json(todo);
  });

  router.put("/todos/:id", async (req: Request, res: Response) => {
    console.log("PUT - TODO BY ID", { body: req.body });
    const { id } = req.params;
    const updatedTodo = req.body;
    const todo = await todoService.updateTodo(id, updatedTodo);
    res.json(todo);
  });

  router.delete("/todos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await todoService.getTodo(id);
    if (!todo) {
      return null;
    }
    return await todoService.updateTodo(id, { ...todo, status: "completed"});
  });

  return router;
};
