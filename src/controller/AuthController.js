
import AuthService from "../service/AuthService.js";


class AuthController{
    constructor(){
        this.authService = new AuthService();
    }

    async register(req, res){
        const {name, email, passWord} = req.body;

        try{
            
            const userRegister = await this.authService.register(name, email, passWord);

            return res.status(201).json({userRegister});

        }catch(error){

            return res.status(400).json({error: error.message})
        }
    }

    async login(req, res){
        const {email, passWord} = req.body;

        try{
            const token = await this.authService.login(email, passWord)
            
            return res.status(200).json({token});

        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
}


export default AuthController;