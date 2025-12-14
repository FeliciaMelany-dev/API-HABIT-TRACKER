import express from 'express';
import registerRoutes from './routes/index.js';
import { errorHandler } from './middlewares/errorMiddlewares.js';

const app = express();

app.use(express.json());

registerRoutes(app);

app.use(errorHandler);

export default app;