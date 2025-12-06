import AuthService from "../service/AuthService.js";


class AuthController{
    constructor(){
        this.authService = new AuthService();
    }

    async register(req, res){
        const {nome, email, senha} = req.body;

        try{
            
            const userRegister = await this.authService.register(dados);

            return res.status(201).json({userRegister});

        }catch(error){

            return res.status(400).json({error: error.message})
        }
    }

    async login(req, res){
        const {email, senha} = req.body;

        try{
            const usuariotoken = await this.authService.login(email, senha)
            return res.status(200).json({error: error.message});

        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
}


export default AuthController;