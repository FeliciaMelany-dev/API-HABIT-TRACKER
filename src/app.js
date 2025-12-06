import express from 'express';
import auth from './routes/authRouter.js';
import usuario from './routes/usuariosRouter.js';
import autenticacao from './middlewares/authMiddlewares.js';
import habito from './routes/habitoRouter.js';
import registro from './routes/registroRouter.js';

const app = express();

app.use(express.json());

app.use('/auth', auth);

app.use(autenticacao);

app.use('/usuario', usuario)
app.use("/habitos", habito);
app.use("/registros", registro);

export default app;