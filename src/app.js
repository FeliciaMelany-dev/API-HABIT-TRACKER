import express from 'express';
import registerRoutes from './routes/index.js';
import { errorHandler } from './middlewares/errorMiddlewares.js';

const app = express();

app.use(express.json());

registerRoutes(app);

app.use((req, res) =>{
    return res.status(404).json({
        error: "Rota não encontrada"
    })
})

app.use(errorHandler);

export default app;