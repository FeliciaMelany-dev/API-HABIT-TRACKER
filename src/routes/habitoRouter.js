import  { Router } from "express";
import HabitoController from "../controller/HabitoController.js";
import { autenticacao } from '../middlewares/authMiddlewares.js';

const habito = Router();
const habitoController = new HabitoController();

habito.use(autenticacao)

habito.post("/", (req, res) => habitoController.criar(req, res));
habito.get("/", (req, res) => habitoController.listarTodos(req, res));
habito.get("/:id", (req, res) => habitoController.listarUm(req, res));
habito.put("/:id", (req, res) => habitoController.atualizar(req, res));
habito.delete("/:id", (req, res) => habitoController.deletar(req, res));

habito.post(":id/log", (req, res) => habitoController.logar(req, res))

export default habito;

