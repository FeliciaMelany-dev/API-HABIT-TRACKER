import Router from "express";
import UsuarioController from "../controller/UsuarioController.js";
import autenticacao from "../middlewares/authMiddlewares.js";


const usuario = Router();
const usuarioController = new UsuarioController();

usuario.use(autenticacao);

usuario.get("/me", (req, res) =>  usuarioController.me(req, res));
usuario.put("/me", (req, res) => usuarioController.atualizar(req, res))
usuario.delete("/me",(req, res) => usuarioController.deletar(req, res))

export default usuario;      