import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";
import { autenticacao } from '../middlewares/authMiddlewares.js';


const usuario = Router();
const usuarioController = new UsuarioController();

usuario.use(autenticacao);
usuario.use((req, res, next) => authController.autenticacao(req, res, next));
usuario.get("/usuarios", (req, res) => usuarioController.listarTodos(req, res));
usuario.get("/usuarios/:id", (req, res) => usuarioController.listarUmId(req, res));
usuario.post("/usuarios", (req, res) => usuarioController.criarNovo(req, res));
usuario.put("/usuarios/:id", (req, res) => usuarioController.atualizar(req, res));
usuario.delete("/usuarios/:id", (req, res) => usuarioController.deletar(req, res));

export default usuario;