import Router from "express";
import UsuarioController from "../controller/UsuarioController.js";
import autenticacao from "../middlewares/authMiddlewares.js";


const usuario = Router();
const usuarioController = new UsuarioController();

usuario.use(autenticacao)

usuario.get("/:id", (req, res) =>  usuarioController.listarUmId(req, res));
usuario.put("/:id", (req, res) => usuarioController.atualizar(req, res))
usuario.delete("/:id",(req, res) => usuarioController.deletar(req, res))

export default usuario;