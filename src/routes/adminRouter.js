import { Router } from "express";
import autenticacao from "../middlewares/authMiddlewares.js";
import { apenasAdmin } from "../middlewares/roleMiddleware.js";
import AdminController from "../controller/AdminController.js";

const admin = Router();

const adminController = new AdminController();

admin.use(autenticacao);
admin.use(apenasAdmin);


admin.patch('/users/:id/role', (req, res) => adminController.atualizarRole(req, res))

admin.get("/users", (req, res) => adminController.listarTodos(req,res))
admin.get("/users/:id", (req, res) => adminController.listarUmId(req,res))
admin.patch("/users/:id/restore", (req, res) => adminController.restaurarUsuario(req, res))
admin.delete("/users/:id", (req, res) => adminController.deletar(req, res))



admin.get("/habits", (req, res) => adminController.listarTodos(req, res))
admin.get("/users/:id/habits", (req, res) => adminController.listarHabitosUsuario)

export default admin;


