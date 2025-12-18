import cors from 'cors';
import express from 'express';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { errorHandler } from './middlewares/errorMiddlewares.js';
import registerRoutes from './routes/index.js';


const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

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