import  { Router } from "express";
import HabitoController from "../controller/HabitoController.js";
import { autenticacao } from '../middlewares/authMiddlewares.js';

const habito = Router();
const habitoController = new HabitoController();


habito.use(autenticacao);
habito.get("/habitos", (req, res) => habitoController.listarTodos(req, res));
habito.get("/habitos/:id", (req, res) => habitoController.listarUmId(req, res));
habito.post("/habitos", (req, res) => habitoController.criarNovo(req, res));
habito.put("/habitos/:id", (req, res) => habitoController.atualizar(req, res));
habito.delete("/habitos/:id", (req, res) => habitoController.deletar(req, res));

export default habito;

