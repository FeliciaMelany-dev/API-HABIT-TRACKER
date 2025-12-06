import Router from "express";

const habito = Router();

const habitoController = new HabitoController();

habito.post("/", (req, res) => habitoController.create())
habito.get("/", (req, res) => habitoController.getAll())
habito.get("/:id", (req, res) => habitoController.getById())
habito.put("/:id", (req, res) => habitoController.update())
habito.delete("/", (req, res) => habitoController.delete())


export default habito;