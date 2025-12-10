import express from 'express';
import registerRoutes from './routes/index.js';
import auth from './routes/authRouter.js';


const app = express();

app.use(express.json());

registerRoutes(app);


export default app;