import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { logger } from './utils/logger';
import { errorHandler } from './middleware/ErrorHandler';
import { connectDB } from './config/db';
import { TodoService } from './services/todoService';
import { todoRoutes } from './routes/todoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

logger.info(process.env, "environment");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://ui.chatapp.local',
  })
);

app.use(express.json());

// Connect to MongoDB
connectDB();

// Create Todo service instance
const todoService = new TodoService();

app.get('/', (req, res) => {
  res.send('ok');
});

// Routes
app.use('/api', todoRoutes(todoService));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
