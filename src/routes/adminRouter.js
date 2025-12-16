import { Router } from "express";
import AdminController from "../controller/AdminController.js";
import autenticacao from "../middlewares/authMiddlewares.js";
import { apenasAdmin } from "../middlewares/roleMiddleware.js";


const admin = Router();

const adminController = new AdminController();


admin.use(autenticacao);
admin.use(apenasAdmin);

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Endpoints exclusivos para administradores
 */

/**
 * @swagger
 * /admin/users/{id}/role:
 *   patch:
 *     summary: Atualiza a role de um usuário
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role atualizada com sucesso
 *       403:
 *         description: Acesso negado
 */

admin.patch('/users/:id/role', (req, res) => adminController.atualizarRole(req, res))
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada
 */
admin.get("/users", (req, res) => adminController.listarTodos(req,res))
/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
admin.get("/users/:id", (req, res) => adminController.listarUmId(req,res)) 
/**
 * @swagger
 * /admin/users/{id}/restore:
 *   patch:
 *     summary: Restaura um usuário removido
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário restaurado com sucesso
 */
admin.patch("/users/:id/restore", (req, res) => adminController.restaurarUsuario(req, res)) 
/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 */
admin.delete("/users/:id", (req, res) => adminController.deletar(req, res))
/**
 * @swagger
 * /admin/habits:
 *   get:
 *     summary: Lista todos os hábitos cadastrados
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de hábitos retornada
 */

admin.get("/habits", (req, res) => adminController.listarTodos(req, res)) 
/**
 * @swagger
 * /admin/users/{id}/habits:
 *   get:
 *     summary: Lista hábitos de um usuário específico
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de hábitos do usuário
 */
admin.get("/users/:id/habits", (req, res) => adminController.listarHabitosUsuario(req, res))

export default admin;


