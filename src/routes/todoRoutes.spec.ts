import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';
import { todoRoutes } from './todoRoutes';

describe('Todo router', () => {
  const todoMock = {
    _id: 'theTodoId',
    title: 'the todo title',
    status: 'active',
  };

  const todoService = {
    getTodo: (id: string) => Promise.resolve(todoMock),
    getAllTodos: (): Promise<Record<string, any>[]> =>
      Promise.resolve([todoMock]),
    createTodo: (title: string, status: string): Promise<Record<string, any>> =>
      Promise.resolve(todoMock),
    bulkUpdateTodoStatus: (status: string): Promise<boolean> =>
      Promise.resolve(true),
    deleteTodo: (): Promise<boolean> => Promise.resolve(true),
    deleteCompletedTodos: (): Promise<boolean> => Promise.resolve(true),
  } as any;

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', todoRoutes(todoService));

  it('Should return list todos when get todos - GET TODOs', () => {
    request(app)
      .get('/api/todos')
      .expect(200, [todoMock])
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it('Should return created todo when create todo - POST TODO', () => {
    request(app)
      .post('/api/todos')
      .send({ title: 'the todo title', status: 'active' })
      .expect(200, todoMock)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it('Should return true when bulk update todo status - PATCH TODOs', () => {
    request(app)
      .patch('/api/todos/bulk-update-status')
      .send({ status: 'active' })
      .expect(200, 'true')
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it('Should return true when delete todo - DELETE TODO', () => {
    request(app)
      .delete('/api/todos/clear')
      .expect(200, 'true')
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});
