import Controller from "./Controller.js";
import HabitoService from "../service/HabitoService.js";

const habitoService = new HabitoService();

class HabitoController extends Controller {
    constructor() {
        const habitoService = new HabitoService ();
        super(habitoService);
        this.habitoService = habitoService;
    }

    async listarTodos(req, res){
        try{
            const userId = req.user.Id;
            const dados = await this.habitoService.listarDoUsuario(userId);

            return res.status(200).json(dados)

        }catch(error){
             return res.status(400).json({error: error.message})
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const habito = await this.habitoService.listarUmHabito(id, userId);

            return res.status(200).json(habito);

        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    async criar(req, res) {
        try {
            const userId = req.user.id;
            const {title, description} = req.body;

            const criado = await this.habitoService.criarParaUsuario(userId, {title, description});

            return res.status(201).json(criado);

        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const body = req.body;

            const atualizado = await this.habitoService.atualizarHabito(id, userId, body);

            return res.status(200).json(atualizado);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await this.habitoService.deletarHabito(id, userId);

            return res.status(200).json({ mensagem: "Hábito deletado" });

        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async logar(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const registro = await this.habitoService.logar(id, userId);

            return res.status(201).json(registro);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}


export default HabitoController;