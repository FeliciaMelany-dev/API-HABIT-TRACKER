
import { Router } from "express";
import HabitoController from "../controller/HabitoController.js";


const habito = Router();
const habitoController = new HabitoController();

habito.get("/", (req, res) => habitoController.listar(req, res));
habito.post("/", (req, res) => habitoController.criar(req, res));
habito.get("/:id", (req, res) => habitoController.listarUmId(req, res));
habito.put("/:id", (req, res) => habitoController.atualizar(req, res));
habito.delete("/:id", (req, res) => habitoController.deletar(req, res));

export default habito;

