import  { Router } from "express";
import HabitoController from "../controller/HabitoController.js";
import { autenticacao } from '../middlewares/authMiddlewares.js';
import RegistroController from "../controller/RegistroController.js";
import { validacao } from "../middlewares/validateMiddleware.js";
import { criaHabito } from "../schema/criarHabito.schema.js";
import { atualizaHabitSchema } from "../schema/atualizarHabito.js";
const habito = Router();
const habitoController = new HabitoController();
const registroController = new RegistroController();

habito.use(autenticacao)

habito.post("/", validacao(criaHabito), (req, res) => habitoController.criar(req, res));
habito.get("/", (req, res) => habitoController.listarTodos(req, res));
habito.get("/:id", (req, res) => habitoController.listarUm(req, res));
habito.put("/:id", validacao(atualizaHabitSchema), (req, res) => habitoController.atualizar(req, res));
habito.delete("/:id", (req, res) => habitoController.deletar(req, res));

habito.post("/:id/completo", (req, res) => registroController.criar(req, res));

habito.get("/:id/completo", (req, res) => registroController.listar(req, res));

habito.delete("/:id/completo/:registroId", (req, res) => registroController.deletar(req, res))

export default habito;

