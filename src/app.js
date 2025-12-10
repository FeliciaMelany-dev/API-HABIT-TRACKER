import express from 'express';
import registerRoutes from ('./routes/index.js');

const app = express();
registerRoutes(app);

export default app;