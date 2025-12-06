import Router from "express";


const usuario = Router();

const usuarioController = new UsuarioController();

usuario.get("/me", (req, res) =>  usuarioController.get(req, res));
usuario.put("/me", (req, res) => usuarioController.update(req, res))
usuario.delete("me/",(req, res) => usuarioController.delete(req, res))

export default usuario;