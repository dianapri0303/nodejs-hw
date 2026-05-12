import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';

import notesRouter from './routes/notesRoutes.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// routes
app.use(notesRouter);

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
