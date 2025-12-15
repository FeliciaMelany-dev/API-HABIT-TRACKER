import RegistroService from "../service/RegistroService.js";
import Controller from "./Controller.js";


class RegistroController extends Controller {
    constructor() {
        const registroService = new RegistroService()
         super(registroService)
        this.registroService = registroService;
    }

    async criar(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const { date } = req.body;

            


            const registro = await this.registroService.registrarConclusao(
                id,
                userId,
                date ? new Date(date) : undefined
            );

            return res.status(201).json(registro);

        } catch (error) {

            return res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const registros = await this.registroService.listarPorHabito(id, userId);

            return res.status(200).json(registros);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { registroId } = req.params;
            const userId = req.user.id;

            await this.registroService.deletarRegistro(registroId, userId);

            return res.status(204).send("Apagado com sucesso");
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default RegistroController;


