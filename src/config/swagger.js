import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { 
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Habit Tracker API",
      version: "1.0.0",
      description: "API documentation for the Habit Tracker application",
    },
    components:{ 
      securitySchemes:{
        bearerAuth:{
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [
      {
        url: "https://api-habit-tracker-10r9.onrender.com/",
      },
    ],
  },
 apis: [path.join(__dirname, "../routes/*.js")], 
};

const swaggerSpec = swaggerJsdoc(options); 
export { swaggerSpec, swaggerUi };

