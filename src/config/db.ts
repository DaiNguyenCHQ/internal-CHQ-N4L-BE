import mongoose, { ConnectOptions } from "mongoose";
import { logger } from "../utils/logger";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : "mongodb://admin:123123@mongodb.default.svc.cluster.local:27017/todo-app?authSource=admin&w=1";
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
