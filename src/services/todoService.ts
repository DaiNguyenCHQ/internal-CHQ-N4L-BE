import { Todo, TodoModel } from "../models/Todo";

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

  public async updateTodo(id: string, todo: Todo): Promise<Todo | null> {
    try {
      const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo, { new: true });
      return updatedTodo;
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
}