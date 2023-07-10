import mongoose, { Document, Schema } from "mongoose";

export interface Todo {
  title: string;
  status: string;
}

export interface TodoDocument extends Todo, Document {}

const todoSchema = new Schema<TodoDocument>({
  title: { type: String, required: true },
  status: { type: String, default: "active" },
});

export const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);
