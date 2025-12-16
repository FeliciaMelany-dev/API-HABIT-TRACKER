import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import { validacao } from "../middlewares/validateMiddleware.js";
import { registerSchema } from "../schema/register.schema.js";
import { loginSchema } from "../schema/user.schema.js";

const auth = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticação (registro e login)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
auth.post("/register", validacao(registerSchema), (req, res) =>
  authController.register(req, res)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
auth.post("/login", validacao(loginSchema), (req, res) =>
  authController.login(req, res)
);

export default auth;
