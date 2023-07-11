import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);
     // Log the error with Pino
  
    res.status(500).json({ error: 'Internal Server Error' });
}