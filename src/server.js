import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRouter from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// connect db
await connectMongoDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// routes
app.use(notesRouter);

//404
app.use(notFoundHandler);

//error
app.use(errorHandler);

// server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
