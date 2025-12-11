import Controller from "./Controller.js";
import UsuarioService from "../service/UsuarioService.js";



class UsuarioController extends Controller {
    constructor() {
        const usuarioService = new UsuarioService();
        super(usuarioService);
        this.usuarioService = usuarioService;
    }

    async me(req, res){
        try{
            const userId = req.user.id;
            
            const usuario = await this.usuarioService.listarUmId(userId);

            if(!usuario){
                return res.status(404).json({messagem: "Usuário não encontrado"})
            }
            return res.status(200).json(usuario);
            
        }catch(error){

            return res.status(500).json({error: error.message})
        }
    }

    async atualizar (req, res){
        try{

            const userId = req.user.id;
            const dados = req.body;

            const atualizado =  await this.usuarioService.atualizarRegistro(userId, dados);

            return res.status(200).json(atualizado);

        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res){
        try{

            const userId =  req.user.id;

            await this.usuarioService.deletarRegistro(userId);

            return res.status(200).json({messagem: "Usuário deletado com sucesso"})

        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }
}

export default UsuarioController;