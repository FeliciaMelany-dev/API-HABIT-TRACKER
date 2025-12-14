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
            
            const usuarioCompleto = await this.usuarioService.listarUmId(userId);

            if(!usuarioCompleto){
                return res.status(404).json({messagem: "Usuário não encontrado"})
            }

            const {id, name, email, role, createdAt} = usuarioCompleto
            return res.status(200).json({
                id,
                name,
                email,
                role,
                createdAt
            });
            
        }catch(error){

            return res.status(500).json({error: error.message})
        }
    }

    async atualizar (req, res){
        try{

            const userId = req.user.id;
            const dados = req.body;

            const atualizado =  await this.usuarioService.atualizarRegistro(userId, dados);

            const {id, name, email, role, createdAt} = atualizado

            return res.status(200).json({
                id, 
                name, 
                email, 
                role, 
                createdAt});

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