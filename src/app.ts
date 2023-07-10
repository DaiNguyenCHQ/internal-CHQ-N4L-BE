import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { TodoService } from "./services/todoService";
import { todoRoutes } from "./routes/todoRoutes";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://ui.chatapp.local",
  })
);

app.use(express.json());

// Connect to MongoDB
connectDB();

// Create Todo service instance
const todoService = new TodoService();

app.get("/", (req, res) => {
  res.send("ok");
});

// Routes
app.use("/api", todoRoutes(todoService));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
