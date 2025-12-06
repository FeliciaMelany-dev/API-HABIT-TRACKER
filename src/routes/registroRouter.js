import Router from "express";

const registro = Router();

const registroController = new RegistroController()

registro.post("/", (req, res) => registroController.create);
registro.get("/", (req, res) => registroController.getAll);
registro.delete('/:id', (req, res) => registroController.delete());


export default registro;