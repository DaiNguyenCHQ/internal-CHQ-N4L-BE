import mongoose, { Document, Schema } from "mongoose";

export interface Todo {
  title: string;
  completed: boolean;
}

export interface TodoDocument extends Todo, Document {}

const todoSchema = new Schema<TodoDocument>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);
