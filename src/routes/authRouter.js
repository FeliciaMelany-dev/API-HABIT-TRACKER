import {Router} from "express";
import AuthController from "../controller/AuthController.js";
import { validacao } from "../middlewares/validateMiddleware.js";
import { loginSchema } from "../schema/user.schema.js";
import { registerSchema } from "../schema/register.schema.js";
const auth = Router();

const authController = new AuthController();

auth.post("/register", validacao(registerSchema), (req, res) => authController.register(req, res) );

auth.post("/login", validacao(loginSchema), (req, res) => authController.login(req, res))

export default auth;