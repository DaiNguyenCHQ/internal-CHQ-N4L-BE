import express, { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { TodoService } from '../services/todoService';

const router = express.Router();

export const todoRoutes = (todoService: TodoService): express.Router => {
  router.get(
    '/todos',
    async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const todos = await todoService.getAllTodos();
        logger.info('GET ALL TODOS:', todos);
        res.json(todos);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/todos',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info({ body: req.body }, 'POST - TODO');
        const { title, status } = req.body;
        const todo = await todoService.createTodo(title, status);
        res.json(todo);
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/todos/bulk-update-status',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info({ body: req.body }, 'PATCH - TODO');
        const { status } = req.body;
        if (!status || (status !== 'active' && status !== 'completed')) {
          logger.info('invalid status');
        }
        const updatedAllTodos = await todoService.bulkUpdateTodoStatus(status);
        res.json(updatedAllTodos);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/todos/clear',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info('DELETE - ALL COMPLETED TODOS');
        const deleteCompletedTodos = await todoService.deleteCompltedTodos();
        res.json(deleteCompletedTodos);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/todos/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info({ params: req.params }, 'GET - TODO BY ID');
        const { id } = req.params;
        const todo = await todoService.getTodo(id);
        res.json(todo);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/todos/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info({ body: req.body }, 'PUT - TODO BY ID');

        const { id } = req.params;
        const updatedTodo = req.body;
        const todo = await todoService.updateTodo(id, updatedTodo);

        logger.info({ todo }, 'PUT - TODO BY ID RESULT');
        res.json(todo);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/todos/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info({ params: req.params }, 'DELETE - TODO BY ID');

        const { id } = req.params;
        const todo = await todoService.getTodo(id);
        if (!todo) {
          res.status(404).json({ error: 'Todo not found' });
          return;
        }
        const deletedTodo = await todoService.deleteTodo(id);
        res.json(deletedTodo);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
