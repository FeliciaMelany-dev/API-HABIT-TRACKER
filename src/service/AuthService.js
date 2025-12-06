import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService{
    
    async register(nome, email, senha){
        const userExiste = await prisma.usuario.findUnique({where:{email}});

        if(userExiste){
            throw new Error ("Email já existe!")
        }

        const hashedSenha = await bcrypt.hash(senha, 12);

        const newUser = await prisma.usuario.create({
            dados:{
                nome,
                email,
                senha: hashedSenha
            }
        });
        return newUser;
    }


    async login (email, senha){

        const userExiste = await prisma.usuario.findUnique({
            where: {email}
        });

        if(!userExiste){
            throw new Error ("Credenciais inválidas")
        }
        
        const senhaCompativel = await bcrypt.compare(senha, usuario.senha);

        if(!senhaCompativel){
            throw new Error ("Credenciais inválidas")
        }

        const token = jwt.sing(

            {id: usuario.id},
            process.env.JWT_SECRET, 
            {expiresIn: "7h"}
        )

        return token;
    };


}

export default AuthService;