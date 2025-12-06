import express from 'express';
import auth from './routes/authRouter';

const app = express();

app.use(express.json());

app.use('/login', '/register', auth)

export default app;