import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// middleware
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use(authRouter);
app.use(notesRouter);
app.use(userRoutes);

//404
app.use(notFoundHandler);

//errors
app.use(errors());
app.use(errorHandler);

// connect db
await connectMongoDB();

// server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
