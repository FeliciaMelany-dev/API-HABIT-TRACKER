
import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import HabitoController from "../controller/HabitoController.js";


const habito = Router();
const authController = new AuthController();
const habitoController = new HabitoController();

habito.use((req, res, next) => authController.autenticacao(req, res, next));
habito.get("/", (req, res) => habitoController.listar(req, res));
habito.post("/", (req, res) => habitoController.criar(req, res));
habito.get("/:id", (req, res) => habitoController.listarUmId(req, res));
habito.put("/:id", (req, res) => habitoController.atualizar(req, res));
habito.delete("/:id", (req, res) => habitoController.deletar(req, res));
>>>>>>> 53927121120d7442a419417af804ade2cfe24f9a
