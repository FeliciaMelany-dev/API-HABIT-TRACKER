import Router from "express";
import AuthController from "../controller/AuthController.js";

const auth = Router();
const authController = new AuthController();

auth.post("/register", (req, res) => authController.register(req, res) );

auth.post("/login", (req, res) => authController.login(req, res))

export default auth;