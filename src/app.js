import express from 'express';
import registerRoutes from './routes/index.js';
import { errorHandler } from './middlewares/errorMiddlewares.js'; 
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import cors from "cors"; 

const app = express();

;
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

registerRoutes(app);


app.get('/', (req, res) => {
    res.status(200).send("BEM VINDO AO HABIT TRACKER!!")
});

app.use((req, res) =>{
    return res.status(404).json({
        error: "Rota não encontrada"
    })
})

app.use(errorHandler);

export default app;