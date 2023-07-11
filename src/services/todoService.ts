import { Todo, TodoModel } from '../models/Todo';

export class TodoService {
  public async getAllTodos(): Promise<Todo[]> {
    return TodoModel.find().lean();
  }

  public async createTodo(title: string, completed: boolean): Promise<Todo> {
    const todo = new TodoModel({ title, completed });
    await todo.save();
    return todo.toObject();
  }

  public async getTodo(id: string): Promise<Todo | null> {
    try {
      const todo = await TodoModel.findById(id);
      return todo;
    } catch (error) {
      throw new Error('Failed to get todo');
    }
  }

  public async updateTodo(
    id: string,
    todo: Partial<Todo>
  ): Promise<Todo | null> {
    try {
      const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo, {
        new: true,
      });
      return updatedTodo;
    } catch (error) {
      throw new Error('Failed to update todo');
    }
  }

  public async bulkUpdateTodoStatus(status: string): Promise<boolean | null> {
    try {
      const updatedTodos = await TodoModel.updateMany(
        {},
        { status },
        {
          multi: true,
        }
      );

      if (!updatedTodos) {
        return false;
      }

      return true;
    } catch (error) {
      throw new Error('Failed to update todo');
    }
  }

  public async deleteTodo(id: string): Promise<boolean> {
    try {
      await TodoModel.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  }

  public async deleteAllTodos(): Promise<boolean> {
    try {
      await TodoModel.deleteMany();
      return true;
    } catch (error) {
      throw new Error('Failed to delete all todo');
    }
  }

  public async getTodosByStatus(status: string): Promise<Todo[]> {
    try {
      const todos = await TodoModel.find({ status }).lean();
      return todos;
    } catch (error) {
      throw new Error('Failed to get all todo by status');
    }
  }
}
