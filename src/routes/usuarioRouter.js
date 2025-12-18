import Router from "express";
import UsuarioController from "../controller/UsuarioController.js";
import autenticacao from "../middlewares/authMiddlewares.js";


const usuario = Router();
const usuarioController = new UsuarioController();

usuario.use(autenticacao);
/**
 * @swagger
 * api/usuario/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */

usuario.get("/me", (req, res) =>  usuarioController.me(req, res)); 
/**
 * @swagger
 * api/usuario/me:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */
usuario.put("/me", (req, res, next) => usuarioController.atualizar(req, res, next)) 

/**
 * @swagger
 * api/usuario/me:
 *   delete:
 *     summary: Remove o usuário autenticado
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */ 
usuario.delete("/me",(req, res) => usuarioController.deletar(req, res))

export default usuario;      