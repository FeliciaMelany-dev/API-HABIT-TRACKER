import { Router } from "express";
import HabitoController from "../controller/HabitoController.js";
import RegistroController from "../controller/RegistroController.js";
import { autenticacao } from "../middlewares/authMiddlewares.js";
import { validacao } from "../middlewares/validateMiddleware.js";
import { atualizaHabitSchema } from "../validators/atualizarHabito.js";
import { buscarHabitoSchema } from "../validators/buscarHabito.schema.js";
import { completarHabitoSchema } from "../validators/completarHabito.schema.js";
import { criaHabito } from "../validators/criarHabito.schema.js";
import { deletarHabitoSchema } from "../validators/deletarHabito.schema.js";
const habito = Router();
const habitoController = new HabitoController();
const registroController = new RegistroController();

habito.use(autenticacao);

/**
 * @swagger
 * tags:
 *   name: Habitos
 *   description: Endpoints para gerenciar hábitos
 */

habito.post("/", validacao(criaHabito), (req, res) =>
  habitoController.criar(req, res)
);
/**
 * @swagger
 * api/habito/{id}:
 *   get:
 *     summary: Busca um hábito pelo ID
 *     tags: [Habitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hábito encontrado
 *       404:
 *         description: Hábito não encontrado
 */

habito.get("/", (req, res) => habitoController.listarTodos(req, res));
/**
 * @swagger
 * api/habito:
 *   post:
 *     summary: Cria um novo hábito
 *     tags: [Habitos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hábito criado com sucesso
 */
habito.get("/:id", validacao(buscarHabitoSchema), (req, res) => habitoController.listarUm(req, res));
/**
 * @swagger
 * api/habito/{id}:
 *   put:
 *     summary: Atualiza um hábito existente
 *     tags: [Habitos]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hábito atualizado
 */
habito.put("/:id", validacao(atualizaHabitSchema), (req, res) =>
  habitoController.atualizar(req, res)
);
/**
 * @swagger
 * api/habito/{id}:
 *   delete:
 *     summary: Remove um hábito
 *     tags: [Habitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Hábito removido com sucesso
 */
habito.delete("/:id", validacao(deletarHabitoSchema), (req, res) => habitoController.deletar(req, res));
/**
 * @swagger
 * api/habito/{id}/completo:
 *   post:
 *     summary: Marca um hábito como completo
 *     tags: [Habitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Registro de hábito completo criado
 */

habito.post("/:id/completo", validacao(completarHabitoSchema), (req, res) => registroController.criar(req, res));
/**
 * @swagger
 * api/habito/{id}/completo:
 *   get:
 *     summary: Lista registros de conclusão de um hábito
 *     tags: [Habitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de registros de conclusão
 */

habito.get("/:id/completo", (req, res) => registroController.listar(req, res));
/**
 * @swagger
 * api/habito/{id}/completo/{registroId}:
 *   delete:
 *     summary: Remove um registro de conclusão de hábito
 *     tags: [Habitos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: registroId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Registro removido com sucesso
 */

habito.delete("/:id/completo/:registroId", (req, res) =>
  registroController.deletar(req, res)
);

export default habito;


